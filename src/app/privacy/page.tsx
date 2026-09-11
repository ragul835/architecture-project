import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-neutral-800 dark:text-neutral-200">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Return to Home
      </Link>

      <div className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <span className="text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Legal & Compliance
        </span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: August 11, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">1. Information Collection</h2>
          <p>
            {STUDIO_CONFIG.name} (&quot;AURA&quot;) collects the information you voluntarily submit through the project inquiry form, including your name, email address, phone number, and project brief. The cost estimator runs in your browser and does not submit its selections unless you choose to include them in an inquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">2. Use of Information</h2>
          <p>
            We use inquiry information to evaluate project briefs, respond to prospective clients, and arrange consultations. Form submissions are delivered through the studio&apos;s configured contact-service provider. We do not sell or rent personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">3. Cookies, Analytics & Local Storage</h2>
          <p>
            This website does not set cookies and does not currently use advertising or analytics trackers. It stores only your light or dark theme preference in your browser&apos;s local storage. That preference stays on your device, is not transmitted to AURA, and can be removed through your browser settings. If tracking technology is introduced later, this policy and any legally required consent controls will be updated before it is enabled.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">4. Retention & Your Choices</h2>
          <p>
            Inquiry records are retained only as long as reasonably necessary to respond, manage a potential engagement, and meet applicable legal obligations. You may request access, correction, or deletion by contacting the studio.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">5. Privacy Contact</h2>
          <p>
            For privacy questions or data requests, email{' '}
            <a className="text-amber-600 dark:text-amber-400 hover:underline" href={`mailto:${STUDIO_CONFIG.contact.email}`}>
              {STUDIO_CONFIG.contact.email}
            </a>{' '}
            or write to {STUDIO_CONFIG.contact.address}.
          </p>
        </section>
      </div>
    </div>
  );
}
