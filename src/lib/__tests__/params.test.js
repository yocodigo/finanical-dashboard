import { describe, it, expect } from 'vitest';
import { parseBarsParams } from '../params';

const sp = (obj) => new URLSearchParams(obj);

describe('parseBarsParams', () => {
  it('parses and normalizes symbols', () => {
    const r = parseBarsParams(sp({ symbols: 'aapl, msft ', days: '30' }));
    expect(r.success).toBe(true);
    expect(r.data.symbols).toEqual(['AAPL', 'MSFT']);
    expect(r.data.days).toBe(30);
  });
  it('rejects garbage symbols', () => {
    const r = parseBarsParams(sp({ symbols: '!!!' }));
    expect(r.success).toBe(false);
  });
  it('caps days at 365', () => {
    const r = parseBarsParams(sp({ symbols: 'AAPL', days: '9999' }));
    expect(r.data.days).toBe(365);
  });
});