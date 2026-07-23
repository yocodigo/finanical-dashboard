# Financial Dashboard

A personal market data dashboard built on the [Alpaca Market Data API](https://docs.alpaca.markets/docs/about-market-data-api). Fetches daily price history for a set of symbols and charts them together.

Built with Next.js 14 (App Router), Tailwind, SWR, and Recharts.

## What works today

- **`/api/bars`** — server-side route that authenticates against Alpaca and pulls daily bars for up to 10 symbols. API credentials stay server-side and are never exposed to the browser.
- **Multi-symbol chart** — closes for each symbol merged into a single time-ordered series and rendered as an overlaid line chart.
- **Summary cards** — latest close and percent change over the selected window for each symbol.
- **Adjustable inputs** — comma-separated symbol list and a 30/90/180/365-day window.

## Not built yet

- Portfolio position tracking and P&L
- Order submission and lifecycle tracking
- Persistence (no database — every request hits Alpaca live)
- Financial news and geopolitical feeds
- Backtesting

## Setup

Requires Node 18+ and an Alpaca account. Paper trading keys are free and work for market data.

```bash
npm install
cp .env.local.example .env.local   # then add your keys
npm run dev
```

Open http://localhost:3000.

Generate keys at https://app.alpaca.markets/ under "API Keys".

## Notes

- Uses the **IEX** feed, which is what free Alpaca accounts get. It covers a single exchange, so volume is lower than consolidated SIP data and some thinly traded symbols may have gaps.
- The request window ends yesterday rather than today, since the free feed is delayed.
- Bars are fetched live on each request. No caching layer yet.

## Structure

```
src/
  app/
    api/bars/route.js    Alpaca proxy — auth, fetch, reshape
    page.js              Dashboard page
    layout.js            Root layout
  components/
    PriceChart.js        Chart, summary cards, controls
```
