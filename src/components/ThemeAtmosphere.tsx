"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startSceneMotion } from "@/lib/scene-motion";

export default function ThemeAtmosphere() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!canvas.current || pathname !== "/") return;
    return startSceneMotion(canvas.current);
  }, [pathname]);
  return <div className="theme-atmosphere" aria-hidden="true">
    <div className="tokyo-scene"><div className="tokyo-art"/><div className="tokyo-vignette"/></div>
    <div className="tron-scene"><div className="tron-art"/></div>
    <div className="noir-scene"><div className="noir-grain"/><div className="noir-frame"/></div>
    <div className="garden-scene"><div className="garden-art"/></div>
    <canvas ref={canvas} className="scene-motion"/>
  </div>;
}
