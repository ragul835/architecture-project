#!/usr/bin/env bash

set -Eeuo pipefail
IFS=$'\n\t'

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
readonly RUNTIME_DIR="$SCRIPT_DIR/.runtime"
readonly PROD_PID_FILE="$RUNTIME_DIR/production.pid"
readonly DEV_PID_FILE="$RUNTIME_DIR/development.pid"
readonly PROD_LOG_FILE="$RUNTIME_DIR/production.log"
readonly DEV_LOG_FILE="$RUNTIME_DIR/development.log"
readonly DEV_BUILD_DIR="$SCRIPT_DIR/.next-dev"

cd "$SCRIPT_DIR"

if [[ -t 1 && -z "${NO_COLOR:-}" ]]; then
  readonly BOLD=$'\033[1m' RED=$'\033[0;31m' GREEN=$'\033[0;32m'
  readonly YELLOW=$'\033[0;33m' CYAN=$'\033[0;36m' GOLD=$'\033[38;5;214m' NC=$'\033[0m'
else
  readonly BOLD='' RED='' GREEN='' YELLOW='' CYAN='' GOLD='' NC=''
fi

log_info() { printf '%b[INFO]%b %s\n' "$CYAN" "$NC" "$*"; }
log_success() { printf '%b[SUCCESS]%b %s\n' "$GREEN" "$NC" "$*"; }
log_warn() { printf '%b[WARN]%b %s\n' "$YELLOW" "$NC" "$*" >&2; }
log_error() { printf '%b[ERROR]%b %s\n' "$RED" "$NC" "$*" >&2; }

on_error() {
  local exit_code=$?
  log_error "Command failed at line ${BASH_LINENO[0]} (exit ${exit_code})."
  exit "$exit_code"
}
trap on_error ERR

banner() {
  printf '%b%bAURA Architecture Studio — Application Manager%b\n\n' "$GOLD" "$BOLD" "$NC"
}

usage() {
  cat <<'EOF'
Usage: ./manage.sh <command> [options]

Commands:
  dev [port]       Start the development server (default: 3000)
  dev-bg [port]    Start development in the background (default: 3000)
  build            Run lint, type checks, and a production build
  start [port]     Start the built production server (default: 3000)
  start-bg [port]  Start production in the background (default: 3000)
  stop [mode]      Stop this project's server (mode: production, development, all)
  restart [port]   Restart the production server
  deploy           Validate production configuration and build a release
  lint             Run ESLint and TypeScript checks
  clean            Remove only this project's generated build/cache files
  install          Install exact dependencies from package-lock.json
  setup            Alias for install
  status [port]    Show environment, build, process, and health status
  logs [mode]      Show production or development logs
  menu             Open the interactive menu
  help             Show this help

Environment required by deploy:
  NEXT_PUBLIC_SITE_URL   Public HTTPS site URL
  SMTP_USER             Zoho account used to send inquiries
  SMTP_PASSWORD         Zoho app password (never commit this)
EOF
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    log_error "Required command not found: $1"
    exit 127
  }
}

check_environment() {
  require_command node
  require_command npm
  require_command setsid

  local node_major
  node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
  if (( node_major < 18 )); then
    log_error "Node.js 18 or newer is required; found $(node --version)."
    exit 1
  fi

  [[ -f package.json && -f package-lock.json ]] || {
    log_error "package.json and package-lock.json must exist in $SCRIPT_DIR."
    exit 1
  }

  [[ -x "$SCRIPT_DIR/node_modules/.bin/next" ]] || {
    log_error "Dependencies are not installed. Run './manage.sh install' first."
    exit 1
  }
}

validate_port() {
  local port="$1"
  if [[ ! "$port" =~ ^[0-9]+$ ]] || (( port < 1 || port > 65535 )); then
    log_error "Invalid port '$port'; expected an integer from 1 to 65535."
    exit 2
  fi


  # Browsers and Next.js reject these unsafe legacy-service ports.
  case "$port" in
    1|7|9|11|13|15|17|19|20|21|22|23|25|37|42|43|53|69|77|79|87|95|101|102|103|104|109|110|111|113|115|117|119|123|135|137|139|143|161|179|389|427|465|512|513|514|515|526|530|531|532|540|548|554|556|563|587|601|636|989|990|993|995|1719|1720|1723|2049|3659|4045|5060|5061|6000|6566|6665|6666|6667|6668|6669|6697|10080)
      log_error "Port '$port' is reserved and cannot be used by Next.js. Choose 3000 or another unreserved port."
      exit 2
      ;;
  esac
}

