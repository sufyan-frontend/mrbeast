import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: ReactNode;
  /**
   * Answer-first intro paragraph. Every section gets one because it gives AI
   * answer engines a self-contained passage they can quote for the section.
   */
  lede?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, lede, align = "left" }: Props) {
  const centered = align === "center";

  return (
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
        {eyebrow}
      </p>

      <h2 className="mt-4 text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {lede ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
