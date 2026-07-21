import { ticker } from "@/lib/site";

/**
 * Infinite marquee strip.
 *
 * The list is rendered twice so the animation can loop seamlessly at -50%.
 * The duplicate is `aria-hidden` so screen readers and crawlers only ever see
 * each phrase once.
 */
export function Ticker() {
  return (
    <div className="relative border-y border-line bg-surface/50 py-4">
      {/* Edge fades so items don't pop in and out at the viewport edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
      />

      <div className="flex overflow-hidden">
        <ul className="animate-marquee flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          {ticker.map((item) => (
            <TickerItem key={item} label={item} />
          ))}
          {/* seamless-loop duplicate */}
          {ticker.map((item) => (
            <TickerItem key={`dup-${item}`} label={item} hidden />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TickerItem({ label, hidden = false }: { label: string; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-wide text-muted sm:gap-12 sm:text-base"
    >
      {label}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
    </li>
  );
}
