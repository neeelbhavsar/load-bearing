import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Without this file the 404 inherited the root layout's `index, follow` next to
 * Next's own `noindex` — two robots tags that disagree. Declaring it here
 * leaves one.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1100px] flex-col justify-center px-5 pt-24 pb-20 sm:px-8 sm:pt-32">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.035em]">
        Nothing at this address.
      </h1>
      <Link
        href="/"
        data-cursor="back"
        className="group mt-10 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
      >
        <ArrowLeft
          size={14}
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        Back to portfolio
      </Link>
    </div>
  );
}
