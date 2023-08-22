import { NextResponse } from "next/server";
import { YAHOO_BASEURL, COOKIE, CRUMB } from "@/app/utils/constants";

async function getStockData(
  symbols: string[],
  cookie: string = COOKIE,
  crumb: string = CRUMB
) {
  const endpoint = new URL("/v7/finance/quote", YAHOO_BASEURL);
  endpoint.searchParams.set("symbols", symbols.join(","));
  endpoint.searchParams.set("crumb", crumb);
  endpoint.searchParams.set("formatted", "false");
  const request = new Request(endpoint);
  request.headers.set("cookie", cookie);
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { quoteResponse } = await res.json();
  return quoteResponse?.result || [];
}

/** source: https://stackoverflow.com/a/76555529 */
// const getCredentials = async () => {
//   // get the A3 cookie
//   const { headers } = await fetch("https://fc.yahoo.com");
//   const cookie = headers?.get("set-cookie") || "";
//   //   now get the crumb
//   const url = new URL("/v1/test/getcrumb", QUERY2_BASE_URL);
//   const request = new Request(url);
//   request.headers.set("Cookie", cookie);
//   request.headers.set("User-Agent", USER_AGENT);
//   const response = await fetch(request);
//   const crumb = await response.text();
//   console.log("Crumb: ", crumb);
//   console.log("Cookie: ", cookie);
//   return { cookie, crumb };
// };

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") || "AAPL";
  let data = await getStockData([ticker], COOKIE, CRUMB);
  // if(!data) {
  // 	let { cookie, crumb } = await getCredentials();
  // 	data = await getStockData(["AAPL"], cookie, crumb);
  // }
  return NextResponse.json({ data });
};
