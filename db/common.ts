import { cache } from "@/db/Cache";
import { shuffleArray } from "@/lib/utils";

interface Quote {
  q: string;
  a: string;
  c: string;
  h: string;
}

export async function getQuote(): Promise<Quote> {
  const cachedValue = (await cache.get("getQuotes", [])) as Quote[] | null;
  console.log(cachedValue);

  if (cachedValue && cachedValue.length > 0) {
    const data = shuffleArray(cachedValue);
    return data[0];
  }

  const response = await fetch("https://zenquotes.io/api/quotes/");
  console.log("API hittttttt");

  const quotes = (await response.json()) as Quote[];

  await cache.set("getQuotes", [], quotes, 86400);

  const data = shuffleArray(quotes);
  return data[0];
}
