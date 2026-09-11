'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title = 'Gallery Image',
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      {/* Top Header Controls */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20 text-white">
        <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
          {title} ({currentIndex + 1} / {images.length})
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-amber-500 hover:text-neutral-950 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Large Image */}
      <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
        />
      </div>

      {/* Left / Right Nav Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 border border-neutral-700 hover:bg-amber-500 hover:text-neutral-950 text-white transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 border border-neutral-700 hover:bg-amber-500 hover:text-neutral-950 text-white transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
