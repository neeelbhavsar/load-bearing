import Link from "next/link";
import { profile, projects } from "@/content/portfolio";

/**
 * Sitewide footer, rendered on every page from the root layout.
 *
 * Its main job is internal linking: every page now links to every case study
 * and to the résumé, with descriptive anchor text ("iMentor — EdTech
 * mentorship platform"). Before it, a case study had one link pointing at it,
 * from the home page gallery, and Google left several of them "Discovered –
 * currently not indexed". Plain server-rendered <a> tags, so crawlers see them
 * without running any JavaScript.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg print:hidden">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.2fr_2fr_1fr_1fr] md:gap-12">
        <div>
          <Link href="/" className="font-display text-2xl tracking-tight hover:text-accent">
            {profile.name}
          </Link>
          <p className="mt-2 text-sm text-fg-muted">{profile.role}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            {profile.availability}.
          </p>
        </div>

        <nav aria-label="Case studies">
          <h2 className="font-mono text-[11px] tracking-[0.2em] text-fg-faint uppercase">
            <Link href="/work" className="hover:text-accent">
              Case studies
            </Link>
          </h2>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
                >
                  <span className="text-fg">{p.title}</span> — {p.category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Pages">
          <h2 className="font-mono text-[11px] tracking-[0.2em] text-fg-faint uppercase">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/work" className="hover:text-accent">
                All case studies
              </Link>
            </li>
            <li>
              <Link href={profile.resumeUrl} className="hover:text-accent">
                Résumé
              </Link>
            </li>
            <li>
              <a
                href={profile.resumePdfUrl}
                download={profile.resumePdfName}
                className="hover:text-accent"
              >
                Résumé (PDF)
              </a>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Elsewhere">
          <h2 className="font-mono text-[11px] tracking-[0.2em] text-fg-faint uppercase">
            Elsewhere
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener me" }
                    : {})}
                  className="hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-[1400px] px-5 py-6 font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase sm:px-8">
          © {year} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
