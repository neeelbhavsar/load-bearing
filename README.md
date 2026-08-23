# Neel Bhavsar — Portfolio

Dark editorial portfolio for a full-stack engineer, built as a single scroll-driven
page plus a résumé route. Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind v4 · Motion · Lenis · GSAP.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint (eslint-config-next)
```

No env vars or backing services are required to run it. `NEXT_PUBLIC_SITE_URL`
is optional and only sets `metadataBase` for absolute OG/canonical URLs.

## Routes

| Route | What it is |
| --- | --- |
| `/` | The portfolio: nine sections, composed in [src/app/page.tsx](src/app/page.tsx) |
| `/resume` | The CV as a real page, not a PDF download — [src/app/resume/page.tsx](src/app/resume/page.tsx). A print stylesheet in `globals.css` flattens it to ink-on-paper on Ctrl+P, so there's no separate file to keep in sync |

## Where the content lives

**All copy is in one file: [src/content/portfolio.ts](src/content/portfolio.ts).**
No JSX, typed with `as const`. Components only read from it, so editing the site
means editing exports here:

| Export | Drives |
| --- | --- |
| `profile` | Name, role, tagline, location, availability, email, socials, portrait path, `resumeUrl` (points at `/resume`) |
| `about` | Intro paragraphs + the stat row |
| `experience` | The single-company timeline: role, period, summary, year-by-year highlights |
| `projects` | Five case studies — blurb, role, year, stack, metrics, cover image, per-project accent, and a `detail` block for the modal |
| `services` | Capability rows and their expanded detail |
| `aiStack` | The AI tools actually in use, as bento cards |
| `skills` | Grouped skill bands |
| `testimonials` | Feedback wall. Entries flagged `draft: true` render **in development only** — unverified quotes can never reach production, and if nothing is publishable the section and its nav item both remove themselves (`hasVisibleTestimonials()`) |
| `contact` | Intro, contact details, and the optional `formEndpoint` |
| `resume` | Everything on `/resume` — summary, contact block, skill groups, experience bullets, projects, education, languages |
| `navItems` | Nav order and anchors |

Two knobs worth knowing:

- `contact.formEndpoint` — empty by default, so the contact form composes a
  `mailto:` draft to `profile.email` with no server involved. Set it to a
  Formspree URL or your own route handler and the form POSTs JSON there instead.
  See [contact-form.tsx](src/components/sections/contact-form.tsx).
- `resume.contact.phone` — set to `""` to keep the number off the public page.

Images: the portrait is local (`public/neel.png`); project covers are remote
Unsplash URLs, allowed through the optimizer by the `remotePatterns` entry in
[next.config.ts](next.config.ts). Swap in local files and that entry can go.

## The motion, and where it lives

| Section | Effect | File |
| --- | --- | --- |
| Hero | Split layout — type left, portrait right in a fixed 4:5 frame. Scroll-linked parallax and fade are **desktop-only**; on stacked mobile layouts they'd crawl the photo over the type | [sections/hero.tsx](src/components/sections/hero.tsx) |
| About | Paragraphs light up word by word, scrubbed to scroll position | [sections/about.tsx](src/components/sections/about.tsx) |
| Experience | Left column pins while the timeline scrolls; a spring-smoothed rail fills to show progress through the arc | [sections/experience.tsx](src/components/sections/experience.tsx) |
| Work | The section is taller than the viewport by exactly the track's overflow; a sticky panel translates the card track on X from that scroll progress, so vertical scroll drives a horizontal gallery. Cards open a detail modal (scroll-locked) | [sections/projects.tsx](src/components/sections/projects.tsx) |
| Services | Rows that expand into detail — hover/focus on pointer devices, tappable accordion on coarse pointers so every row is reachable | [sections/services.tsx](src/components/sections/services.tsx) |
| AI layer | Bento cards that tilt toward the pointer with a per-card accent spotlight | [sections/ai-stack.tsx](src/components/sections/ai-stack.tsx) |
| Skills | Oversized rows sliding against page scroll in alternating directions; hovering one dims its neighbours | [sections/skills.tsx](src/components/sections/skills.tsx) |
| Feedback | Featured pull-quote leading a bento wall of voices | [sections/testimonials.tsx](src/components/sections/testimonials.tsx) |
| Contact | Oversized watermark name rises as the footer arrives; click-to-copy email + the form | [sections/contact.tsx](src/components/sections/contact.tsx) |

Global pieces:

- [components/smooth-scroll.tsx](src/components/smooth-scroll.tsx) — Lenis
  inertial scrolling. Every scroll-linked animation reads from the same rAF loop,
  so nothing lags a frame behind the page. Disabled entirely under reduced motion.
- [lib/scroll-lock.ts](src/lib/scroll-lock.ts) — Lenis drives `window.scrollTo`
  itself, so `overflow: hidden` alone does **not** stop the page behind an
  overlay. Anything modal calls `useScrollLock(open)`, which tells Lenis to stand
  down (and falls back to locking `<html>` when there's no instance).
- [components/cursor.tsx](src/components/cursor.tsx) — blend-mode cursor that
  swells over elements marked `data-cursor="…"` and shows that label. Gated to
  fine pointers with motion enabled.
- [components/nav.tsx](src/components/nav.tsx) — spring pill on the active
  section, scroll-progress rail, mobile sheet. Off the home page the anchors
  become `/#section` links.
