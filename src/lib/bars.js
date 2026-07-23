// Merge per-symbol bar arrays into date-keyed rows suitable for charting:
//   [{ date: '2026-07-01', AAPL: 210.4, MSFT: 505.1 }, ...]
export function reshapeBars(bars) {
  const rows = new Map();
  for (const symbol of Object.keys(bars)) {
    for (const bar of bars[symbol]) {
      const date = bar.t.slice(0, 10);
      if (!rows.has(date)) rows.set(date, { date });
      rows.get(date)[symbol] = bar.c;
    }
  }
  return Array.from(rows.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

// Latest close and period change per symbol, for the summary cards.
export function summarize(bars, symbols) {
  return symbols
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
}