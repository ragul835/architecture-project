export function formatIndianCurrency(amount: number) {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(amount >= 100_000_000 ? 1 : 2)} crore`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(1)} lakh`;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function formatArea(sqFt?: number) {
  if (!sqFt) return 'Area to be confirmed';
  return `${new Intl.NumberFormat('en-IN').format(sqFt)} sq ft (${(sqFt * 0.092903).toFixed(0)} m²)`;
}
