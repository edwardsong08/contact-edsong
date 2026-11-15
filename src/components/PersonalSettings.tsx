"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const DrawingCanvas = dynamic(() => import("./DrawingCanvas"), { ssr: false });
const themes = [
  ["light", "Default"],
  ["tokyo", "Tokyo Midnight"],
  ["neon", "TRON"],
  ["noir", "Crimson Noir"],
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
        <svg viewBox="0 0 44 44" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinejoin="round" d="M14.608,6.182 Q15.303,5.832 16.042,5.588 L17.027,5.264 Q17.766,5.020 18.052,4.219 L18.806,2.104 Q19.091,1.303 19.941,1.303 L24.059,1.303 Q24.909,1.303 25.194,2.104 L25.948,4.219 Q26.234,5.020 26.973,5.264 L27.958,5.588 Q28.697,5.832 29.392,6.182 L30.318,6.649 Q31.013,7.000 31.781,6.635 L33.810,5.673 Q34.578,5.309 35.179,5.910 L38.090,8.821 Q38.691,9.422 38.327,10.190 L37.365,12.219 Q37.000,12.987 37.351,13.682 L37.818,14.608 Q38.168,15.303 38.412,16.042 L38.736,17.027 Q38.980,17.766 39.781,18.052 L41.896,18.806 Q42.697,19.091 42.697,19.941 L42.697,24.059 Q42.697,24.909 41.896,25.194 L39.781,25.948 Q38.980,26.234 38.736,26.973 L38.412,27.958 Q38.168,28.697 37.818,29.392 L37.351,30.318 Q37.000,31.013 37.365,31.781 L38.327,33.810 Q38.691,34.578 38.090,35.179 L35.179,38.090 Q34.578,38.691 33.810,38.327 L31.781,37.365 Q31.013,37.000 30.318,37.351 L29.392,37.818 Q28.697,38.168 27.958,38.412 L26.973,38.736 Q26.234,38.980 25.948,39.781 L25.194,41.896 Q24.909,42.697 24.059,42.697 L19.941,42.697 Q19.091,42.697 18.806,41.896 L18.052,39.781 Q17.766,38.980 17.027,38.736 L16.042,38.412 Q15.303,38.168 14.608,37.818 L13.682,37.351 Q12.987,37.000 12.219,37.365 L10.190,38.327 Q9.422,38.691 8.821,38.090 L5.910,35.179 Q5.309,34.578 5.673,33.810 L6.635,31.781 Q7.000,31.013 6.649,30.318 L6.182,29.392 Q5.832,28.697 5.588,27.958 L5.264,26.973 Q5.020,26.234 4.219,25.948 L2.104,25.194 Q1.303,24.909 1.303,24.059 L1.303,19.941 Q1.303,19.091 2.104,18.806 L4.219,18.052 Q5.020,17.766 5.264,17.027 L5.588,16.042 Q5.832,15.303 6.182,14.608 L6.649,13.682 Q7.000,12.987 6.635,12.219 L5.673,10.190 Q5.309,9.422 5.910,8.821 L8.821,5.910 Q9.422,5.309 10.190,5.673 L12.219,6.635 Q12.987,7.000 13.682,6.649Z"/><circle cx="22" cy="22" r="7.25"/></svg>
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
