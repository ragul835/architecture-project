import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <article className="group surface-card overflow-hidden">
    <Link href={`/portfolio/${project.slug}`} className="focus-ring block">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
        <Image src={project.coverImage.src} alt={project.coverImage.alt} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.02]" />
        <span className="absolute left-3 top-3 bg-[var(--charcoal)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f4f0e8]">Concept visualisation</span>
      </div>
      <div className="p-5 sm:p-6"><div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider text-[var(--clay)]"><span>{project.categories.join(' · ')}</span><span>•</span><span>{project.status}</span></div><h3 className="mt-3 font-display text-2xl">{project.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{project.summary}</p><div className="mt-5 flex items-center justify-between border-t pt-4 text-sm"><span>{project.propertyType}</span><span className="flex items-center gap-1 font-bold">View case study <ArrowUpRight size={16} /></span></div></div>
    </Link>
  </article>;
}
