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
   * Must match the résumé's title (resume.title). Was "Backend & MERN
   * Engineer", then "Full Stack Developer" — two titles across one site split
   * the signal and rank for neither.
   */
  role: "Senior Full Stack Developer",
  tagline: "I build robust, scalable systems that quietly carry real products.",
  location: "Ahmedabad, India · Remote worldwide",
  /**
   * The hero badge. Says plainly that this is a job search, not freelance
   * cherry-picking ("Available for Selected Work" read as the latter).
   */
  availability: "Open to Senior Full Stack / Backend roles · Immediate joiner",
  /** Job-search facts, reused by the hero, contact section, résumé and PDF. */
  jobSearch: {
    roles: "Senior Full Stack / Backend roles",
    noticePeriod: "Immediate",
    workPreference: "remote work from anywhere, worldwide",
  },
  /**
   * One-line impact summary under the name. Every figure here is one the
   * résumé and the About stats already carry.
   */
  impact: [
    "5+ yrs",
    "NestJS / Node.js",
    "Systems serving 50k+ users",
    "$50k a month in payments",
  ],
  /** The promotion is the strongest seniority signal, so the hero names it. */
  promotion: { title: "Lead Backend Developer", year: "2024" },
  yearsExperience: "5+",
  company: "Artoon Solutions Pvt. Ltd.",
  email: "neelbhavsar124@gmail.com",
  // The résumé is a page (/resume) and also an ATS-friendly PDF built from the
  // same data (/resume.pdf), for HR teams that need a file to forward.
  resumeUrl: "/resume",
  resumePdfUrl: "/resume.pdf",
  resumePdfName: "Neel-Bhavsar-Senior-Full-Stack-Developer-Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/neeelbhavsar" },
    { label: "LinkedIn", href: "https://linkedin.com/in/neeelbhavsar" },
    { label: "Email", href: "mailto:neelbhavsar124@gmail.com" },
  ],
  photo: "/neel.jpg",
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
  // "full stack developer" stays unhyphenated, the way people type it.
  // Hyphenating "full-stack" is better prose but a worse match for the query.
  // MERN is no longer in the visible copy (the résumé dropped it); it stays in
  // knowsAbout and jobTitles below, where it still earns search coverage.
  description:
    "Senior full stack developer in Ahmedabad with 5+ years building React, Next.js and NestJS products across ERP and logistics, streaming, EdTech and rentals.",
  resumeDescription:
    "Résumé of Neel Bhavsar, senior full stack developer in Ahmedabad: 5+ years across ERP and logistics, streaming, EdTech, sports and rentals. React, NestJS, AWS.",
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
    // Added once the case studies made these demonstrable on the site itself:
    // Streamerdap (live streaming, PayPal payouts), Braganza (Redis-cached
    // availability, Stripe) and SpingR (graph modelling) each evidence one.
    // The rule holds — nothing here that a page does not show.
    "Real-time systems",
    "Live video streaming",
    "Payment integration (Stripe, PayPal)",
    "Graph data modeling",
    // Evidenced by the ASL ERP case study.
    "Enterprise resource planning (ERP)",
    "Role-based access control",
  ],
  /** The one visible title, matching `profile.role`. Used in <title> and OG. */
  jobTitle: "Senior Full Stack Developer",
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
  // Two, not six. Near-duplicate titles ("Full Stack MERN Developer" next to
  // "MERN Stack Developer") read as keyword stuffing; the stack keywords are
  // carried by knowsAbout instead.
  jobTitles: ["Senior Full Stack Developer", "MERN Stack Developer"],
  worksFor: { name: "Artoon Solutions Pvt. Ltd.", url: "https://artoonsolutions.com" },
  alumniOf: { name: "Silver Oak University", url: "https://silveroakuni.ac.in" },
  address: { city: "Ahmedabad", region: "Gujarat", country: "IN" },
} as const;

