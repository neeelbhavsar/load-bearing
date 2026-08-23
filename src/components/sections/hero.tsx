"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/portfolio";
import { RevealText } from "@/components/motion-primitives";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Split hero: type on the left, the portrait on the right in a fixed 4:5 frame.
 * The photo is shown at a size that flatters a near-square headshot instead of
 * being scaled up to fill the viewport, and it never moves out from under the
 * face — the only scroll motion is a slow parallax drift on the frame and a fade
 * as the section leaves.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Below lg the hero stacks, so opposing parallax on the two columns just makes
  // the photo and the type crawl over each other — and fading the whole hero out
  // costs the small screen its content. Entry animations still run everywhere;
  // only the scroll-linked motion is desktop-only.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const parallax = !reduced && isDesktop;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-16"
    >
      {/* ambient glow behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-10%] h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle,rgba(180,255,57,0.10),transparent_62%)] blur-3xl"
      />

      <motion.div
        className="mx-auto grid w-full max-w-[1400px] items-center gap-9 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        style={parallax ? { opacity: fade } : undefined}
      >
        {/* ── type column ── */}
        <motion.div style={parallax ? { y: typeY } : undefined} className="order-2 lg:order-1">
          <motion.p
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-fg-faint uppercase"
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          <h1
            className="mt-5 font-display leading-[0.86] font-medium tracking-[-0.04em] sm:mt-6"
            aria-label={`${profile.name}, ${profile.role}`}
          >
            <span className="block text-[clamp(3rem,9vw,7.5rem)]">
              <RevealText text={profile.firstName} stagger={0.06} />
            </span>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-fg-muted italic">
              <RevealText text={profile.lastName} delay={0.1} stagger={0.06} />
            </span>
          </h1>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.16em] uppercase sm:mt-7 sm:text-xs sm:tracking-[0.2em]">
              <span className="text-accent">{profile.role}</span>
              <span aria-hidden className="text-border-strong">
                /
              </span>
              <span className="text-fg-faint">{profile.location}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:mt-7 sm:text-xl">
              {profile.tagline}
            </p>

            {/* Full-width taps on phones — a 44px+ target edge to edge beats two
                cramped pills sharing one line. */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#work"
                data-cursor="view"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 sm:py-3.5"
              >
                See the work
                <ArrowUpRight
                  size={14}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                data-cursor="talk"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent sm:py-3.5"
              >
                Get in touch
              </a>
            </div>

            {/* years / company strip */}
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-border pt-6 sm:mt-12 sm:gap-x-10 sm:pt-7">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                  Experience
                </dt>
                <dd className="mt-1.5 font-display text-xl tracking-tight sm:text-2xl">
                  {profile.yearsExperience} years
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                  Currently at
                </dt>
                <dd className="mt-1.5 font-display text-xl tracking-tight sm:text-2xl">
                  {profile.company}
                </dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>

        {/* ── portrait column ── */}
        <motion.div
          className="order-1 mx-auto w-full max-w-[248px] sm:max-w-[340px] lg:order-2 lg:mx-0 lg:max-w-none"
          style={parallax ? { y: photoY } : undefined}
          initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            data-cursor=""
            /* 4:5 frame — close to the source's own aspect, so the crop is
               minimal and the face stays at a natural size */
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-border bg-bg-elev"
          >
            <Image
              src={profile.photo}
              alt={`${profile.name} — portrait`}
              fill
              priority
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 340px, 34vw"
              className="object-cover object-[center_22%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            {/* just enough gradient at the foot to seat the caption */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/85 to-transparent"
            />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
              {profile.name.split(" ")[0]} — {profile.location.split(" · ")[0]}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 mx-auto hidden max-w-[1400px] justify-center px-5 sm:flex sm:px-8"
        style={parallax ? { opacity: fade } : undefined}
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-10 w-10 place-items-center rounded-full border border-border-strong text-fg-muted"
        >
          <ArrowDown size={15} aria-hidden />
        </motion.span>
      </motion.div>
    </section>
  );
}
