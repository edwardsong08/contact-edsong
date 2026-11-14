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
    if (open) panel.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
  }, [open]);
  function selectTheme(id: string) {
    setTheme(id); document.documentElement.dataset.theme = id;
    try { localStorage.setItem("edsong-theme", id); } catch { /* Themes work without storage. */ }
  }
  function navigateThemes(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowDown": case "ArrowRight": next = (index + 1) % themes.length; break;
      case "ArrowUp": case "ArrowLeft": next = (index + themes.length - 1) % themes.length; break;
      case "Home": next = 0; break;
      case "End": next = themes.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectTheme(themes[next][0]);
    panel.current?.querySelectorAll<HTMLButtonElement>("[role=radio]")[next]?.focus();
  }
  return <>
    <div className="settings-anchor" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={trigger} className={"settings-trigger " + (open ? "is-open" : "")} aria-label={open ? "Close settings" : "Settings"} aria-expanded={open} aria-controls="personal-settings" onClick={() => setOpen(!open)} disabled={!ready}>
        <svg viewBox="0 0 44 44" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path strokeLinejoin="round" d="M17.960,5.796 L19.784,0.916 L24.216,0.916 L26.040,5.796 L30.601,7.685 L35.342,5.525 L38.475,8.658 L36.315,13.399 L38.204,17.960 L43.084,19.784 L43.084,24.216 L38.204,26.040 L36.315,30.601 L38.475,35.342 L35.342,38.475 L30.601,36.315 L26.040,38.204 L24.216,43.084 L19.784,43.084 L17.960,38.204 L13.399,36.315 L8.658,38.475 L5.525,35.342 L7.685,30.601 L5.796,26.040 L0.916,24.216 L0.916,19.784 L5.796,17.960 L7.685,13.399 L5.525,8.658 L8.658,5.525 L13.399,7.685Z"/><circle cx="22" cy="22" r="6.5"/></svg>
      </button>
      <div id="personal-settings" ref={panel} className="settings-panel" hidden={!open} role="region" aria-label="Settings">
        <div className="theme-options" role="radiogroup" aria-label="Theme">
          {themes.map(([id, name], index) => <button key={id} role="radio" aria-checked={theme === id} tabIndex={theme === id ? 0 : -1} onKeyDown={event => navigateThemes(event, index)} onClick={() => selectTheme(id)} className="theme-option">
            <span className={"theme-swatch swatch-" + id} aria-hidden="true" />
            <span className="theme-name">{name}</span>
            <span className="theme-check" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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
