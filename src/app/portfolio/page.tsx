import type { Metadata } from 'next';
import { ProjectFilter } from '@/components/portfolio/ProjectFilter';

export const metadata: Metadata = { title: 'Portfolio & Design Studies', description: 'Browse architecture, interior, exterior, and renovation studies with honest project status and image classification.', alternates: { canonical: '/portfolio' } };
export default function PortfolioPage() { return <><header className="section-space border-b bg-[var(--surface)]"><div className="page-shell"><p className="eyebrow">Portfolio</p><h1 className="display-title mt-5">Projects and design studies.</h1><p className="body-copy mt-6 max-w-3xl">Every entry identifies its status. The current collection is concept work using local visualisations; no image is represented as completed client work.</p></div></header><section className="section-space"><div className="page-shell"><ProjectFilter /></div></section></>; }
