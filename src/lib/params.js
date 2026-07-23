import { z } from 'zod';

const schema = z.object({
  symbols: z
    .string()
    .transform((s) =>
      s.split(',').map((x) => x.trim().toUpperCase()).filter(Boolean).slice(0, 10)
    )
    .refine((arr) => arr.length > 0, 'At least one symbol is required')
    .refine(
      (arr) => arr.every((s) => /^[A-Z.]{1,6}$/.test(s)),
      'Invalid symbol format'
    ),
  days: z
    .preprocess((v) => {
      const n = Number(v);
      if (!Number.isFinite(n)) return 90;
      return Math.min(Math.max(Math.trunc(n), 1), 365);
    }, z.number().int().min(1).max(365)),
});

export function parseBarsParams(searchParams) {
  return schema.safeParse({
    symbols: searchParams.get('symbols') || 'AAPL,MSFT,SPY',
    days: searchParams.get('days') || 90,
  });
}