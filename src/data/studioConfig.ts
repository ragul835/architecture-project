const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const STUDIO_CONFIG = {
  name: 'AURA Architecture Studio',
  shortName: 'AURA',
  legalName: null,
  siteUrl,
  locale: 'en_IN',
  language: 'en',
  description: 'Architecture, interior design, and exterior design for homes and selected commercial spaces in India.',
  serviceArea: {
    country: 'India', city: null, state: null,
    display: 'India — studio city and travel radius to be confirmed', verified: false,
  },
  contact: {
    phone: '+91 98200 55192', email: 'ragulsiva@zohomail.in', whatsappNumber: '919820055192',
    hours: 'Monday–Saturday, 9:30 AM–7:00 PM IST', address: null, googleMapsUrl: null,
  },
  credentials: {
    registrationNumber: null, memberships: [] as string[],
    note: 'Add verified registration number and memberships in studioConfig.ts before publishing them.',
  },
  offerings: {
    commercialArchitecture: false, approvalCoordination: true, siteSupervision: true,
    turnkeyInteriors: false, landscapeArchitecture: false, remoteConsultation: true,
    vastuSensitivePlanning: true,
  },
  social: { instagram: null, linkedin: null },
} as const;

export const SITE_URL = siteUrl;

export function whatsappUrl(message: string) {
  return `https://wa.me/${STUDIO_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
