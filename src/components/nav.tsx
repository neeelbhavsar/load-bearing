"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems as allNavItems, hasVisibleTestimonials, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/scroll-lock";

// The feedback section removes itself when it has nothing published, so its nav
// entry has to go with it rather than pointing at an anchor that isn't there.
const navItems = allNavItems.filter(
  (item) => item.href !== "#feedback" || hasVisibleTestimonials(),
);

export function Nav() {
  // Off the home page (e.g. /resume) the section anchors have nothing to point
  // at, so they become links back to the home page's sections instead.
  const pathname = usePathname();
  const onHome = pathname === "/";
  const linkFor = (href: string) => (onHome ? href : `/${href}`);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (v) => setCondensed(v > 80));

  // active section highlight — only meaningful on the page that has the sections
  useEffect(() => {
    if (!onHome) return;
    const sections = navItems
      .map((i) => document.querySelector(i.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // lock the page while the mobile sheet is open — routed through Lenis, which
  // otherwise keeps scrolling the page behind the sheet
  useScrollLock(open);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background-color,backdrop-filter,border-color] duration-500",
          condensed
            ? "border-b border-border bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <a
            href={onHome ? "#top" : "/"}
            data-cursor="top"
            className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-medium">{profile.name}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {navItems.map((item) => {
              const isActive = activeId === item.href;
              return (
                <a
                  key={item.href}
                  href={linkFor(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 font-mono text-xs tracking-wide uppercase transition-colors duration-200",
                    isActive ? "text-on-accent" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              data-cursor="say hi"
              className="hidden rounded-full border border-border-strong px-4 py-2 font-mono text-xs tracking-wide uppercase transition-colors duration-200 hover:border-accent hover:text-accent sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-border-strong text-fg lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* scroll progress rail */}
        <motion.div
          className="h-px origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            /* Seven items at display size overflow a short phone, so the sheet
               scrolls (data-lenis-prevent keeps that scroll out of Lenis) and
               starts below the header rather than vertically centred. */
            className="fixed inset-0 z-[79] overflow-y-auto overscroll-contain bg-bg/95 px-5 pt-20 pb-10 backdrop-blur-2xl lg:hidden"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col" aria-label="Sections">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={linkFor(item.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline border-b border-border py-4 font-display text-[1.75rem] tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="mr-3 font-mono text-xs text-accent">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* the desktop "Let's talk" pill is hidden on the smallest screens —
                the sheet is where that action lives instead */}
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase"
            >
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
