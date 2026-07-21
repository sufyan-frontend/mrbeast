import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { philanthropy } from "@/lib/site";

export function Philanthropy() {
  return (
    <section id="philanthropy" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Philanthropy"
          title="Giving is the whole point"
          lede="Beast Philanthropy is a registered non-profit that runs a food bank and funds community projects, with 100% of its profits going to charitable work. Campaigns including #TeamTrees and #TeamSeas funded over twenty million trees planted and tens of millions of pounds of waste removed from oceans and rivers."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {philanthropy.map((item, index) => (
            <Reveal as="li" key={item.title} delay={(index % 3) * 90}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-brand-400/50 sm:p-7">
                {/* Hover wash */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative">
                  <p className="text-3xl font-black tracking-tight text-brand-400 sm:text-4xl">
                    {item.metric}
                  </p>
                  <h3 className="mt-3 text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12 text-center">
          <a
            href="https://www.beastphilanthropy.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Support Beast Philanthropy
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
