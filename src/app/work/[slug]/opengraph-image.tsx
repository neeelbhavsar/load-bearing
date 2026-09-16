import { ImageResponse } from "next/og";
import { projects, profile } from "@/content/portfolio";

/**
 * A share card per case study. Without this every /work/* link shared to
 * LinkedIn or Slack showed the same site-wide card, so seven different pages
 * looked like one — the preview is most of what decides whether a link gets
 * clicked, and an identical image across all of them wastes it.
 *
 * Built from the project's own title, kicker, metric and accent, so it cannot
 * drift from the page it represents.
 *
 * Type-only by design: ImageResponse runs without next/font or the CSS tokens,
 * and the cover art is a remote URL the renderer would have to fetch. The
 * palette below mirrors globals.css — update both together.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// One image per route, so no generateImageMetadata — adding it makes Next treat
// this as a multi-image route keyed by an id, which is not what a single share
// card wants. That costs a per-project `alt`; the card renders the project name
// as its largest element, so the generic string is not carrying much.
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // generateStaticParams only ever yields real slugs, so this is a type guard
  // rather than a case that can happen at runtime.
  if (!project) return new ImageResponse(<div />, size);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06070a",
          color: "#f4f6fa",
          padding: "80px",
          fontFamily: "sans-serif",
          // The project's accent as a top rule — the one piece of per-project
          // colour that survives at thumbnail size.
          borderTop: `14px solid ${project.accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9aa3b5",
            }}
          >
            Case study · {project.year}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "104px",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              lineHeight: 1.3,
              color: "#9aa3b5",
              maxWidth: "980px",
            }}
          >
            {project.detail.kicker}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "24px",
            letterSpacing: "0.06em",
          }}
        >
          <div style={{ display: "flex", color: "#5d6577" }}>{profile.name}</div>
          {project.metric && (
            <div style={{ display: "flex", color: project.accent, maxWidth: "620px" }}>
              {project.metric}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
