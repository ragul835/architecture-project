'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA } from '@/data/projectsData';
import { BeforeAfterSlider } from '@/components/interactive/BeforeAfterSlider';
import { ThreeDViewer } from '@/components/interactive/ThreeDViewer';
import { LightboxModal } from '@/components/interactive/LightboxModal';
import {
  MapPin,
  Layers,
  Clock,
  User,
  Download,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Maximize2,
} from 'lucide-react';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = PROJECTS_DATA.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const handleDownloadBrochure = () => {
    const brochureContent = `
======================================================
AURA ARCHITECTURE & URBAN STUDIO — PROJECT SPECIFICATION
======================================================
Project Title: ${project.title}
Subtitle: ${project.subtitle}
Category: ${project.category}
Location: ${project.location} (India)
Completion Year: ${project.year}
Built Area: ${project.areaSqFt}
Timeline: ${project.timeline}
Client Scope: ${project.client}

MATERIALS PALETTE & SPECIFICATIONS:
${project.materials.map((m) => `- ${m}`).join('\n')}

ARCHITECTURAL BRIEF & DESIGN PHILOSOPHY:
${project.description}

CONCEPT & GEOMETRY:
${project.concept}

ENGINEERING CHALLENGE:
${project.challenge}

STRUCTURAL & CLIMATE SOLUTION:
${project.solution}

======================================================
AURA Architecture & Urban Studio LLP
CoA Registration: CA/2012/54321 | IIA | IGBC AP
Studio HQ: 1200 Ocean View, Bandra West, Mumbai, MH 400050
Inquiries: inquiry@aurastudio.arch | +91 98200 55192
======================================================
    `.trim();

    const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AURA_Brochure_${project.slug}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. TOP NAVIGATION & HERO BANNER */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden border-b border-neutral-200 dark:border-neutral-800 -mt-20 pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white w-full space-y-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio Grid
          </Link>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              {project.category} Architecture
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-neutral-100">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 max-w-3xl font-light leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Location</span>
                <span className="font-semibold text-neutral-200">{project.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Area</span>
                <span className="font-semibold text-neutral-200">{project.areaSqFt}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Timeline</span>
                <span className="font-semibold text-neutral-200">{project.timeline} ({project.year})</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Client Scope</span>
                <span className="font-semibold text-neutral-200">{project.client}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROJECT OVERVIEW & SPECS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Brief, Challenge, Solution */}
          <div className="lg:col-span-2 space-y-8 text-neutral-800 dark:text-neutral-200">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Architectural Brief & Vision
              </h2>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Concept & Spatial Geometry
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.concept}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm">
                <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400 uppercase tracking-wider">The Engineering Challenge</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm">
                <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">The Architectural Solution</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Materials & Brochure Download Card */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-4 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-amber-400">Materials Palette</h3>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                {project.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={handleDownloadBrochure}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download Specification Sheet
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BEFORE & AFTER SLIDER (If renovation project) */}
      {project.beforeAfter && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Transformation View
            </span>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Before & After Restoration Comparison
            </h2>
          </div>
          <BeforeAfterSlider data={project.beforeAfter} />
        </section>
      )}

      {/* 4. INTERACTIVE 3D MODEL / 360 TOUR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Virtual Studio Simulator
          </span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Interactive 3D Render & Solar Simulation
          </h2>
        </div>
        <ThreeDViewer
          coverImage={project.coverImage}
          galleryImages={project.galleryImages}
          hotspots={project.hotspots}
          title={project.title}
        />
      </section>

      {/* 5. HIGH-RES PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Project Photography Gallery ({project.galleryImages.length})
          </h2>
          <span className="text-xs text-neutral-500">Click any photo for fullscreen lightbox</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
            >
              <img
                src={img}
                alt={`${project.title} photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 className="w-8 h-8 text-amber-400" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Component */}
      <LightboxModal
        images={project.galleryImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        title={project.title}
      />
    </div>
  );
}
