import { describe, it, expect } from 'vitest';
import { stddev, concentration } from '../risk';

describe('stddev', () => {
  it('is zero for constant series', () => {
    expect(stddev([5, 5, 5])).toBeCloseTo(0);
  });
  it('computes population standard deviation', () => {
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2);
  });
});

describe('concentration', () => {
  it('computes each position weight from market values', () => {
    const result = concentration([
      { symbol: 'AAPL', marketValue: 6000 },
      { symbol: 'MSFT', marketValue: 4000 },
    ]);
    expect(result.weights.AAPL).toBeCloseTo(0.6);
    expect(result.weights.MSFT).toBeCloseTo(0.4);
  });
  it('reports the largest position as top concentration', () => {
    const result = concentration([
      { symbol: 'AAPL', marketValue: 6000 },
      { symbol: 'MSFT', marketValue: 4000 },
    ]);
    expect(result.top).toEqual({ symbol: 'AAPL', weight: 0.6 });
  });
  it('handles an empty portfolio', () => {
    expect(concentration([])).toEqual({ weights: {}, top: null });
  });
});