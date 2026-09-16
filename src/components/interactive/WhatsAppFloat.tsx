import { MessageCircle, Phone } from 'lucide-react';
import { STUDIO_CONFIG, whatsappUrl } from '@/data/studioConfig';

export function WhatsAppFloat() {
  return <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-sm border bg-[color:var(--surface)]/95 p-2 shadow-xl backdrop-blur sm:inset-x-auto sm:bottom-5 sm:right-5">
    <a href={`tel:${STUDIO_CONFIG.contact.phone.replace(/\s/g, '')}`} className="focus-ring flex min-h-11 flex-1 items-center justify-center gap-2 px-4 text-sm font-semibold sm:flex-none" aria-label="Call the studio"><Phone size={17} /> Call</a>
    <a href={whatsappUrl('Hello AURA, I would like to discuss an architecture, interior, or exterior design project.')} target="_blank" rel="noreferrer" className="focus-ring flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#256f4a] px-4 text-sm font-bold text-white sm:flex-none" aria-label="Contact the studio on WhatsApp"><MessageCircle size={18} /> WhatsApp</a>
  </div>;
}
