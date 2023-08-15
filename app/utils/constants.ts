// Static exports
export const YAHOO_BASEURL: string = "https://query2.finance.yahoo.com";
export const COOKIE = process.env.COOKIE || "";
export const CRUMB = process.env.CRUMB || "";
export const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";

// Conditional exports
export const API_URL = (): string => {
  if (process.env.VERCEL_URL) {
    return "https://" + process.env.VERCEL_URL;
  }
  return "http://localhost:3000";
};
