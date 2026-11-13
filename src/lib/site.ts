export const SITE_ORIGIN = "https://edsong.xyz";
export const PROFILE_ORIGIN = "https://profile.edsong.xyz";

const legacyHosts = new Set(["contact.edsong.xyz", "www.contact.edsong.xyz", "www.edsong.xyz"]);

/** Keep APIs stable for existing forms and the signed GitHub deployment hook. */
export function getSiteRedirect(requestUrl: URL): URL | null {
  const path = requestUrl.pathname;
  if (path === "/api" || path.startsWith("/api/") || path.startsWith("/_next/")) return null;

  const oldProfilePath = path === "/work" || path.startsWith("/work/")
    || path === "/Resume-Edward_Song.pdf" || path.startsWith("/case-studies/")
    || path === "/og/edward-song-zen.png";
  const origin = oldProfilePath ? PROFILE_ORIGIN : legacyHosts.has(requestUrl.hostname) ? SITE_ORIGIN : null;
  if (!origin || requestUrl.origin === origin) return null;

  // Assign the path separately: a // path must never replace the destination host.
  const destination = new URL(origin);
  destination.pathname = path;
  destination.search = requestUrl.search;
  destination.hash = requestUrl.hash;
  return destination;
}
