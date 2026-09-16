import type { Metadata } from 'next';
import { CostEstimator } from '@/components/interactive/CostEstimator';

export const metadata: Metadata = { title: 'Indicative Project Cost Estimator', description: 'Build an indicative architecture, interior, exterior, or complete-property planning range in Indian rupees.', alternates: { canonical: '/cost-estimator' } };
export default function CostEstimatorPage() { return <><header className="section-space border-b bg-[var(--surface)]"><div className="page-shell"><p className="eyebrow">Cost estimator</p><h1 className="display-title mt-5 max-w-4xl">An early planning range, not a quotation.</h1><p className="body-copy mt-6 max-w-3xl">Use the controls to make scope assumptions visible. The values live in one documented configuration file and are currently demonstration defaults awaiting client verification.</p></div></header><section className="section-space"><div className="page-shell"><CostEstimator /></div></section></>; }
