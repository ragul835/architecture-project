'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, ArrowRight, CheckCircle, RefreshCw, Sparkles, Building, Home, Hammer, Palette } from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'residential', title: 'Luxury Residential Villa', icon: Home, baseRate: 3500 },
  { id: 'commercial', title: 'Commercial & Skyscraper', icon: Building, baseRate: 4200 },
  { id: 'renovation', title: 'Heritage & Renovation', icon: Hammer, baseRate: 2800 },
  { id: 'interior', title: 'High-End Interior Architecture', icon: Palette, baseRate: 2200 },
];

const AREA_RANGES = [
  { id: 'small', label: '2,000 – 4,000 sq ft', multiplier: 3000 },
  { id: 'medium', label: '4,000 – 8,000 sq ft', multiplier: 6000 },
  { id: 'large', label: '8,000 – 15,000 sq ft', multiplier: 11000 },
  { id: 'landmark', label: '15,000+ sq ft (Estate/Tower)', multiplier: 22000 },
];

const FINISH_LEVELS = [
  { id: 'executive', label: 'Executive Contemporary', desc: 'High-quality Indian stone, insulated glass, standard solar thermal', factor: 1.0 },
  { id: 'luxury', label: 'Ultra Luxury Bespoke', desc: 'Italian Marble, Teak Joinery, Smart Home Automation & IGBC Gold', factor: 1.4 },
  { id: 'artisan', label: 'Artisan & Vastu Harmonized', desc: 'Net-zero passive energy, Kota/Jaisalmer stone, bespoke bronze details', factor: 1.8 },
];

export function CostEstimator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedArea, setSelectedArea] = useState(AREA_RANGES[1]);
  const [selectedFinish, setSelectedFinish] = useState(FINISH_LEVELS[1]);

  const formatIndianCurrency = (amountInRupees: number) => {
    if (amountInRupees >= 10000000) {
      const crores = (amountInRupees / 10000000).toFixed(2);
      return `₹${crores} Cr`;
    } else {
      const lakhs = (amountInRupees / 100000).toFixed(1);
      return `₹${lakhs} Lakhs`;
    }
  };

  const calculateEstimate = () => {
    const minCost = Math.round(selectedArea.multiplier * selectedType.baseRate * selectedFinish.factor * 0.85);
    const maxCost = Math.round(selectedArea.multiplier * selectedType.baseRate * selectedFinish.factor * 1.25);
    const estMonths = Math.max(6, Math.round((selectedArea.multiplier / 600) * selectedFinish.factor));

    return {
      minFormatted: formatIndianCurrency(minCost),
      maxFormatted: formatIndianCurrency(maxCost),
      timelineMonths: estMonths,
    };
  };

  const estimate = calculateEstimate();

  const handleProceedToContact = () => {
    router.push(
      `/contact?type=${encodeURIComponent(selectedType.title)}&area=${encodeURIComponent(
        selectedArea.label
      )}&budget=${encodeURIComponent(`${estimate.minFormatted} - ${estimate.maxFormatted}`)}`
    );
  };

  return (
    <div className="bg-neutral-900 text-neutral-100 rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">Project Scope & Budget Estimator (India)</h3>
            <p className="text-xs text-neutral-400">Calculate preliminary architectural investment in Indian Rupees (INR)</p>
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
          Step {step} of 3
        </span>
      </div>

      {/* Step 1: Project Type */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">1. Select Project Category</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType.id === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/5'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-base">{type.title}</h5>
                    <p className="text-xs text-neutral-400 mt-1">From ~₹{type.baseRate.toLocaleString('en-IN')}/sq ft design threshold</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold text-sm transition-colors"
            >
              Continue to Area Size
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Area Range */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">2. Estimated Built-Up Area (Sq Ft)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AREA_RANGES.map((area) => {
              const isSelected = selectedArea.id === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <span className="font-bold text-base block">{area.label}</span>
                  <span className="text-xs text-neutral-400 mt-1 block">Approx scale threshold</span>
                </button>
              );
            })}
          </div>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-white"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold text-sm transition-colors"
            >
              Select Finish Level
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Finish Level & Results */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">3. Architectural Finish Specification</h4>
          <div className="grid grid-cols-1 gap-3">
            {FINISH_LEVELS.map((finish) => {
              const isSelected = selectedFinish.id === finish.id;
              return (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950/60 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{finish.label}</span>
                    <span className="text-xs text-neutral-400">{finish.desc}</span>
                  </div>
                  {isSelected && <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Result Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Estimated Investment Range (INR)
              </span>
              <span className="text-xs text-neutral-400">Est. Duration: {estimate.timelineMonths} Months</span>
            </div>

            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {estimate.minFormatted} – {estimate.maxFormatted} <span className="text-xs text-neutral-400 font-sans font-normal">INR</span>
            </div>

            <p className="text-xs text-neutral-400">
              Includes CoA architectural drawings, structural engineering, 3D renders, local municipal approvals, and site supervision.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Recalculate Estimate
            </button>

            <button
              onClick={handleProceedToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-lg"
            >
              Consult Studio With This Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
