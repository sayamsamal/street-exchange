import HighChartsWidget from "./HighChartsWidget";

interface StockChartProps {
  symbol: string;
  shortName: string;
}

const getStockChartData = async (ticker: string) => {
  const endpoint = new URL("http://localhost:3000/api/stockchartdata/");
  endpoint.searchParams.set("ticker", ticker);
  const request = new Request(endpoint);
  const res = await fetch(request, { cache: "no-store" });
  const data = await res.json();
  return data.ohlcdata;
};

const StockChart = async (props: StockChartProps) => {
  const ohlcData = await getStockChartData(props.symbol);
  return (
    <div className="stock-chart">
      <HighChartsWidget
        symbol={props.symbol}
        shortName={props.shortName}
        ohlcData={ohlcData}
      />
    </div>
  );
};

export default StockChart;
