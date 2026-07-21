import Link from "next/link";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/pages";
import { faqs } from "@/lib/site";

export const metadata = pageMetadata("faq");

const page = getPage("faq");

export default function FaqPage() {
  return (
    <>
      {/* The full set. The WebPage node itself is typed FAQPage here, so the
          questions hang off it directly rather than duplicating into a second
          FAQPage entity — see buildPageGraph. */}
      <SchemaGraph pageKey="faq" faqEntries={faqs} />

      <PageHero page={page} eyebrow="FAQ" answerLabel="The short version" />

      {/*
        The same component the home page uses, given the full list instead of a
        slice. Questions render as <h3> beneath the section's <h2>, keeping the
        outline correct under the page's single <h1>.

        Every answer is in the server-rendered HTML inside a native <details> —
        present in the DOM whether open or closed. Answers revealed only by
        JavaScript are invisible to crawlers, which is the usual reason an FAQ
        page with perfect markup never earns a snippet.
      */}
      <Faq
        entries={faqs}
        title="Every question, answered"
        lede="Grouped from what people actually search for — identity, money, the philanthropy, and how to take part."
        headingLevel="h3"
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="prose">
          <h2 id="more">Still looking for something?</h2>
          <p>
            The three questions people ask most have pages of their own, with the full
            explanation rather than a paragraph:{" "}
            <Link href="/who-is-mrbeast">who MrBeast is</Link>,{" "}
            <Link href="/net-worth">what he is worth and why nobody agrees</Link>, and{" "}
            <Link href="/best-youtuber">whether he is really the biggest YouTuber</Link>.
          </p>
          <p>
            For anything official — casting calls, announcements, live subscriber counts
            — go to{" "}
            <a
              href="https://www.youtube.com/@MrBeast"
              target="_blank"
              rel="noopener noreferrer"
            >
              the official YouTube channel
            </a>
            . This is an independent fan site and cannot answer questions on his behalf.
          </p>
        </div>
      </div>

      <RelatedPages current="faq" />
    </>
  );
}
