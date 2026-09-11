'use client';

import React, { useState, useRef, useCallback } from 'react';
import { BeforeAfterData } from '@/lib/types';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  data: BeforeAfterData;
  className?: string;
}

export function BeforeAfterSlider({ data, className = '' }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-neutral-200 dark:border-neutral-800"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={onMouseMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
        onTouchMove={onTouchMove}
      >
        {/* AFTER Image (Full Background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.afterImage})` }}
        />

        {/* AFTER Label */}
        <span className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          {data.afterLabel || 'After Completion'}
        </span>

        {/* BEFORE Image (Clipped Left Portion) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-none"
          style={{
            backgroundImage: `url(${data.beforeImage})`,
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        />

        {/* BEFORE Label */}
        <span className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md text-neutral-200 border border-neutral-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          {data.beforeLabel || 'Before Renovation'}
        </span>

        {/* Vertical Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_12px_rgba(223,193,142,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Drag Knob */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-2xl border-2 border-white dark:border-neutral-900 pointer-events-auto">
            <MoveHorizontal className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 italic">
        Drag or swipe the center handle to compare the renovation transformation.
      </p>
    </div>
  );
}
