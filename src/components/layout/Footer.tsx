'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, Instagram, Linkedin, CheckCircle2 } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase">
                {STUDIO_CONFIG.shortName}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {STUDIO_CONFIG.description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {STUDIO_CONFIG.licensing.accreditation}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Studio Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About & Team</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services Offered</Link></li>
              <li><Link href="/portfolio" className="hover:text-amber-400 transition-colors">Portfolio Showcase</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Studio</Link></li>
            </ul>
          </div>

          {/* Contact Details & Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Direct Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{STUDIO_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${STUDIO_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{STUDIO_CONFIG.contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${STUDIO_CONFIG.contact.email}`} className="hover:text-white transition-colors">{STUDIO_CONFIG.contact.email}</a>
              </li>
            </ul>
            <div className="pt-3 flex items-center gap-3 text-neutral-400">
              <a href={STUDIO_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram link" className="hover:text-amber-400 transition-colors p-2 rounded-full bg-neutral-800"><Instagram className="w-4 h-4" /></a>
              <a href={STUDIO_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn link" className="hover:text-amber-400 transition-colors p-2 rounded-full bg-neutral-800"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {STUDIO_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            <span>Council of Architecture Reg #{STUDIO_CONFIG.licensing.registrationNumber}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
