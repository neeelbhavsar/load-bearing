/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 *  This is the single source of truth for the whole portfolio.
 *  Values marked  // TODO  still need a real value from you.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Neel Bhavsar",
  firstName: "Neel",
  lastName: "Bhavsar",
  /**
   * The visible job title — hero, <title>, h1. Kept to the position being
   * targeted; MERN is a stack, not a title, so it earns its search visibility
   * through the description and the JSON-LD in `seo` rather than by being
   * bolted onto this line.
   *
   * Was "Backend & MERN Engineer", which contradicted the résumé's "Full Stack
   * Developer" — two titles across one site split the signal and rank for
   * neither.
   */
  role: "Full Stack Developer",
  tagline: "I build robust, scalable systems that quietly carry real products.",
  location: "Ahmedabad, India · Remote-friendly",
  availability: "Available for select work",
  yearsExperience: "5+",
  company: "Artoon Solutions Pvt. Ltd.",
  email: "neelbhavsar124@gmail.com",
  // The résumé is a page in this site, not a file to download — see /resume.
  resumeUrl: "/resume",
  socials: [
    { label: "GitHub", href: "https://github.com/neeelbhavsar" },
    { label: "LinkedIn", href: "https://linkedin.com/in/neeelbhavsar" },
    { label: "Email", href: "mailto:neelbhavsar124@gmail.com" },
  ],
  photo: "/neel.png",
} as const;

/**
 * Search-facing copy. Deliberately separate from `profile.tagline`, which is
 * written to sound good on the page — evocative lines make poor search results.
 *
 * `description` is what shows under your title in Google, so it names the role,
 * the stack and the place: the words people actually type. Keep it ~150–160
 * characters — longer gets truncated with an ellipsis.
 */
export const seo = {
  // Both target phrases appear unhyphenated, in the order people type them:
  // "full stack developer" and "MERN stack". Hyphenating "full-stack" is better
  // prose but a worse match for the query.
  description:
    "Full stack developer in Ahmedabad with 5+ years building MERN stack products — React and Next.js front-ends on Node.js, Express and NestJS APIs.",
  resumeDescription:
    "Résumé of Neel Bhavsar, full stack developer in Ahmedabad — 5+ years on MERN stack products across streaming, EdTech, sports and rentals. React, Node.js, AWS.",
  /**
   * Google ignores the keywords meta tag entirely, so this exists for the
   * JSON-LD `knowsAbout` field, which it does read. Keep it to things the page
   * genuinely evidences — inflating it is how a profile stops being trusted.
   */
  knowsAbout: [
    "Full-stack development",
    "MERN stack",
    "Node.js",
    "Express.js",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "REST API design",
    "Microservices",
    "WebSockets",
    "MongoDB",
    "PostgreSQL",
    "Neo4j",
    "Redis",
    "AWS",
    "Docker",
    "Database performance tuning",
  ],
  /** The one visible title, matching `profile.role`. Used in <title> and OG. */
  jobTitle: "Full Stack Developer",
  /**
   * Every position worth being found under. schema.org accepts repeated values
   * for `jobTitle`, so the entity can legitimately hold all of these — this is
   * where "MERN Stack Developer" earns its ranking, in machine-readable data a
   * search engine reads as equivalent titles for one person.
   *
   * Invisible to visitors by design: the page shows one clean title, while the
   * structured data covers the full set of queries. Keep every entry a title
   * the experience on this page actually supports.
   */
  jobTitles: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Full Stack MERN Developer",
    "Node.js Developer",
    "React Developer",
    "Backend Developer",
  ],
  worksFor: { name: "Artoon Solutions Pvt. Ltd.", url: "https://artoonsolutions.com" },
  alumniOf: { name: "Silver Oak University", url: "https://silveroakuni.ac.in" },
  address: { city: "Ahmedabad", region: "Gujarat", country: "IN" },
} as const;

export const about = {
  heading: "About",
  paragraphs: [
    "I help teams turn business requirements into production-ready software — secure APIs, real-time services, and well-modeled data behind clean React front-ends.",
    "MERN-stack engineer with 5+ years building full-stack web applications: React front-ends, robust RESTful APIs, secure auth flows, and databases tuned for performance and reliability. I work across relational, document and graph stores — MongoDB, MySQL, PostgreSQL, Neo4j and Redis — with a focus on efficient data modeling in polyglot architectures.",
    "My work is about turning requirements into systems that hold up: clean architecture, predictable contracts, indexes and caches that actually pay off. No compromise on the boring parts, because those are the parts that page you at 2am.",
  ],
  stats: [
    { value: "5+", label: "Years in production" },
    { value: "7", label: "Projects delivered" },
    { value: "5", label: "Databases in prod" },
    { value: "20+", label: "Tools & technologies" },
  ],
} as const;