validate_production_config() {
  # Use Next's dotenv loader so validation sees the exact same .env files and
  # precedence as the application without evaluating dotenv content as shell.
  node <<'NODE'
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false);

const errors = [];
try {
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');
  if (siteUrl.protocol !== 'https:') throw new Error();
} catch {
  errors.push('NEXT_PUBLIC_SITE_URL must be a valid public HTTPS URL.');
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.SMTP_USER || '')) {
  errors.push('SMTP_USER must be a valid email address.');
}
if (!process.env.SMTP_PASSWORD || process.env.SMTP_PASSWORD === 'your-zoho-app-password') {
  errors.push('SMTP_PASSWORD must be set to a real app password.');
}
for (const error of errors) console.error(`[ERROR] ${error}`);
process.exit(errors.length ? 1 : 0);
NODE
}

production_config_is_valid() {
  validate_production_config >/dev/null 2>&1
}

pid_is_ours() {
  local pid="$1"
  [[ "$pid" =~ ^[0-9]+$ ]] || return 1
  process_is_running "$pid" || return 1

  if [[ -r "/proc/$pid/cwd" ]]; then
    [[ "$(readlink -f "/proc/$pid/cwd")" == "$SCRIPT_DIR" ]] || return 1
  elif command -v lsof >/dev/null 2>&1; then
    local process_cwd
    process_cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1)"
    [[ "$process_cwd" == "$SCRIPT_DIR" ]] || return 1
  elif [[ -r "/proc/$pid/cmdline" ]]; then
    local command_line
    command_line="$(tr '\0' ' ' < "/proc/$pid/cmdline")"
    [[ "$command_line" == *"$SCRIPT_DIR/node_modules/.bin/next"* ]] || return 1
  else
    # Without a reliable identity check, a reused stale PID is unsafe.
    return 1
  fi

  return 0
}

require_port_available() {
  local port="$1"
  if ! node - "$port" <<'NODE'
const net = require('node:net');
const socket = net.createConnection({ host: '127.0.0.1', port: Number(process.argv[2]) });
socket.setTimeout(500);
socket.once('connect', () => { socket.destroy(); process.exit(1); });
socket.once('timeout', () => { socket.destroy(); process.exit(0); });
socket.once('error', error => {
  process.exit(error.code === 'ECONNREFUSED' ? 0 : 1);
});
NODE
  then
    log_error "Port $port is already in use. Run './manage.sh status $port' or choose another port."
    return 1
  fi
}

process_is_running() {
  local pid="$1"
  [[ "$pid" =~ ^[0-9]+$ ]] || return 1
  kill -0 "$pid" 2>/dev/null || return 1

  # A zombie still answers kill -0 but is already dead and cannot be stopped.
  if [[ -r "/proc/$pid/stat" ]]; then
    [[ "$(awk '{ print $3 }' "/proc/$pid/stat")" != 'Z' ]] || return 1
  fi
}

terminate_managed_process() {
  local pid="$1"
  local pgid=''
  if command -v ps >/dev/null 2>&1; then
    pgid="$(ps -o pgid= -p "$pid" 2>/dev/null | tr -d '[:space:]')"
  fi

  # Background servers are launched with setsid, making PID also their process
  # group ID. Stop the entire Next.js tree, never an unrelated process group.
  if [[ "$pgid" == "$pid" ]]; then
    kill -TERM -- "-$pid"
  else
    kill -TERM "$pid"
  fi
}