- [components/motion-primitives.tsx](src/components/motion-primitives.tsx) —
  `Reveal`, `RevealText`, `StaggerList`, `SectionLabel`. Shared entry animations
  so sections don't each reinvent one.
- [lib/use-media-query.ts](src/lib/use-media-query.ts) — returns `false` on the
  server and first paint, then settles. Use it for animation ranges, never for
  layout that must be correct in the SSR HTML.

## Design tokens

Declared once as Tailwind v4 `@theme` variables in
[src/app/globals.css](src/app/globals.css): near-black canvas (`#06070a`),
acid-lime accent (`--color-accent: #b4ff39`), cyan and violet as secondaries,
Instrument Serif display / Inter body / JetBrains Mono labels (all `next/font`).
Change the accent there and it propagates everywhere. Never hardcode a hex in a
component — per-project and per-card accents are the one exception, and those
come from `portfolio.ts`. A film-grain overlay and the print styles also live in
`globals.css`.

## Accessibility & motion

- Reduced motion is honoured throughout: Lenis and the custom cursor don't
  initialise, `motion-primitives` skips its transforms, and the hero renders
  static.
- Skip link, visible focus rings, aria-labelled icon buttons, semantic headings,
  keyboard-reachable nav with `aria-current`, and a mobile menu that locks scroll.
- Motion is transform / opacity / clip-path only — no animated `width`/`height` —
  so scrolling never triggers layout.
- Coarse-pointer paths exist wherever a hover-only interaction would otherwise
  hide content (see Services).

## Deploying to Vercel

Push the repo and import it — Vercel detects Next.js and needs no build
configuration, no `vercel.json`, and **no environment variables**. Every route
prerenders as static content, so the whole site serves from the CDN:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /opengraph-image
├ ○ /resume
├ ○ /robots.txt
└ ○ /sitemap.xml
```

Absolute URLs (OG tags, canonical, sitemap) resolve through
[lib/site-url.ts](src/lib/site-url.ts), which reads, in order:

1. `NEXT_PUBLIC_SITE_URL` — set this **only** once you have a custom domain
2. `VERCEL_PROJECT_PRODUCTION_URL` — injected by Vercel; stable across production
   deployments
3. `VERCEL_URL` — injected per deployment, so previews link to themselves
4. `http://localhost:3000` for local builds

So a first deploy already emits correct absolute URLs on its `*.vercel.app` host.
Point a domain at the project, then set `NEXT_PUBLIC_SITE_URL` to it.

## SEO

Search copy is separated from page copy on purpose. `profile.tagline` is written
to sound good in the hero; `seo.description` in
[portfolio.ts](src/content/portfolio.ts) is written for the search result, so it
names the role, the stack and the city — the words people actually type. Keep it
under ~160 characters or Google truncates it.

