'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/servicesData';
import { CostEstimator } from '@/components/interactive/CostEstimator';
import { ArrowRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Discovery & Feasibility',
    desc: 'Site topography audit, solar path analysis, zoning & building code checks, client lifestyle briefing.',
  },
  {
    step: '02',
    phase: 'Schematic Design & 3D Massing',
    desc: 'Developing initial floorplans, 3D digital massing models, tactile material palettes, and early cost framing.',
  },
  {
    step: '03',
    phase: 'Design Development & Permitting',
    desc: 'Complete architectural construction drawings, structural & MEP engineering coordination, city permit filings.',
  },
  {
    step: '04',
    phase: 'Construction Supervision & Styling',
    desc: 'Regular site inspections, contractor quality assurance, custom millwork oversight, and final interior commissioning.',
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Page Hero Header */}
      <section className="relative bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Core Architectural Capabilities
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-neutral-100">
            Services & Studio Practice
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light">
            We provide full-service architectural design, urban planning, adaptive renovation, interior architecture, and 3D digital twin visualizations.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Tailored Architectural Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Comprehensive Design Services
          </h2>
        </div>

        <div className="space-y-12">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-md ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-neutral-950">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.category}
                </span>
              </div>

              {/* Text Deliverables Side */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Key Client Deliverables:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-amber-600 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Inquire About This Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Phase Breakdown */}
      <section className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Standard Practice</span>
            <h2 className="font-serif text-3xl font-bold">Our 4-Phase Architectural Workflow</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((wf, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative">
                <span className="font-serif text-4xl font-bold text-amber-500/40 block">
                  {wf.step}
                </span>
                <h3 className="font-bold text-base text-neutral-100">{wf.phase}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Estimator Section */}
      <section id="estimator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Interactive Client Tool
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Estimate Your Architectural Project
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Use our interactive estimator to calculate a preliminary budget and schedule range before speaking with our principal architects.
          </p>
        </div>

        <CostEstimator />
      </section>
    </div>
  );
}
