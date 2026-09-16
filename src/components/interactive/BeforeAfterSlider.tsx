'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BeforeAfterData } from '@/lib/types';

export function BeforeAfterSlider({ data }: { data: BeforeAfterData }) {
  const [position, setPosition] = useState(50);
  return <figure><div className="relative aspect-[4/3] overflow-hidden bg-stone-800"><Image src={data.afterImage.src} alt={data.afterImage.alt} fill sizes="(max-width:1280px) 100vw, 1200px" className="object-cover" /><div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src={data.beforeImage.src} alt={data.beforeImage.alt} fill sizes="(max-width:1280px) 100vw, 1200px" className="object-cover" /></div><span className="absolute left-3 top-3 bg-[var(--charcoal)] px-3 py-2 text-xs text-white">{data.beforeLabel || 'Before'}</span><span className="absolute right-3 top-3 bg-[var(--charcoal)] px-3 py-2 text-xs text-white">{data.afterLabel || 'After'}</span><div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${position}%` }} /></div><label htmlFor="comparison" className="mt-4 block text-sm font-bold">Compare before and proposed design</label><input id="comparison" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} className="mt-2 h-11 w-full accent-[var(--clay)]" aria-valuetext={`${position}% before image visible`} /><figcaption className="text-xs text-[var(--muted)]">Both visuals are placeholders/concept imagery, not evidence of a completed client transformation.</figcaption></figure>;
}
