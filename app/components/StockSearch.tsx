"use client";

import { useState } from "react";
import Link from "next/link";

interface autoCompleteProps {
  exchange: string;
  symbol: string;
  longname: string;
  setIsSearchModal: Function;
}

const AutoCompleteCard = (props: autoCompleteProps) => {
  return (
    <Link
      href={{
        pathname: "/",
        query: { ticker: props.symbol },
      }}
      onClick={() => props.setIsSearchModal(false)}
    >
      <div className="flex justify-between bg-gray-600 px-5 py-3 rounded-lg gap-10">
        <div className="flex gap-10">
          <div className="min-w-[6rem]">{props.symbol}</div>
          <div>{props.longname}</div>
        </div>
        <div>{props.exchange}</div>
      </div>
    </Link>
  );
};

const StockSearch = () => {
  const [acQuotes, setAcQuotes] = useState<autoCompleteProps[]>([]);
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
    <div className="flex flex-col mb-10">
      <form
        className="flex items-center z-20"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="stock-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4"
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
            className="text-sm rounded-lg w-full px-10 p-2.5 bg-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Start typing for stocks"
            onInput={(e) => {
              handleAutocomplete(e.currentTarget.value);
            }}
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 fill-slate-100 animate-spin"
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
            className="absolute min-h-full min-w-full top-0 left-0 bg-slate-900 z-10 opacity-40"
            onClick={() => setIsSearchModal(false)}
          ></div>
          <div className="relative z-20">
            <div className="flex mt-5 flex-col gap-2.5 bg-gray-700 text-sm rounded-lg w-full p-2.5 absolute">
              {acQuotes.map((acQuote) => (
                <AutoCompleteCard
                  key={acQuote.symbol}
                  exchange={acQuote.exchange}
                  symbol={acQuote.symbol}
                  longname={acQuote.longname}
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
