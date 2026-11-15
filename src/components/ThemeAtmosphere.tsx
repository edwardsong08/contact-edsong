"use client";

import { useEffect, useRef } from "react";

/** Decorative scenes with a shared horizon and independent material treatments. */
export default function ThemeAtmosphere() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => { if (scene.current) scene.current.dataset.paused = String(document.hidden); };
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return <div ref={scene} className="theme-atmosphere" aria-hidden="true">
    <div className="tokyo-scene"><div className="tokyo-art"/><div className="tokyo-rain"/><div className="tokyo-wetlight"/><div className="tokyo-vignette"/></div>
    <div className="tron-scene">
      <div className="tron-art"/><div className="tron-distance"/>
      <svg className="tron-arena" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="arenaFade" x2="0" y2="1"><stop stopColor="#6eeeff" stopOpacity="0"/><stop offset="1" stopColor="#6eeeff" stopOpacity=".35"/></linearGradient>
          <linearGradient id="cyanRun"><stop stopColor="#29d9ff" stopOpacity="0"/><stop offset=".8" stopColor="#42e4ff"/><stop offset="1" stopColor="#e4fdff"/></linearGradient>
        </defs>
        <g className="arena-floor" fill="none" stroke="url(#arenaFade)">
          {[-1600,-800,-200,250,600,1000,1350,1800,2400,3200].map(x=><path key={x} d={`M800 660 ${x} 1000`}/>)}
          {[680,710,755,820,910,999].map(y=><path key={y} d={`M0 ${y}H1600`}/>)}
        </g>
        <g className="arena-rails" fill="none"><path d="M0 1000 620 690H980L1600 1000"/><path d="M-250 1000 540 660H1060L1850 1000"/></g>
        <g className="arena-trails" fill="none">
          <path pathLength="1000" d="M-200 990 560 680H890L1200 820H1650"/>
          <path pathLength="1000" d="M1800 960 1040 680H720L420 810H-200"/>
          <path pathLength="1000" d="M100 1000 660 700H990L1500 980"/>
          <path pathLength="1000" d="M1550 1000 940 720H610L0 930"/>
        </g>
        <g className="arena-reflections" fill="none"><path pathLength="1000" d="M-200 1010 560 700H890L1200 840H1650"/><path pathLength="1000" d="M1800 980 1040 700H720L420 830H-200"/></g>
      </svg>
      <div className="tron-horizon"/>
    </div>
    <div className="noir-scene"><div className="noir-grain"/><div className="noir-frame"/></div>
    <div className="garden-scene"><div className="garden-art"/><div className="garden-light"/></div>
  </div>;
}
