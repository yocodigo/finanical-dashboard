// Map Alpaca's /v2/positions response (all fields are strings) into the
// numeric camelCase shape the rest of the app uses.
export function mapPositions(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((p) => ({
    symbol: p.symbol,
    qty: Number(p.qty),
    side: p.side,
    marketValue: Number(p.market_value),
    costBasis: Number(p.cost_basis),
    unrealizedPl: Number(p.unrealized_pl),
    unrealizedPlPct: Number(p.unrealized_plpc) * 100,
    currentPrice: Number(p.current_price),
  }));
}