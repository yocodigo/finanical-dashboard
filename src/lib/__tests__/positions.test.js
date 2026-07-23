import { describe, it, expect } from 'vitest';
import { mapPositions } from '../positions';

const rawPosition = {
  symbol: 'AAPL',
  qty: '5',
  side: 'long',
  market_value: '600.0',
  cost_basis: '500.0',
  unrealized_pl: '100.0',
  unrealized_plpc: '0.20',
  current_price: '120.0',
};

describe('mapPositions', () => {
  it('coerces string fields to numbers', () => {
    const [p] = mapPositions([rawPosition]);
    expect(p.qty).toBe(5);
    expect(p.marketValue).toBe(600);
    expect(p.costBasis).toBe(500);
    expect(p.currentPrice).toBe(120);
  });

  it('converts unrealized_plpc to a percentage', () => {
    const [p] = mapPositions([rawPosition]);
    expect(p.unrealizedPlPct).toBeCloseTo(20);
  });

  it('preserves symbol and side', () => {
    const [p] = mapPositions([rawPosition]);
    expect(p.symbol).toBe('AAPL');
    expect(p.side).toBe('long');
  });

  it('returns empty array for non-array input', () => {
    expect(mapPositions(null)).toEqual([]);
  });
});