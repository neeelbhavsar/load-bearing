import type { ArchNode, Project } from "@/content/portfolio";

/**
 * Request path through a system, as a diagram. A box-and-arrow picture says
 * "designed this" faster than a paragraph does, and it is built from the same
 * data the case study text is, so the two cannot disagree.
 *
 * Plain HTML, not an image: it stays sharp, follows the site's colours, reflows
 * to a vertical stack on phones, and every label is real text a crawler can
 * read. The figure's caption carries the explanation for screen readers.
 */
export function ArchitectureDiagram({
  architecture,
  accent,
  title,
}: {
  architecture: NonNullable<Project["architecture"]>;
  accent: string;
  title: string;
}) {
  const { flow, aside, caption } = architecture;

  return (
    <figure className="rounded-3xl border border-border bg-bg-elev p-4 sm:p-6">
      {/* main path */}
      <ol
        aria-label={`${title} request path`}
        className="flex flex-col items-stretch gap-0 md:flex-row md:items-stretch"
      >
        {flow.map((node, i) => (
          <li key={node.name} className="flex flex-col items-stretch md:flex-1 md:flex-row">
            <Node node={node} accent={accent} primary />
            {i < flow.length - 1 && <Arrow accent={accent} />}
          </li>
        ))}
      </ol>

      {aside && aside.length > 0 && (
        <div className="mt-5 border-t border-dashed border-border-strong pt-5">
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-fg-faint uppercase">
            Supporting services
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {aside.map((node) => (
              <li key={node.name} className="flex">
                <Node node={node} accent={accent} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <figcaption className="mt-5 max-w-[75ch] text-sm leading-relaxed text-fg-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({ node, accent, primary }: { node: ArchNode; accent: string; primary?: boolean }) {
  return (
    <div
      className="flex w-full flex-col justify-center rounded-2xl border bg-bg px-4 py-3.5"
      style={{ borderColor: primary ? `${accent}66` : "var(--color-border)" }}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
        {node.name}
      </p>
      <p
        className="mt-1 font-display text-base leading-snug tracking-tight sm:text-lg"
        style={primary ? { color: accent } : undefined}
      >
        {node.tech}
      </p>
      {node.note && <p className="mt-1 text-xs leading-snug text-fg-muted">{node.note}</p>}
    </div>
  );
}

/** Down on phones, right from md up. Decorative: the list order is the flow. */
function Arrow({ accent }: { accent: string }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center py-1.5 md:px-1.5 md:py-0">
      <svg
        viewBox="0 0 24 24"
        className="size-5 rotate-90 md:rotate-0"
        fill="none"
        stroke={accent}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
