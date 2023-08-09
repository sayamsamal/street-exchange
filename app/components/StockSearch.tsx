"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import styles from "./Spinner.module.css";

const StockSearch = () => {
  let { replace } = useRouter();
  let pathname = usePathname();

  let [searchVal, setSearchVal] = useState("");
  let [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  function handleSearch(event: any) {
    event.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (searchVal) {
      params.set("ticker", searchVal);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div>
      <form className="flex items-center mb-10" onSubmit={handleSearch}>
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
            className="text-sm rounded-lg w-full pl-10 p-2.5 bg-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Start typing for stocks"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          {isPending && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 fill-slate-100"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path
                  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                  className={styles.spinner_ajPY}
                />
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default StockSearch;
