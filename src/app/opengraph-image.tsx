import { ImageResponse } from "next/og";
import { profile } from "@/content/portfolio";

/**
 * Link preview card, rendered at build time by next/og — so it can never drift
 * from portfolio.ts the way a hand-exported PNG would.
 *
 * Deliberately type-only: ImageResponse runs in an edge-style runtime with no
 * access to next/font or the CSS tokens, and embedding the portrait would mean
 * inlining it as a data URI. The palette below is copied from globals.css;
 * if you change --color-accent or --color-bg there, mirror it here.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpengraphImage() {
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
          // next/og has no default font stack worth relying on; keep it generic.
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              background: "#b4ff39",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9aa3b5",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: "128px",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: "36px",
              lineHeight: 1.3,
              color: "#9aa3b5",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "24px",
            letterSpacing: "0.06em",
            color: "#5d6577",
          }}
        >
          <div style={{ display: "flex" }}>{profile.location}</div>
          <div style={{ display: "flex", color: "#b4ff39" }}>
            {profile.yearsExperience} years
          </div>
        </div>
      </div>
    ),
    size,
  );
}
