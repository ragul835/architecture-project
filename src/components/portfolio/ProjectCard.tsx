'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { ArrowUpRight, MapPin, Calendar, Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenLightbox?: (coverImage: string) => void;
}

export function ProjectCard({ project, onOpenLightbox }: ProjectCardProps) {
  return (
    <article className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl focus-within:-translate-y-1.5 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-neutral-950 flex flex-col justify-between shadow-sm">
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
      >
        <span className="sr-only">View details for {project.title}</span>
      </Link>

      {/* Cover Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 text-amber-400 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          {project.category}
        </span>

        {/* Quick Lightbox Trigger */}
        {onOpenLightbox && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenLightbox(project.coverImage);
            }}
            aria-label="Preview Full Image"
            className="absolute z-20 top-4 right-4 p-2 rounded-full bg-neutral-900/80 text-white hover:bg-amber-500 hover:text-neutral-950 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-all duration-300"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Quick Specs Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {project.year}
          </span>
        </div>
      </div>

      {/* Content Meta */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Materials tags preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.materials.slice(0, 3).map((mat, i) => (
            <span
              key={i}
              className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700"
            >
              {mat}
            </span>
          ))}
          {project.materials.length > 3 && (
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 px-1">
              +{project.materials.length - 3}
            </span>
          )}
        </div>

        {/* Link to detail page */}
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {project.areaSqFt}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
            Explore Case Study
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