stop_pid_file() {
  local pid_file="$1" label="$2"
  [[ -f "$pid_file" ]] || {
    log_info "No $label PID file found."
    return 0
  }

  local pid
  pid="$(<"$pid_file")"
  if ! pid_is_ours "$pid"; then
    log_warn "Removed stale or untrusted $label PID file; no process was killed."
    rm -f -- "$pid_file"
    return 0
  fi

  log_info "Stopping $label server (PID $pid)..."
  terminate_managed_process "$pid"
  local attempts=0
  while process_is_running "$pid" && (( attempts < 100 )); do
    sleep 0.1
    attempts=$((attempts + 1))
  done
  if process_is_running "$pid"; then
    log_error "$label server did not stop after 10 seconds; refusing to force-kill it."
    exit 1
  fi
  rm -f -- "$pid_file"
  log_success "$label server stopped."
}

require_managed_servers_stopped() {
  local action="$1" pid_file pid label
  for pid_file in "$PROD_PID_FILE" "$DEV_PID_FILE"; do
    [[ "$pid_file" == "$PROD_PID_FILE" ]] && label='production' || label='development'
    if [[ -f "$pid_file" ]]; then
      pid="$(<"$pid_file")"
      if pid_is_ours "$pid"; then
        log_error "Stop the managed $label server before $action (PID $pid)."
        return 1
      fi
      rm -f -- "$pid_file"
    fi
  done
}

run_server() {
  local mode="$1" port="$2" pid_file="$3"
  validate_port "$port"
  mkdir -p -- "$RUNTIME_DIR"

  if [[ -f "$pid_file" ]]; then
    local existing_pid
    existing_pid="$(<"$pid_file")"
    if pid_is_ours "$existing_pid"; then
      log_error "$mode server already appears to be running (PID $existing_pid)."
      exit 1
    fi
    rm -f -- "$pid_file"
  fi
  require_port_available "$port"

  log_info "Starting $mode server at http://127.0.0.1:$port"
  if [[ "$mode" == "production" ]]; then
    "$SCRIPT_DIR/node_modules/.bin/next" start --hostname 127.0.0.1 --port "$port" &
  else
    env NEXT_DIST_DIR='.next-dev' "$SCRIPT_DIR/node_modules/.bin/next" dev \
      --hostname 127.0.0.1 --port "$port" &
  fi
  local server_pid=$!
  printf '%s\n' "$server_pid" > "$pid_file"

  cleanup_foreground_server() {
    if process_is_running "$server_pid"; then
      kill -TERM "$server_pid" 2>/dev/null || true
    fi
    rm -f -- "$pid_file"
  }
  trap cleanup_foreground_server EXIT INT TERM

  local exit_code=0
  wait "$server_pid" || exit_code=$?
  trap - EXIT INT TERM
  rm -f -- "$pid_file"
  return "$exit_code"
}

start_production_background() {
  local port="${1:-3000}"
  check_environment
  validate_port "$port"
  validate_production_config
  [[ -f .next/BUILD_ID ]] || {
    log_error "No verified production build found. Run './manage.sh build' first."
    return 1
  }

  mkdir -p -- "$RUNTIME_DIR"
  if [[ -f "$PROD_PID_FILE" ]] && pid_is_ours "$(<"$PROD_PID_FILE")"; then
    log_warn "Production is already running (PID $(<"$PROD_PID_FILE"))."
    return 0
  fi
  rm -f -- "$PROD_PID_FILE"
  require_port_available "$port"

  log_info "Starting production in the background at http://127.0.0.1:$port"
  printf '\n===== Production start: %s =====\n' "$(date --iso-8601=seconds)" >> "$PROD_LOG_FILE"
  nohup setsid "$SCRIPT_DIR/node_modules/.bin/next" start --hostname 127.0.0.1 --port "$port" \
    >> "$PROD_LOG_FILE" 2>&1 &
  local server_pid=$!
  printf '%s\n' "$server_pid" > "$PROD_PID_FILE"

  local attempts=0
  while (( attempts < 30 )); do
    if ! kill -0 "$server_pid" 2>/dev/null; then
      log_error "Production server exited during startup. See $PROD_LOG_FILE"
      rm -f -- "$PROD_PID_FILE"
      return 1
    fi
    if command -v curl >/dev/null 2>&1 && \
      curl --fail --silent --max-time 1 "http://127.0.0.1:$port/api/health" >/dev/null; then
      log_success "Production server is healthy (PID $server_pid)."
      return 0
    fi
    sleep 0.2
    attempts=$((attempts + 1))
  done

  log_error "Production health check timed out after 6 seconds. See $PROD_LOG_FILE"
  terminate_managed_process "$server_pid" 2>/dev/null || true
  rm -f -- "$PROD_PID_FILE"
  return 1
}

