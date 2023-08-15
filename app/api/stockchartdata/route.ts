import { NextResponse } from "next/server";
import { YAHOO_BASEURL } from "@/app/utils/constants";

const getStockChartData = async (
  ticker: string,
  interval: string = "1d",
  range: string = "ytd"
) => {
  const endpoint = new URL(`/v8/finance/chart/${ticker}`, YAHOO_BASEURL);
  endpoint.searchParams.set("interval", interval);
  endpoint.searchParams.set("range", range);
  const request = new Request(endpoint);
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const convertToOHLC = (
  timestamp: number[],
  open: number[],
  high: number[],
  low: number[],
  close: number[]
): number[][] => {
  const ohlcData: number[][] = [];
  for (let i = 0; i < timestamp.length; i++) {
    ohlcData.push([
      timestamp[i] * 1000,
      Number(open[i].toFixed(2)),
      Number(high[i].toFixed(2)),
      Number(low[i].toFixed(2)),
      Number(close[i].toFixed(2)),
    ]);
  }
  return ohlcData;
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") || "AAPL";
  let data = await getStockChartData(ticker);
  let ohlcdata = convertToOHLC(
    data.chart.result[0].timestamp,
    data.chart.result[0].indicators.quote[0].open,
    data.chart.result[0].indicators.quote[0].high,
    data.chart.result[0].indicators.quote[0].low,
    data.chart.result[0].indicators.quote[0].close
  );
  return NextResponse.json({ ohlcdata });
};
