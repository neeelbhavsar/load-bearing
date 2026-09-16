import { profile, seo, resume, skills, projects, type Project } from "@/content/portfolio";
import { siteUrl } from "@/lib/site-url";

/**
 * JSON-LD graph. This is the part of SEO that actually moves a personal site:
 * meta tags describe a document, schema.org describes *you* as an entity, which
 * is what lets a search engine connect this page to your GitHub and LinkedIn
 * and treat all three as one person.
 *
 * Everything here restates what is already visible on the page. That is a hard
 * rule, not a stylistic one — structured data that claims more than the page
 * shows is what gets a site's rich results revoked.
 *
 * Emitted from a plain <script type="application/ld+json"> in the server
 * component, so it costs nothing on the client and is in the initial HTML where
 * a crawler will see it without executing JavaScript.
 */

const PERSON_ID = "#person";

/** Stable @id values, so nodes can reference each other instead of duplicating. */
function ids(base: string) {
  return {
    person: `${base}/${PERSON_ID}`,
    website: `${base}/#website`,
  };
}

function personNode(base: string) {
  const id = ids(base);

  return {
    "@type": "Person",
    "@id": id.person,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    // Repeated jobTitle values: the page displays one title, the entity claims
    // every position it genuinely covers. This is how "MERN Stack Developer"
    // gets targeted without putting a second title in the visible copy.
    jobTitle: seo.jobTitles,
    description: seo.description,
    url: base,
    image: `${base}${profile.photo}`,
    email: `mailto:${profile.email}`,
    // sameAs is the field that merges this entity with your other profiles.
    // Only URLs you control belong here.
    sameAs: profile.socials
      .filter((s) => !s.href.startsWith("mailto:"))
      .map((s) => s.href),
    knowsAbout: seo.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: seo.address.city,
      addressRegion: seo.address.region,
      addressCountry: seo.address.country,
    },
    worksFor: {
      "@type": "Organization",
      name: seo.worksFor.name,
      url: seo.worksFor.url,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: seo.alumniOf.name,
      url: seo.alumniOf.url,
    },
    knowsLanguage: resume.languages.map((l) => ({
      "@type": "Language",
      name: l.name,
    })),
  };
}

/** Home page: the person, the site, and the work as a portfolio collection. */
export function homeGraph() {
  const base = siteUrl();
  const id = ids(base);

  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(base),
      {
        "@type": "WebSite",
        "@id": id.website,
        url: base,
        name: `${profile.name} — ${seo.jobTitle}`,
        description: seo.description,
        inLanguage: "en",
        publisher: { "@id": id.person },
      },
      {
        "@type": "ProfilePage",
        url: base,
        name: `${profile.name} — ${seo.jobTitle}`,
        description: seo.description,
        isPartOf: { "@id": id.website },
        // The page is *about* the person — this is the link that makes a
        // ProfilePage meaningful rather than just another WebPage.
        mainEntity: { "@id": id.person },
        // The work, in the order the page shows it. This is what ties the home
        // page to the seven case studies in structured data rather than leaving
        // them to be discovered only through the sitemap.
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          "@id": `${base}/work/${project.slug}#work`,
          name: project.title,
          url: `${base}/work/${project.slug}`,
        })),
      },
    ],
  };
}

/**
 * Résumé page. Modelled as a WebPage about the same Person @id as the home
 * page, plus the work history — so the two pages describe one entity rather
 * than two people who happen to share a name.
 */
export function resumeGraph() {
  const base = siteUrl();
  const id = ids(base);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: `${base}/resume`,
        name: `${profile.name} — Résumé`,
        description: seo.resumeDescription,
        isPartOf: { "@id": id.website },
        mainEntity: { "@id": id.person },
      },
      {
        ...personNode(base),
        url: `${base}/resume`,
        hasOccupation: resume.experience.map((job) => ({
          "@type": "Occupation",
          name: job.role,
          occupationLocation: { "@type": "Place", name: job.location },
        })),
        skills: skills.flatMap((group) => group.items).join(", "),
      },
    ],
  };
}

/**
 * A case study page. The project is a CreativeWork the same Person authored, so
 * these pages feed the one entity rather than floating free — seven more pages
 * all pointing at the same @id is a stronger signal than seven unrelated ones.
 *
 * `about` carries the stack as plain keywords, which is what makes a long-tail
 * query like "Neo4j graph relationship discovery Node" reachable at all.
 */
export function projectGraph(project: Project) {
  const base = siteUrl();
  const id = ids(base);
  const url = `${base}/work/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url,
        name: `${project.title} — ${project.detail.kicker}`,
        description: project.blurb,
        isPartOf: { "@id": id.website },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      /**
       * Breadcrumbs change what the search result itself looks like: Google
       * renders the trail in place of the bare URL, so the listing reads
       * "Neel Bhavsar › Work › Braganza" instead of a path. Cheap, and it is
       * one of the few schema types with a visible effect on the SERP.
       */
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: base },
          { "@type": "ListItem", position: 2, name: "Work", item: `${base}/#work` },
          // The last crumb is the current page, so it carries no `item` — that
          // is the convention, and adding one makes it self-referential.
          { "@type": "ListItem", position: 3, name: project.title },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        headline: project.detail.kicker,
        description: project.blurb,
        url,
        image: project.image,
        // The year is a plain string like "2026" or "2021 — 2023"; only emit a
        // machine date when it is unambiguously a single year.
        ...(/^\d{4}$/.test(project.year) ? { dateCreated: project.year } : {}),
        author: { "@id": id.person },
        creator: { "@id": id.person },
        keywords: project.stack.join(", "),
        ...(project.href ? { sameAs: project.href } : {}),
      },
    ],
  };
}
