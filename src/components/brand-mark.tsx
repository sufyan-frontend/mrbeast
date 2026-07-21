import { site } from "@/lib/site";

/**
 * Original wordmark drawn for this project.
 *
 * Deliberately NOT the official MrBeast logo — that artwork is trademarked and
 * cannot be reused here. Replace this component if you have licensed brand
 * assets of your own.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="size-8 shrink-0 sm:size-9"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4aa8ff" />
            <stop offset="1" stopColor="#0b6bdc" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#bm-g)" />
        <path d="M11 28V12l9 9 9-9v16" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span className="text-lg font-black uppercase leading-none tracking-tight sm:text-xl">
        {site.wordmark}
      </span>
    </span>
  );
}
