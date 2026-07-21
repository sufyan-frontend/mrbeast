import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Shared chrome for every content route.
 *
 * `(content)` is a route group — the parentheses mean it does not appear in any
 * URL, so `/net-worth` stays `/net-worth`. It exists purely so the five keyword
 * pages share one header, one <main> landmark and one footer without the home
 * page (which composes its own) being dragged into the same shell.
 */
export default function ContentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
