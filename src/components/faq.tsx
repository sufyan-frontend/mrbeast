import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type FaqEntry = { question: string; answer: string };

/**
 * FAQ built on native <details>/<summary>.
 *
 * No JavaScript is involved, so the answers are present and expandable even
 * before hydration — and every answer is in the server-rendered HTML, which is
 * what FAQPage schema and AI answer engines need in order to quote it.
 *
 * `entries` is always passed explicitly rather than read from the config here.
 * The home page shows one slice and /faq shows the rest, and the caller passes
 * the *same* array to `SchemaGraph` — which is what guarantees the markup never
 * describes a question the visitor cannot actually see on the page.
 */
export function Faq({
  entries,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  lede,
  headingLevel = "h3",
}: {
  entries: readonly FaqEntry[];
  eyebrow?: string;
  title?: string;
  lede?: string;
  /** Use "h2" when the FAQ is the page's main content and has no section H2. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} align="center" />

        <div className="mt-12 space-y-3 lg:mt-16">
          {entries.map((faq, index) => (
            <Reveal key={faq.question} delay={Math.min(index, 4) * 60}>
              <details className="group rounded-2xl border border-line bg-background transition-colors open:border-brand-400/50 hover:border-brand-400/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold leading-snug sm:p-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <Heading className="text-balance">{faq.question}</Heading>

                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-brand-400 transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-pretty text-base leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
