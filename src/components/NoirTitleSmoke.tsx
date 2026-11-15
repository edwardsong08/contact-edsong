"use client";

import { useEffect, useRef } from "react";

/** The profile's actual fluid solver, supplied with a live typography texture. */
export default function NoirTitleSmoke() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    const title = element?.parentElement;
    if (!element || !title) return;
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame: HTMLIFrameElement | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let source = "";
    let loaded = false;
    let settle: ReturnType<typeof setTimeout>;
    const clear = () => {
      clearTimeout(settle); loaded = false;
      delete title.dataset.fluidReady;
      frame?.remove(); frame = null;
    };
    const setup = () => {
      clearTimeout(timer); clear();
      if (root.dataset.theme !== "noir" || root.dataset.motion === "off" || reduced.matches || document.hidden) return;
      timer = setTimeout(() => {
        const box = element.getBoundingClientRect();
        if (!box.width || !box.height) return;
        const mask = document.createElement("canvas");
        const dpr = Math.min(devicePixelRatio || 1, 2);
        mask.width = Math.round(box.width * dpr); mask.height = Math.round(box.height * dpr);
        const ink = mask.getContext("2d");
        if (!ink) return;
        ink.scale(dpr, dpr); ink.fillStyle = "white"; ink.fillRect(0, 0, box.width, box.height);
        ink.fillStyle = "black"; ink.textBaseline = "alphabetic";
        for (const node of title.querySelectorAll<HTMLElement>("[data-smoke-source]")) {
          const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
          const text = node.textContent || "";
          ink.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          const metrics = ink.measureText(text);
          const ascent = metrics.fontBoundingBoxAscent || parseFloat(style.fontSize) * .8;
          const descent = metrics.fontBoundingBoxDescent || parseFloat(style.fontSize) * .2;
          ink.save();
          ink.translate(rect.left - box.left, rect.top - box.top + (rect.height - ascent - descent) / 2 + ascent);
          ink.scale(rect.width / Math.max(metrics.width, 1), 1); ink.fillText(text, 0, 0); ink.restore();
        }
        source = mask.toDataURL("image/png");
        frame = document.createElement("iframe");
        frame.title = "Decorative headline dispersion"; frame.tabIndex = -1;
        frame.setAttribute("aria-hidden", "true");
        frame.src = "/themes/noir-fluid.html?embed&smoke&hybrid&material-recovery&refinement=arrival";
        element.appendChild(frame);
      }, 120);
    };
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
      if (event.data?.type === "headline-source-request") frame?.contentWindow?.postMessage({type:"headline-source", image:source}, location.origin);
      if (event.data?.type === "fluid-ready") { loaded = true; frame?.contentWindow?.postMessage({type:"fluid-visible", visible:false}, location.origin); }
      if (event.data?.type === "fluid-failed") clear();
    };
    const move = (event: PointerEvent) => {
      if (!frame || !loaded || event.target instanceof Element && event.target.closest("a,button,input,textarea,.playground")) return;
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        title.dataset.fluidReady = "true";
        clearTimeout(settle);
        settle = setTimeout(() => { delete title.dataset.fluidReady; frame?.contentWindow?.postMessage({type:"fluid-visible",visible:false}, location.origin); }, 6500);
        frame.contentWindow?.postMessage({type:"fluid-visible",visible:true}, location.origin);
        frame.contentWindow?.postMessage({type:"fluid-pointer",x,y}, location.origin);
      }
    };
    const watch = new MutationObserver(setup);
    watch.observe(root, {attributes:true, attributeFilter:["data-theme", "data-motion"]});
    const resize = new ResizeObserver(setup); resize.observe(title);
    window.addEventListener("message", receive); window.addEventListener("pointermove", move, {passive:true});
    window.addEventListener("pointerdown", move, {passive:true});
    reduced.addEventListener("change", setup); document.addEventListener("visibilitychange", setup);
    setup();
    return () => {
      clearTimeout(timer); clear(); watch.disconnect(); resize.disconnect();
      window.removeEventListener("message", receive); window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move); reduced.removeEventListener("change", setup);
      document.removeEventListener("visibilitychange", setup);
    };
  }, []);
  return <div ref={host} className="noir-title-smoke" aria-hidden="true" />;
}
