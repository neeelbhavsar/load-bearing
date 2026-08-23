/**
 * The site's own origin, resolved at build time.
 *
 * Order matters:
 *  1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain. It wins,
 *     so production keeps canonical URLs even on a Vercel deployment.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production host on
 *     Vercel, identical across deployments. Right for OG tags and sitemaps.
 *  3. VERCEL_URL — the per-deployment host. Preview builds only; it changes
 *     every push, which is exactly what you want for a preview's own links.
 *  4. localhost — dev and any non-Vercel build.
 *
 * Vercel injects 2 and 3 automatically, so a fresh import deploys with correct
 * absolute URLs before any environment variable is configured.
 */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.startsWith("http") ? explicit : `https://${explicit}`;

  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (host) return `https://${host}`;

  return "http://localhost:3000";
}
