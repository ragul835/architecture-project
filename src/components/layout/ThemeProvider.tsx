'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = 'aura-theme';

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#181916' : '#f4f0e8',
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage may be unavailable in privacy-restricted browser contexts.
    }

    const initialTheme: Theme = isTheme(savedTheme) ? savedTheme : mediaQuery.matches ? 'dark' : 'light';
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const handleSystemTheme = (event: MediaQueryListEvent) => {
      let storedTheme: string | null = null;
      try {
        storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        // Fall back to the live operating-system preference.
      }
      if (!isTheme(storedTheme)) {
        const nextTheme = event.matches ? 'dark' : 'light';
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY || !isTheme(event.newValue)) return;
      setTheme(event.newValue);
      applyTheme(event.newValue);
    };

    mediaQuery.addEventListener('change', handleSystemTheme);
    window.addEventListener('storage', handleStorage);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemTheme);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The theme still applies for the current page when storage is unavailable.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
