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
    let wantsVisible = false;
    let settle: ReturnType<typeof setTimeout>;
    let pause: ReturnType<typeof setTimeout>;
    let generation = 0;
    const clear = () => {
      generation++;
      clearTimeout(settle); clearTimeout(pause); loaded = false; wantsVisible = false;
      delete title.dataset.fluidReady; delete title.dataset.fluidWarming;
      frame?.remove(); frame = null;
    };
    const setup = () => {
      clearTimeout(timer); clear();
      if (root.dataset.theme !== "noir" || reduced.matches || document.hidden) return;
      timer = setTimeout(async () => {
        const revision = generation;
        await document.fonts.ready;
        if (revision !== generation) return;
        const box = element.getBoundingClientRect();
        if (!box.width || !box.height) return;
        const mask = document.createElement("canvas");
        const dpr = Math.min(devicePixelRatio || 1, 2);
        mask.width = Math.round(box.width * dpr); mask.height = Math.round(box.height * dpr);
        const ink = mask.getContext("2d");
        if (!ink) return;
        // Use the browser's HTML text layout, not a second approximation of its
        // baselines, kerning, italic metrics, whitespace, or responsive wrapping.
        const clone = title.cloneNode(true) as HTMLElement;
        clone.querySelector(".noir-title-smoke")?.remove();
        const originals = [title, ...title.querySelectorAll<HTMLElement>("span,em,br")];
        const copies = [clone, ...clone.querySelectorAll<HTMLElement>("span,em,br")];
        const typography = ["font-family", "font-size", "font-weight", "font-style", "font-stretch", "font-kerning", "font-feature-settings", "font-variation-settings", "font-optical-sizing", "line-height", "letter-spacing", "word-spacing", "text-align", "text-indent", "text-transform", "white-space", "word-break", "overflow-wrap", "text-wrap", "direction", "display", "vertical-align"];
        originals.forEach((node, index) => {
          const style = getComputedStyle(node);
          for (const property of typography) copies[index].style.setProperty(property, style.getPropertyValue(property));
          copies[index].style.color = "black";
          copies[index].style.textShadow = "none";
          copies[index].style.opacity = "1";
        });
        const titleBox = title.getBoundingClientRect();
        Object.assign(clone.style, {margin:"0", padding:"0", border:"0", position:"absolute", boxSizing:"border-box", width:`${titleBox.width}px`, height:`${titleBox.height}px`, left:`${titleBox.left-box.left}px`, top:`${titleBox.top-box.top}px`});
        const markup = new XMLSerializer().serializeToString(clone);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="position:relative;width:100%;height:100%;background:white">${markup}</div></foreignObject></svg>`;
        try {
          const image = new Image();
          image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
          await image.decode();
          if (revision !== generation) return;
          ink.drawImage(image, 0, 0, mask.width, mask.height);
          source = mask.toDataURL("image/png");
        } catch { return; /* Keep the original text when rasterization is unavailable. */ }
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
      if (event.data?.type === "fluid-painted" && loaded && wantsVisible) {
        title.dataset.fluidReady = "true"; delete title.dataset.fluidWarming;
      }
      if (event.data?.type === "fluid-failed") clear();
    };
    const move = (event: PointerEvent) => {
      if (!frame || !loaded || event.target instanceof Element && event.target.closest("a,button,input,textarea,.playground")) return;
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        wantsVisible = true;
        if (title.dataset.fluidReady !== "true") title.dataset.fluidWarming = "true";
        clearTimeout(settle); clearTimeout(pause);
        settle = setTimeout(() => {
          wantsVisible = false;
          delete title.dataset.fluidReady; delete title.dataset.fluidWarming;
          // Let the final fluid detail dissolve into the identically aligned DOM
          // text before suspending the solver. A new gesture cancels this pause.
          pause = setTimeout(() => frame?.contentWindow?.postMessage({type:"fluid-visible",visible:false}, location.origin), 350);
        }, 3800);
        frame.contentWindow?.postMessage({type:"fluid-visible",visible:true,needsPaint:title.dataset.fluidReady !== "true"}, location.origin);
        frame.contentWindow?.postMessage({type:"fluid-pointer",x,y}, location.origin);
      }
    };
    const watch = new MutationObserver(setup);
    watch.observe(root, {attributes:true, attributeFilter:["data-theme"]});
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
