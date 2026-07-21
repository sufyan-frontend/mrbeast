import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { channels, site } from "@/lib/site";

/**
 * Entity facts.
 *
 * Rendered as a real <dl> because a definition list is the clearest possible
 * signal of "attribute → value" to both crawlers and AI answer engines, and it
 * mirrors the Person schema emitted in the JSON-LD graph.
 */
const facts = [
  { term: "Real name", value: "James Stephen “Jimmy” Donaldson" },
  { term: "Born", value: "7 May 1998" },
  { term: "Birthplace", value: site.birthPlace },
  { term: "Started YouTube", value: "February 2012, aged 13" },
  { term: "Known for", value: "Challenge videos, giveaways, philanthropy" },
  { term: "Nationality", value: site.nationality },
] as const;

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="glow -left-20 top-1/3 size-[26rem] bg-accent/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Who is MrBeast?"
          lede="MrBeast is Jimmy Donaldson, an American YouTuber and entrepreneur born on 7 May 1998 in Wichita, Kansas. He is the most-subscribed individual creator on YouTube."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Narrative */}
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              He began uploading in February 2012 at the age of thirteen under the username
              MrBeast6000, spending years studying what made videos spread before anything
              took off. His breakthrough came with endurance stunts — counting to 100,000 on
              camera — and evolved into the format he is now known for: enormous,
              expensive, single-idea challenges with a clear prize on the line.
            </p>

            <p>
              The economics are unusual and deliberate. Rather than taking profit out, he
              reinvests the overwhelming majority of ad and sponsorship revenue straight back
              into production, which makes each video bigger than the last. That loop —
              bigger budget, bigger audience, bigger budget — is the entire strategy.
            </p>

            <p>
              Alongside the channel he has built a set of real businesses:{" "}
              <strong className="font-semibold text-foreground">Feastables</strong> in
              snacks,{" "}
              <strong className="font-semibold text-foreground">Beast Games</strong> in
              television, and{" "}
              <strong className="font-semibold text-foreground">MrBeast Lab</strong> in
              collectibles. Separately,{" "}
              <strong className="font-semibold text-foreground">Beast Philanthropy</strong>{" "}
              operates as a non-profit, running a food bank and funding community projects
              with 100% of its profits.
            </p>

            {/* Channels */}
            <div className="pt-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                Channels
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <li
                    key={channel}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-foreground"
                  >
                    {channel}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Fact panel */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-black tracking-tight">Quick facts</h3>

              <dl className="mt-5 divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.term} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-4">
                    <dt className="shrink-0 text-sm font-bold text-muted sm:w-36">
                      {fact.term}
                    </dt>
                    <dd className="text-sm font-semibold leading-snug text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
