"use client";

import { useEffect, useRef } from "react";

/** Decorative scene motion; no cursor tracking. Paused when hidden or offscreen. */
export default function ThemeAtmosphere() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => { if (scene.current) scene.current.dataset.paused = String(document.hidden); };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return <div ref={scene} className="theme-atmosphere" aria-hidden="true">
    <div className="tokyo-scene">
      <div className="tokyo-moon" />
      <svg className="tokyo-city" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cityFace" x2="1" y2="1"><stop stopColor="#171a38"/><stop offset="1" stopColor="#090b1b"/></linearGradient>
          <linearGradient id="cityMist" x2="0" y2="1"><stop stopColor="#a34a9520"/><stop offset="1" stopColor="#080a18"/></linearGradient>
          <pattern id="cityWindows" width="22" height="28" patternUnits="userSpaceOnUse"><rect x="7" y="8" width="3" height="8" fill="#9d88c6" opacity=".18"/><rect x="14" y="8" width="3" height="8" fill="#e4b3bf" opacity=".08"/></pattern>
          <linearGradient id="wetStreet" x2="0" y2="1"><stop stopColor="#dd6598" stopOpacity=".25"/><stop offset="1" stopColor="#a86acc" stopOpacity="0"/></linearGradient>
        </defs>
        <g fill="#11142b" stroke="#43405d" strokeOpacity=".3">
          <path d="M0 800V390h90v410M100 800V490h80v310M200 800V580h65v220M270 800V650h75v150M1260 800V580h75v220M1350 800V440h90v360M1450 800V330h90v470M1550 800V510h50v290"/>
          <path d="M355 800V690h70v110M1170 800V670h65v130M480 800V720h60v80M1080 800V715h60v85"/>
        </g>
        <g fill="url(#cityFace)" stroke="#514565" strokeWidth="1">
          <path d="M0 900V165h150v735M150 900V420h84v480M234 900V585h70v315"/>
          <path d="M1600 900V230h-150v670M1450 900V460h-85v440M1365 900V620h-70v280"/>
        </g>
        <g fill="url(#cityWindows)">
          <path d="M0 900V165h150v735M150 900V420h84v480M234 900V585h70v315M1600 900V230h-150v670M1450 900V460h-85v440M1365 900V620h-70v280"/>
        </g>
        <g className="tokyo-signs" fill="none" strokeLinecap="round">
          <path d="M126 220v185" stroke="#ff779f" strokeWidth="3"/><path d="M144 265v110" stroke="#ff779f" strokeWidth="9" opacity=".2"/>
          <rect x="30" y="470" width="86" height="29" rx="2" stroke="#8b9fff" strokeWidth="2"/>
          <path d="M47 484h53M192 486v98M1404 510v96" stroke="#aaa0ff" strokeWidth="2"/>
          <path d="M1470 290v132M1484 320v75" stroke="#f898ae" strokeWidth="3"/>
          <path d="M1510 570h78v32h-78zM1528 586h42" stroke="#ffae85" strokeWidth="2"/>
          <path d="M263 642h26v69h-26zM1316 667h24v56h-24z" stroke="#8ca5f5"/>
        </g>
        <path d="M0 840Q800 710 1600 840V1000H0Z" fill="url(#cityMist)"/>
        <g fill="url(#wetStreet)" opacity=".65">
          <path d="m112 830 30 0 180 170H180ZM1464 825h23l-155 175h-75ZM235 842h12l135 158h-52ZM1364 850h15l-104 150h-44Z"/>
        </g>
        <g stroke="#e08da9" strokeOpacity=".13"><path d="M0 905h1600M0 938h1600M0 981h1600"/></g>
      </svg>
      <div className="tokyo-rain rain-near" /><div className="tokyo-rain rain-far" />
      <div className="tokyo-vignette" />
    </div>
    <div className="tron-scene">
      <div className="tron-floor" /><div className="tron-horizon" />
      <svg className="tron-circuits" viewBox="0 0 1600 1000" preserveAspectRatio="none">

        <g className="circuit-bed">
          <path d="M0 180h180l100 100v180l-80 80v300l150 160"/>
          <path d="M1600 130h-170l-120 120v220l85 85v255l-160 190"/>
          <path d="M0 750h110l100-100V360l-55-55H0"/>
          <path d="M1600 730h-100l-90-90V350l65-65h125"/>
          <path d="M300 1000 500 800h180M1300 1000l-200-200H920"/>
          <path d="M0 110h100l30 30h180M1600 70h-110l-30 30h-170"/>
        </g>
        <g className="circuit-light">
          <path pathLength="1000" d="M0 180h180l100 100v180l-80 80v300l150 160"/>
          <path pathLength="1000" d="M1600 130h-170l-120 120v220l85 85v255l-160 190"/>
          <path pathLength="1000" d="M0 750h110l100-100V360l-55-55H0"/>
          <path pathLength="1000" d="M1600 730h-100l-90-90V350l65-65h125"/>
          <path pathLength="1000" d="M300 1000 500 800h180"/>
          <path pathLength="1000" d="M1300 1000l-200-200H920"/>
        </g>
        <g className="circuit-nodes" fill="#84f1ff"><circle cx="280" cy="280" r="3"/><circle cx="1310" cy="250" r="3"/><circle cx="680" cy="800" r="3"/><circle cx="920" cy="800" r="3"/></g>
      </svg>
      <div className="tron-disc"><i/><i/><i/></div>
    </div>
    <div className="noir-scene"><div className="noir-grain" /><div className="noir-frame" /></div>
    <div className="garden-scene">
      <svg className="garden-landscape" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="gardenSky" x2="0" y2="1"><stop stopColor="#e6e9d5"/><stop offset=".6" stopColor="#f1eddd"/><stop offset="1" stopColor="#c6d2ad"/></linearGradient>
          <linearGradient id="teaHill" x2="0" y2="1"><stop stopColor="#8a9f6a"/><stop offset="1" stopColor="#526e49"/></linearGradient>
          <linearGradient id="gardenVeil" x2="0" y2="1"><stop stopColor="#f1eddd" stopOpacity="0"/><stop offset=".5" stopColor="#f1eddd" stopOpacity=".9"/><stop offset="1" stopColor="#f1eddd" stopOpacity="0"/></linearGradient>
          <g id="teaLeaf"><path d="M0 0Q-20-48 0-88Q25-45 0 0Z" fill="currentColor"/><path d="M0-6v-72" stroke="#f0edcf" strokeOpacity=".3" strokeWidth="1"/></g>
          <g id="teaSpray"><path d="M0 0Q20-130 5-280" fill="none" stroke="currentColor" strokeWidth="3"/><use href="#teaLeaf" transform="translate(8 -30) rotate(-55) scale(1.2)"/><use href="#teaLeaf" transform="translate(13 -70) rotate(55) scale(1.1)"/><use href="#teaLeaf" transform="translate(14 -125) rotate(-48)"/><use href="#teaLeaf" transform="translate(14 -170) rotate(48) scale(.85)"/><use href="#teaLeaf" transform="translate(9 -220) rotate(-25) scale(.7)"/><use href="#teaLeaf" transform="translate(6 -250) rotate(18) scale(.6)"/></g>
        </defs>
        <rect width="1600" height="1000" fill="url(#gardenSky)"/>

        <path d="M0 660Q210 420 440 630Q620 470 820 640Q1130 380 1600 610V1000H0Z" fill="#aab99b" opacity=".33"/>
        <path d="M0 780Q300 550 590 780Q1080 510 1600 730V1000H0Z" fill="#a5b58b" opacity=".38"/>
        <path d="M0 1000V840Q240 740 500 910Q870 1030 1150 830Q1390 670 1600 815V1000Z" fill="url(#teaHill)" opacity=".65"/>
        <g fill="none" stroke="#e4e9c9" strokeWidth="2" opacity=".22"><path d="M1130 1000q210-245 470-120M1230 1000q190-200 370-80M1340 1000q150-145 260-40M0 900q220-100 460 100M0 945q160-65 320 55"/></g>
        <rect y="450" width="1600" height="440" fill="url(#gardenVeil)"/>
        <g className="tea-left" color="#486b42"><use href="#teaSpray" transform="translate(30 1020) rotate(23) scale(1.7)"/><use href="#teaSpray" transform="translate(120 1080) rotate(-18) scale(1.2)"/></g>
        <g className="tea-right" color="#5b7948"><use href="#teaSpray" transform="translate(1550 1060) rotate(-22) scale(1.8)"/><use href="#teaSpray" transform="translate(1470 1100) rotate(15) scale(1.1)"/></g>
      </svg>
      <div className="garden-sun" /><svg className="garden-botanicals" viewBox="0 0 400 700" preserveAspectRatio="xMidYMax meet"><g color="#486b42"><use href="#teaSpray" transform="translate(-10 700) rotate(15) scale(.95)"/><use href="#teaSpray" transform="translate(410 720) rotate(-20) scale(1.1)"/></g></svg><div className="garden-mist" /><div className="garden-paper" />
    </div>
  </div>;
}
