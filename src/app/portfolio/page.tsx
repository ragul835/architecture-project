'use client';

import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ProjectCategory } from '@/lib/types';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectFilter } from '@/components/portfolio/ProjectFilter';
import { LightboxModal } from '@/components/interactive/LightboxModal';
import { Compass, FilterX } from 'lucide-react';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-16 pb-20">
      {/* Page Hero Header */}
      <section className="relative bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Curated Architectural Index
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-neutral-100">
            Portfolio & Case Studies
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light">
            Explore our architectural portfolio spanning cantilevered coastal villas, sustainable eco towers, adaptive mill renovations, and interior sanctuaries.
          </p>
        </div>
      </section>

      {/* Main Filter & Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ProjectFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} Projects</span>
          {(activeCategory !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              <FilterX className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenLightbox={(img) => setLightboxImage(img)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl space-y-3 bg-white dark:bg-neutral-900/40">
            <FilterX className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">
              No Projects Match Your Search
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your category filter or clearing search keywords to view all projects.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={lightboxImage ? [lightboxImage] : []}
        currentIndex={0}
        isOpen={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
        onNavigate={() => {}}
        title="Project Photography Preview"
      />
    </div>
  );
}
