import { NextResponse } from 'next/server';
import { mapPositions } from '@/lib/positions';
import { concentration } from '@/lib/risk';

// Note: positions live on the trading host, NOT the market-data host.
const TRADING_URL = 'https://api.alpaca.markets/v2/positions';

// Fetch the account's open positions and derive concentration metrics.
export async function GET() {
  const keyId = process.env.ALPACA_KEY_ID;
  const secretKey = process.env.ALPACA_SECRET_KEY;

  if (!keyId || !secretKey) {
    return NextResponse.json(
      { error: 'Missing ALPACA_KEY_ID or ALPACA_SECRET_KEY in environment.' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(TRADING_URL, {
      headers: {
        'APCA-API-KEY-ID': keyId,
        'APCA-API-SECRET-KEY': secretKey,
      },
      cache: 'no-store', // positions are live P&L — do not cache
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Alpaca returned ${res.status}` },
        { status: res.status }
      );
    }

    const raw = await res.json();
    const positions = mapPositions(raw);
    const { weights, top } = concentration(positions);

    return NextResponse.json({ positions, weights, top });
  } catch (err) {
    return NextResponse.json(
      { error: 'Request to Alpaca failed' },
      { status: 502 }
    );
  }
}