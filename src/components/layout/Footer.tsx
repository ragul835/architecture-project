import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';

export function Footer() {
  return <footer className="bg-[var(--charcoal)] py-14 text-[#f4f0e8]">
    <div className="page-shell grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2"><p className="font-display text-3xl">{STUDIO_CONFIG.name}</p><p className="mt-4 max-w-xl text-sm leading-6 text-stone-300">{STUDIO_CONFIG.description} Current portfolio imagery is labelled as concept work until authentic client photography is supplied.</p></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sand)]">Explore</p><ul className="space-y-3 text-sm"><li><Link href="/services">Services</Link></li><li><Link href="/portfolio">Portfolio</Link></li><li><Link href="/process">Process</Link></li><li><Link href="/cost-estimator">Cost estimator</Link></li></ul></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sand)]">Contact</p><ul className="space-y-3 text-sm"><li><a className="flex items-center gap-2" href={`tel:${STUDIO_CONFIG.contact.phone.replace(/\s/g, '')}`}><Phone size={16} />{STUDIO_CONFIG.contact.phone}</a></li><li><a className="flex items-center gap-2 break-all" href={`mailto:${STUDIO_CONFIG.contact.email}`}><Mail size={16} />{STUDIO_CONFIG.contact.email}</a></li><li className="text-stone-300">{STUDIO_CONFIG.contact.hours}</li></ul></div>
    </div>
    <div className="page-shell mt-10 flex flex-col gap-4 border-t border-stone-700 pt-6 text-xs text-stone-400 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} {STUDIO_CONFIG.name}</p><div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
  </footer>;
}
