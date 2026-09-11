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
      className="relative p-2.5 rounded-full transition-all duration-300 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/80 hover:border-amber-500 text-neutral-800 dark:text-neutral-100 shadow-sm hover:scale-105"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
      ) : (
        <Moon className="w-4 h-4 text-amber-600 animate-fade-in" />
      )}
    </button>
  );
}
