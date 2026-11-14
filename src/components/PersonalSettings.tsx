"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const DrawingCanvas = dynamic(() => import("./DrawingCanvas"), { ssr: false });
const themes = [
  ["light", "Default"],
  ["tokyo", "Tokyo Midnight"],
  ["neon", "TRON"],
  ["noir", "Silver Noir"],
  ["matcha", "Matcha Garden"],
] as const;

export default function PersonalSettings() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"draw" | null>(null);
  const [ready, setReady] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("edsong-theme");
      if (themes.some(([id]) => id === saved)) {
        setTheme(saved!); document.documentElement.dataset.theme = saved!;
      }
    } catch { /* Storage is optional. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (previousPath.current !== pathname) {
      setOpen(false); setMode(null); previousPath.current = pathname;
    }
  }, [pathname]);
  useEffect(() => {
    if (!open && !mode) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setMode(null); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (open && !panel.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss); document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", dismiss); document.removeEventListener("pointerdown", outside); };
  }, [open, mode]);
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
  }, [open]);
  function selectTheme(id: string) {
    setTheme(id); document.documentElement.dataset.theme = id;
    try { localStorage.setItem("edsong-theme", id); } catch { /* Themes work without storage. */ }
  }
  return <>
    <div className="settings-anchor">
      <button ref={trigger} className={"settings-trigger " + (open ? "is-open" : "")} aria-label={open ? "Close settings" : "Settings"} aria-expanded={open} aria-controls="personal-settings" onClick={() => setOpen(!open)} disabled={!ready}>
        <svg viewBox="2.5 2.5 19 19" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true"><path strokeLinejoin="round" d="m10 3-.6 2.4-1.6.9-2.4-.7-2 3.5 1.8 1.7v1.9l-1.8 1.7 2 3.5 2.4-.7 1.6.9L10 21h4l.6-2.4 1.6-.9 2.4.7 2-3.5-1.8-1.7v-1.9l1.8-1.7-2-3.5-2.4.7-1.6-.9L14 3Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <div id="personal-settings" ref={panel} className="settings-panel" hidden={!open} role="region" aria-label="Settings">
        <div className="theme-options" aria-label="Color theme">
          {themes.map(([id, name]) => <button key={id} aria-pressed={theme === id} onClick={() => selectTheme(id)} className="theme-option">
            <span className={"theme-swatch swatch-" + id} aria-hidden="true" />
            <span className="theme-name">{name}</span>
            <span className="theme-check" aria-hidden="true">{theme === id ? "✓" : ""}</span>
          </button>)}
        </div>
        {pathname === "/" ? <button className="doodle-toggle" role="switch" aria-checked={mode === "draw"} onClick={() => setMode(mode ? null : "draw")}>
          <span>Doodle</span><span className="toggle-track" aria-hidden="true"><span /></span>
        </button> : null}
      </div>
    </div>
    {mode && pathname === "/" ? <DrawingCanvas onDone={() => { setMode(null); trigger.current?.focus(); }} /> : null}
  </>;
}