/** What I actually get hired to do. */
export const services = {
  heading: "What I do",
  intro:
    "Four things I do end to end — from the contract on paper to the container running in production.",
  items: [
    {
      title: "API & Backend Architecture",
      accent: "#5BE9FF",
      body: "Clean, layered REST APIs with secure auth (JWT), predictable contracts, and a codebase that scales without turning into a maze.",
      points: ["REST API design", "JWT / auth flows", "Node · Express · NestJS"],
    },
    {
      title: "Real-time Systems",
      accent: "#4F9BFF",
      body: "Live, low-latency features — presence, notifications, streaming and collaboration — built on Socket.IO and event-driven services.",
      points: ["Socket.IO / WebSockets", "Live streaming (OBS)", "Presence & notifications"],
    },
    {
      title: "Database & Data Modeling",
      accent: "#C08BFF",
      body: "Polyglot persistence done right: the correct store for each job, schemas modeled for real access patterns, indexes and caching that earn their keep.",
      points: ["SQL + NoSQL + Graph", "Indexing & caching (Redis)", "Prisma · Sequelize"],
    },
    {
      title: "Full-stack Delivery",
      accent: "#B4FF39",
      body: "From requirement to shipped product — React front-ends, containerized services, and deployment on AWS. I own the whole path to production.",
      points: ["React front-ends", "Docker · AWS", "Payments (Stripe · PayPal)"],
    },
  ],
} as const;

