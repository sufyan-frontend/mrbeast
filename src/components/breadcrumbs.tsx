import Link from "next/link";
import type { PageMeta } from "@/lib/pages";

/**
 * Visible breadcrumb trail.
 *
 * This exists to be *seen*, not just marked up. `buildPageGraph` emits a
 * matching BreadcrumbList, and Google cross-checks the two — structured data
 * describing a trail the user cannot see is ignored at best and a manual-action
 * risk at worst. The markup and this component are generated from the same
 * registry entry, so they cannot drift apart.
 */
export function Breadcrumbs({ page }: { page: PageMeta }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted/50">
          /
        </li>
        {/* The current page is not a link — aria-current tells assistive tech
            where it is, and a self-link would be a wasted internal link. */}
        <li>
          <span aria-current="page" className="font-semibold text-foreground">
            {page.navLabel}
          </span>
        </li>
      </ol>
    </nav>
  );
}
