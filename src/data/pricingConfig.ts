export const PRICING_CONFIG = {
  version: 'demo-2026-09',
  verified: false,
  disclaimer: 'Demonstration planning range only. It is not a quotation, fee proposal, or statement of current market rates. A tailored estimate requires a brief, site information, and confirmed deliverables.',
  services: {
    architecture: { label: 'Architecture', minPerSqFt: 120, maxPerSqFt: 260, months: [3, 8] },
    interior: { label: 'Interior design', minPerSqFt: 900, maxPerSqFt: 2600, months: [2, 7] },
    exterior: { label: 'Exterior design', minPerSqFt: 180, maxPerSqFt: 650, months: [1, 4] },
    complete: { label: 'Architecture + interior + exterior', minPerSqFt: 1200, maxPerSqFt: 3300, months: [5, 12] },
  },
  projectFactors: { new: 1, renovation: 1.18 },
  cityFactors: { tier1: 1.12, tier2: 1, other: 0.94 },
  finishFactors: { practical: 0.85, refined: 1, bespoke: 1.35 },
  supervisionFactor: 1.1,
  minimumAreaSqFt: 300,
  maximumAreaSqFt: 100000,
} as const;

export type EstimatorService = keyof typeof PRICING_CONFIG.services;