start_development_background() {
  local port="${1:-3000}"
  check_environment
  validate_port "$port"
  require_managed_servers_stopped 'starting development'
  require_port_available "$port"

  mkdir -p -- "$RUNTIME_DIR"
  printf '\n===== Development start: %s =====\n' "$(date --iso-8601=seconds)" >> "$DEV_LOG_FILE"
  nohup setsid env NEXT_DIST_DIR='.next-dev' "$SCRIPT_DIR/node_modules/.bin/next" dev \
    --hostname 127.0.0.1 --port "$port" \
    >> "$DEV_LOG_FILE" 2>&1 &
  local server_pid=$!
  printf '%s\n' "$server_pid" > "$DEV_PID_FILE"

  local attempts=0
  while (( attempts < 60 )); do
    if ! kill -0 "$server_pid" 2>/dev/null; then
      log_error "Development server exited during startup. See $DEV_LOG_FILE"
      rm -f -- "$DEV_PID_FILE"
      return 1
    fi
    if command -v curl >/dev/null 2>&1 && \
      curl --fail --silent --max-time 1 "http://127.0.0.1:$port/api/health" >/dev/null; then
      log_success "Development server is healthy (PID $server_pid)."
      return 0
    fi
    sleep 0.25
    attempts=$((attempts + 1))
  done

  log_error "Development health check timed out after 15 seconds. See $DEV_LOG_FILE"
  terminate_managed_process "$server_pid" 2>/dev/null || true
  rm -f -- "$DEV_PID_FILE"
  return 1
}

show_logs() {
  local mode="${1:-production}" log_file
  case "$mode" in
    production|prod) log_file="$PROD_LOG_FILE" ;;
    development|dev) log_file="$DEV_LOG_FILE" ;;
    *) log_error "Unknown log mode '$mode'."; return 2 ;;
  esac

  if [[ ! -f "$log_file" ]]; then
    log_info "No $mode log exists yet."
    return 0
  fi
  tail -n "${LOG_LINES:-80}" -- "$log_file"
}

run_menu_action() {
  local label="$1"
  shift
  if ( "$@" ); then
    return 0
  else
    local exit_code=$?
    log_warn "$label did not complete (exit $exit_code). Review the message above."
  fi
  return 0
}

quick_production() {
  local port="$1"
  cmd_stop all
  cmd_build
  start_production_background "$port"
}

quick_production_restart() {
  local port="$1"
  cmd_stop production
  start_production_background "$port"
}

cmd_dev() {
  check_environment
  require_managed_servers_stopped 'starting development'
  run_server development "${1:-3000}" "$DEV_PID_FILE"
}

cmd_build() {
  check_environment
  require_managed_servers_stopped 'building'
  log_info "Running the complete release gate..."
  npm run check
  log_success "Production build completed successfully."
}

cmd_start() {
  check_environment
  validate_production_config
  [[ -f .next/BUILD_ID ]] || {
    log_error "No verified production build found. Run './manage.sh build' first."
    exit 1
  }
  run_server production "${1:-3000}" "$PROD_PID_FILE"
}

cmd_stop() {
  case "${1:-all}" in
    production|prod) stop_pid_file "$PROD_PID_FILE" production ;;
    development|dev) stop_pid_file "$DEV_PID_FILE" development ;;
    all)
      stop_pid_file "$PROD_PID_FILE" production
      stop_pid_file "$DEV_PID_FILE" development
      ;;
    *) log_error "Unknown stop mode '$1'. Use production, development, or all."; exit 2 ;;
  esac
}

cmd_restart() {
  local port="${1:-3000}"
  validate_port "$port"
  cmd_stop production
  cmd_start "$port"
}