export const about = {
  heading: "About",
  /**
   * Third-person, self-contained answer to "who is Neel Bhavsar" — the passage
   * search and AI engines can lift whole. Every fact in it appears elsewhere on
   * the site; keep it that way when the résumé changes.
   */
  brief:
    "Neel Bhavsar is a senior full stack developer based in Ahmedabad, India, with 5+ years building production web applications. He has been at Artoon Solutions since April 2021, where he works across the stack: React and Next.js front-ends on Node.js, Express and NestJS APIs, with MongoDB, PostgreSQL, MySQL, Neo4j and Redis chosen to fit each product. His work includes 30+ screens and billing APIs for a 520-screen logistics ERP, a car rental platform managing 200+ vehicles, a live streaming platform supporting 500+ concurrent streamers with PayPal subscriptions and payouts, and Stripe and PayPal integrations handling USD 50,000+ a month. He has cut API response times by 70% through indexing and Redis caching, was promoted to Lead Backend Developer in 2024, and leads a team of five developers. He is open to senior full stack and backend roles and can join immediately.",
  paragraphs: [
    "I help teams turn business requirements into production-ready software — secure APIs, real-time services, and well-modeled data behind clean React front-ends.",
    "Senior full stack developer with 5+ years building web applications: React front-ends, robust RESTful APIs, secure auth flows, and databases tuned for performance and reliability. I work across relational, document and graph stores — MongoDB, MySQL, PostgreSQL, Neo4j and Redis — with a focus on efficient data modeling in polyglot architectures.",
    "My work is about turning requirements into systems that hold up: clean architecture, predictable contracts, indexes and caches that actually pay off. No compromise on the boring parts, because those are the parts that page you at 2am.",
  ],
  /**
   * Outcomes, not inventory. "5 databases" and "20+ tools" counted what was
   * touched, which every CV claims; these are measured results, and each one is
   * the same figure the résumé bullets carry — so the homepage and /resume
   * corroborate each other instead of a visitor having to dig for the proof.
   */
  stats: [
    { value: "70%", label: "Faster API responses" },
    { value: "50k+", label: "Users served" },
    { value: "$50k", label: "Monthly payments processed" },
    { value: "5+", label: "Years in production" },
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
  // Must match resume.experience[0].role — same company with two different
  // titles across two pages is the kind of thing a recruiter reads as careless.
  role: "Senior Full Stack Developer",
  period: "2021 — Present",
  location: "Ahmedabad, India · On-site",
  summary:
    "Joined as a Node.js developer building event-management systems, grew into owning backend architecture, and now work across the whole stack: API contracts, polyglot data modeling, real-time pipelines, React front-ends and production on AWS.",
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
      // Rendered as a badge: the promotion is the clearest seniority signal on
      // the page, so it should not read as just another row.
      milestone: "Promoted",
      body: "Promoted to own backend delivery across content, networking and streaming platforms: SpingR digital business cards with Neo4j graph-based networking, Jolt as a dual CMS + public film-streaming product on MongoDB and Auth0, and the Streamerdap pipeline that lets creators go live from OBS with PayPal billing. Modeled polyglot data across MongoDB, MySQL and Neo4j.",
      tags: ["Node.js", "Neo4j", "MongoDB", "MySQL", "Video Streaming", "Auth0"],
    },
    {
      year: "2026",
      // The current milestone, so it has to carry the current title too —
      // otherwise the timeline reintroduces the contradiction the header fixes.
      title: "Senior Full Stack Developer",
      body: "Owned Braganza's architecture end to end, from an Express and PostgreSQL core with Redis caching on AWS through to the React and Next.js booking interface. Now building screens, billing APIs and approval workflows for ASL ERP, a 520-screen logistics platform on React, NestJS and Prisma, while setting the API and data-modeling standards the team builds against.",
      tags: ["React", "Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Redis", "AWS"],
    },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  /**
   * Short plain-words description of what the product is ("Logistics ERP").
   * Used in the case-study <title>, breadcrumbs and every internal link to the
   * page, so the anchor text tells Google what it will find there.
   */
  category: string;
  blurb: string;
  /**
   * Hand-written search description, ≤ 155 characters. Only needed where the
   * blurb is too long to fit a result; otherwise the blurb is used as is.
   */
  seoDescription?: string;
  role: string;
  /** Four-digit year, machine-readable (schema.org dateCreated, OG image). */
  year: string;
  /**
   * What visitors see: "Mon YYYY — Mon YYYY", matching the résumé periods.
   * A bare year next to the card index read as "202602" to text extractors.
   */
  period: string;
  /**
   * Client work delivered as an Artoon employee, or a personal project. Said
   * on every card so overlapping dates never read as moonlighting.
   */
  engagement: "artoon-client" | "personal";
  /**
   * Stack, most recruiter-relevant first. Every entry is shown — a "+3" chip
   * hid exactly the keywords people scan for.
   */
  stack: readonly string[];
  ai?: string;
  metric?: string;
  image: string;
  href?: string;
  /** Public source repository, when there is one. */
  repo?: string;
  /**
   * What I owned on the project, beyond the feature list. Only facts that are
   * true go here: leave `team` out rather than guess a number.
   */
  ownership?: {
    /** e.g. "Team of 15+ engineers". */
    team?: string;
    /** My scope inside it, e.g. "30+ of ~520 screens". */
    scope?: string;
    /** Technical decisions I made and answered for. */
    decisions: readonly string[];
  };
  /**
   * Request path through the system, drawn as a diagram on the case study.
   * `flow` is the main path left to right; `aside` holds the supporting
   * services hanging off it (queues, caches, storage, third parties).
   */
  architecture?: {
    flow: readonly ArchNode[];
    aside?: readonly ArchNode[];
    caption: string;
  };
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

export type ArchNode = {
  name: string;
  tech: string;
  note?: string;
};

/** Visible label for each engagement type. */
export const engagementLabel: Record<Project["engagement"], string> = {
  "artoon-client": "Client project · delivered at Artoon Solutions",
  personal: "Personal project",
};

/**
 * Last real content change, ISO date. Feeds the sitemap's <lastmod>, which
 * Google uses to decide what to crawl next — and trusts only while it stays
 * accurate. Bump it when page content actually changes, not on every deploy.
 */
export const contentUpdated = "2026-11-21";

export const projects: readonly Project[] = [
  {
    slug: "ai-library",
    category: "AI tooling directory",
    title: "AI Library",
    seoDescription:
      "A self-updating directory of AI Skills, MCP servers and GitHub repos, with copy-paste setup for Claude, Cursor, Codex and more, refreshed daily by a cron.",
    blurb:
      "An auto-updating directory of AI Skills, MCP servers and GitHub repos, with copy-paste setup instructions generated for Claude, Cursor, Codex, Windsurf, Cline and VS Code. A daily GitHub Actions cron refreshes the catalogue — no database, no server to babysit.",
    role: "Creator · full stack",
    year: "2026",
    period: "Jul 2026 — Present",
    engagement: "personal",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Motion", "GitHub Actions"],
    ai: "Generates per-assistant install and usage snippets from the MCP Registry, Glama and the GitHub Search API",
    metric: "Refreshed daily, fully static",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    // The Netlify deploy is gone (404); Vercel is the live one, and the one the
    // repo's own homepage field points at.
    href: "https://mcp-skills-hub.vercel.app",
    repo: "https://github.com/neeelbhavsar/mcp-skills-hub",
    ownership: {
      team: "Solo",
      scope: "Product, data pipeline, UI and deploy",
      decisions: [
        "Build-time static data instead of a database, so there is no runtime to keep alive.",
        "A single canonical server record, rendered into six assistant-specific install formats.",
        "A daily GitHub Actions cron as the only moving part, kept inside the free-tier limits.",
      ],
    },
    architecture: {
      flow: [
        { name: "Sources", tech: "MCP Registry · Glama · GitHub Search", note: "Pulled daily" },
        { name: "Ingest", tech: "GitHub Actions cron", note: "Normalise · de-dupe" },
        { name: "Dataset", tech: "Committed JSON", note: "Triggers rebuild" },
        { name: "Site", tech: "Next.js 16 static export", note: "No server" },
      ],
      caption:
        "The catalogue is rebuilt once a day by a cron and shipped as static files, so the live site has no backend at all.",
    },
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
    slug: "asl-erp",
    category: "Logistics ERP",
    title: "ASL ERP",
    seoDescription:
      "A 520-screen logistics and freight forwarding ERP: air and sea shipments, transport, billing and approvals. React and NestJS, with RBAC and Gujarati localization.",
    blurb:
      "An enterprise ERP for logistics and freight forwarding, with about 520 screens covering air and sea export and import, transport and fleet, finance and billing, masters and approval workflows, plus role-based access and English and Gujarati localization.",
    role: "Full stack",
    year: "2026",
    period: "Aug 2026 — Present",
    engagement: "artoon-client",
    stack: [
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis/BullMQ",
      "React 18",
      "TypeScript",
      "TanStack Query",
      "AWS S3",
      "Tailwind CSS",
    ],
    metric: "~520-screen ERP · 30+ screens shipped",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1600&auto=format&fit=crop",
    linkNote: "Internal enterprise system, so there's no public URL",
    ownership: {
      team: "Team of 15+ engineers",
      scope: "30+ of ~520 screens · ~420 commits · billing APIs",
      decisions: [
        "Moved add, edit and view screens to URL-based routing with encoded record IDs, so records survive a refresh and can be shared.",
        "Mapped backend permission keys to screen- and button-level frontend permissions for RBAC.",
        "Implemented server-driven pagination with cache invalidation, so lists refresh after writes made on other screens.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "React 18 · Vite", note: "TanStack Query · Zustand" },
        { name: "API", tech: "NestJS", note: "RBAC guards · approval matrix" },
        { name: "ORM", tech: "Prisma", note: "Typed queries · migrations" },
        { name: "Database", tech: "PostgreSQL", note: "Masters · jobs · billing" },
      ],
      aside: [
        { name: "Queue", tech: "Redis · BullMQ", note: "Reports and background jobs" },
        { name: "Storage", tech: "AWS S3", note: "Shipment documents" },
      ],
      caption:
        "Requests go from the React client to NestJS, where permission guards and the approval matrix run before Prisma writes to PostgreSQL. Slow work goes to BullMQ, and documents are stored in S3.",
    },
    accent: "#FF9BD2",
    detail: {
      kicker: "Freight forwarding, from job planning to tax invoice",
      overview: [
        "ASL ERP runs a logistics and freight forwarding business: air and sea export and import shipments, transport and fleet, finance and billing, master data and the approval workflows that tie them together, across about 520 screens.",
        "Access is role-based down to individual buttons, and the whole interface is localized in English and Gujarati. I work across both ends in a team of 15+, on a React and Vite front-end and a NestJS, Prisma and PostgreSQL back-end.",
      ],
      contributions: [
        "Built 30+ production screens across the Export, Import and Masters modules, including Job Planning Air (a multi-tab form with flight details, cost sheet and document upload), Job Status MIS reports, BL Draft/BL Register, and the Customer, Agent and Consignee masters.",
        "Built approval workflows (submit, approve, reject, recheck, withdraw) for expense requests and party masters.",
        "Developed accounts billing APIs in NestJS and Prisma: Export Billing (Air/Sea), Forex, Supplementary, Reimbursement and Combine Billing, plus the LR Register, Bill Register and Vehicle Tyre transport reports.",
        "Wired RBAC at both screen and button level, mapping backend permission keys to frontend permissions.",
        "Contributed about 420 commits across frontend and backend, following a feature-based modular architecture, SOLID principles and strict lint and type checks.",
      ],
      challenges: [
        {
          title: "From proforma to tax invoice",
          body: "Proforma bills go through a configurable approval matrix on the backend, and the bill is numbered as a tax invoice only once it clears that matrix.",
        },
        {
          title: "Records you can bookmark",
          body: "Add, edit and view screens moved to URL-based routing with encoded record IDs, so a record can be bookmarked or shared and still be there after a page refresh.",
        },
        {
          title: "Lists that stay in sync",
          body: "Pagination, search and filtering run on the server through TanStack Query and Table. Cache invalidation is set up so a list refreshes after a write made on a different screen.",
        },
        {
          title: "Data that saves what you meant",
          body: "Fixed data-integrity bugs: dates shifting across timezones, cleared fields that never cleared on PATCH, edit forms saving with no changes, and duplicate file attachments.",
        },
      ],
      outcomes: [
        { value: "~520", label: "Screens in the ERP" },
        { value: "30+", label: "Screens I built" },
        { value: "~420", label: "Commits" },
      ],
    },
  },
  {
    slug: "braganza",
    category: "Car rental platform",
    title: "Braganza",
    seoDescription:
      "A full-stack car rental platform: discover, book and rent vehicles, with availability, pricing and fleet state kept consistent under load.",
    blurb:
      "A full-stack car rental platform where users discover, book and rent vehicles through a secure, scalable system — availability, pricing and fleet state all consistent under load.",
    role: "Full stack",
    year: "2026",
    period: "Jan 2026 — Jul 2026",
    engagement: "artoon-client",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "AWS",
      "TypeScript",
      "React",
      "Next.js",
      "WebSockets",
      "Booqable",
    ],
    metric: "200+ vehicles · 40% fewer support tickets",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.braganzaclub.com",
    ownership: {
      scope: "Architecture end to end, API to booking UI to AWS deploy",
      decisions: [
        "Serialised concurrent checkouts with a transaction and row-level lock on the vehicle, so double bookings cannot happen.",
        "Cached availability in Redis by fleet segment and window, with targeted invalidation instead of wholesale flushes.",
        "Planned the staged phase-2 migration as idempotent transactions, so a failed deploy rolls back cleanly instead of half-applying.",
        "Kept pricing server-side only, so the quote a customer sees is always the amount charged.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "Next.js · React", note: "Booking flow · admin" },
        { name: "API", tech: "Node.js · Express", note: "Pricing rules · bookings" },
        { name: "Database", tech: "PostgreSQL", note: "Row-level locks" },
      ],
      aside: [
        { name: "Cache", tech: "Redis", note: "Availability windows" },
        { name: "Realtime", tech: "WebSockets", note: "Live fleet state" },
        { name: "Integration", tech: "Booqable", note: "Rental operations" },
        { name: "Hosting", tech: "AWS", note: "Production deploy" },
      ],
      caption:
        "A booking takes a row lock on the vehicle inside one PostgreSQL transaction. Availability reads come from Redis, which is invalidated precisely when a booking touches that window.",
    },
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
    category: "Live streaming platform",
    title: "Streamerdap",
    blurb:
      "A web-based live streaming platform that lets creators go live straight from the OBS Browser source, with PayPal-backed subscriptions and plan-gated features.",
    role: "Backend lead",
    year: "2025",
    period: "Jul 2025 — Jan 2026",
    engagement: "artoon-client",
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "Redis", "AWS", "PayPal API", "OBS"],
    metric: "500+ concurrent streamers · 5,000+ weekly payouts",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.streamerdap.com",
    ownership: {
      // TODO: add `team` (e.g. "Led 3 developers") once confirmed — not guessed.
      scope: "Backend lead: schema, API, PayPal billing and payouts",
      decisions: [
        "Authenticated the OBS browser source with signed, scoped, revocable URL tokens instead of a login screen.",
        "Applied PayPal webhooks idempotently against a stored subscription state machine, so replays never grant extra time.",
        "Resolved entitlements server-side on every request, so a downgrade applies mid-stream without a reconnect.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "OBS browser source · web app", note: "Token in URL" },
        { name: "API", tech: "Node.js · Express", note: "Entitlement checks" },
        { name: "ORM", tech: "Sequelize", note: "Plans · channels" },
        { name: "Database", tech: "MySQL", note: "Subscription state" },
      ],
      aside: [
        { name: "Payments", tech: "PayPal", note: "Webhooks · 5,000+ weekly payouts" },
        { name: "Cache", tech: "Redis", note: "Hot dashboard reads" },
        { name: "Hosting", tech: "AWS", note: "Production" },
      ],
      caption:
        "OBS loads a signed URL, the API checks the creator's plan on every request, and PayPal webhooks drive a subscription state machine stored in MySQL.",
    },
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
        "Built the PayPal payout system, processing 5,000+ weekly payouts to creators at 99.5% accuracy.",
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
    category: "Film streaming CMS",
    title: "Jolt",
    blurb:
      "A dual-purpose platform: a CMS for the team that publishes the catalogue, and a public film-streaming interface for everyone watching it.",
    role: "Backend lead",
    year: "2025",
    period: "Mar 2025 — Jul 2025",
    engagement: "artoon-client",
    stack: ["Node.js", "Express", "MongoDB", "Auth0", "AWS S3", "Video Streaming", "CMS"],
    metric: "One backend, two products",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
    href: "https://www.jolt.film",
    ownership: {
      // TODO: add `team` once confirmed — not guessed.
      scope: "Backend lead for both the CMS and the public streaming site",
      decisions: [
        "Served both products from one MongoDB catalogue, with visibility enforced through separate read models at the query layer.",
        "Mapped Auth0 token roles onto the API's own permission layer, so viewer sessions can never reach CMS routes.",
        "Delivered video over HTTP range requests for seek-friendly playback, and decoupled encoding from the request cycle.",
      ],
    },
    architecture: {
      flow: [
        { name: "Clients", tech: "Editorial CMS · public player", note: "Two surfaces" },
        { name: "API", tech: "Node.js · Express", note: "Per-surface read models" },
        { name: "Database", tech: "MongoDB", note: "One catalogue" },
      ],
      aside: [
        { name: "Identity", tech: "Auth0", note: "Roles from the token" },
        { name: "Media", tech: "AWS S3", note: "Uploads · range requests" },
      ],
      caption:
        "Editors and viewers use the same API and the same catalogue. Each surface reads through its own model, so drafts never reach the public side.",
    },
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
    category: "Networking platform",
    title: "SpingR",
    blurb:
      "Design, share and manage digital business cards — with graph-based networking in Neo4j so a connection two hops away is a query, not a guess.",
    role: "Backend lead",
    year: "2024",
    period: "Jul 2024 — Feb 2025",
    engagement: "artoon-client",
    stack: ["Node.js", "Express", "Neo4j", "MongoDB", "Redis", "RabbitMQ", "WebSockets", "JWT"],
    metric: "10,000+ professionals · sub-200ms across 100k+ nodes",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1600&auto=format&fit=crop",
    linkNote: "Shipped as a mobile application — no public web URL",
    ownership: {
      // TODO: add `team` once confirmed — not guessed.
      scope: "Backend lead: data model, graph queries, auth and realtime",
      decisions: [
        "Chose the polyglot split: Neo4j for relationships, MongoDB for card content and media.",
        "Ordered cross-database writes and added a reconciliation pass that repairs orphaned graph nodes.",
        "Capped traversal depth and indexed relationship types to keep suggestions under 200 ms across 100k+ nodes.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "Mobile app", note: "Cards · scans · chat" },
        { name: "API", tech: "Node.js · Express", note: "JWT · WebSockets" },
        { name: "Graph", tech: "Neo4j", note: "Connections · 2-hop paths" },
        { name: "Documents", tech: "MongoDB", note: "Card content · media" },
      ],
      aside: [
        { name: "Queue", tech: "RabbitMQ", note: "Async notifications" },
        { name: "Cache", tech: "Redis", note: "Hot lookups" },
      ],
      caption:
        "Card content lives in MongoDB and the connection graph lives in Neo4j. A graph edge is written only after its card record commits.",
    },
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
    category: "EdTech mentorship platform",
    title: "iMentor",
    seoDescription:
      "A CMS-driven education platform with multi-role admin, automated mentor–mentee matching and built-in chat, so pairs never leave the programme.",
    blurb:
      "A CMS-driven educational platform with multi-role admin support, automated mentor–mentee matching and built-in chat, so a pair can talk without leaving the programme.",
    role: "Full stack",
    year: "2023",
    period: "Aug 2023 — Jun 2024",
    engagement: "artoon-client",
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Redis",
      "AWS",
      "React",
      "Next.js",
      "Socket.io",
      "CMS",
    ],
    metric: "3 institutions · 35% higher satisfaction",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    href: "https://pilot.imentor.org",
    ownership: {
      scope: "Full stack: API, data model, matching engine and all four role interfaces",
      decisions: [
        "Made matching a weighted score with the reasoning shown, so coordinators can see why a pair was proposed and override it.",
        "Declared permissions per resource and enforced them in one middleware layer, instead of scattering role checks through handlers.",
        "Persisted every chat message before broadcasting it, so history and unread counts rebuild from the database on any device.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "React · Next.js", note: "Four role dashboards" },
        { name: "API", tech: "Node.js · Express", note: "Role middleware · matching engine" },
        { name: "Database", tech: "MongoDB", note: "Cohorts · pairs · messages" },
      ],
      aside: [
        { name: "Realtime", tech: "Socket.io", note: "Chat · live assignment updates" },
        { name: "Cache", tech: "Redis", note: "Hot reads" },
        { name: "Hosting", tech: "AWS", note: "Production" },
      ],
      caption:
        "One Express API serves all four roles through a single permission layer. Chat messages are written to MongoDB first, then pushed over Socket.io.",
    },
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
    category: "Baseball tournament app",
    title: "Diamond Connect",
    blurb:
      "A cross-platform app for running baseball tournaments end to end — team registration, Stripe payments, automated scheduling and scores from the field.",
    role: "Backend developer",
    year: "2021",
    period: "Jul 2021 — Jul 2023",
    engagement: "artoon-client",
    stack: ["Node.js", "Express", "MongoDB", "Redis", "RabbitMQ", "Stripe", "Socket.io", "CMS"],
    metric: "Automated scheduling",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1600&auto=format&fit=crop",
    href: "https://diamondconnect.com",
    ownership: {
      scope: "Backend: schema, REST API, scheduling engine and Stripe payments",
      decisions: [
        "Built the scheduler to report genuine conflicts instead of silently producing an impossible schedule.",
        "Registered a team only on Stripe's webhook confirmation, handled idempotently so retries never create duplicates.",
        "Served every platform from one API, with field score updates reconciled when a dropped connection returns.",
      ],
    },
    architecture: {
      flow: [
        { name: "Client", tech: "Cross-platform app", note: "Teams · scorekeepers" },
        { name: "API", tech: "Node.js · Express", note: "Scheduling engine" },
        { name: "Database", tech: "MongoDB", note: "Tournaments · fixtures" },
      ],
      aside: [
        { name: "Payments", tech: "Stripe", note: "Webhook-confirmed enrolment" },
        { name: "Realtime", tech: "Socket.io", note: "Live scores" },
        { name: "Queue", tech: "RabbitMQ", note: "Async jobs" },
        { name: "Cache", tech: "Redis", note: "Hot reads" },
      ],
      caption:
        "Registration completes only when Stripe confirms payment by webhook. The scheduling engine turns team counts and field availability into fixtures, and scores reach followers over Socket.io.",
    },
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
    {
      name: "Codex",
      role: "agentic tasks",
      accent: "#B4FF39",
      desc: "Delegating scoped, well-defined work — migrations, refactors across many files, and test coverage — then reviewing the diff.",
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
  /**
   * Shown under the attribution when the text isn't a single verbatim quote —
   * e.g. merged or edited reviews. Says so on the page rather than only in a
   * code comment.
   */
  note?: string;
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
    "A client I worked for on contract, and the team leader and project manager I work with at Artoon — on what it was actually like.",
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
      note: "Compiled from weekly reviews, lightly edited.",
      company: "Artoon Solutions",
      relation: "Team Leader",
      accent: "#5BE9FF",
      featured: true,
      draft: false,
    },
    /**
     * Real, published. Verbatim and complete — the pull-quote is the opening
     * sentence and the paragraphs below carry the rest in the original order,
     * so the full text appears exactly once with nothing paraphrased.
     *
     * `featured` because only featured entries render `body`; as a wall card
     * everything after the first sentence would be dropped.
     */
    {
      quote:
        "Neel is one of the most dependable and technically strong engineers I have had the opportunity to work with.",
      body: [
        "What I appreciate most about him is the way he thinks. He never simply starts coding. He takes the time to understand the requirements, thinks through possible edge cases, and then delivers a solid, practical solution.",
        "He has strong expertise in backend architecture, Node.js, TypeScript, AWS, databases, APIs, and third-party integrations. What truly stands out is his willingness to learn and take ownership. He is always ready to help the team, share his knowledge, and take responsibility when needed. His dedication, problem-solving approach, and commitment to delivering quality work make him a very valuable part of any engineering team.",
      ],
      name: "Pankaj Dhameliya",
      role: "Project Manager",
      company: "Artoon Solutions",
      relation: "Project Manager",
      projects: ["Braganza", "Streamerdap"],
      accent: "#C08BFF",
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
    "Hiring for a senior full stack or backend role? I'm available to join immediately and work remotely from anywhere, for teams worldwide. Send the role, or tell me about the backend that needs building.",
  /**
   * The form has no server. On submit it composes a mail draft to profile.email.
   * To take submissions server-side instead, set this to your form endpoint
   * (Formspree, Resend route handler, etc.) — the component posts JSON to it.
   */
  formEndpoint: "", // TODO optional: e.g. "https://formspree.io/f/xxxxxxx"
  details: [
    { label: "Email", value: "neelbhavsar124@gmail.com" },
    { label: "Currently", value: "Open to Senior Full Stack / Backend roles" },
    { label: "Notice period", value: "Immediate joiner" },
    { label: "Location", value: "Remote, worldwide · based in Ahmedabad, India" },
    // Timezone only — no promised overlap windows with other regions.
    { label: "Timezone", value: "IST (UTC+5:30)" },
    { label: "Response time", value: "Within 24 hours" },
  ],
} as const;

