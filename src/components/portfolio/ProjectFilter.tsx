'use client';

import { useMemo, useState } from 'react';
import { PROJECTS_DATA, PROJECT_FILTERS } from '@/data/projectsData';
import { ProjectCard } from './ProjectCard';

export function ProjectFilter() {
  const [category, setCategory] = useState<(typeof PROJECT_FILTERS)[number]>('All');
  const [status, setStatus] = useState('all');
  const [location, setLocation] = useState('all');
  const locations = Array.from(new Set(PROJECTS_DATA.map((project) => project.state)));
  const projects = useMemo(() => PROJECTS_DATA.filter((project) => {
    const categoryMatch = category === 'All' || (category === 'Residential' ? !project.categories.includes('Commercial') : project.categories.includes(category));
    return categoryMatch && (status === 'all' || project.status === status) && (location === 'all' || project.state === location);
  }), [category, status, location]);

  return <div><div className="surface-card grid gap-4 p-4 sm:grid-cols-3" aria-label="Portfolio filters"><label className="text-sm font-bold">Discipline<select value={category} onChange={(event) => setCategory(event.target.value as (typeof PROJECT_FILTERS)[number])} className="mt-2 min-h-12 w-full border bg-[var(--canvas)] px-3 font-normal">{PROJECT_FILTERS.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-bold">Project status<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 min-h-12 w-full border bg-[var(--canvas)] px-3 font-normal"><option value="all">All statuses</option><option value="completed">Completed</option><option value="ongoing">Ongoing</option><option value="concept">Concept</option><option value="confidential">Confidential</option></select></label><label className="text-sm font-bold">Location<select value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 min-h-12 w-full border bg-[var(--canvas)] px-3 font-normal"><option value="all">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label></div><p className="my-6 text-sm text-[var(--muted)]" aria-live="polite">Showing {projects.length} of {PROJECTS_DATA.length} studies.</p>{projects.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="surface-card p-10 text-center"><h2 className="font-display text-2xl">No matching studies</h2><button type="button" onClick={() => { setCategory('All'); setStatus('all'); setLocation('all'); }} className="focus-ring mt-4 min-h-11 font-bold text-[var(--clay)]">Reset filters</button></div>}</div>;
}
