'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Info } from 'lucide-react';
import { PRICING_CONFIG, type EstimatorService } from '@/data/pricingConfig';
import { formatIndianCurrency } from '@/lib/format';

type Stage = keyof typeof PRICING_CONFIG.projectFactors;
type CityTier = keyof typeof PRICING_CONFIG.cityFactors;
type Finish = keyof typeof PRICING_CONFIG.finishFactors;

export function CostEstimator() {
  const router = useRouter();
  const [service, setService] = useState<EstimatorService>('complete');
  const [stage, setStage] = useState<Stage>('new');
  const [area, setArea] = useState(2000);
  const [cityTier, setCityTier] = useState<CityTier>('tier2');
  const [finish, setFinish] = useState<Finish>('refined');
  const [supervision, setSupervision] = useState(false);
  const estimate = useMemo(() => {
    const rate = PRICING_CONFIG.services[service];
    const factor = PRICING_CONFIG.projectFactors[stage] * PRICING_CONFIG.cityFactors[cityTier] * PRICING_CONFIG.finishFactors[finish] * (supervision ? PRICING_CONFIG.supervisionFactor : 1);
    return { min: Math.round(area * rate.minPerSqFt * factor), max: Math.round(area * rate.maxPerSqFt * factor), months: rate.months };
  }, [service, stage, area, cityTier, finish, supervision]);
  const sendToInquiry = () => {
    const params = new URLSearchParams({ service, stage, area: String(area), budget: `${formatIndianCurrency(estimate.min)} – ${formatIndianCurrency(estimate.max)}`, scope: `${PRICING_CONFIG.services[service].label}; ${finish} finish; ${cityTier}; site supervision: ${supervision ? 'included' : 'not selected'}` });
    router.push(`/contact?${params.toString()}`);
  };
  const fieldClass = 'mt-2 min-h-12 w-full border bg-[var(--canvas)] px-3 text-base';
  return <div className="surface-card overflow-hidden"><div className="grid gap-0 lg:grid-cols-[1fr_.8fr]"><form className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8" onSubmit={(event) => event.preventDefault()}><label className="text-sm font-bold">Service scope<select value={service} onChange={(event) => setService(event.target.value as EstimatorService)} className={fieldClass}>{Object.entries(PRICING_CONFIG.services).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></label><label className="text-sm font-bold">Project stage<select value={stage} onChange={(event) => setStage(event.target.value as Stage)} className={fieldClass}><option value="new">New construction</option><option value="renovation">Renovation / existing property</option></select></label><label className="text-sm font-bold">Built-up / design area (sq ft)<input type="number" inputMode="numeric" min={PRICING_CONFIG.minimumAreaSqFt} max={PRICING_CONFIG.maximumAreaSqFt} step="50" value={area} onChange={(event) => setArea(Math.min(PRICING_CONFIG.maximumAreaSqFt, Math.max(PRICING_CONFIG.minimumAreaSqFt, Number(event.target.value))))} className={fieldClass} /><span className="mt-1 block text-xs font-normal text-[var(--muted)]">Approx. {(area * 0.092903).toFixed(0)} m²</span></label><label className="text-sm font-bold">Location factor<select value={cityTier} onChange={(event) => setCityTier(event.target.value as CityTier)} className={fieldClass}><option value="tier1">Tier 1 / major metro</option><option value="tier2">Tier 2 / regional city</option><option value="other">Other location</option></select></label><label className="text-sm font-bold">Finish direction<select value={finish} onChange={(event) => setFinish(event.target.value as Finish)} className={fieldClass}><option value="practical">Practical</option><option value="refined">Refined</option><option value="bespoke">Bespoke</option></select></label><label className="flex min-h-12 items-center gap-3 self-end border p-3 text-sm font-bold"><input type="checkbox" checked={supervision} onChange={(event) => setSupervision(event.target.checked)} className="h-5 w-5 accent-[var(--clay)]" />Include execution/site-supervision allowance</label></form><aside className="bg-[var(--charcoal)] p-6 text-[#f4f0e8] sm:p-8" aria-live="polite"><Calculator className="text-[#e4b481]" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#e4b481]">Indicative demonstration range</p><p className="mt-3 font-display text-3xl sm:text-4xl">{formatIndianCurrency(estimate.min)} – {formatIndianCurrency(estimate.max)}</p><p className="mt-3 text-sm text-stone-300">Estimated design timeline: {estimate.months[0]}–{estimate.months[1]} months</p><div className="mt-6 border-t border-stone-700 pt-5 text-sm leading-6 text-stone-300"><p><b className="text-white">Assumes:</b> stated area, selected finish, normal design iterations, and standard access.</p><p className="mt-3"><b className="text-white">May include:</b> agreed design drawings, visualisation, schedules, and coordination defined in the proposal.</p><p className="mt-3"><b className="text-white">Excludes:</b> taxes, statutory fees, consultant fees, land, finance, abnormal site conditions, and construction unless explicitly included.</p></div><div className="mt-6 flex gap-2 bg-amber-100/10 p-3 text-xs leading-5 text-amber-100"><Info className="shrink-0" size={17} />{PRICING_CONFIG.disclaimer}</div><button type="button" onClick={sendToInquiry} className="focus-ring mt-6 min-h-12 w-full bg-[var(--clay)] px-5 font-bold text-white">Send this scope with an inquiry</button></aside></div></div>;
}
