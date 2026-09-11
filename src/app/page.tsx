'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/data/projectsData';
import { SERVICES_DATA } from '@/data/servicesData';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { BeforeAfterSlider } from '@/components/interactive/BeforeAfterSlider';
import { LightboxModal } from '@/components/interactive/LightboxModal';
import { ArrowUpRight, ArrowRight, Compass, Sparkles, ChevronRight, ShieldCheck, Sun, Layers } from 'lucide-react';

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const renovationProject = PROJECTS_DATA.find((p) => p.beforeAfter);

  const galleryList = featuredProjects.map((p) => p.coverImage);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800 -mt-20 pt-20">
        {/* Hero Background Image with Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_main.png"
            alt="AURA Architecture Indian Residence"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 backdrop-blur-md text-amber-400 text-xs font-semibold uppercase tracking-widest animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Architectural Practice</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-neutral-100">
              Designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Sanctuaries</span> of Light & Structure.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              AURA creates bespoke luxury villas, commercial towers, and adaptive interior spaces across India designed for tropical climate harmony, passive thermal comfort, and timeless material beauty.
            </p>

            {/* CTA Group */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
              >
                View Portfolio Showcase
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services#estimator"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900/80 border border-neutral-700 hover:border-amber-400 text-white font-semibold text-xs uppercase tracking-widest backdrop-blur-md transition-all duration-300 hover:bg-neutral-800"
              >
                Cost Estimator (INR)
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

            {/* Core Practice Pillars */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-neutral-800/80">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Architectural Design</div>
                <div className="text-xs text-neutral-400">Bespoke Villas & Residential Estates</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Commercial & Civic</div>
                <div className="text-xs text-neutral-400">Sustainable High-Rises & Landmarks</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Adaptive Restoration</div>
                <div className="text-xs text-neutral-400">Heritage Conservation & Structural Reuse</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Interior Architecture</div>
                <div className="text-xs text-neutral-400">Custom Stone Joinery & Spatial Styling</div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. PHILOSOPHY & CRAFT SECTION (Clean Text & Pillars Grid, No Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            Studio Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
            Architecture rooted in Indian climate, crafts, and spatial geometry.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
            We believe architecture should respond organically to local sun vectors, monsoon rain patterns, and natural materials like Kota stone, Jaisalmer marble, and Indian teakwood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">Structural Clarity</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Authentic expression of raw board-formed concrete, timber, and glass without superficial ornament.</p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">Passive Thermal Design</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Dissolving indoor heat with breeze corridors, shaded jaali screens, and rainwater harvesting.</p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">Vastu Geometry</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Harmonizing spatial orientation, central light wells (Angan), and natural water elements.</p>
          </div>
        </div>

        <div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
          >
            Learn About Our Studio Practice
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>


      {/* 3. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Featured Architectural Work in India
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-amber-500 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Explore All Projects ({PROJECTS_DATA.length})
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenLightbox={() => setLightboxIndex(idx)}
            />
          ))}
        </div>
      </section>


      {/* 4. INTERACTIVE RENOVATION BEFORE / AFTER SLIDER */}
      {renovationProject?.beforeAfter && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Interactive Transformation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Before & After Restoration Showcase
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Experience how our adaptive reuse practice transforms heritage structures into modern architectural sanctuaries.
            </p>
          </div>

          <BeforeAfterSlider data={renovationProject.beforeAfter} />
        </section>
      )}


      {/* 5. SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Full-Spectrum Practice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Services We Offer
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            From site feasibility to municipal approvals and construction supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-amber-500 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:translate-x-1 transition-transform"
                >
                  View Service Deliverables
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Component */}
      <LightboxModal
        images={galleryList}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        title="Featured Architectural Portfolio"
      />
    </div>
  );
}
