import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { profile } from "@/content/portfolio";

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
  // TODO point at your real domain (or set NEXT_PUBLIC_SITE_URL at build time)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://neelbhavsar.dev"),
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
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    images: [{ url: profile.photo, width: 1200, height: 1600, alt: profile.name }],
  },
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
