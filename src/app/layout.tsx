import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { profile } from "@/content/portfolio";
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
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: [
    "backend developer",
    "MERN stack developer",
    "Node.js",
    "Express",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "Neo4j",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    // og:image comes from app/opengraph-image.tsx — the file convention wins
    // over anything declared here, so don't also list one.
  },
  twitter: { card: "summary_large_image" },
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
