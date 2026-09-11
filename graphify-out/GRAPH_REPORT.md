# Graph Report - .  (2026-08-11)

## Corpus Check
- 44 files · ~249,745 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 187 nodes · 281 edges · 21 communities (12 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.88)
- Token cost: 4,236 input · 4,504 output

## Community Hubs (Navigation)
- Portfolio and Projects
- TypeScript Configuration
- Contact Experience
- Runtime Dependencies
- Build Tooling
- Deployment Management
- Services and Estimator
- Studio About
- Contact API
- Next.js Configuration
- Next.js Types
- Coastal Residences
- Indian Courtyards
- Loft Renovation
- Founding Team
- Urban Tower

## God Nodes (most connected - your core abstractions)
1. `show_menu()` - 15 edges
2. `compilerOptions` - 15 edges
3. `manage.sh script` - 13 edges
4. `log_info()` - 11 edges
5. `check_env()` - 9 edges
6. `cmd_deploy()` - 9 edges
7. `PROJECTS_DATA` - 9 edges
8. `cmd_stop()` - 8 edges
9. `cmd_build()` - 8 edges
10. `cmd_start()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Luxury Coastal Residence Hero Image` --semantically_similar_to--> `Malibu Cliffside Villa`  [INFERRED] [semantically similar]
  public/images/hero_main.png → public/images/villa_malibu.png
- `Indian Courtyard` --semantically_similar_to--> `Contemporary Indian Courtyard Residence`  [INFERRED] [semantically similar]
  public/images/indian_courtyard.png → public/images/indian_hero.png
- `GET()` --references--> `PROJECTS_DATA`  [EXTRACTED]
  src/app/api/projects/[slug]/route.ts → src/data/projectsData.ts
- `ProjectDetailPage()` --references--> `PROJECTS_DATA`  [EXTRACTED]
  src/app/portfolio/[slug]/page.tsx → src/data/projectsData.ts
- `Unrenovated Industrial Loft` --conceptually_related_to--> `Renovated Industrial Loft`  [INFERRED]
  public/images/loft_before.png → public/images/loft_after.png

## Import Cycles
- None detected.

## Communities (21 total, 9 thin omitted)

### Community 0 - "Portfolio and Projects"
Cohesion: 0.11
Nodes (24): GET(), HomePage(), ProjectDetailPage(), BeforeAfterSlider(), BeforeAfterSliderProps, LightboxModal(), LightboxModalProps, LightMode (+16 more)

### Community 1 - "TypeScript Configuration"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 2 - "Contact Experience"
Cohesion: 0.12
Nodes (13): metadata, CookieConsent(), WhatsAppFloat(), Footer(), NAV_LINKS, Navbar(), Theme, ThemeContext (+5 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (23): clsx, framer-motion, lucide-react, next, dependencies, clsx, framer-motion, lucide-react (+15 more)

### Community 4 - "Build Tooling"
Cohesion: 0.11
Nodes (19): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+11 more)

### Community 5 - "Deployment Management"
Cohesion: 0.44
Nodes (18): banner(), check_env(), cmd_build(), cmd_clean(), cmd_deploy(), cmd_dev(), cmd_lint(), cmd_restart() (+10 more)

### Community 6 - "Services and Estimator"
Cohesion: 0.29
Nodes (5): WORKFLOW_STEPS, AREA_RANGES, CostEstimator(), FINISH_LEVELS, PROJECT_TYPES

## Knowledge Gaps
- **70 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+65 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Build Tooling` to `Runtime Dependencies`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio and Projects` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Contact Experience` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._