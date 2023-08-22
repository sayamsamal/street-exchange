"use client";
import { useEffect, useState } from "react";

interface PriceActionProp {
  currency: string;
  exchange: string;
  marketState: string;
  priceHint: number;
  quoteType: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketPrice: number;
  regularMarketTime: number;
  regularMarketVolume: number;
  shortName: string;
  symbol: string;
}

interface PriceStream {
  change: number; // regularMarketChange
  changePercent: number; // regularMarketChangePercent
  dayVolume?: number; // regularMarketVolume
  exchange: string; // exchange
  id: string; // symbol
  lastSize?: number; // *quotes
  marketHours: number; // marketState
  price: number; // regularMarketPrice
  priceHint: number; // priceHint
  time: number; // regularMarketTime
}

const convertToMarketHours = (marketType: string | number) => {
  switch (marketType) {
    case 0:
    case "PRE":
      return 0;
    case 1:
    case "REGULAR":
      return 1;
    case 2:
    case "POST":
      return 2;
    case 3:
    case "EXTENDED":
      return 3;
    default:
      return 0;
  }
};

const StockPriceAction = (prop: PriceActionProp) => {
  const initialValues: PriceStream = {
    change: prop.regularMarketChange,
    changePercent: prop.regularMarketChangePercent,
    dayVolume: prop.regularMarketVolume,
    exchange: prop.exchange,
    id: prop.symbol,
    marketHours: convertToMarketHours(prop.marketState),
    price: prop.regularMarketPrice,
    priceHint: prop.priceHint,
    time: prop.regularMarketTime,
  };

  const [streamData, setStreamData] = useState<PriceStream>(initialValues);
  const [toggleGreenPing, setGreenPing] = useState<boolean>(false);
  const [toggleRedPing, setRedPing] = useState<boolean>(false);

  useEffect(() => {
    const worker = new Worker(
      new URL("../utils/socket.worker.ts", import.meta.url)
    );

    if (worker) {
      worker.postMessage({ type: "subscribe", symbolList: [prop.symbol] });
      worker.onmessage = (msg: MessageEvent) => {
        const priceStream: PriceStream = msg.data;
        setStreamData(priceStream);
      };
    }

    return () => {
      worker.terminate();
    };
  }, []);

  let prev = prop.regularMarketPrice;

  useEffect(() => {
    if (streamData.price - prev > 0) {
      setGreenPing(true);
      setTimeout(() => {
        setGreenPing(false);
      }, 500);
    } else {
      setRedPing(true);
      setTimeout(() => {
        setRedPing(false);
      }, 500);
    }
    prev = streamData.price;
  }, [streamData.price]);

  const isPositive: boolean = Number(streamData.change) >= 0;

  return (
    <div className="stock-price-action mb-8">
      <div className="mb-3 text-xs">
        Last updated: {new Date(streamData.time).toLocaleTimeString()}
      </div>
      <h1 className="mb-3 text-2xl font-medium">
        {prop.shortName} ({prop.symbol})
      </h1>
      <div className="flex flex-wrap gap-3">
        <div
          className={`text-5xl font-bold transition-colors duration-1000 ${
            toggleGreenPing ? "text-green-600" : ""
          }${toggleRedPing ? "text-red-600" : ""}`}
        >
          {streamData.price.toFixed(3)}
        </div>
        <div
          className={`text-xl ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {streamData.changePercent.toFixed(3)}% ({streamData.change.toFixed(3)}
          )
        </div>
      </div>
    </div>
  );
};

export default StockPriceAction;
