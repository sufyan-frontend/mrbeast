import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph, netWorthQaNode } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/pages";
import { faqs, netWorth } from "@/lib/site";

export const metadata = pageMetadata("net-worth");

const page = getPage("net-worth");

export default function NetWorthPage() {
  return (
    <>
      {/* QAPage rather than a bare figure: the honest structured-data shape for
          a question whose answer is a contested range, not a known number. */}
      <SchemaGraph
        pageKey="net-worth"
        extraNodes={[netWorthQaNode()]}
        faqEntries={faqs.filter((faq) =>
          [
            "How much is MrBeast worth?",
            "How does MrBeast make money if he gives so much away?",
            "Does MrBeast really give away the money?",
          ].includes(faq.question),
        )}
      />

      <PageHero page={page} eyebrow="Money" answerLabel="Short answer" />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* The range, stated once, clearly labelled as an estimate. */}
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
            Commonly reported range
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            {netWorth.low}{" "}
            <span className="text-muted">&ndash;</span> {netWorth.high}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Third-party estimates, not published accounts. Jimmy Donaldson does not
            disclose his personal finances, and reputable outlets disagree by more than
            a factor of two. Treat any single number you see quoted — here or anywhere
            else — as an estimate.
          </p>
        </div>

        <div className="prose">
          <h2 id="why-estimates-vary">Why the estimates disagree so much</h2>
          <p>
            The spread is not sloppiness on the part of the people publishing these
            figures. It is a genuine consequence of how the business is built — four
            things make MrBeast unusually hard to value:
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {netWorth.reasons.map((reason, index) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-8 items-center justify-center rounded-full bg-brand/15 text-sm font-black text-brand-400"
              >
                {index + 1}
              </span>
              <h3 className="mt-3 text-base font-bold leading-snug tracking-tight sm:text-lg">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.body}</p>
            </li>
          ))}
        </ol>

        <div className="prose">
          <h2 id="person-vs-company">The person is not the company</h2>
          <p>
            This is the single most common error in net-worth articles, and it is worth
            being precise about. <strong>Beast Industries</strong> is the private parent
            company behind the channels, Feastables, Beast Games and MrBeast Lab.
            Reported valuations for that company run several times higher than any
            estimate of Donaldson&rsquo;s personal net worth.
          </p>
          <p>
            Those are two different numbers. He does not own 100% of the company,
            private valuations are set by whatever the last funding round agreed, and a
            valuation is not cash. An article that quotes the company&rsquo;s valuation
            as &ldquo;MrBeast&rsquo;s net worth&rdquo; is off by a wide margin.
          </p>

          <h2 id="revenue-streams">Where the money actually comes from</h2>
        </div>

        <ul className="mt-8 space-y-4">
          {netWorth.streams.map((stream) => (
            <li
              key={stream.name}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:gap-6 sm:p-6"
            >
              <h3 className="shrink-0 text-base font-bold tracking-tight sm:w-52 sm:text-lg">
                {stream.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {stream.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2 id="reinvestment">Why high earnings produce a lower net worth</h2>
          <p>
            The reinvestment model is the reason the two numbers pull apart. Revenue
            that would be profit at any normal media company is instead spent on the
            next production — sets, prizes, crews, logistics. Individual videos have
            carried budgets in the millions.
          </p>
          <p>
            So the honest framing is this: MrBeast&rsquo;s <em>earnings</em> are
            enormous and reasonably well understood. His <em>net worth</em> is an
            estimate of what would be left if he stopped, sold, and settled up — and
            nobody outside the company can calculate that. Anyone quoting it to the
            nearest million is guessing with false precision.
          </p>
          <p>
            For the background on how the operation got here, see{" "}
            <Link href="/who-is-mrbeast">who MrBeast is and how he started</Link>, or
            the <Link href="/faq">full FAQ</Link>.
          </p>
        </div>

        {/* Sourcing note — an explicit statement of what this page does and does
            not know is an E-E-A-T signal, and the honest thing to publish. */}
        <aside className="mt-14 rounded-2xl border border-line bg-background/60 p-5 text-sm leading-relaxed text-muted sm:p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            On sourcing
          </h2>
          <p className="mt-3">
            This page deliberately does not print a single headline figure. The numbers
            in circulation come from third-party estimates that use different methods
            and reach different conclusions, and none of them have access to the
            company&rsquo;s accounts. Where a range is given above, it reflects the
            spread of those published estimates rather than a figure this site has
            independently verified.
          </p>
        </aside>
      </article>

      <RelatedPages current="net-worth" />
    </>
  );
}
