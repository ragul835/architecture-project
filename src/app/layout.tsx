import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/interactive/WhatsAppFloat';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AURA Architecture & Urban Studio | Luxury Residential & Commercial Architects',
  description:
    'Award-winning architecture studio specializing in high-end luxury villas, sustainable commercial skyscrapers, adaptive renovation lofts, and biophilic interior spaces.',
  keywords: [
    'Architecture Studio',
    'Luxury Villas',
    'Commercial Skyscraper',
    'Adaptive Reuse',
    'Interior Architecture',
    'AIA Architects',
    'Sustainable Building',
  ],
  authors: [{ name: 'AURA Architecture Studio' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'AURA Architecture & Urban Studio',
    description: 'Award-winning architecture studio crafting sustainable luxury residences and commercial landmarks.',
    type: 'website',
    images: ['/images/hero_main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA Architecture & Urban Studio',
    description: 'Sustainable luxury residences and commercial landmarks.',
    images: ['/images/hero_main.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-neutral-950">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
