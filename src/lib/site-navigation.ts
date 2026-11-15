export const NAVIGATION_KEY = "edsongNavigationV1";
const pages = new Set(["/", "/about", "/portfolio", "/resume", "/start"]);

export type NavigationEntry = {
  href: string;
  back: { href: string; steps: number } | null;
};

/** Resolve only this site's public pages, never an external origin or endpoint. */
export function siteHref(input: string | URL, base: string): string | null {
  try {
    const url = new URL(input, base);
    if (url.origin !== new URL(base).origin || url.username || url.password || !pages.has(url.pathname)) return null;
    return url.pathname + url.search + url.hash;
  } catch { return null; }
}

function isPageHref(value: unknown): value is string {
  return typeof value === "string" && siteHref(value, "https://navigation.invalid") === value;
}

function samePage(a: string, b: string) {
  return new URL(a, "https://navigation.invalid").pathname === new URL(b, "https://navigation.invalid").pathname;
}

/** The marker is entry-specific so browser Back/Forward and reload preserve it. */
export function readNavigationEntry(state: unknown, href: string | null): NavigationEntry | null {
  if (!href || typeof state !== "object" || state === null) return null;
  const entry = (state as Record<string, unknown>)[NAVIGATION_KEY];
  if (!entry || typeof entry !== "object") return null;
  const value = entry as Record<string, unknown>;
  if (value.href !== href || !isPageHref(value.href)) return null;
  if (value.back === null) return { href, back: null };
  if (!value.back || typeof value.back !== "object") return null;
  const back = value.back as Record<string, unknown>;
  if (!isPageHref(back.href) || samePage(back.href, href) || !Number.isSafeInteger(back.steps) || (back.steps as number) < 1) return null;
  return { href, back: { href: back.href, steps: back.steps as number } };
}

export function nextNavigationEntry(current: NavigationEntry | null, from: string | null, to: string, action: "push" | "replace"): NavigationEntry {
  let back: NavigationEntry["back"] = null;
  if (action === "replace") {
    // Replacing a page does not leave that page behind in browser history.
    back = current?.back ?? null;
  } else if (from && !samePage(from, to)) {
    back = { href: from, steps: 1 };
  } else if (current?.back) {
    // Skip same-page query/hash entries when returning to a previous page.
    back = { href: current.back.href, steps: current.back.steps + 1 };
  }
  if (back && samePage(back.href, to)) back = null;
  return { href: to, back };
}

export function entryForHistoryUpdate(state: unknown, href: string | null, remembered: NavigationEntry | null = null): NavigationEntry | null {
  const current = readNavigationEntry(state, href);
  if (current || !href) return current;
  const marker = state && typeof state === "object" ? (state as Record<string, unknown>)[NAVIGATION_KEY] : null;
  const oldHref = marker && typeof marker === "object" ? (marker as Record<string, unknown>).href : null;
  const previous = (typeof oldHref === "string" ? readNavigationEntry(state, oldHref) : null) ?? remembered;
  // Native anchors can create an entry with null or copied state. Next may
  // replace it before hashchange fires; remember just the last committed entry.
  if (previous && previous.href !== href && previous.href.split("#")[0] === href.split("#")[0]) {
    return nextNavigationEntry(previous, previous.href, href, "push");
  }
  return null;
}

export function withNavigationEntry(state: unknown, entry: NavigationEntry | null) {
  // Retain the router's opaque fields; our marker is the only field we own.
  const result = state && typeof state === "object" ? { ...state } as Record<string, unknown> : {};
  if (entry) result[NAVIGATION_KEY] = entry;
  else delete result[NAVIGATION_KEY];
  return result;
}
