"use client";

import { useEffect, useRef } from "react";

type Wisp = { x:number; y:number; age:number; life:number; size:number; phase:number };

/** Silver smoke rises from a sampled letter mask; semantic text stays sharp beneath it. */
export default function NoirTitleSmoke() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const title = element?.parentElement;
    if (!element || !title) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let stop: (() => void) | undefined;
    const setup = () => {
      stop?.(); stop = undefined;
      if (root.dataset.theme !== "noir" || root.dataset.motion === "off" || reduce.matches || document.hidden) return;
      const ctx = element.getContext("2d");
      if (!ctx) return;
      let width = 0, height = 0;
      let points: [number,number][] = [];
      let wisps: Wisp[] = [];
      const sprite = document.createElement("canvas"); sprite.width = sprite.height = 64;
      const brush = sprite.getContext("2d");
      if (!brush) return;
      const gradient = brush.createRadialGradient(32,32,0,32,32,32);
      gradient.addColorStop(0,"rgba(235,232,225,.22)");
      gradient.addColorStop(.35,"rgba(200,198,193,.12)");
      gradient.addColorStop(1,"rgba(200,198,193,0)");
      brush.fillStyle = gradient; brush.fillRect(0,0,64,64);
      const resize = () => {
        const box = title.getBoundingClientRect();
        width = Math.ceil(box.width + 120); height = Math.ceil(box.height + 150);
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        element.width = width * dpr; element.height = height * dpr;
        ctx.setTransform(dpr,0,0,dpr,0,0);
        const mask = document.createElement("canvas"); mask.width = width; mask.height = height;
        const ink = mask.getContext("2d", { willReadFrequently:true });
        if (!ink) return;
        ink.fillStyle = "white"; ink.textBaseline = "middle";
        for (const node of title.querySelectorAll<HTMLElement>("[data-smoke-source]")) {
          const r = node.getBoundingClientRect(), s = getComputedStyle(node), text = node.textContent || "";
          ink.font = s.fontStyle + " " + s.fontWeight + " " + s.fontSize + " " + s.fontFamily;
          const measured = ink.measureText(text).width;
          ink.save(); ink.translate(r.left-box.left+60,r.top-box.top+100+r.height*.47);
          ink.scale(r.width / Math.max(measured,1),1); ink.fillText(text,0,0); ink.restore();
        }
        const data = ink.getImageData(0,0,width,height).data;
        points = [];
        for(let y=0;y<height;y+=3) for(let x=0;x<width;x+=3) {
          if(data[(y*width+x)*4+3]>100 && points.length<12000) points.push([x,y]);
        }
        wisps = [];
      };
      resize();
      const observer = new ResizeObserver(resize); observer.observe(title);
      let frame = 0, previous = 0, accumulator = 0;
      const draw = (time:number) => {
        if(time-previous<32) { frame=requestAnimationFrame(draw); return; }
        const dt = Math.min((time-previous)/1000 || .032,.06); previous=time;
        ctx.clearRect(0,0,width,height);
        accumulator += dt*35;
        while(accumulator>=1 && points.length) {
          accumulator--;
          const p=points[Math.floor(Math.random()*points.length)];
          if(wisps.length<180) wisps.push({x:p[0],y:p[1],age:0,life:2.8+Math.random()*2,size:10+Math.random()*15,phase:Math.random()*Math.PI*2});
        }
        wisps = wisps.filter(p=>p.age<p.life);
        for(const p of wisps) {
          p.age+=dt; p.y-=dt*(14+p.age*5); p.x+=Math.sin(p.age*2+p.phase)*dt*12;
          const fraction=p.age/p.life;
          ctx.globalAlpha=Math.sin(fraction*Math.PI)*.58;
          const size=p.size*(1+p.age*.65);
          ctx.drawImage(sprite,p.x-size,p.y-size,size*2,size*2);
        }
        ctx.globalAlpha=1;
        frame=requestAnimationFrame(draw);
      };
      frame=requestAnimationFrame(draw);
      stop=()=>{cancelAnimationFrame(frame);observer.disconnect();ctx.clearRect(0,0,width,height);};
    };
    const watch = new MutationObserver(setup);
    watch.observe(root,{attributes:true,attributeFilter:["data-theme","data-motion"]});
    reduce.addEventListener("change",setup);
    document.addEventListener("visibilitychange",setup);
    setup();
    return ()=>{stop?.();watch.disconnect();reduce.removeEventListener("change",setup);document.removeEventListener("visibilitychange",setup);};
  },[]);
  return <canvas ref={canvas} className="noir-title-smoke" aria-hidden="true" />;
}
