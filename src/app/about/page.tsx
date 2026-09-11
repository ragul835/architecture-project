'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Award, ShieldCheck, ArrowRight, Building, Leaf } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Lead Design Architect',
    role: 'Principal Design Director',
    bio: 'CoA Registered Architect. Specializing in cantilevered concrete engineering, coastal monsoon resilience, and tropical villa design.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    credentials: ['CoA Registered', 'IIA Member'],
  },
  {
    name: 'Chief Urban Planner',
    role: 'Co-Founder & Urban Planning Lead',
    bio: 'Leads biophilic skyscraper masterplans, IGBC Platinum commercial hubs, and historic bungalow restorations.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    credentials: ['IGBC Accredited', 'Urban Design Specialist'],
  },
  {
    name: 'Director of Interior Architecture',
    role: 'Interior Architecture Lead',
    bio: 'Specialist in authentic Indian stone joinery (Kota, Jaisalmer, Travertine), bespoke teakwood cabinetry, and passive lighting scenes.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    credentials: ['Stone Joinery Specialist'],
  },
  {
    name: 'Computational Design Specialist',
    role: 'Lead 3D & VR Designer',
    bio: 'Pioneer in parametric computational modeling, sun-path shading algorithms, and real-time digital twin VR simulations.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    credentials: ['3D Parametric Specialist'],
  },
];

const WORKFLOW_MILESTONES = [
  { step: '01', title: 'Site Feasibility & Solar Path Mapping', desc: 'Conducting topographical analysis, soil testing, solar radiation mapping, and zoning compliance.' },
  { step: '02', title: 'Schematic Massing & 3D Renders', desc: 'Developing preliminary floorplans, 3D digital massing models, tactile material palettes, and early cost framing.' },
  { step: '03', title: 'Municipal Approvals & Engineering', desc: 'Preparing working construction drawings, structural & MEP engineering, and local authority sanction filings.' },
  { step: '04', title: 'Construction Supervision & Styling', desc: 'Regular site visits, contractor quality assurance, custom joinery oversight, and final interior commissioning.' },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Page Hero Header */}
      <section className="relative bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <Compass className="w-4 h-4" />
            The Studio Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-neutral-100">
            About AURA Architecture
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light">
            AURA is a leading architectural and urban design practice dedicated to spatial purity, structural integrity, and environmental stewardship across India.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Our Foundational Belief
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Designing spaces that endure, inspire, and harmonize with Indian landscapes.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
            Every architectural commission begins with rigorous research into microclimate sun vectors, monsoon wind corridors, local geology, and natural Indian stone and timber materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-2">
            <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">Uncompromising Material Integrity</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">We work with authentic board-formed concrete, Kota stone, Jaisalmer yellow marble, teakwood, and high-performance glass.</p>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-2">
            <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">Passive Solar & Monsoon Resilience</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Integrated rainwater harvesting, shaded jaali screens, and high-performance thermal envelopes in every project.</p>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Leadership & Practice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Our Architectural Leadership
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            A collaborative team of CoA registered architectural and interior design minds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 space-y-4 hover:border-amber-500 transition-all shadow-sm hover:shadow-md"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400">{member.role}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                  {member.bio}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                {member.credentials.map((cred, cIdx) => (
                  <span key={cIdx} className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Milestone Phases */}
      <section className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Project Delivery Process</span>
            <h2 className="font-serif text-3xl font-bold">Comprehensive Design Stages</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_MILESTONES.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="font-serif text-3xl font-bold text-amber-400 block">{item.step}</span>
                <h3 className="font-bold text-base text-neutral-100">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
          Credentials & Affiliations
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-center space-y-2 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">CoA Registered</h4>
            <p className="text-[11px] text-neutral-500">Council of Architecture India</p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-center space-y-2 shadow-sm">
            <Leaf className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">IGBC Platinum</h4>
            <p className="text-[11px] text-neutral-500">Indian Green Building Council</p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-center space-y-2 shadow-sm">
            <Award className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">IIA Fellow</h4>
            <p className="text-[11px] text-neutral-500">Indian Institute of Architects</p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-center space-y-2 shadow-sm">
            <Building className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">B.Arch & M.Arch</h4>
            <p className="text-[11px] text-neutral-500">Professional Architecture Degrees</p>
          </div>
        </div>

        <div className="pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
          >
            Schedule Private Studio Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
