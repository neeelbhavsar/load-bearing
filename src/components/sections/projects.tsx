"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles, X } from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";
import { useScrollLock } from "@/lib/scroll-lock";

/**
 * Selected work, as a scroll-driven horizontal gallery.
 *
 * The section is taller than the viewport by exactly the width the card track
 * overflows by; inside it a sticky panel holds the track and translates it on X
 * from the section's own scroll progress. So the gallery reads as a horizontal
 * cinema, but the only gesture involved is ordinary vertical scrolling — no
 * horizontal swipe to fight the browser's back gesture, no auto-playing carousel
 * to chase, and it behaves identically on a phone, a tablet and a desktop
 * because the travel distance is measured, not hardcoded.
 *
 * Under prefers-reduced-motion the whole mechanic is dropped for a plain grid
 * (scroll-jacking is a nausea trigger; the content must still be reachable).
 */
export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="work" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] leading-[1.02] tracking-[-0.035em] sm:mt-5">
              <RevealText text="Things I've" stagger={0.04} />{" "}
              <span className="text-fg-muted italic">
                <RevealText text="shipped" delay={0.12} stagger={0.04} />
              </span>
            </h2>
          </div>
          <Reveal className="max-w-xs">
            <p className="text-sm leading-relaxed text-fg-muted">
              Seven production systems — the platforms behind them, what broke, and how it was
              fixed.{" "}
              <span className="text-fg">
                {reduced ? "Open any card" : "Keep scrolling"} for the full case study.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Live ticker — the only auto-running motion in the section, and purely
          decorative, so it is hidden from assistive tech. */}
      <TitleTicker />

      {reduced ? <ReducedGrid onOpen={setActive} /> : <HorizontalGallery onOpen={setActive} />}

      <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-32">
        <Reveal delay={0.1}>
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-dashed border-border-strong p-6 sm:flex-row sm:items-center sm:p-10">
            <p className="font-display text-xl leading-tight tracking-tight sm:text-3xl">
              More in the repos —<span className="text-fg-muted italic"> and a few under NDA.</span>
            </p>
            <a
              href="#contact"
              data-cursor="talk"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-0.5 sm:w-fit sm:py-3.5"
            >
              Ask me about them
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/** Thin marquee band of project names. Decoration, not navigation. */
function TitleTicker() {
  const strip = [...projects, ...projects];
  return (
    <div
      aria-hidden
      className="marquee-host relative mt-10 overflow-hidden border-y border-border py-3 sm:mt-14 sm:py-4"
    >
      <div className="marquee-track flex w-max" style={{ ["--marquee-duration" as string]: "52s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {strip.map((p, i) => (
              <span key={`${copy}-${p.slug}-${i}`} className="flex items-center">
                <span className="px-4 font-display text-lg tracking-tight text-fg-faint sm:px-6 sm:text-2xl">
                  {p.title}
                </span>
                <span
                  className="size-1 shrink-0 rotate-45"
                  style={{ background: p.accent, opacity: 0.7 }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent sm:w-32" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent sm:w-32" />
    </div>
  );
}

function HorizontalGallery({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(0);

  // How far the track overflows its pane is the whole choreography: it sets the
  // section's height AND the X travel, so one measurement keeps the two in sync
  // at every breakpoint and after every font/image reflow.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const pane = paneRef.current;
      if (!track || !pane) return;
      setDistance(Math.max(0, track.scrollWidth - pane.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (paneRef.current) observer.observe(paneRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  // A light spring takes the edge off trackpad jitter without adding lag on top
  // of Lenis's own easing.
  const x = useSpring(rawX, { stiffness: 220, damping: 40, restDelta: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * (projects.length - 1));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={wrapRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      {/* Cards size themselves from their own proportions (see GalleryCard) and
          the pane just centres them, with the rail sitting in flow directly
          underneath — pinning the rail to the viewport floor left a band of dead
          space under the cards on tall screens. */}
      <div
        ref={paneRef}
        className="sticky top-0 flex h-svh flex-col items-stretch justify-center gap-6 overflow-hidden pt-16 pb-8 sm:gap-8 sm:pt-20 sm:pb-10"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-4 px-5 will-change-transform sm:gap-6 sm:px-8"
        >
          {projects.map((project, i) => (
            <GalleryCard
              key={project.slug}
              project={project}
              index={i}
              progress={scrollYProgress}
              onOpen={onOpen}
            />
          ))}
          {/* tail spacer so the last card can breathe at the end of the run */}
          <span aria-hidden className="w-1 shrink-0 sm:w-8" />
        </motion.div>

        {/* progress rail + counter, in flow under the cards */}
        <div className="shrink-0 px-5 sm:px-8">
          <div className="mx-auto flex max-w-[1400px] items-center gap-4 sm:gap-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-fg tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-border-strong">
              <motion.span
                aria-hidden
                className="absolute inset-0 origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-fg-faint tabular-nums">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase sm:flex">
              <ArrowDown size={12} aria-hidden className="animate-bounce" />
              Scroll
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One card. The image drifts against the card as the track passes the middle of
 * the pane, which is what stops seven equal rectangles from reading as a
 * spreadsheet — and it costs one transform per card, not a scroll listener.
 */
function GalleryCard({
  project,
  index,
  progress,
  onOpen,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  onOpen: (p: Project) => void;
}) {
  const span = 1 / Math.max(1, projects.length - 1);
  const centre = index * span;
  const imageX = useTransform(progress, [centre - span, centre + span], ["6%", "-6%"], {
    clamp: true,
  });

  return (
    <article
      onClick={() => onOpen(project)}
      data-cursor="open"
      /* Width is capped in px as well as vw: on a 1920 display an uncapped 34vw
         card is 650px wide and, filling the pane height, reads as a poster
         rather than a tile. Height comes from the card's own proportions. */
      className="group relative flex w-[86vw] max-w-[400px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-bg-elev transition-colors duration-500 hover:border-border-strong sm:w-[58vw] sm:max-w-[430px] lg:w-[38vw] lg:max-w-[460px] xl:w-[30vw] xl:max-w-[480px]"
      style={{ ["--acc" as string]: project.accent }}
    >
      {/* accent wash that lifts on hover — the card's own colour, not a generic
          white glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 100%, ${project.accent}1f, transparent 70%)`,
        }}
      />

      {/* A fixed 16:10 frame keeps every tile in the same proportion at every
          width. The svh cap is the short-screen escape hatch: on a landscape
          phone the frame crops rather than the card overflowing. */}
      <div className="relative aspect-[16/10] max-h-[42svh] w-full shrink-0 overflow-hidden">
        {/* over-wide so the drift never exposes an edge */}
        <motion.div style={{ x: imageX }} className="absolute inset-y-0 -left-[8%] -right-[8%]">
          <Image
            src={project.image}
            alt={`${project.title} — preview`}
            fill
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 58vw, 480px"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/30 to-transparent"
        />

        <span className="absolute top-4 left-4 z-10 rounded-full border border-border-strong bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase backdrop-blur sm:top-5 sm:left-5 sm:px-3 sm:tracking-[0.2em]">
          {project.year}
        </span>
        {project.ai && (
          <span
            className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border bg-bg/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur sm:top-5 sm:right-5"
            style={{ borderColor: project.accent, color: project.accent }}
          >
            <Sparkles size={11} aria-hidden />
            AI
          </span>
        )}

        {/* Oversized index, sunk into the foot of the frame — fully inside it
            now, since a number cropped by the card edge just looks broken. */}
        <span
          aria-hidden
          className="absolute right-4 bottom-1 z-10 font-display text-[4rem] leading-none tracking-tighter text-fg/[0.09] select-none sm:text-[5.5rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* flex-1 + mt-auto footer: blurbs differ in length, so the cards stretch
          to a common height and their footers still line up across the track. */}
      <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-[1.75rem]">
            {project.title}
          </h3>
          {project.metric && (
            <span
              className="mt-1.5 shrink-0 text-right font-mono text-[9px] leading-tight tracking-[0.14em] uppercase"
              style={{ color: project.accent }}
            >
              {project.metric}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-fg-muted sm:mt-2.5 sm:line-clamp-3 sm:text-sm">
          {project.blurb}
        </p>

        {/* Three chips, not four: a fourth wraps to a second row at 86vw and
            eats the height the image needs. */}
        <ul className="mt-3 mb-4 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {project.stack.slice(0, 3).map((s) => (
            <li
              key={s}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg-faint"
            >
              {s}
            </li>
          ))}
          {project.stack.length > 3 && (
            <li className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg-faint">
              +{project.stack.length - 3}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3.5 sm:pt-4">
          <span className="min-w-0 truncate font-mono text-[10px] tracking-[0.16em] text-fg-faint uppercase">
            {project.role}
          </span>
          {/* The whole card is clickable for pointers; this is the keyboard
              target and the visible affordance. --acc is the card's accent. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Open case study — ${project.title}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-strong px-3.5 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--acc)] group-hover:text-on-accent sm:gap-2 sm:px-4 sm:tracking-[0.18em]"
          >
            Case study
            <ArrowUpRight size={13} aria-hidden />
          </button>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
        style={{ background: project.accent }}
      />
    </article>
  );
}

/** prefers-reduced-motion path: same cards, no pinning, no parallax. */
function ReducedGrid({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-4 px-5 py-14 sm:gap-6 sm:px-8 lg:grid-cols-2">
      {projects.map((project, i) => (
        <article
          key={project.slug}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-bg-elev"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={project.image}
              alt={`${project.title} — preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/30 to-transparent"
            />
            <span className="absolute top-5 left-5 rounded-full border border-border-strong bg-bg/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
              {String(i + 1).padStart(2, "0")} / {project.year}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-7">
            <h3 className="font-display text-[1.75rem] leading-tight tracking-tight sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg-faint"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5 sm:mt-6">
              <span className="font-mono text-[10px] tracking-[0.16em] text-fg-faint uppercase">
                {project.role}
              </span>
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase hover:border-accent hover:text-accent"
              >
                Case study
                <ArrowUpRight size={13} aria-hidden />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const open = Boolean(project);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  // Lenis owns page scrolling, so the page has to be locked through it —
  // overflow:hidden alone leaves the wheel handler live behind the modal.
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-bg/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — project details`}
            className="relative flex max-h-[90svh] w-full max-w-[980px] flex-col overflow-hidden rounded-t-3xl border border-border-strong bg-bg-elev sm:max-h-[88svh] sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* accent hairline across the top, in the project's colour */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 z-20 h-px"
              style={{ background: project.accent }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-20 grid size-10 place-items-center rounded-full border border-border-strong bg-bg/70 text-fg-muted backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <X size={16} aria-hidden />
            </button>

            {/* data-lenis-prevent keeps Lenis from swallowing wheel events that
                belong to this scroller. */}
            <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
              {/* Hero image. On phones the title sits BELOW it — overlaid on a
                  narrow screen the type either shrinks to nothing or spills off
                  the bottom of the frame. From sm up it goes back over the
                  image, where there's room for it. */}
              <div className="relative">
                <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 980px"
                    className="object-cover"
                    priority
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/60 to-transparent sm:via-bg-elev/50"
                  />
                </div>
                <div className="px-5 pt-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:px-10 sm:pt-0 sm:pb-10">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                    {project.year} · {project.role}
                  </p>
                  <h3 className="mt-2.5 font-display text-[clamp(1.85rem,7vw,3.5rem)] leading-[1.05] tracking-[-0.03em] sm:leading-none">
                    {project.title}
                  </h3>
                  <p
                    className="mt-2.5 max-w-[52ch] text-sm leading-relaxed sm:text-base"
                    style={{ color: project.accent }}
                  >
                    {project.detail.kicker}
                  </p>
                </div>
              </div>

              <div className="p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-10">
                {/* outcomes */}
                {/* Values are short labels, so three across survives even on a
                    360px screen — stacking them would waste half the sheet. */}
                <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-0">
                  {project.detail.outcomes.map((o) => (
                    <div key={o.label} className="bg-surface/70 p-3.5 sm:p-5">
                      <dt className="font-display text-xl leading-none tracking-tight sm:text-3xl">
                        {o.value}
                      </dt>
                      <dd className="mt-2 font-mono text-[9px] leading-tight tracking-[0.14em] text-fg-faint uppercase sm:text-[10px] sm:tracking-[0.18em]">
                        {o.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* overview */}
                <ModalHeading>Overview</ModalHeading>
                <div className="space-y-4">
                  {project.detail.overview.map((p) => (
                    <p key={p} className="max-w-[70ch] leading-relaxed text-fg-muted">
                      {p}
                    </p>
                  ))}
                </div>

                {project.ai && (
                  <div className="mt-8 flex gap-3 rounded-xl border border-border bg-surface/60 p-5">
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <p className="text-sm leading-relaxed text-fg-muted">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                        AI layer
                      </span>
                      <br />
                      {project.ai}
                    </p>
                  </div>
                )}

                {/* what I built */}
                <ModalHeading>What I built</ModalHeading>
                <ul className="space-y-3">
                  {project.detail.contributions.map((c) => (
                    <li key={c} className="flex gap-3 leading-relaxed text-fg-muted">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full"
                        style={{ background: project.accent }}
                      />
                      <span className="max-w-[70ch]">{c}</span>
                    </li>
                  ))}
                </ul>

                {/* challenges */}
                <ModalHeading>The hard parts</ModalHeading>
                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  {project.detail.challenges.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-border bg-surface/50 p-4 transition-colors duration-500 hover:border-border-strong sm:p-5"
                    >
                      <h5 className="font-display text-lg tracking-tight sm:text-xl">{c.title}</h5>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
                    </div>
                  ))}
                </div>

                {/* stack */}
                <ModalHeading>Stack</ModalHeading>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-fg-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-stretch gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-0.5 sm:py-3.5"
                    >
                      Visit project
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                  {!project.href && project.linkNote && (
                    <span className="text-center font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase sm:text-left">
                      {project.linkNote}
                    </span>
                  )}
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent sm:py-3.5"
                  >
                    Ask me about it
                  </a>
                  {project.metric && (
                    <span
                      className="text-center font-mono text-[11px] tracking-[0.16em] uppercase sm:text-left"
                      style={{ color: project.accent }}
                    >
                      {project.metric}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalHeading({ children }: { children: string }) {
  return (
    <h4 className="mt-10 mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-fg-faint uppercase sm:mt-12 sm:mb-5 sm:text-[11px] sm:tracking-[0.28em]">
      {children}
      <span aria-hidden className="h-px flex-1 bg-border" />
    </h4>
  );
}
