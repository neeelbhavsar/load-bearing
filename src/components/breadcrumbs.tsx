import Link from "next/link";

export type Crumb = { name: string; href?: string };

/**
 * Visible breadcrumb trail, matching the BreadcrumbList in each page's JSON-LD.
 * Besides orienting visitors, every crumb is a crawlable link up the hierarchy
 * (case study → /work → home), which is part of how Google judges a page is
 * worth crawling. The last crumb is the current page and is not a link.
 */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
        {items.map((crumb, i) => (
          <li key={crumb.name} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-border-strong">
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="inline-flex min-h-11 items-center text-fg-muted transition-colors duration-300 hover:text-accent"
              >
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
