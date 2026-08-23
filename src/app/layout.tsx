import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { profile, seo } from "@/content/portfolio";
import { siteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    // Sub-pages set a short title and get the name appended; the home page uses
    // `default`, since "Neel Bhavsar — Neel Bhavsar" would be the alternative.
    default: `${profile.name} — ${seo.jobTitle}`,
    template: `%s — ${profile.name}`,
  },
  // profile.tagline is written for the page, not for a search result. The SERP
  // description has to carry the role, stack and location instead.
  description: seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl() }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${seo.jobTitle}`,
    description: seo.description,
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    type: "website",
    // og:image comes from app/opengraph-image.tsx — the file convention wins
    // over anything declared here, so don't also list one.
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${seo.jobTitle}`,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without these Google may show only a thumbnail and a clipped snippet.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console ownership proof. A public identifier, not a secret —
  // it only asserts that whoever controls this site also controls the Search
  // Console property. Must be live before you press Verify, since Google
  // fetches the deployed page. Leave it in place afterwards: removing it can
  // un-verify the property.
  verification: { google: "dGljOMTG_o7iFj2gJMQfh8Xzkk-2pc1HYRaTundNoO8" },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06070a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