cmd_deploy() {
  banner
  check_environment
  require_managed_servers_stopped 'deploying'
  validate_production_config
  log_info "Production configuration is valid. Building release..."
  npm ci --ignore-scripts
  npm run check
  [[ -f .next/BUILD_ID ]] || { log_error "Build output is incomplete."; exit 1; }
  log_success "Release is ready. Start it with './manage.sh start [port]'."
}

cmd_lint() {
  check_environment
  npm run lint
  npm run typecheck
  log_success "Lint and type checks passed."
}

cmd_clean() {
  require_managed_servers_stopped 'cleaning'
  [[ "$SCRIPT_DIR" != / && -f "$SCRIPT_DIR/package.json" ]] || {
    log_error "Refusing to clean an unverified project directory."
    exit 1
  }
  log_info "Removing generated build and cache files..."
  rm -rf -- "$SCRIPT_DIR/.next" "$DEV_BUILD_DIR" "$SCRIPT_DIR/node_modules/.cache" "$RUNTIME_DIR"
  log_success "Generated files removed. Dependencies and source files were preserved."
}

cmd_setup() {
  check_environment
  require_managed_servers_stopped 'installing dependencies'
  log_info "Installing locked dependencies..."
  npm ci
  log_success "Dependencies installed from package-lock.json."
}

show_pid_status() {
  local pid_file="$1" label="$2"
  if [[ -f "$pid_file" ]] && pid_is_ours "$(<"$pid_file")"; then
    printf '%-20s %bRunning%b (PID %s)\n' "$label" "$GREEN" "$NC" "$(<"$pid_file")"
  else
    printf '%-20s %bStopped%b\n' "$label" "$YELLOW" "$NC"
  fi
}

cmd_status() {
  check_environment
  local port="${1:-3000}"
  validate_port "$port"
  printf '%b%s%b\n' "$BOLD" 'AURA application status' "$NC"
  printf '%-20s %s\n' 'Project' "$SCRIPT_DIR"
  printf '%-20s %s\n' 'Node.js' "$(node --version)"
  printf '%-20s %s\n' 'npm' "$(npm --version)"
  printf '%-20s %s\n' 'Build' "$([[ -f .next/BUILD_ID ]] && printf 'Ready' || printf 'Missing')"
  if production_config_is_valid; then
    printf '%-20s %bConfigured%b\n' 'Production config' "$GREEN" "$NC"
  else
    printf '%-20s %bMissing variables%b\n' 'Production config' "$YELLOW" "$NC"
  fi
  show_pid_status "$PROD_PID_FILE" 'Production server'
  show_pid_status "$DEV_PID_FILE" 'Development server'

  if command -v curl >/dev/null 2>&1 && curl --fail --silent --max-time 2 "http://127.0.0.1:$port/api/health" >/dev/null; then
    printf '%-20s %bHealthy%b\n' 'Health endpoint' "$GREEN" "$NC"
  else
    printf '%-20s %bUnavailable%b (port %s)\n' 'Health endpoint' "$YELLOW" "$NC" "$port"
  fi
}

