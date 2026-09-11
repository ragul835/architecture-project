'use client';

import React from 'react';
import { ProjectCategory } from '@/lib/types';
import { Search, LayoutGrid, List } from 'lucide-react';

interface ProjectFilterProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'masonry';
  onToggleViewMode: (mode: 'grid' | 'masonry') => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Residential', 'Commercial', 'Interior', 'Renovation'];

export function ProjectFilter({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
}: ProjectFilterProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & View Mode Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-neutral-200 dark:bg-neutral-800 p-1 rounded-full border border-neutral-300 dark:border-neutral-700">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-full text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleViewMode('masonry')}
              className={`p-1.5 rounded-full text-xs transition-colors ${
                viewMode === 'masonry' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'
              }`}
              title="Dense View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
