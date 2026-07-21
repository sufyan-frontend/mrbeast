import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Videos } from "@/components/videos";
import { Ventures } from "@/components/ventures";
import { Philanthropy } from "@/components/philanthropy";
import { Shop } from "@/components/shop";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Newsletter } from "@/components/newsletter";
import { SchemaGraph, videoListNode } from "@/lib/schema";
import { getPage } from "@/lib/pages";
import { faqs, HOME_FAQ_COUNT } from "@/lib/site";

const page = getPage("home");

/* Only the first slice is rendered here; /faq carries the rest. The same array
   feeds both the UI and the schema, so the markup can never describe an answer
   that isn't on the page. */
const homeFaqs = faqs.slice(0, HOME_FAQ_COUNT);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: [...page.keywords],
  alternates: { canonical: page.path },
  openGraph: {
    url: page.path,
    title: page.title,
    description: page.description,
  },
};

export default function Home() {
  return (
    <>
      <SchemaGraph
        pageKey="home"
        faqEntries={homeFaqs}
        extraNodes={[videoListNode(page.path)]}
      />

      {/*
        Section order is deliberate: the answer to "who is MrBeast" sits in the
        hero, above the fold, ahead of any marketing copy. Featured snippets and
        AI answer engines both favour the earliest complete answer on a page.
      */}
      <Hero />
      <Ticker />
      <Videos />
      <Ventures />
      <Philanthropy />
      <Shop />
      <About />
      <Faq
        entries={homeFaqs}
        lede="Straight answers to what people most often ask about MrBeast — his real name, subscriber count, businesses and charitable work."
      />
      <Newsletter />
    </>
  );
}
