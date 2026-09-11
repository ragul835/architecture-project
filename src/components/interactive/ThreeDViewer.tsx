'use client';

import React, { useState } from 'react';
import { Hotspot } from '@/lib/types';
import { RotateCw, Sun, Moon, Sunset, Info } from 'lucide-react';

interface ThreeDViewerProps {
  coverImage: string;
  galleryImages: string[];
  hotspots?: Hotspot[];
  title?: string;
}

type LightMode = 'day' | 'sunset' | 'night';

export function ThreeDViewer({ coverImage, galleryImages, hotspots = [], title = 'Architectural Model' }: ThreeDViewerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightMode, setLightMode] = useState<LightMode>('day');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const images = galleryImages.length > 0 ? galleryImages : [coverImage];

  const handleNextAngle = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const getLightingOverlay = () => {
    switch (lightMode) {
      case 'sunset':
        return 'bg-gradient-to-t from-amber-900/30 via-orange-900/10 to-transparent mix-blend-color-burn';
      case 'night':
        return 'bg-gradient-to-t from-slate-950/70 via-blue-950/40 to-slate-950/30 mix-blend-multiply';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white shadow-2xl">
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-neutral-700/60 text-xs font-medium text-amber-400 flex items-center gap-2 pointer-events-auto">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 3D / 360° Studio Tour</span>
        </div>

        {/* Lighting Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-md p-1 rounded-full border border-neutral-700/60 pointer-events-auto">
          <button
            onClick={() => setLightMode('day')}
            className={`p-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
              lightMode === 'day' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
            title="Daylight Mode"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLightMode('sunset')}
            className={`p-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
              lightMode === 'sunset' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
            title="Sunset Golden Hour"
          >
            <Sunset className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLightMode('night')}
            className={`p-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
              lightMode === 'night' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
            title="Night Illumination"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Render Image Canvas */}
      <div className="relative h-[420px] sm:h-[520px] w-full overflow-hidden flex items-center justify-center bg-neutral-950">
        <img
          src={images[activeImageIndex]}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out"
        />

        {/* Dynamic Light Overlay */}
        <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${getLightingOverlay()}`} />

        {/* Interactive Hotspots */}
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group"
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-neutral-950 items-center justify-center font-bold text-[10px] shadow-lg border border-white">
                +
              </span>
            </span>

            {/* Tooltip / Hotspot Info Card */}
            {activeHotspot?.id === hs.id && (
              <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 bg-neutral-900/95 backdrop-blur-md text-neutral-100 p-3.5 rounded-xl border border-amber-500/40 shadow-2xl text-left animate-fade-in pointer-events-auto">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>{hs.title}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{hs.description}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Angle Controls */}
      <div className="p-4 bg-neutral-950/90 border-t border-neutral-800 flex items-center justify-between">
        <div className="text-xs text-neutral-400 flex items-center gap-2">
          <span>Angle {activeImageIndex + 1} of {images.length}</span>
          <span className="text-neutral-600">•</span>
          <span className="capitalize">{lightMode} Lighting Mode</span>
        </div>

        <button
          onClick={handleNextAngle}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          Rotate View Angle
        </button>
      </div>
    </div>
  );
}