### Targeting two positions at once

The site shows **one** visible title — "Full Stack Developer" (`profile.role`) —
but ranks for **both** "full stack developer" and "MERN stack developer". Those
goals only conflict if you try to solve them in the visible copy; a headline
reading "Full Stack MERN Node React Developer" costs you the human reader and
buys nothing, since Google stopped rewarding repetition long ago.

So the second position is carried where machines read and people don't:

| Layer | Carries |
| --- | --- |
| `profile.role` → `<title>`, `h1`, hero | "Full Stack Developer" only. One clean title |
| `seo.description` → meta description | Both, in one natural sentence: *"Full stack developer … building MERN stack products"* |
| `seo.jobTitles` → JSON-LD `Person.jobTitle` | All six titles. schema.org permits repeated values, so the entity legitimately claims every position it covers |
| `seo.knowsAbout` → JSON-LD | "MERN stack", "Full-stack development", plus each individual technology |

Two rules if you edit this. Keep both phrases **unhyphenated** in the
description — "full-stack" is better prose but a worse match for what people
type. And keep every entry in `jobTitles` a position this page's experience
actually supports; the list is a claim about you, and inflating it is what turns
structured data from an asset into a liability.

### What's in place

| Signal | Where |
| --- | --- |
| `title` template — sub-pages set a short title, the name is appended | [layout.tsx](src/app/layout.tsx) |
| Canonical URLs on both routes | `alternates.canonical` per page |
| `robots` / `googlebot` with `max-image-preview:large` and `max-snippet:-1` — without these Google may show a clipped snippet and a thumbnail | [layout.tsx](src/app/layout.tsx) |
| Open Graph + `summary_large_image` Twitter card | [layout.tsx](src/app/layout.tsx), [resume/page.tsx](src/app/resume/page.tsx) |
| Generated 1200×630 preview image | [opengraph-image.tsx](src/app/opengraph-image.tsx) |
| `sitemap.xml`, `robots.txt` | [sitemap.ts](src/app/sitemap.ts), [robots.ts](src/app/robots.ts) |
| JSON-LD entity graph | [lib/structured-data.ts](src/lib/structured-data.ts) |

**Structured data is the part that matters most for a personal site.** Meta tags
describe a document; schema.org describes *you* as an entity. Both routes emit a
graph sharing one `Person` `@id`, so `/` and `/resume` describe the same person
rather than two people with the same name, and `sameAs` points at your GitHub and
LinkedIn so search engines merge those profiles with this one.

Everything in the graph restates what is visible on the page. That's a hard rule:
structured data claiming more than the page shows is how a site loses rich
results. Validate changes with the
[Rich Results Test](https://search.google.com/test/rich-results) and
[Schema Markup Validator](https://validator.schema.org/).

After deploying, the two things only you can do: verify the domain in
[Google Search Console](https://search.google.com/search-console) and submit
`/sitemap.xml`, and make sure your GitHub and LinkedIn profiles link *back* to
the site — `sameAs` is a claim, and a reciprocal link is what confirms it.

Other generated metadata:
[opengraph-image.tsx](src/app/opengraph-image.tsx) renders a 1200×630 card from
`profile` at build time via `next/og`, and
[sitemap.ts](src/app/sitemap.ts) / [robots.ts](src/app/robots.ts) use the App
Router metadata conventions. Add a route ⇒ add a line to `sitemap.ts`.

Still your call before going live:

1. `contact.formEndpoint` — empty ships the `mailto:` flow. Point it at Formspree
   or a route handler to capture submissions server-side.
2. The `draft` testimonials are invisible in production until you clear the flag —
   publish them or delete them.
3. `resume.contact.phone` renders publicly on `/resume`. Set it to `""` to hide it.
4. `Neel_Bhavsar_Fullstack.pdf` is gitignored on purpose — the source CV isn't
   needed to build the site, and it carries a phone number.

## Conventions

`AGENTS.md` is generated by `next dev` and re-added on every run; commit it with
your changes rather than fighting the diff.
