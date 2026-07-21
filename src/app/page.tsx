import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Videos } from "@/components/videos";
import { Ventures } from "@/components/ventures";
import { Philanthropy } from "@/components/philanthropy";
import { Shop } from "@/components/shop";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Newsletter } from "@/components/newsletter";
import { SiteFooter } from "@/components/site-footer";
import { SchemaGraph } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/* Schema.org @graph — one connected set of entities for the whole page. */}
      <SchemaGraph />

      <SiteHeader />

      {/*
        Section order is deliberate: the answer to "who is MrBeast" sits in the
        hero, above the fold, ahead of any marketing copy. Featured snippets and
        AI answer engines both favour the earliest complete answer on a page.
      */}
      <main id="main" className="flex-1">
        <Hero />
        <Ticker />
        <Videos />
        <Ventures />
        <Philanthropy />
        <Shop />
        <About />
        <Faq />
        <Newsletter />
      </main>

      <SiteFooter />
    </>
  );
}
