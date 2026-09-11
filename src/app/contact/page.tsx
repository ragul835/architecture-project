'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, Compass } from 'lucide-react';
import { STUDIO_CONFIG } from '@/data/studioConfig';

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Luxury Residential Villa',
    estimatedBudget: '₹1 Cr – ₹3 Cr',
    timeline: '6–12 Months',
    message: '',
    website: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const preType = searchParams.get('type');
    const preBudget = searchParams.get('budget');
    if (preType || preBudget) {
      setFormData((prev) => ({
        ...prev,
        projectType: preType || prev.projectType,
        estimatedBudget: preBudget || prev.estimatedBudget,
        message: `Inquiry regarding estimated project: ${preType || 'Custom Project'} with budget range ${preBudget || 'TBD'}.`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.message || data.error || 'Failed to submit form');
      } else {
        setStatus('success');
        setTicketId(data.ticketId);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error occurred. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-200 space-y-3 animate-fade-in">
        <div className="flex items-center gap-2 font-bold text-base text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
          Inquiry Dispatched Successfully!
        </div>
        <p className="text-xs leading-relaxed">
          Thank you, <strong>{formData.fullName}</strong>. Your project brief has been logged in our studio repository under reference code:
        </p>
        <div className="p-3 bg-neutral-950 font-mono text-amber-400 text-sm font-bold rounded-lg tracking-wider">
          Reference Ticket: {ticketId}
        </div>
        <p className="text-xs text-emerald-300">
          Our principal design director will review your details and contact you within 24 business hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Full Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Your Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Email Address *</label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Phone Number *</label>
          <input
            type="tel"
            required
            placeholder="+91 98200 55192"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Project Category</label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 shadow-sm"
          >
            <option>Luxury Residential Villa</option>
            <option>Commercial & Skyscraper</option>
            <option>Heritage & Renovation</option>
            <option>Interior Architecture</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Project Brief & Plot Location in India *</label>
        <textarea
          required
          rows={4}
          placeholder="Describe your site location (e.g. Alibaug, Goa, BKC, Bengaluru), plot dimensions, timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting Brief...' : 'Dispatch Project Brief'}
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Page Hero Header */}
      <section className="relative bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Direct Studio Inquiry
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-neutral-100">
            Contact Our Architects
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light">
            Discuss your plot location, project scope, or schedule a private consultation at our studio or via video conference.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Form Container */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900/80 p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Send Project Brief
              </h2>
              <p className="text-xs text-neutral-500">
                Direct studio response within 24 business hours.
              </p>
            </div>

            <Suspense fallback={<div className="text-xs text-neutral-400 p-4">Loading contact form...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Contact Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-amber-400">Studio Headquarters</h3>
              
              <ul className="space-y-4 text-xs text-neutral-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-sm">Main Office</strong>
                    {STUDIO_CONFIG.contact.address}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">Direct Phone / WhatsApp</strong>
                    <a href={`tel:${STUDIO_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400 transition-colors">{STUDIO_CONFIG.contact.phone}</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">Inquiry Email</strong>
                    <a href={`mailto:${STUDIO_CONFIG.contact.email}`} className="hover:text-amber-400 transition-colors">{STUDIO_CONFIG.contact.email}</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">Studio Hours</strong>
                    {STUDIO_CONFIG.contact.hours}
                  </div>
                </li>
              </ul>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.contact.whatsappNumber}?text=Hello%20AURA%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Instant WhatsApp Consultation
                </a>
              </div>
            </div>

            {/* Map Card */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 h-64 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                alt="Studio Map"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">Studio Location</span>
                  <span className="font-serif font-bold text-sm">Bandra West, Mumbai</span>
                </div>
                <a
                  href={STUDIO_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[11px] uppercase tracking-wider"
                >
                  Open Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
