import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { shopItems } from "@/lib/site";

export function Shop() {
  return (
    <section
      id="shop"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop"
          title="Snacks, hoodies, and everything else"
          lede="Feastables chocolate bars are stocked in major retailers, and official apparel ships worldwide from the MrBeast store. Prices shown are indicative — check the store for live pricing and stock."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {shopItems.map((item, index) => (
            <Reveal as="li" key={item.name} delay={(index % 4) * 70}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-xl hover:shadow-black/40"
              >
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {item.badge ? (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-wider text-white sm:left-3 sm:top-3">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col justify-between gap-2 p-4 sm:p-5">
                  <h3 className="text-sm font-bold leading-snug transition-colors group-hover:text-brand-400 sm:text-base">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-black tabular-nums sm:text-lg">
                      {item.price}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-sm font-bold text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-400"
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
