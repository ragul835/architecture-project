'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';
import { ThemeToggle } from './ThemeToggle';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'],
  ['/services/interior-design', 'Interiors'], ['/services/exterior-design', 'Exteriors'],
  ['/portfolio', 'Portfolio'],
] as const;

export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') || []);
    focusable[0]?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeys);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKeys); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-[color:var(--canvas)]/95 backdrop-blur-md">
      <div className="page-shell flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="focus-ring flex min-h-11 items-center gap-3" aria-label={`${STUDIO_CONFIG.name} home`}>
          <span className="grid h-10 w-10 place-items-center bg-[var(--charcoal)] font-display text-xl text-[#f4f0e8]">A</span>
          <span><b className="block font-display text-xl tracking-[0.18em]">{STUDIO_CONFIG.shortName}</b><span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">Architecture · Interior · Exterior</span></span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={`focus-ring py-3 text-xs font-semibold uppercase tracking-[0.12em] ${path === href ? 'text-[var(--clay)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="focus-ring hidden min-h-11 items-center whitespace-nowrap bg-[var(--clay)] px-5 text-sm font-bold text-white sm:inline-flex">Book consultation</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="focus-ring grid h-11 w-11 place-items-center xl:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t bg-[var(--canvas)] xl:hidden"><nav aria-label="Mobile navigation" className="page-shell flex flex-col py-6">{links.map(([href, label]) => <Link key={href} href={href} className="focus-ring flex min-h-12 items-center border-b text-base font-semibold">{label}</Link>)}<Link href="/contact" className="focus-ring mt-6 flex min-h-12 items-center justify-center bg-[var(--clay)] font-bold text-white">Book a design consultation</Link></nav></div>}
    </header>
  );
}