/**
 * Résumé content, transcribed from "Neel Bhavsar Fullstack Resume.pdf".
 * This drives /resume — the CV lives in the site as a real page rather than a
 * PDF download, so the Résumé button opens it instead of pulling a file.
 *
 * Periods use a spaced em dash ("Apr 2021 — Present"): the page footer splits
 * on it, so keep the PDF's en dashes out of here.
 */
export const resume = {
  title: "Senior Full Stack Developer",
  /** Shown in the page footer and stamped into the PDF. Bump on every edit. */
  updated: "Nov 2026",
  /** Availability line under the contact details, on the page and the PDF. */
  availability: `Notice period: ${profile.jobSearch.noticePeriod} · Open to ${profile.jobSearch.workPreference}`,
  /** The stack line under the title, as on the PDF. */
  headline: ["React", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "AWS"],
  summary:
    "Senior Full Stack Developer with 5+ years of experience designing, building and scaling production web applications across ERP and logistics, live streaming, EdTech, sports and rental marketplaces. Strong in React, Next.js and TypeScript on the frontend and Node.js, NestJS and Express on the backend, with data layers on PostgreSQL, MongoDB, MySQL, Neo4j and Redis. Recently built 30+ screens and billing APIs for a 520-screen enterprise logistics ERP (NestJS, Prisma, PostgreSQL). Track record of cutting API response times by 70%, serving 50,000+ users and processing USD 50,000+ in monthly payments. Leads a team of 5 developers through code reviews, mentoring and architecture decisions.",
  /** Set `phone: ""` to keep the number off a public page. */
  contact: {
    location: "Ahmedabad, India",
    phone: "+91 99045 48741",
    email: "neelbhavsar124@gmail.com",
    linkedin: "linkedin.com/in/neeelbhavsar",
    github: "github.com/neeelbhavsar",
  },
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"] },
    {
      group: "Frontend",
      items: [
        "React 18",
        "Next.js",
        "Vite",
        "TanStack Query",
        "TanStack Table",
        "React Hook Form",
        "Zod",
        "Zustand",
        "Tailwind CSS",
        "Material UI",
        "Responsive Design",
        "Figma to UI",
      ],
    },
    {
      group: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "RESTful APIs",
        "GraphQL",
        "Microservices",
        "WebSockets (Socket.IO)",
        "RBAC",
        "i18n",
      ],
    },
    { group: "Testing", items: ["Jest", "Supertest", "Unit and API Integration Testing"] },
    {
      group: "Databases & ORMs",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Neo4j", "Redis", "Prisma", "Sequelize"],
    },
    { group: "Queues & Messaging", items: ["BullMQ", "Redis Bull", "RabbitMQ"] },
    {
      group: "Cloud & DevOps",
      items: [
        "AWS (EC2, RDS, S3, SES, Cognito, Secrets Manager)",
        "Docker",
        "CI/CD",
        "GitHub Actions",
        "Git",
      ],
    },
    {
      group: "Auth & Security",
      items: ["JWT", "OAuth 2.0", "Auth0", "AWS Cognito", "Role-Based Access Control"],
    },
    {
      group: "Payments & Integrations",
      items: ["Stripe", "PayPal", "Twilio", "SendGrid", "Firebase", "Booqable", "OBS"],
    },
    { group: "AI Tools", items: ["Cursor", "Claude", "GitHub Copilot", "Codex", "Gemini"] },
    {
      group: "Practices",
      items: [
        "System Design",
        "SOLID Principles",
        "Clean Architecture",
        "Code Reviews",
        "Agile / Scrum",
        "Postman",
      ],
    },
  ],
  experience: [
    {
      company: "Artoon Solutions Pvt. Ltd.",
      role: "Senior Full Stack Developer",
      period: "Apr 2021 — Present",
      location: "Ahmedabad, India",
      progression: [
        { title: "Node.js Developer", year: "2021" },
        { title: "Lead Backend Developer", year: "2024", promoted: true },
        { title: "Senior Full Stack Developer", year: "2026" },
      ],
      bullets: [
        "Architected and delivered 7+ production web applications end-to-end across ERP, streaming, EdTech, sports and rentals, serving 50,000+ active users.",
        "Reduced API response times by 70% through database indexing, Redis caching and background job processing.",
        "Designed queue-based background processing with Redis Bull/BullMQ and RabbitMQ to move slow work such as emails, payouts and report generation off the request path, with retries for failed jobs.",
        "Improved API performance by removing N+1 queries and refactoring slow endpoints, handling higher traffic on the same infrastructure.",
        "Built responsive, component-driven frontends in React, Next.js and TypeScript from Figma designs, using code splitting and lazy loading to speed up load times.",
        "Integrated Stripe and PayPal to process USD 50,000+ in monthly transactions, covering both payment APIs and frontend checkout flows.",
        "Implemented secure authentication with Auth0, AWS Cognito and JWT for 10,000+ users with zero security incidents.",
        "Delivered real-time notifications and chat with Socket.IO, and deployed and maintained production services on AWS (EC2, RDS, S3) with Docker.",
        "Lead a team of 5 developers: set API and data-modelling standards, run code reviews and mentor junior engineers.",
      ],
    },
  ],
  /**
   * Every entry below was delivered as an Artoon employee for an Artoon
   * client; the page and PDF say so above the list, so dates that overlap the
   * Artoon role read as what they are rather than as side work.
   */
  projectsNote: "Client projects delivered at Artoon Solutions",
  projects: [
    {
      name: "ASL ERP",
      kind: "Logistics and Freight Forwarding ERP Platform",
      role: "Full Stack Developer",
      period: "Aug 2026 — Present",
      stack:
        "React 18, TypeScript, TanStack Query/Table, Zustand, Tailwind CSS, NestJS, Prisma, PostgreSQL, Redis/BullMQ, AWS S3",
      bullets: [
        "Built 30+ production screens across Export, Import and Masters modules of a 520-screen enterprise ERP for air/sea shipments, fleet, finance and billing, with English/Gujarati localization.",
        "Developed accounts billing APIs in NestJS and Prisma (Export, Forex, Reimbursement, Combine Billing) and approval workflows that route proforma bills through a configurable approval matrix.",
        "Implemented screen- and button-level RBAC, server-driven pagination with cache invalidation, and contributed 420+ commits in a team of 15+.",
      ],
    },
    {
      name: "Braganza Auto Collezione",
      kind: "Car Rental Platform",
      role: "Full Stack Developer",
      period: "Jan 2026 — Jul 2026",
      stack: "Node.js, Express, PostgreSQL, Redis, React, Next.js, WebSockets, AWS, Booqable",
      bullets: [
        "Owned the architecture of a rental marketplace managing 200+ vehicles, from the Express and PostgreSQL core with Redis caching on AWS to the React/Next.js booking interface.",
        "Designed a vehicle ownership domain layer and planned a staged database migration that moved data in phases instead of one cutover, shipping the M1 release while keeping availability, pricing and fleet state consistent.",
        "Built a responsive booking UI from Figma with real-time WebSocket updates and Booqable integration, reducing customer support tickets by 40%.",
      ],
    },
    {
      name: "Streamerdap",
      kind: "Live Streaming Platform",
      role: "Backend Lead",
      period: "Jul 2025 — Jan 2026",
      stack: "Node.js, Express, Sequelize, PayPal, OBS, Redis, AWS",
      bullets: [
        "Built the backend for a browser-based live streaming platform with OBS browser-source support, supporting 500+ concurrent streamers.",
        "Built PayPal subscriptions, plan-gated features and a payout system processing 5,000+ weekly payouts at 99.5% accuracy, delivered with zero bugs at handover.",
        "Optimised database queries, reducing dashboard load times by 55% during peak traffic.",
      ],
    },
    {
      name: "Jolt",
      kind: "CMS and Film Streaming Platform",
      role: "Backend Lead",
      period: "Mar 2025 — Jul 2025",
      stack: "Node.js, Express, MongoDB, Auth0, AWS S3",
      bullets: [
        "Architected a dual-purpose catalogue CMS and public film-streaming product on a single backend, with media uploads through scalable AWS S3 pipelines and controlled publishing workflows.",
      ],
    },
    {
      name: "SpingR",
      kind: "Professional Networking Platform",
      role: "Backend Lead",
      period: "Jul 2024 — Feb 2025",
      stack: "Node.js, Express, Neo4j, MongoDB, Redis, RabbitMQ",
      bullets: [
        "Implemented graph-based relationship discovery in Neo4j with sub-200 ms queries across 100,000+ nodes; built digital business cards and real-time chat for 10,000+ professionals.",
      ],
    },
    {
      name: "iMentor",
      kind: "EdTech Mentorship Platform",
      role: "Full Stack Developer",
      period: "Aug 2023 — Jun 2024",
      stack: "Node.js, TypeScript, React, MongoDB, Redis, AWS, Socket.IO",
      bullets: [
        "Architected a multi-role, CMS-driven platform used by 3 educational institutions; designed an automated mentor–mentee matching algorithm that raised satisfaction scores by 35%, with built-in chat.",
      ],
    },
    {
      name: "Diamond Connect",
      kind: "Baseball Tournament Management App",
      role: "Backend Developer",
      period: "Jul 2021 — Jul 2023",
      stack: "Node.js, Express, MongoDB, Redis, RabbitMQ, Stripe, Socket.IO",
      bullets: [
        "Built backend services for a cross-platform tournament app covering team registration, Stripe payments, automated match scheduling and live scores.",
      ],
    },
  ],
  /** Own work, kept apart from the Artoon client projects. */
  sideProjects: [
    {
      name: "AI Library",
      kind: "Self-updating directory of AI Skills and MCP servers",
      period: "Jul 2026 — Present",
      stack: "Next.js 16, TypeScript, Tailwind v4, GitHub Actions",
      links: ["mcp-skills-hub.vercel.app", "github.com/neeelbhavsar/mcp-skills-hub"],
      bullets: [
        "Built a catalogue of MCP servers, Skills and repos from the MCP Registry, Glama and GitHub Search, with copy-paste setup for Claude, Cursor, Codex, Windsurf, Cline and VS Code, refreshed daily by a GitHub Actions cron with no backend.",
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
  // Same words as the section's own heading (services.heading), so the link
  // lands where it says it will.
  { label: "What I do", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Skills", href: "#skills" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contact", href: "#contact" },
] as const;
