"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { readNavigationEntry, siteHref } from "@/lib/site-navigation";

export default function BackLink({ source = "" }: { source?: string }) {
  const pathname = usePathname();
  const pending = useRef(false);
  useEffect(() => { pending.current = false; }, [pathname]);
  const fallback = source ? `/?from=${encodeURIComponent(source)}` : "/";

  return <Link className="portfolio back-link" href={fallback} replace aria-label="Go back"
    onNavigate={event => {
      if (pending.current) { event.preventDefault(); return; }
      const href = siteHref(window.location.href, window.location.href);
      const back = readNavigationEntry(window.history.state, href)?.back;
      if (!back || back.steps >= window.history.length) return;
      event.preventDefault();
      pending.current = true;
      window.history.go(-back.steps);
    }}><span aria-hidden="true">←</span> Back</Link>;
}
