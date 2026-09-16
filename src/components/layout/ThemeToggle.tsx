'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="focus-ring relative grid h-11 w-11 place-items-center border bg-[var(--surface)] text-[var(--ink)] transition-colors hover:bg-[var(--canvas)]"
    >
      <Moon aria-hidden="true" className="h-4 w-4 text-[var(--clay)] dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-4 w-4 text-[var(--sand)] dark:block" />
    </button>
  );
}
