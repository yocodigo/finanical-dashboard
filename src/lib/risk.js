// Population standard deviation — used as a simple volatility proxy on returns.
export function stddev(values) {
  const n = values.length;
  if (n === 0) return 0;
  const mean = values.reduce((s, x) => s + x, 0) / n;
  const variance =
    values.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
}

// Position weights and the single largest holding, from market values.
// Surfaces concentration risk — a property of the portfolio, not advice.
export function concentration(positions) {
  const total = positions.reduce((s, p) => s + p.marketValue, 0);
  if (total === 0) return { weights: {}, top: null };

  const weights = {};
  let top = null;
  for (const p of positions) {
    const w = p.marketValue / total;
    weights[p.symbol] = w;
    if (!top || w > top.weight) top = { symbol: p.symbol, weight: w };
  }
  return { weights, top };
}