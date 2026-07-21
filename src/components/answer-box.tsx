/**
 * The answer-first block that opens every page.
 *
 * This is the single highest-leverage element on the site for AEO and GEO. It
 * sits above the fold, before any narrative or marketing copy, and states the
 * complete answer to the page's primary query in one self-contained passage —
 * the exact shape a featured snippet or an AI answer engine can lift and cite
 * without reading anything else.
 *
 * Three details that make it work, none of them cosmetic:
 *  - `.speakable` matches the SpeakableSpecification selector in the JSON-LD.
 *  - `id="answer"` is the fragment the QAPage answer node points at.
 *  - The text comes from `page.answer` in the registry, so the passage that is
 *    marked up and the passage a human reads are guaranteed to be the same one.
 */
export function AnswerBox({
  answer,
  label = "Quick answer",
}: {
  answer: string;
  label?: string;
}) {
  return (
    <div
      id="answer"
      className="relative mt-8 overflow-hidden rounded-2xl border border-brand-400/30 bg-surface/70 p-5 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-400 to-accent"
      />

      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
        {label}
      </p>

      <p className="speakable mt-3 text-pretty text-base leading-relaxed text-foreground sm:text-lg">
        {answer}
      </p>
    </div>
  );
}
