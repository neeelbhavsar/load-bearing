"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { contact, profile } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["28%", "0%"]);
  const nameOpacity = useTransform(scrollYProgress, [0.2, 0.9], [0.06, 0.14]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden border-t border-border">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pt-20 pb-12 sm:px-8 sm:pt-36 sm:pb-14">
        <SectionLabel index="08">Contact</SectionLabel>

        <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,9vw,7rem)] leading-[0.95] tracking-[-0.04em] sm:mt-8 sm:leading-[0.9]">
          <RevealText text="Got something" stagger={0.05} />{" "}
          <span className="text-accent italic">
            <RevealText text="worth building?" delay={0.2} stagger={0.05} />
          </span>
        </h2>

        {/* form + details */}
        <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
                {contact.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {contact.details.map((d) => (
                  <div key={d.label} className="bg-bg-elev p-5">
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                      {d.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed break-words text-fg">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="email"
                className="group inline-flex items-center gap-2 border-b border-border-strong pb-1 font-mono text-xs tracking-[0.16em] transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {profile.email}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                {copied ? "copied" : "copy"}
              </button>
              {/* next/link, not a plain anchor: the résumé is a page in this
                  site, so it should transition rather than reload. */}
              <Link
                href={profile.resumeUrl}
                data-cursor="read"
                className="group inline-flex items-center gap-2 border-b border-border-strong pb-1 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Résumé
                <ArrowUpRight
                  size={13}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal
            delay={0.12}
            className="rounded-2xl border border-border bg-bg-elev/40 p-5 sm:p-8"
          >
            <ContactForm />
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  data-cursor=""
                  className="group relative font-mono text-xs tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-fg"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
            © {new Date().getFullYear()} {profile.name} · Built with Next.js
          </p>
        </div>
      </div>

      {/* Oversized watermark name that rises into place.
          Desktop and tablet only. At phone widths the type has to run at 26vw
          to fill the width, and a 6%-opacity word that big reads as a smudge
          behind the footer rather than a watermark — so small screens get a
          clean, legible sign-off instead (below). */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -bottom-[2vw] left-1/2 hidden w-full -translate-x-1/2 text-center font-display text-[19vw] leading-none tracking-[-0.05em] whitespace-nowrap text-fg select-none sm:block"
        style={{ y: nameY, opacity: nameOpacity }}
      >
        {profile.firstName} {profile.lastName}
      </motion.p>

      {/* phone sign-off — full contrast, sized to actually be read */}
      <div className="relative z-10 px-5 pb-10 sm:hidden">
        <span aria-hidden className="hairline block" />
        <p className="mt-8 text-center font-display text-[15vw] leading-none tracking-[-0.04em] text-fg-muted/25">
          {profile.firstName}
          <span className="text-accent">.</span>
        </p>
      </div>
    </footer>
  );
}
