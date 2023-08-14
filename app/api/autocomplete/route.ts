import { NextResponse } from "next/server";

const QUERY2_BASE_URL = "https://query2.finance.yahoo.com";

async function getStockAutocomplete(
  query: string,
  quotesCount: number = 5,
  newsCount: number = 0,
  enableLogoUrl: boolean = true
) {
  const endpoint = new URL("/v1/finance/search", QUERY2_BASE_URL);
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("quotesCount", quotesCount.toString());
  endpoint.searchParams.set("newsCount", newsCount.toString());
  endpoint.searchParams.set("enableLogoUrl", enableLogoUrl.toString());
  const request = new Request(endpoint);
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  let data = await getStockAutocomplete(query);
  return NextResponse.json(data);
};
