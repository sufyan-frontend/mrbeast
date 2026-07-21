import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { Faq } from "@/components/faq";
import { SchemaGraph } from "@/lib/schema";
import { getPage } from "@/lib/pages";
import { faqs, HOME_FAQ_COUNT } from "@/lib/site";

const page = getPage("faq");

/*
  The home page marks up the first HOME_FAQ_COUNT questions; this page takes the
  rest. Serving the same Question on two URLs with identical markup is a
  duplicate signal, and the split is what keeps this a genuinely distinct page
  rather than a copy of a home-page section.
*/
const pageFaqs = faqs.slice(HOME_FAQ_COUNT);

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

export default function FaqPage() {
  return (
    <>
      {/* pageKey "faq" makes the WebPage node itself an FAQPage carrying these
          questions, rather than emitting a second competing FAQPage entity. */}
      <SchemaGraph pageKey="faq" faqEntries={pageFaqs} />

      <PageHero page={page} eyebrow="FAQ" answerLabel="The short version" />

      <Faq
        entries={pageFaqs}
        eyebrow="Questions"
        title="More MrBeast questions, answered"
        lede="Age, hometown, how the money works, and how casting is actually run. The most common questions are answered on the home page."
      />

      <RelatedPages current="faq" />
    </>
  );
}