/** Single company — the whole career arc, told as a scroll-driven timeline. */
export const experience = {
  company: "Artoon Solutions",
  companyUrl: "https://artoonsolutions.com",
  role: "Senior Backend Developer",
  period: "2021 — Present",
  location: "Surat, India · On-site",
  summary:
    "Joined as a Node.js developer building event-management systems and grew into owning backend architecture — API contracts, polyglot data modeling, real-time pipelines, and production on AWS.",
  highlights: [
    {
      year: "2021",
      title: "Node.js Developer",
      body: "Started my production journey on event-management and CMS platforms — Diamond Connect for baseball tournaments with automated scheduling and Stripe payments, then iMentor, a multi-role educational CMS with algorithmic mentor–mentee matching and built-in chat. Owned features from schema through UI.",
      tags: ["Node.js", "Express", "React", "MongoDB", "Socket.io", "Stripe", "CMS"],
    },
    {
      year: "2024",
      title: "Lead Backend Developer",
      body: "Led backend work across content, networking and streaming platforms: SpingR digital business cards with Neo4j graph-based networking, Jolt as a dual CMS + public film-streaming product on MongoDB and Auth0, and the Streamerdap pipeline that lets creators go live from OBS with PayPal billing. Modeled polyglot data across MongoDB, MySQL and Neo4j.",
      tags: ["Node.js", "Neo4j", "MongoDB", "MySQL", "Video Streaming", "Auth0"],
    },
    {
      year: "2026",
      title: "Senior Backend Developer",
      body: "Owning architecture for high-scale platforms — Braganza end to end, from an Express and PostgreSQL core with Redis caching on AWS through to the React and Next.js booking interface — and setting the API and data-modeling standards the team builds against.",
      tags: ["Node.js", "Express", "React", "Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  year: string;
  stack: readonly string[];
  ai?: string;
  metric?: string;
  image: string;
  href?: string;
  /** Shown in the modal in place of the visit button when there's no public URL. */
  linkNote?: string;
  accent: string;
  /** Long-form content shown only inside the project modal. */
  detail: {
    /** One-line positioning shown under the title in the modal. */
    kicker: string;
    /** 1–2 paragraphs on what the product is and who it serves. */
    overview: readonly string[];
    /** What I personally built / owned. */
    contributions: readonly string[];
    /** The hard parts and how they were solved. */
    challenges: readonly { title: string; body: string }[];
    /** Headline numbers / outcomes. */
    outcomes: readonly { value: string; label: string }[];
  };
};

export const projects: readonly Project[] = [
  {
    slug: "ai-library",
    title: "AI Library",
    blurb:
      "An auto-updating directory of AI Skills, MCP servers and GitHub repos, with copy-paste setup instructions generated for Claude, Cursor, Codex, Windsurf, Cline and VS Code. A daily GitHub Actions cron refreshes the catalogue — no database, no server to babysit.",
    role: "Creator · full stack",
    year: "2026",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Motion", "GitHub Actions"],
    ai: "Generates per-assistant install and usage snippets from the MCP Registry, Glama and the GitHub Search API",
    metric: "Refreshed daily, fully static",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    href: "https://mcp-skills-hub.netlify.app",
    accent: "#7CFFB2",
    detail: {
      kicker: "A self-updating catalogue of the AI tooling ecosystem",
      overview: [
        "Finding a good MCP server or Claude Skill means trawling registries, GitHub topics and half-maintained gist lists. AI Library collapses that into one searchable directory that refreshes itself every day.",
        "Every entry carries setup instructions generated per assistant — Claude, Cursor, Codex, Windsurf, Cline and VS Code each get the exact config block they need, so discovery and installation are one step instead of two.",
      ],
      contributions: [
        "Designed the whole product end to end — data model, ingestion, UI and deploy.",
        "Built the ingestion layer over the MCP Registry, Glama and the GitHub Search API, with normalisation and de-duplication across sources.",
        "Wrote the per-assistant snippet generator that turns one canonical server record into six different install formats.",
        "Ran the entire catalogue as build-time static data — no database, no runtime API, nothing to page me at 2am.",
      ],
      challenges: [
        {
          title: "Three sources, one shape",
          body: "Registry, Glama and GitHub all describe a server differently. A normalisation pass maps them onto a single record and merges duplicates by repo URL, so the same server never shows up twice under two names.",
        },
        {
          title: "Fresh without a server",
          body: "A daily GitHub Actions cron re-runs ingestion and commits the regenerated dataset, which triggers a rebuild. The site stays fully static while the content behaves like it is live.",
        },
        {
          title: "Rate limits",
          body: "The GitHub Search API is tight. Requests are batched, cached between runs and backed off on 403s, so a full refresh finishes inside one free-tier Actions window.",
        },
      ],
      outcomes: [
        { value: "6", label: "Assistants supported" },
        { value: "Daily", label: "Auto-refresh" },
        { value: "0", label: "Servers to maintain" },
      ],
    },
  },
  {
    slug: "braganza",
    title: "Braganza",
    blurb:
      "A full-stack car rental platform where users discover, book and rent vehicles through a secure, scalable system — availability, pricing and fleet state all consistent under load.",
    role: "Full stack",
    year: "2026",
    stack: ["Node.js", "Express", "React", "Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    metric: "Redis-cached availability",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.braganzaclub.com",
    accent: "#5BE9FF",
    detail: {
      kicker: "Car rental at scale — availability that never lies",
      overview: [
        "Braganza is a full-stack car rental platform: customers browse a live fleet, pick dates, price a booking and pay, while operators manage vehicles, pricing rules and handovers from an admin side.",
        "The hard requirement was consistency. A car shown as available must actually be bookable, and two people hitting checkout on the same vehicle at the same second must not both succeed.",
      ],
      contributions: [
        "Worked across the whole stack — Express API and PostgreSQL data model through to the React and Next.js booking interface.",
        "Modelled fleet, availability windows, pricing rules and bookings in PostgreSQL, with typed contracts shared end to end in TypeScript.",
        "Built the Redis availability cache with targeted invalidation on every booking state change.",
        "Built the customer-facing booking flow in Next.js — fleet browsing, date selection, live quotes and checkout — plus the operator admin views.",
        "Owned the AWS deployment and the caching strategy behind it.",
      ],
      challenges: [
        {
          title: "Double-booking under load",
          body: "Availability checks and booking creation run inside a single transaction with row-level locking on the vehicle, so concurrent checkouts serialise instead of racing. The loser gets a clean conflict response, not a corrupted booking.",
        },
        {
          title: "Search that stays fast",
          body: "Date-range availability across the whole fleet is expensive to compute per request, so results are cached in Redis keyed by fleet segment and window, and invalidated precisely when a booking touches that window rather than flushed wholesale.",
        },
        {
          title: "Pricing that changes shape",
          body: "Seasonal rates, durations and add-ons all stack. Pricing lives in a rule table evaluated in a deterministic order, which keeps quotes reproducible and auditable long after the booking is made.",
        },
        {
          title: "One quote, two places",
          body: "The price a customer sees while picking dates has to match what the API charges at checkout. Pricing is computed server-side and the Next.js front-end renders only what the API returns, so there is no second implementation to drift.",
        },
      ],
      outcomes: [
        { value: "0", label: "Double bookings" },
        { value: "Redis", label: "Cached availability" },
        { value: "AWS", label: "Production deploy" },
      ],
    },
  },
  {
    slug: "streamerdap",
    title: "Streamerdap",
    blurb:
      "A web-based live streaming platform that lets creators go live straight from the OBS Browser source, with PayPal-backed subscriptions and plan-gated features.",
    role: "Backend lead",
    year: "2025",
    stack: ["Node.js", "MySQL", "Sequelize", "PayPal API", "OBS"],
    metric: "Stream direct from OBS",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.streamerdap.com",
    accent: "#4F9BFF",
    detail: {
      kicker: "Go live from OBS — no desktop app, no plugin",
      overview: [
        "Streamerdap turns a browser URL into a streaming surface. Creators drop it into an OBS Browser source and their stream runs straight from the web app — nothing to install, nothing to update.",
        "Around that sits the business: PayPal subscriptions, renewal handling and plan-based feature gating, so what a creator can do on air follows the plan they are actually paying for.",
      ],
      contributions: [
        "Led the backend — MySQL schema via Sequelize, REST API and the PayPal integration.",
        "Built the OBS-facing token flow so a browser source authenticates without a login screen inside OBS.",
        "Implemented subscription lifecycle handling: checkout, renewal, cancellation and plan-based feature gating.",
        "Modelled creators, channels, plans and entitlements so a feature check is one query, not a chain of them.",
      ],
      challenges: [
        {
          title: "Auth inside a headless browser",
          body: "The OBS Browser source cannot show a login. Each creator gets a signed, scoped, revocable token embedded in the URL — enough to render their own stream surface and nothing else.",
        },
        {
          title: "Webhooks you can trust",
          body: "PayPal webhooks arrive out of order and sometimes twice. Every event is signature-verified and applied idempotently against a stored subscription state machine, so a replayed renewal never grants a second month.",
        },
        {
          title: "Entitlements that hold mid-stream",
          body: "A plan can lapse while a creator is live. Entitlements are resolved server-side per request against the subscription state rather than trusted from the session, so a downgrade takes effect without needing the creator to reconnect.",
        },
      ],
      outcomes: [
        { value: "Zero", label: "Install for creators" },
        { value: "PayPal", label: "Recurring billing" },
        { value: "Plan", label: "Gated features" },
      ],
    },
  },
  {
    slug: "jolt",
    title: "Jolt",
    blurb:
      "A dual-purpose platform: a CMS for the team that publishes the catalogue, and a public film-streaming interface for everyone watching it.",
    role: "Backend lead",
    year: "2025",
    stack: ["Node.js", "Express", "MongoDB", "Video Streaming", "CMS", "Auth0"],
    metric: "One backend, two products",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.jolt.film",
    accent: "#C08BFF",
    detail: {
      kicker: "One backend serving a CMS and a streaming front-end",
      overview: [
        "Jolt is two products on one spine. Internally it is a CMS where the team ingests films, writes metadata, manages categories and controls what goes live. Externally it is a public streaming interface where audiences browse and watch.",
        "Both read the same MongoDB catalogue, which means an editorial change is visible on the public site without a sync job or a second source of truth.",
      ],
      contributions: [
        "Led the backend for both surfaces — Express API boundaries over one shared MongoDB model, with separate permission layers.",
        "Built the film ingestion and metadata pipeline, including encoding status tracking through to publish.",
        "Implemented range-request video delivery for seek-friendly playback.",
        "Modelled publishing state so drafts, scheduled and live content are the same documents under different visibility rules.",
        "Integrated Auth0 for identity, so the editorial team and public viewers authenticate through one managed provider instead of a hand-rolled login.",
      ],
      challenges: [
        {
          title: "Two audiences, one schema",
          body: "The CMS needs everything; the public site must never leak drafts or internal notes. Rather than duplicating the catalogue, visibility is enforced at the query layer with separate read models over the same collections.",
        },
        {
          title: "Two audiences, one identity provider",
          body: "Editors and viewers are the same Auth0 tenant but must not share permissions. Roles come off the token and map to the API's own permission layer, so a viewer session can never reach a CMS route even when the login is identical.",
        },
        {
          title: "Seeking without buffering",
          body: "Video is served over HTTP range requests so the player can jump to any timestamp without pulling the whole file, which cut both seek time and bandwidth on long films.",
        },
        {
          title: "Encoding is slow, the UI is not",
          body: "Upload and encode are decoupled from the request cycle. The CMS tracks per-film processing state so editors see accurate progress and cannot publish something still mid-encode.",
        },
      ],
      outcomes: [
        { value: "2", label: "Products, one backend" },
        { value: "Instant", label: "Editorial to live" },
        { value: "Range", label: "Streaming delivery" },
      ],
    },
  },
  {
    slug: "spingr",
    title: "SpingR",
    blurb:
      "Design, share and manage digital business cards — with graph-based networking in Neo4j so a connection two hops away is a query, not a guess.",
    role: "Backend lead",
    year: "2024",
    stack: ["Node.js", "Neo4j", "MongoDB", "WebSockets", "JWT"],
    metric: "Graph-modeled networking",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1600&auto=format&fit=crop",
    linkNote: "Shipped as a mobile application — no public web URL",
    accent: "#B4FF39",
    detail: {
      kicker: "Digital business cards backed by a real social graph",
      overview: [
        "SpingR lets people design, share and manage digital business cards — but the interesting half is what happens after a card is shared. Every exchange becomes an edge in a Neo4j graph.",
        "That turns networking questions into queries: who do we both know, who is two hops from this prospect, which introduction is shortest. In a document store those are guesses; in a graph they are traversals.",
      ],
      contributions: [
        "Led the backend and chose the polyglot split — Neo4j for relationships, MongoDB for card content and media.",
        "Modelled the connection graph and wrote the traversal queries behind mutual-connection and path suggestions.",
        "Built JWT auth, card sharing flows and share-link handling.",
        "Added WebSocket notifications so a card scan or new connection surfaces immediately.",
      ],
      challenges: [
        {
          title: "Choosing the right store — twice",
          body: "Card documents are nested and read-heavy; connections are relationship-heavy and queried by depth. Splitting them across MongoDB and Neo4j kept both fast, at the cost of coordinating writes across two databases.",
        },
        {
          title: "Keeping two databases honest",
          body: "A connection touches both stores. Writes are ordered so the graph edge is only created after the card record commits, with a reconciliation pass that repairs any orphaned node left by a failed write.",
        },
        {
          title: "Traversals that stay bounded",
          body: "Unbounded friend-of-friend queries explode on well-connected users. Depth caps, indexed relationship types and result limits keep suggestion queries inside a predictable time budget regardless of network size.",
        },
      ],
      outcomes: [
        { value: "2-hop", label: "Connection discovery" },
        { value: "Graph", label: "Native relationships" },
        { value: "Live", label: "Connection alerts" },
      ],
    },
  },
  {
    slug: "imentor",
    title: "iMentor",
    blurb:
      "A CMS-driven educational platform with multi-role admin support, automated mentor–mentee matching and built-in chat, so a pair can talk without leaving the programme.",
    role: "Full stack",
    year: "2023",
    stack: ["Node.js", "Express", "React", "Next.js", "MongoDB", "CMS", "Socket.io"],
    metric: "Matching, no spreadsheets",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    href: "https://pilot.imentor.org",
    accent: "#FFD75B",
    detail: {
      kicker: "Mentor matching that used to live in a spreadsheet",
      overview: [
        "iMentor is a CMS-driven education platform where coordinators, mentors, mentees and admins each get their own view of the same programme. Content, cohorts and progress all run through the CMS.",
        "Its centre of gravity is matching. Pairing mentors to mentees was a manual, spreadsheet-driven exercise; here it is an algorithm over availability, subject, capacity and preference, with coordinators keeping final say.",
        "Once paired, they stay inside the platform: mentor and mentee talk over built-in chat, so the conversation is part of the programme record rather than scattered across personal WhatsApp threads.",
      ],
      contributions: [
        "Built full stack — Express API, MongoDB schema, matching algorithm, and the React and Next.js interfaces for every role.",
        "Built the React front-end for the coordinator console and the mentor and mentee dashboards, sharing one component layer across all four roles.",
        "Designed the multi-role permission model covering admin, coordinator, mentor and mentee.",
        "Implemented the scored matching engine with weighted criteria and manual override.",
        "Built the in-app chat on Socket.io — mentor–mentee threads with delivery state, unread counts and message history.",
        "Added live updates over the same socket layer so cohort and assignment changes appear without reloading.",
      ],
      challenges: [
        {
          title: "Matching is not one rule",
          body: "Subject fit, availability overlap, mentor capacity and stated preference all matter, and they conflict. Each pairing gets a weighted score with the reasoning exposed, so coordinators can see why a match was proposed and override it.",
        },
        {
          title: "Four roles, one API",
          body: "Every endpoint means something different per role. Permissions are declared per resource and enforced in one middleware layer rather than scattered through handlers, which kept the surface auditable as roles grew.",
        },
        {
          title: "Capacity without overload",
          body: "Assignment respects per-mentor load limits inside the allocation pass, so a strong-fit mentor never quietly ends up with eight mentees while others sit idle.",
        },
        {
          title: "Chat that survives a refresh",
          body: "A socket connection is not a record. Every message is persisted before it is broadcast, so history, unread counts and delivery state all rebuild from the database when a mentee reopens the app on a different device.",
        },
      ],
      outcomes: [
        { value: "4", label: "Distinct roles" },
        { value: "Auto", label: "Mentor matching" },
        { value: "In-app", label: "Mentor chat" },
      ],
    },
  },
  {
    slug: "diamond-connect",
    title: "Diamond Connect",
    blurb:
      "A cross-platform app for running baseball tournaments end to end — team registration, Stripe payments, automated scheduling and scores from the field.",
    role: "Backend developer",
    year: "2021 — 2023",
    stack: ["Node.js", "Express", "MongoDB", "CMS", "Stripe", "Cross-platform", "Event Management"],
    metric: "Automated scheduling",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1600&auto=format&fit=crop",
    href: "https://diamondconnect.com",
    accent: "#FF7A5B",
    detail: {
      kicker: "Tournament logistics, automated end to end",
      overview: [
        "Diamond Connect runs youth baseball tournaments end to end: teams register and pay, brackets and schedules generate themselves, and results come back from the field to everyone following the tournament.",
        "It was my first production system, and the one that taught me that the scheduling constraint nobody mentions in the requirements is the one that breaks your weekend.",
      ],
      contributions: [
        "Backend development — MongoDB schema, Express REST API and the Stripe payment integration.",
        "Built the scheduling engine that generates brackets and game slots from team counts and field availability.",
        "Integrated Stripe for registration fees with webhook-confirmed enrolment.",
        "Built the event-management and CMS layer behind tournaments, divisions, teams and fixtures, feeding one API to the cross-platform client.",
      ],
      challenges: [
        {
          title: "Scheduling is a constraint problem",
          body: "Fields, umpires, rest windows between games and team availability all constrain each other. The generator assigns slots against those constraints and reports genuine conflicts instead of silently producing an impossible schedule.",
        },
        {
          title: "Paid means enrolled",
          body: "A team is only registered once Stripe confirms via webhook, not when the client thinks checkout succeeded. Idempotent webhook handling means a retried event never creates a duplicate registration.",
        },
        {
          title: "Scores from a patchy field connection",
          body: "Scorekeepers work on stadium wifi. Updates are queued client-side and reconciled when the connection returns, so a dropped signal delays the feed rather than losing an inning.",
        },
      ],
      outcomes: [
        { value: "Auto", label: "Bracket scheduling" },
        { value: "Stripe", label: "Registration payments" },
        { value: "1 API", label: "Every platform" },
      ],
    },
  },
];

/** AI workflow — the tools woven into how I design, debug and ship. */
export const aiStack = {
  heading: "AI workflow",
  title: "I build with AI, daily",
  intro:
    "Modern engineering is AI-augmented. These are the tools woven into how I design, debug, and ship.",
  tools: [
    {
      name: "Cursor",
      role: "pair programming",
      accent: "#5BE9FF",
      desc: "AI-native editor for fast, context-aware code across large backend codebases.",
    },
    {
      name: "Claude",
      role: "reasoning",
      accent: "#FF7A5B",
      desc: "Architecture reviews, tricky debugging, and turning specs into implementation plans.",
    },
    {
      name: "Gemini",
      role: "multimodal",
      accent: "#4F9BFF",
      desc: "Multimodal exploration, docs and quick research while building.",
    },
    {
      name: "GitHub Copilot",
      role: "code completion",
      accent: "#C08BFF",
      desc: "Inline completion in the editor — boilerplate, tests and repetitive refactors, without leaving the file.",
    },
  ],
} as const;

export const skills = [
  {
    group: "Languages & Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "NestJS", "REST", "Socket.IO", "WebSockets"],
  },
  {
    group: "Data",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Neo4j", "Redis", "Prisma", "Sequelize"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Docker", "Git", "Postman"],
  },
  {
    group: "Integrations",
    items: ["Stripe", "PayPal", "Twilio", "OBS"],
  },
] as const;

/**
 * Feedback from colleagues and clients. Only real, received feedback goes in
 * here — invented words next to a real person's name and company is a
 * fabricated endorsement, and this section is where a visitor trusts you most.
 *
 * To add one: append an entry with what was actually said (a client email, an
 * appraisal line, a Slack message). Set `draft: true` while you're still
 * checking the wording — drafts render in `next dev` and are stripped from
 * production builds, and with nothing published the section and its nav item
 * remove themselves.
 */
export type Testimonial = {
  /**
   * The pull-quote. For a long piece of feedback this is one verbatim sentence
   * from it — never a paraphrase, and never words stitched together from
   * different parts. The rest goes in `body`, in the order it was written.
   */
  quote: string;
  /** Remaining paragraphs of a longer quote, verbatim. Featured entries only. */
  body?: readonly string[];
  name: string;
  /** May be empty when the person's title isn't known. */
  role: string;
  company: string;
  /** "Client" | "Manager" | "Teammate" — shown as a small tag. */
  relation: string;
  /** Which work the feedback is about. */
  projects?: readonly string[];
  accent: string;
  /** Featured entries lead the section in a larger pull-quote. */
  featured?: boolean;
  draft?: boolean;
};

export const testimonials = {
  heading: "Feedback",
  title: "What they said",
  intro:
    "A client I worked for on contract, and the team leader I report to at Artoon — on what it was actually like.",
  items: [
    /**
     * Real, published. The pull-quote is the closing line of the feedback; the
     * paragraphs below it are the rest, verbatim and in the original order, so
     * nothing is duplicated and nothing is paraphrased.
     */
    {
      quote:
        "If there was a mission-critical feature that absolutely had to be correct, Neel was the first guy I'd trust with it.",
      body: [
        "I'll never forget his first project on contract - the PayPal subscription billing implementation.",
        "In over 15 years of building software, I have never seen a payment processor integration delivered 100% complete on the first pass with zero bugs. I don't think anyone on this email thread has. Certainly not with that many permutations. Until Neel.",
        "That delivery permanently changed my expectations. He did what I thought was impossible - because I hadn't seen it before him - he showed me a unicorn. Truly zero bugs - and it took me several days of heavy testing to fully believe it, I refused to believe it. But he did. It wasn't luck either. Every difficult feature that followed was handled with the same calm confidence, thoughtful questions, and incredibly clean implementation. As Howard (our pseudo CTO) introduced stronger engineering standards, Neel embraced them immediately and continued growing into an engineer I trusted with the most complex work on the platform.",
      ],
      name: "Spyder O'Neil",
      role: "",
      company: "Braganza · Streamerdap",
      relation: "Client",
      projects: ["Streamerdap", "Braganza"],
      accent: "#B4FF39",
      featured: true,
      draft: false,
    },
    /**
     * Real, published. Three consecutive weekly performance reviews merged into
     * one. These arrived as bullet points and were set as prose at Neel's
     * request: every fact and nearly every phrase is Karan's, but the sentences
     * that join them are edited, so this is a faithful edit rather than a
     * word-for-word transcript. Repeated lines were deduplicated and obvious
     * typos corrected (Brainstrome → Brainstorm, adpoted → adopted, vehcile →
     * vehicle). The pull-quote is one of his lines verbatim.
     */
    {
      quote: "Demonstrating high performance under tight time-line of delivery.",
      body: [
        "He brainstorms and prioritises flow and model discussion before starting any development work, and follows the proper guidelines and deployment workflow of the project.",
        "He successfully completed and delivered M1 of Braganza Collezione, along with the check-out check-in flow for vehicle management and the Owner and Broker portal. He built a new Vehicle Ownership domain layer — validation, persistence repositories, role verification, ownership-event tracking and pricing-flow integration — to support future owner/broker revenue-sharing workflows, and added new broker-management capabilities including detailed broker profile APIs, payout-history ledger endpoints, agency-scoped access controls and enhanced revenue-split tracking.",
        "Using Claude Code, he redesigned the migration rollout strategy by splitting the large phase-2 migration into staged idempotent transactions, allowing safer deploy recovery, isolated rollback handling and reduced risk of partial migration failures during production deployments. He also strengthened the broker and booking workflows, refactored the Order Notes module, and implemented third party integration with perfection.",
        "He quickly understood and adopted the ASL-ERP by code review, and now works on its master modules — Charges Types, Vessel Master, Port Master, Country Master, MIS Report BL register, BI types and Job status AIR modules. He implements the frontend module as well for his assigned module or task, and utilises Claude Code AI to perform daily task and module work. Keep up the good work!",
      ],
      name: "Karan Rana",
      role: "Team Leader",
      company: "Artoon Solutions",
      relation: "Team Leader",
      accent: "#5BE9FF",
      featured: true,
      draft: false,
    },
  ] as readonly Testimonial[],
} as const;

/**
 * Whether the feedback section has anything to show: any published entry, or
 * any entry at all in development (where drafts render for review). The nav
 * reads this too, so #feedback never becomes a dead anchor in production.
 */
export function hasVisibleTestimonials() {
  if (process.env.NODE_ENV !== "production") return testimonials.items.length > 0;
  return testimonials.items.some((t) => !t.draft);
}

export const contact = {
  heading: "Contact",
  intro:
    "Have a backend that needs architecting, a real-time feature that has to hold up, or a product that needs shipping end to end? Tell me about it.",
  /**
   * The form has no server. On submit it composes a mail draft to profile.email.
   * To take submissions server-side instead, set this to your form endpoint
   * (Formspree, Resend route handler, etc.) — the component posts JSON to it.
   */
  formEndpoint: "", // TODO optional: e.g. "https://formspree.io/f/xxxxxxx"
  details: [
    { label: "Email", value: "neelbhavsar124@gmail.com" },
    { label: "Based in", value: "Ahmedabad, India · Remote-friendly" },
    { label: "Response time", value: "Within 24 hours" },
    { label: "Currently", value: "Available for select work" },
  ],
} as const;

/**
 * Résumé content, transcribed from Neel_Bhavsar_Fullstack.pdf.
 * This drives /resume — the CV lives in the site as a real page rather than a
 * PDF download, so the Résumé button opens it instead of pulling a file.
 */
export const resume = {
  title: "Full Stack Developer",
  summary:
    "Full Stack Developer with 5+ years of experience building scalable, high-performance web applications across Streaming, EdTech, Sports, and Rentals domains. Specialised in the MERN stack (MongoDB, Express.js, React, Node.js) with strong command of Next.js, TypeScript, and modern UI development. Skilled in designing RESTful APIs and microservices, translating Figma designs into responsive interfaces, and optimising frontend and backend performance. Reduced API response times by 70% and improved application performance by 80%, with experience leading teams and delivering end-to-end products on AWS.",
  /** Set `phone: ""` to keep the number off a public page. */
  contact: {
    location: "Ahmedabad, India",
    phone: "+91 99045 48741",
    email: "neelbhavsar124@gmail.com",
    linkedin: "linkedin.com/in/neeelbhavsar",
    github: "github.com/neeelbhavsar",
  },
  skills: [
    {
      group: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Material UI",
        "Responsive Design",
      ],
    },
    {
      group: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "NestJS",
        "RESTful APIs",
        "Microservices",
        "WebSockets (Socket.io)",
      ],
    },
    {
      group: "Databases & Data Stores",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Neo4j"],
    },
    { group: "Data Access & ORMs", items: ["Prisma", "Sequelize"] },
    {
      group: "Cloud & DevOps",
      items: ["AWS (EC2, RDS, S3, SES, Cognito, Secrets Manager)", "Docker", "CI/CD", "Git"],
    },
    { group: "Auth & Security", items: ["Auth0", "AWS Cognito", "JWT", "OAuth 2.0"] },
    {
      group: "Payments & Integrations",
      items: ["Stripe", "PayPal", "Twilio", "SendGrid", "Firebase"],
    },
    {
      group: "Practices & Tools",
      items: [
        "REST API Design",
        "Figma-to-UI",
        "Agile / Scrum",
        "Postman",
        "RabbitMQ",
        "Redis Bull",
      ],
    },
  ],
  experience: [
    {
      company: "Artoon Solutions Pvt. Ltd.",
      role: "Full Stack Developer",
      period: "Apr 2021 — Present",
      location: "India",
      bullets: [
        "Architected and delivered 6 production web applications end-to-end using the MERN stack, serving 50,000+ active users across multiple platforms.",
        "Built responsive, component-driven frontends with React, Next.js, and TypeScript, converting Figma designs into pixel-accurate, reusable UI components styled with Tailwind CSS and Material UI.",
        "Reduced API response times by 70% via strategic database indexing, Redis caching, and background job processing, achieving P95 latency under 250 ms.",
        "Improved application throughput by 80% through code refactoring and N+1 query elimination, enabling 3x traffic without added infrastructure cost.",
        "Optimised frontend UI performance using code splitting, lazy loading, and render optimisation to improve perceived load times.",
        "Developed secure authentication using Auth0 and AWS Cognito, maintaining zero security incidents for 10,000+ users.",
        "Integrated Stripe and PayPal to process USD 50,000+ in monthly transactions, building both API integration and frontend checkout flows.",
        "Built real-time features with Socket.io at sub-100 ms notification latency; deployed AWS infrastructure with 99.9% uptime.",
        "Led a team of 5 developers, conducting code reviews and mentoring junior engineers while aligning delivery with business goals.",
      ],
    },
  ],
  projects: [
    {
      name: "Braganza Auto Collezione",
      kind: "Car Rental Platform",
      period: "Jan 2026 — Present",
      bullets: [
        "Built end-to-end on the MERN stack, developing both the React frontend and Node.js/Express backend for a marketplace managing 200+ vehicles.",
        "Developed responsive UI from Figma designs; booking interface reduced customer support tickets by 40%. Integrated Booqable and real-time WebSocket booking updates.",
      ],
    },
    {
      name: "Streamerdap",
      kind: "Live Streaming Platform",
      period: "Jul 2025 — Jan 2026",
      bullets: [
        "Developed backend supporting 500+ concurrent streamers; built a PayPal payout system processing 5,000+ weekly payouts at 99.5% accuracy.",
        "Optimised database performance, reducing dashboard load times by 55% during peak traffic.",
      ],
    },
    {
      name: "Jolt",
      kind: "CMS & Film Streaming Platform",
      period: "Mar 2025 — Jul 2025",
      bullets: [
        "Architected a dual-purpose CMS and streaming platform with media uploads and controlled publishing workflows, using scalable AWS S3 pipelines.",
      ],
    },
    {
      name: "SpingR",
      kind: "Professional Networking Platform",
      period: "Jul 2024 — Feb 2025",
      bullets: [
        "Implemented graph-based relationship discovery with Neo4j (sub-200 ms queries across 100,000+ nodes); built a digital business card platform and real-time chat for 10,000+ professionals.",
      ],
    },
    {
      name: "iMentor",
      kind: "EdTech Mentorship Platform",
      period: "Aug 2023 — Jun 2024",
      bullets: [
        "Architected a CMS-driven platform across 3 educational institutions; designed an automated mentor–mentee matching algorithm improving satisfaction scores by 35%.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering in Information Technology",
      school: "Silver Oak University — Ahmedabad, India",
      year: "2018",
    },
  ],
  languages: [
    { name: "English", level: "Full professional proficiency" },
    { name: "Hindi", level: "Native" },
    { name: "Gujarati", level: "Native" },
  ],
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Skills", href: "#skills" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contact", href: "#contact" },
] as const;
