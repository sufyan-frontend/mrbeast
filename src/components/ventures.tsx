import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ventures } from "@/lib/site";

export function Ventures() {
  return (
    <section
      id="ventures"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="glow left-1/2 top-0 size-[30rem] -translate-x-1/2 bg-brand/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ventures"
          title="More than a YouTube channel"
          lede="MrBeast's businesses include Feastables, a chocolate and snack brand; Beast Games, a large-scale competition series; MrBeast Lab collectibles; and Beast Philanthropy, a non-profit that directs 100% of its profits to charitable work."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {ventures.map((venture, index) => (
            <Reveal as="li" key={venture.name} delay={index * 80}>
              <a
                href={venture.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
                style={{ ["--venture-accent" as string]: venture.accent }}
              >
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  <Image
                    src={venture.image}
                    alt={`${venture.name} — ${venture.kicker}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.16em]"
                    style={{ color: venture.accent }}
                  >
                    {venture.kicker}
                  </p>

                  <h3 className="mt-1.5 text-xl font-black tracking-tight">{venture.name}</h3>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {venture.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                    Visit
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Accent underline that fills on hover */}
                <span
                  aria-hidden="true"
                  className="h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: venture.accent }}
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