show_menu() {
  [[ -t 0 ]] || { log_error "Interactive menu requires a terminal."; exit 2; }
  while true; do
    banner
    printf '%b======================================================================%b\n' "$CYAN" "$NC"
    printf '%b                     AURA Services Management Menu                    %b\n' "$GREEN" "$NC"
    printf '%b======================================================================%b\n\n' "$CYAN" "$NC"
    printf '%bLocal setup and verification:%b\n' "$YELLOW" "$NC"
    printf '  1) Install dependencies (npm ci)\n'
    printf '  2) Build and verify project\n'
    printf '  3) Run lint and type checks\n'
    printf '  4) Clean generated files\n\n'
    printf '%bDevelopment service:%b\n' "$YELLOW" "$NC"
    printf '  5) Start development in background\n'
    printf '  6) Stop development\n'
    printf '  7) Show development log\n\n'
    printf '%bProduction service:%b\n' "$YELLOW" "$NC"
    printf '  8) Start production in background\n'
    printf '  9) Stop production\n'
    printf ' 10) Restart production\n'
    printf ' 11) Deploy (install → verify → build)\n'
    printf ' 12) Quick production (stop → build → start)\n'
    printf ' 13) Show production log\n\n'
    printf '%bMonitoring:%b\n' "$YELLOW" "$NC"
    printf ' 14) Show application status\n'
    printf ' 15) Show disk and memory usage\n'
    printf '  0) Exit\n\n'

    if ! read -r -p 'Choose an option [0-15]: ' choice; then
      printf '\n'
      return 0
    fi
    printf '\n'

    case "$choice" in
      1) run_menu_action 'Dependency installation' cmd_setup ;;
      2) run_menu_action 'Build' cmd_build ;;
      3) run_menu_action 'Code checks' cmd_lint ;;
      4)
        read -r -p 'Remove generated build/cache files? [y/N]: ' confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
          run_menu_action 'Clean' cmd_clean
        else
          log_info 'Clean cancelled.'
        fi
        ;;
      5)
        read -r -p 'Development port [3000]: ' port
        run_menu_action 'Development startup' start_development_background "${port:-3000}"
        ;;
      6) run_menu_action 'Development stop' cmd_stop development ;;
      7) run_menu_action 'Development logs' show_logs development ;;
      8)
        read -r -p 'Production port [3000]: ' port
        run_menu_action 'Production startup' start_production_background "${port:-3000}"
        ;;
      9) run_menu_action 'Production stop' cmd_stop production ;;
      10)
        read -r -p 'Port [3000]: ' port
        run_menu_action 'Production restart' quick_production_restart "${port:-3000}"
        ;;
      11) run_menu_action 'Deployment' cmd_deploy ;;
      12)
        read -r -p 'Production port [3000]: ' port
        run_menu_action 'Quick production workflow' quick_production "${port:-3000}"
        ;;
      13) run_menu_action 'Production logs' show_logs production ;;
      14)
        read -r -p 'Health-check port [3000]: ' port
        run_menu_action 'Status check' cmd_status "${port:-3000}"
        ;;
      15)
        command -v df >/dev/null 2>&1 && df -h "$SCRIPT_DIR"
        printf '\n'
        command -v free >/dev/null 2>&1 && free -h || log_warn 'Memory tool "free" is unavailable.'
        ;;
      0) log_info 'Goodbye.'; return 0 ;;
      *) log_warn "Invalid selection '$choice'. Choose a number from 0 to 15." ;;
    esac

    printf '\n'
    read -r -p 'Press Enter to return to the menu...' _ || return 0
  done
}

if (( $# == 0 )) && [[ ! -t 0 ]]; then
  usage
  exit 2
fi

command="${1:-menu}"
shift || true

case "$command" in
  dev) cmd_dev "$@" ;;
  build) cmd_build "$@" ;;
  start) cmd_start "$@" ;;
  start-bg) start_production_background "$@" ;;
  dev-bg) start_development_background "$@" ;;
  stop) cmd_stop "$@" ;;
  restart) cmd_restart "$@" ;;
  deploy) cmd_deploy "$@" ;;
  lint) cmd_lint "$@" ;;
  clean) cmd_clean "$@" ;;
  status) cmd_status "$@" ;;
  logs) show_logs "$@" ;;
  install|setup) cmd_setup "$@" ;;
  # Numeric commands intentionally mirror the interactive menu exactly.
  1) cmd_setup "$@" ;;
  2) cmd_build "$@" ;;
  3) cmd_lint "$@" ;;
  4) cmd_clean "$@" ;;
  5) start_development_background "$@" ;;
  6) cmd_stop development ;;
  7) show_logs development ;;
  8) start_production_background "$@" ;;
  9) cmd_stop production ;;
  10) quick_production_restart "${1:-3000}" ;;
  11) cmd_deploy "$@" ;;
  12) quick_production "${1:-3000}" ;;
  13) show_logs production ;;
  14) cmd_status "$@" ;;
  15)
    command -v df >/dev/null 2>&1 && df -h "$SCRIPT_DIR"
    printf '\n'
    command -v free >/dev/null 2>&1 && free -h || log_warn 'Memory tool "free" is unavailable.'
    ;;
  menu) show_menu ;;
  help|-h|--help) usage ;;
  *) log_error "Unknown command '$command'."; usage >&2; exit 2 ;;
esac
