'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      className="focus-ring relative grid h-11 w-11 place-items-center border bg-[var(--surface)] text-[var(--ink)]"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[var(--sand)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--clay)]" />
      )}
    </button>
  );
}
