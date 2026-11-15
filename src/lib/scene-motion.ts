import { createTronMotion } from "./tron-motion";
import { createGardenMotion } from "./garden-motion";
import { createNoirMotion } from "./noir-motion";
import { createTokyoMotion } from "./tokyo-motion";

/** One bounded decorative renderer. No React updates in the animation loop. */
export function startSceneMotion(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx = context;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0, height = 0, frame = 0, previous = 0;
  let theme = "";
  const tokyo = createTokyoMotion(ctx);
  const tron = createTronMotion(ctx);
  const garden = createGardenMotion(ctx);
  const noir = createNoirMotion(ctx);
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    tokyo.resize(width,height);
    tron.resize(width,height);
    garden.resize(width,height);
    noir.resize(width,height);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  const blocked = (target: EventTarget|null) => target instanceof Element && !!target.closest("a,button,input,textarea,.settings-anchor,.playground");
  const pointer = (event: PointerEvent) => {
    if(reduce.matches||document.hidden||blocked(event.target)||document.querySelector('.playground'))return;
    if(theme==="matcha")garden.pointer(event.clientX,event.clientY,event.type==="pointerdown");
    if(theme==="neon")tron.pointer(event.clientX,event.clientY,event.type==="pointerdown");
  };
  const draw = (now: number) => {
    frame=requestAnimationFrame(draw);
    if(now-previous<(theme==="neon"?14:theme==="noir"?32:22))return;
    const dt=Math.min((now-previous)/1000,.05);previous=now;
    ctx.clearRect(0,0,width,height);
    if(theme==="tokyo")tokyo.draw(dt);
    else if(theme==="neon")tron.draw(dt);
    else if(theme==="matcha")garden.draw(dt);
    else if(theme==="noir")noir.draw(dt);
  };
  const sync = () => {
    cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,width,height);
    const next=root.dataset.theme||"light";
    if(next!==theme){garden.reset();tokyo.reset();tron.reset();noir.reset();theme=next;
      if(theme==="noir")noir.activate();}
    if(!document.hidden&&!reduce.matches&&["tokyo","neon","matcha","noir"].includes(theme)) {
      previous=performance.now();frame=requestAnimationFrame(draw);
    }
  };
  resize();const observer=new MutationObserver(sync);observer.observe(root,{attributes:true,attributeFilter:["data-theme"]});
  window.addEventListener("resize",resize);window.addEventListener("pointermove",pointer,{passive:true});window.addEventListener("pointerdown",pointer,{passive:true});
  document.addEventListener("visibilitychange",sync);reduce.addEventListener("change",sync);sync();
  return () => {cancelAnimationFrame(frame);noir.dispose();observer.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("pointermove",pointer);window.removeEventListener("pointerdown",pointer);document.removeEventListener("visibilitychange",sync);reduce.removeEventListener("change",sync);ctx.clearRect(0,0,width,height);};
}
