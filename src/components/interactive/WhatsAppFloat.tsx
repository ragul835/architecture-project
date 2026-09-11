'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneHref = `tel:${STUDIO_CONFIG.contact.phone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${STUDIO_CONFIG.contact.whatsappNumber}?text=Hello%20AURA%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20new%20architectural%20project.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="w-72 bg-neutral-900 text-white rounded-2xl p-4 border border-neutral-800 shadow-2xl animate-fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-200">AURA Studio Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-400">
            Have a project inquiry? Connect directly with our principal architectural advisor:
          </p>

          <div className="space-y-2 pt-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Direct Chat
            </a>

            <a
              href={phoneHref}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold transition-colors border border-neutral-700"
            >
              <Phone className="w-4 h-4" />
              Click to Call ({STUDIO_CONFIG.contact.phone})
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Direct Contact WhatsApp & Phone"
        className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-110 text-white shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
