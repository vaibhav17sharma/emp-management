import { cache } from "@/db/Cache";
import { shuffleArray } from "@/lib/utils";

export default async function RandomQuote() {
  const data = await getQuote();
  return (
    <blockquote className="relative">
      <div className="relative z-10">
        <p className="text-gray-800 sm:text-xl dark:text-white">
          <em>&ldquo;{data.q}&mdash; </em>
        </p>
      </div>

      <footer className="mt-6">
        <div className="text-base font-semibold text-gray-800 dark:text-neutral-400">
          {data.a}
        </div>
      </footer>
    </blockquote>
  );
}

interface Quote {
  q: string;
  a: string;
  c: string;
  h: string;
}

export async function getQuote(): Promise<Quote> {
  const cachedValue = (await cache.get("getQuotes", [])) as Quote[];

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
