import PriceChart from '@/components/PriceChart';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Financial Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Daily price history pulled from the Alpaca Market Data API.
        </p>
      </header>

      <PriceChart />
    </main>
  );
}
