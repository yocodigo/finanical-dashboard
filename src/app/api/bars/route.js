import { NextResponse } from 'next/server';

const DATA_URL = 'https://data.alpaca.markets/v2/stocks/bars';

// Pull daily bars for the requested symbols and reshape them into a single
// time-ordered series suitable for charting.
export async function GET(request) {
  const keyId = process.env.ALPACA_KEY_ID;
  const secretKey = process.env.ALPACA_SECRET_KEY;

  if (!keyId || !secretKey) {
    return NextResponse.json(
      { error: 'Missing ALPACA_KEY_ID or ALPACA_SECRET_KEY in environment.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const symbols = (searchParams.get('symbols') || 'AAPL,MSFT,SPY')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 10);

  const days = Math.min(Number(searchParams.get('days')) || 90, 365);

  // Alpaca's free data feed is delayed, so end the window yesterday to avoid
  // requesting bars that do not exist yet.
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);

  const query = new URLSearchParams({
    symbols: symbols.join(','),
    timeframe: '1Day',
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    limit: '10000',
    adjustment: 'split',
    feed: 'iex',
  });

  try {
    const res = await fetch(`${DATA_URL}?${query}`, {
      headers: {
        'APCA-API-KEY-ID': keyId,
        'APCA-API-SECRET-KEY': secretKey,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `Alpaca returned ${res.status}`, detail: detail.slice(0, 500) },
        { status: res.status }
      );
    }

    const json = await res.json();
    const bars = json.bars || {};

    // Merge per-symbol bar arrays into rows keyed by date:
    //   [{ date: '2026-07-01', AAPL: 210.4, MSFT: 505.1 }, ...]
    const rows = new Map();
    for (const symbol of Object.keys(bars)) {
      for (const bar of bars[symbol]) {
        const date = bar.t.slice(0, 10);
        if (!rows.has(date)) rows.set(date, { date });
        rows.get(date)[symbol] = bar.c;
      }
    }

    const series = Array.from(rows.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    // Latest close and period change per symbol, for the summary cards.
    const summary = symbols
      .filter((s) => bars[s]?.length)
      .map((symbol) => {
        const symbolBars = bars[symbol];
        const first = symbolBars[0].c;
        const last = symbolBars[symbolBars.length - 1].c;
        return {
          symbol,
          last,
          change: last - first,
          changePct: first ? ((last - first) / first) * 100 : 0,
          bars: symbolBars.length,
        };
      });

    return NextResponse.json({
      symbols: summary.map((s) => s.symbol),
      summary,
      series,
      window: { start: query.get('start'), end: query.get('end') },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Request to Alpaca failed', detail: String(err) },
      { status: 502 }
    );
  }
}
