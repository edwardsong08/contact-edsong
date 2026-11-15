"use client";

import { useEffect } from "react";
import { entryForHistoryUpdate, nextNavigationEntry, readNavigationEntry, siteHref, withNavigationEntry, type NavigationEntry } from "@/lib/site-navigation";

/** Adds a small marker alongside Next's state, without storing a browsing log. */
export default function SiteNavigationHistory() {
  useEffect(() => {
    const history = window.history;
    const push = history.pushState;
    const replace = history.replaceState;
    let active = true;
    let remembered: NavigationEntry | null = null;

    const seed = () => {
      const href = siteHref(window.location.href, window.location.href);
      if (href && !readNavigationEntry(history.state, href)) {
        replace.call(history, withNavigationEntry(history.state, { href, back: null }), "");
      }
      remembered = readNavigationEntry(history.state, href);
    };

    const update = (action: "push" | "replace", data: unknown, unused: string, url?: string | URL | null) => {
      const method = action === "push" ? push : replace;
      if (!active) { method.call(history, data, unused, url); return; }
      const from = siteHref(window.location.href, window.location.href);
      const to = siteHref(url ?? window.location.href, window.location.href);
      const current = entryForHistoryUpdate(history.state, from, remembered);
      const entry = to ? nextNavigationEntry(current, from, to, action) : null;
      method.call(history, withNavigationEntry(data, entry), unused, url);
      remembered = entry;
    };

    const trackedPush: History["pushState"] = (data, unused, url) => update("push", data, unused, url);
    const trackedReplace: History["replaceState"] = (data, unused, url) => update("replace", data, unused, url);
    seed();
    history.pushState = trackedPush;
    history.replaceState = trackedReplace;

    const hashChanged = (event: HashChangeEvent) => {
      const href = siteHref(event.newURL, window.location.href);
      // A traversal restores its own marker. Only a new native hash entry needs one.
      if (!href || readNavigationEntry(history.state, href)) return;
      const from = siteHref(event.oldURL, window.location.href);
      const current = readNavigationEntry(history.state, from) ?? (remembered?.href === from ? remembered : null);
      const entry = nextNavigationEntry(current, from, href, "push");
      replace.call(history, withNavigationEntry(history.state, entry), "");
      remembered = entry;
    };
    window.addEventListener("hashchange", hashChanged);
    window.addEventListener("pageshow", seed);
    return () => {
      active = false;
      window.removeEventListener("hashchange", hashChanged);
      window.removeEventListener("pageshow", seed);
      if (history.pushState === trackedPush) history.pushState = push;
      if (history.replaceState === trackedReplace) history.replaceState = replace;
    };
  }, []);
  return null;
}
