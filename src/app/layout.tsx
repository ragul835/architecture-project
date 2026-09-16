import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/interactive/WhatsAppFloat';
import { SITE_URL, STUDIO_CONFIG } from '@/data/studioConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'AURA | Architecture, Interior & Exterior Design in India', template: '%s | AURA' },
  description: STUDIO_CONFIG.description,
  applicationName: STUDIO_CONFIG.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_IN', siteName: STUDIO_CONFIG.name, title: 'Architecture, interiors, and exteriors—designed as one property', description: STUDIO_CONFIG.description, images: [{ url: '/images/indian_hero.png', width: 1200, height: 630, alt: 'AURA concept visualisation of a contemporary Indian home' }] },
  twitter: { card: 'summary_large_image', title: 'AURA Architecture Studio', description: STUDIO_CONFIG.description, images: ['/images/indian_hero.png'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f0e8' };

const themeInitializer = `
  (function () {
    var theme = 'light';
    try {
      var stored = window.localStorage.getItem('aura-theme');
      if (stored === 'light' || stored === 'dark') {
        theme = stored;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      }
    } catch (error) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
    }
    var root = document.documentElement;
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#181916' : '#f4f0e8');
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const professionalService = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: STUDIO_CONFIG.name,
    url: SITE_URL, description: STUDIO_CONFIG.description,
    areaServed: { '@type': 'Country', name: 'India' },
    telephone: STUDIO_CONFIG.contact.phone, email: STUDIO_CONFIG.contact.email,
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className="min-h-screen pb-20 antialiased sm:pb-0">
        <ThemeProvider>
          <a href="#main-content" className="fixed left-3 top-3 z-[100] -translate-y-24 bg-[var(--ink)] px-4 py-3 text-sm text-[var(--canvas)] focus:translate-y-0">Skip to content</a>
          <Navbar />
          <main id="main-content" className="min-h-screen pt-[72px]">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
