import Link from "next/link";
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

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/*
          Every answer is in the server-rendered HTML and inside a native
          <details> — open or closed, the text is present in the DOM. Answers
          hidden behind JavaScript are invisible to crawlers, which is the
          usual reason an FAQ page with perfect markup never earns a snippet.
        */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-line bg-surface transition-colors open:border-brand-400/50 hover:border-brand-400/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold leading-snug sm:p-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <h2 className="text-balance">{faq.question}</h2>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-background text-brand-400 transition-transform duration-300 group-open:rotate-45"
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
          ))}
        </div>

        <div className="prose mt-16">
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
