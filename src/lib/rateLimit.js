// Minimal fixed-window rate limiter. In-memory, per-process — fine for a
// small demo. For real scale, swap this for a shared store (e.g. Upstash
// Redis) so limits hold across serverless instances.
const hits = new Map();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 30; // per window, per key

export function rateLimit(key) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - entry.count };
}

// Best-effort client key from proxy headers. Falls back to a constant so
// the limiter still functions (globally) when no IP is available.
export function clientKey(request) {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0].trim() : null) || 'anonymous';
}