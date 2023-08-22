"use client";

import { useState } from "react";

interface autoCompleteCardProps {
  exchange: string;
  symbol: string;
  longname: string;
  setIsSearchModal: Function;
}

interface Quote {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  index: string;
  score: number;
  typeDisp: string;
  exchDisp: string;
  isYahooFinance: boolean;
  longname?: string;
  logoUrl?: string;
  sector?: string;
  sectorDisp?: string;
  industry?: string;
  industryDisp?: string;
}

const AutoCompleteCard = (props: autoCompleteCardProps) => {
  return (
    <a
      href={`/?ticker=${props.symbol}`}
      onClick={() => props.setIsSearchModal(false)}
    >
      <div className="flex justify-between gap-10 rounded-lg bg-gray-600 px-5 py-3">
        <div className="flex gap-10">
          <div className="min-w-[6rem]">{props.symbol}</div>
          <div>{props.longname}</div>
        </div>
        <div>{props.exchange}</div>
      </div>
    </a>
  );
};

const StockSearch = () => {
  const [acQuotes, setAcQuotes] = useState<Quote[]>([]);
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);
  let [isLoading, setLoading] = useState<boolean>(false);

  const handleAutocomplete = (value: any) => {
    if (value == "") {
      setIsSearchModal(false);
      setAcQuotes([]);
      return;
    }
    setLoading(true);
    fetch(`/api/autocomplete?query=${value}`).then((data) =>
      data.json().then((parsed) => {
        if (parsed.count > 0) {
          setIsSearchModal(true);
          setAcQuotes(parsed.quotes);
          setLoading(false);
        }
      })
    );
  };

  return (
    <div className="mb-8 flex flex-col">
      <form
        className="z-20 flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="stock-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="stock-search"
            className="w-full rounded-lg bg-gray-700 p-2.5 px-10 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Start typing for stocks"
            onChange={(e) => {
              handleAutocomplete(e.currentTarget.value);
            }}
          />
          {isLoading && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 animate-spin fill-slate-100"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
              </svg>
            </div>
          )}
        </div>
      </form>
      {isSearchModal && (
        <div>
          <div
            className="absolute left-0 top-0 z-10 min-h-full min-w-full bg-slate-900 opacity-40"
            onClick={() => setIsSearchModal(false)}
          ></div>
          <div className="relative z-20">
            <div className="absolute mt-5 flex w-full flex-col gap-2.5 rounded-lg bg-gray-700 p-2.5 text-sm">
              {acQuotes.map((acQuote) => (
                <AutoCompleteCard
                  key={acQuote.symbol}
                  exchange={acQuote.exchange}
                  symbol={acQuote.symbol}
                  longname={acQuote.longname || ""}
                  setIsSearchModal={setIsSearchModal}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
