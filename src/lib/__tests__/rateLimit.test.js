import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimit } from '../rateLimit';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key).ok).toBe(true);
    expect(rateLimit(key).ok).toBe(true);
  });

  it('blocks once the limit is exceeded', () => {
    const key = `test-${Math.random()}`;
    let last;
    for (let i = 0; i < 31; i++) last = rateLimit(key);
    expect(last.ok).toBe(false);
    expect(last.remaining).toBe(0);
  });

  it('decrements remaining on each hit', () => {
    const key = `test-${Math.random()}`;
    const first = rateLimit(key);
    const second = rateLimit(key);
    expect(second.remaining).toBe(first.remaining - 1);
  });
});