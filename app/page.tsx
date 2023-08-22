import { Suspense } from "react";

import StockChart from "./components/StockChart";
import StockChartLoader from "./components/StockChartLoader";
import StockSearch from "./components/StockSearch";
import StockPriceAction from "./components/StockPriceAction";
import { API_URL } from "./utils/constants";

const StockNotFound = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-3 text-2xl font-medium">Stock Not Found</div>
      <div className="mb-3 text-lg">
        Please check the stock symbol and try again.
      </div>
    </div>
  );
};

const getStockData = async (ticker: string) => {
  const getData = await fetch(`${API_URL()}/api/stockdata?ticker=${ticker}`, {
    cache: "no-store",
  });
  const data = await getData.json();
  return data.data[0];
};

export default async function Home(searchParams: any) {
  const ticker: string = searchParams.searchParams.ticker || "AAPL";
  const summary = await getStockData(ticker);
  const shortName: string = summary?.shortName;
  const symbol: string = summary?.symbol;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-900 p-8">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <StockSearch />
        {summary ? (
          <>
            <StockPriceAction
              currency={summary.currency}
              regularMarketChange={summary.regularMarketChange}
              regularMarketChangePercent={summary.regularMarketChangePercent}
              regularMarketVolume={summary.regularMarketVolume}
              exchange={summary.exchange}
              symbol={summary.symbol}
              marketState={summary.marketState}
              regularMarketPrice={summary.regularMarketPrice}
              priceHint={summary.priceHint}
              quoteType={summary.quoteType}
              regularMarketTime={summary.regularMarketTime}
              shortName={summary.shortName}
            />
            <Suspense fallback={<StockChartLoader />}>
              <StockChart symbol={symbol} shortName={shortName} />
            </Suspense>
          </>
        ) : (
          <StockNotFound />
        )}
      </div>
    </main>
  );
}
