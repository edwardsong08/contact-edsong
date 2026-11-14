"use client";

import { useEffect, useRef } from "react";

/** Theme scenery is decorative and never intercepts the inquiry flow. */
export default function ThemeAtmosphere() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let frame = 0;
    let x = 50, y = 45;
    const paint = () => {
      frame = 0;
      scene.current?.style.setProperty("--light-x", x + "%");
      scene.current?.style.setProperty("--light-y", y + "%");
      root.style.setProperty("--sheen-x", x + "%");
    };
    const move = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || !["tokyo", "noir"].includes(root.dataset.theme || "")) return;
      x = event.clientX / innerWidth * 100;
      y = event.clientY / innerHeight * 100;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const reset = () => { x = 50; y = 45; if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--sheen-x");
    };
  }, []);
  return <div ref={scene} className="theme-atmosphere" aria-hidden="true">
    <div className="tokyo-scene"><div className="city-glow" /><div className="city-architecture"><i/><i/><i/><i/><i/><i/></div><div className="city-horizon" /></div>
    <div className="tron-scene"><div className="tron-orbit" /><div className="tron-floor" /><div className="tron-horizon" /><div className="tron-corners" /></div>
    <div className="noir-scene"><div className="noir-light" /><div className="noir-frame" /></div>
    <div className="garden-scene"><div className="garden-sun" /><svg className="garden-branch" viewBox="0 0 400 560" fill="none"><path d="M38 560C120 420 125 240 323 38" stroke="currentColor" strokeWidth="2"/><g fill="currentColor"><path d="M125 389C20 367 36 291 42 269C122 285 147 339 125 389Z"/><path d="M116 419C190 335 250 359 275 378C235 443 164 455 116 419Z"/><path d="M171 267C91 250 90 177 104 150C163 173 191 216 171 267Z"/><path d="M173 273C238 206 296 225 318 249C267 304 219 310 173 273Z"/><path d="M239 162C188 133 205 74 222 53C265 88 269 128 239 162Z"/><path d="M256 140C290 80 349 86 374 101C345 145 303 164 256 140Z"/></g></svg><svg className="garden-sprig" viewBox="0 0 160 220" fill="none"><path d="M12 220Q60 100 142 15" stroke="currentColor" strokeWidth="2"/><g fill="currentColor"><path d="M55 127Q-3 112 18 54Q70 65 55 127"/><path d="M60 132Q93 73 147 100Q123 155 60 132"/><path d="M105 59Q73 35 100 2Q130 29 105 59"/></g></svg></div>
  </div>;
}
