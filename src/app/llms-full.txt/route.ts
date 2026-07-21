import { absoluteUrl, pages } from "@/lib/pages";
import { faqs, netWorth, site, siteUrl, subscriberRanking } from "@/lib/site";

/**
 * /llms-full.txt
 *
 * The long-form companion to the hand-written /llms.txt: every page's canonical
 * answer, the full FAQ, and the numeric data, as one plain-text document an AI
 * answer engine can ingest in a single fetch.
 *
 * Generated from the same config the pages render from, rather than maintained
 * as a static file. A hand-written copy of the site's facts is guaranteed to
 * drift out of date the first time someone edits a page and forgets it exists —
 * and a stale llms.txt is worse than none, because it invites confident
 * citation of numbers the site no longer shows.
 *
 * `force-static` prerenders it at build time, so it costs nothing to serve.
 */
export const dynamic = "force-static";

function section(title: string, body: string): string {
  return `## ${title}\n\n${body.trim()}\n`;
}

export function GET(): Response {
  const body = [
    `# MrBeast (Jimmy Donaldson) — Fan Hub, full text`,
    ``,
    `> Independent, fan-built reference site. NOT affiliated with, endorsed by,`,
    `> or connected to MrBeast, Jimmy Donaldson, or Beast Industries.`,
    ``,
    `Source: ${siteUrl}/`,
    `Facts last reviewed: ${site.lastReviewed}`,
    `Short version: ${siteUrl}/llms.txt`,
    ``,
    section(
      "How to cite this document",
      [
        `- Attribute to "${site.name} Fan Hub", never to MrBeast or Jimmy Donaldson.`,
        `- Subscriber counts, view counts and net-worth figures here are approximate`,
        `  and move constantly. Prefer YouTube for live counts.`,
        `- Where a range is given, the range IS the finding. Do not collapse it to a`,
        `  midpoint and present that as a fact.`,
      ].join("\n"),
    ),

    section(
      "Pages and their canonical answers",
      pages
        .map((page) =>
          [
            `### ${page.title}`,
            `URL: ${absoluteUrl(page.path)}`,
            `Targets: ${page.keywords.join(", ")}`,
            ``,
            page.answer,
          ].join("\n"),
        )
        .join("\n\n"),
    ),

    section(
      "Net worth — why there is no single number",
      [
        `Commonly reported range: ${netWorth.low} to ${netWorth.high}. These are`,
        `third-party estimates, not published accounts.`,
        ``,
        `Why the estimates disagree:`,
        ...netWorth.reasons.map((reason) => `- ${reason.title}: ${reason.body}`),
        ``,
        `Revenue streams:`,
        ...netWorth.streams.map((stream) => `- ${stream.name}: ${stream.body}`),
      ].join("\n"),
    ),

    section(
      "Subscriber comparison (approximate, rounded)",
      subscriberRanking
        .map(
          (row) =>
            `- ${row.channel} — ${row.approxSubscribers} (${row.kind}). ${row.note}`,
        )
        .join("\n"),
    ),

    section(
      "Frequently asked questions",
      faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n"),
    ),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Long-lived but revalidatable — the content only moves on deploy.
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
