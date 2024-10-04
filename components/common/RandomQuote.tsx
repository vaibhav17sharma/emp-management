import { getQuote } from "@/db/common";

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