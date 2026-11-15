import { createTronMotion } from "./tron-motion";
import { createGardenMotion } from "./garden-motion";
type Point = { x: number; y: number };
const point = (x: number, y: number): Point => ({ x, y });

/** One bounded decorative renderer. No React updates in the animation loop. */
export function startSceneMotion(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx = context;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0, height = 0, frame = 0, previous = 0, clock = 0;
  let theme = "";
  const tron = createTronMotion(ctx);
  const garden = createGardenMotion(ctx);
  const rain = Array.from({length:110}, (_, i) => ({
    x: ((i * 73.71) % 100) / 100, y: ((i * 43.13) % 100) / 100,
    depth: .25 + (i % 7) / 9,
  }));
  const resize = () => {
    width = innerWidth; height = innerHeight;
    tron.resize(width,height);
    garden.resize(width,height);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  // Desktop art fills the frame. Portrait art uses the same cover mapping as CSS.
  const map = (x: number, y: number): Point => {
    if (width > 600) return point(x / 1672 * width, y / 941 * height);
    const scale = Math.max(width / 941, height / 1672);
    return point(x*scale+(width-941*scale)/2, y*scale+(height-1672*scale)/2);
  };
  function glow(x: number, y: number, rx: number, ry: number, color: string, opacity: number) {
    ctx.save(); ctx.translate(x,y); ctx.scale(rx,ry);
    const gradient = ctx.createRadialGradient(0,0,0,0,0,1);
    gradient.addColorStop(0,color); gradient.addColorStop(1,"transparent");
    ctx.globalAlpha=opacity; ctx.fillStyle=gradient; ctx.fillRect(-1,-1,2,2); ctx.restore();
  }
  function tokyo(dt: number) {
    ctx.save(); ctx.globalCompositeOperation="screen";
    const mobile=width<=600;
    // One electrical rhythm drives each sign, its reflected wash and lit rain.
    const pink=.065+.026*Math.sin(clock*.57)+.009*Math.sin(clock*1.83);
    const amber=.045+.018*Math.sin(clock*.41+2);
    const sign=map(mobile?45:155,mobile?300:280);
    const reflection=map(mobile?65:155,mobile?1540:865);
    const right=map(mobile?900:1590,mobile?800:400);
    glow(sign.x,sign.y,width*.075,height*.3,"#ff6b91",pink);
    glow(reflection.x,reflection.y,width*.13,height*.06,"#ff6b91",pink*.75);
    glow(right.x,right.y,width*.07,height*.28,"#ffb674",amber);
    // Short uneven bands sit in the existing wet pavement, rather than a glow
    // following the pointer. Their phase follows the source above them.
    for(let i=0;i<9;i++){
      const y=reflection.y+(i-4)*height*.007;
      const spread=width*(.026+i*.004);
      const offset=Math.sin(clock*.8+i*2.1)*width*.003;
      const sheen=ctx.createLinearGradient(reflection.x-spread,0,reflection.x+spread,0);
      sheen.addColorStop(0,"transparent");sheen.addColorStop(.5,"#f786b3");sheen.addColorStop(1,"transparent");
      ctx.fillStyle=sheen;ctx.globalAlpha=pink*(.45+.18*Math.sin(clock+i));
      ctx.fillRect(reflection.x-spread+offset,y,spread*2,1.1);
    }
    // A few distant window groups breathe independently, below the headline.
    for(let i=0;i<4;i++){
      const window=map(mobile?(i%2?896:60):(i%2?1594:125),mobile?950+i*66:540+i*30);
      const intensity=Math.max(0,Math.sin(clock*.23+i*1.7))**4;
      glow(window.x,window.y,2.2,3.5,i%2?"#ffc490":"#e9a6c5",intensity*.21);
    }
    ctx.globalCompositeOperation="source-over";
    for (const drop of rain) {
      drop.y += dt*(.16+drop.depth*.31);
      if(drop.y>1.04) drop.y=-.04;
      const x=drop.x*width-drop.y*18, y=drop.y*height;
      const centre=Math.abs(drop.x-.5)<.3 && drop.y>.22 && drop.y<.7;
      const light=drop.x<.19?pink*5:drop.x>.85?amber*5:0;
      ctx.globalAlpha=(.045+drop.depth*.10+light*.12)*(centre?.22:1);
      ctx.strokeStyle=drop.x<.19?"#eeb2ca":drop.x>.85?"#eac7a3":"#bedceb";
      ctx.lineWidth=.4+drop.depth*.45;
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-1.5,y+4+drop.depth*12);ctx.stroke();
    }
    // Rain catches the horizontal wet surface in sparse, shallow splashes.
    for(let i=0;i<8;i++){
      const phase=(clock*.65+i*.319)%1;if(phase>.42)continue;
      const x=width*(i%2?.88-(i%3)*.035:.055+(i%3)*.046),y=height*(.88+(i%4)*.027);
      ctx.globalAlpha=(1-phase/.42)*.12;
      ctx.strokeStyle=i%2?"#ddb89e":"#eaa3c4";ctx.lineWidth=.6;
      ctx.beginPath();ctx.ellipse(x,y,2+phase*19,.5+phase*2.6,0,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();
  }
  const blocked = (target: EventTarget|null) => target instanceof Element && !!target.closest("a,button,input,textarea,.settings-anchor,.playground");
  const pointer = (event: PointerEvent) => {
    if(reduce.matches||document.hidden||blocked(event.target)||document.querySelector('.playground'))return;
    if(theme==="matcha")garden.pointer(event.clientX,event.clientY,event.type==="pointerdown");
    if(theme==="neon")tron.pointer(event.clientX,event.clientY,event.type==="pointerdown");
  };
  const draw = (now: number) => {
    frame=requestAnimationFrame(draw);
    if(now-previous<(theme==="neon"?14:22))return;
    const dt=Math.min((now-previous)/1000,.05);previous=now;clock+=dt;
    ctx.clearRect(0,0,width,height);
    if(theme==="tokyo")tokyo(dt);
    else if(theme==="neon")tron.draw(dt);
    else if(theme==="matcha")garden.draw(dt);
  };
  const sync = () => {
    cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,width,height);
    const next=root.dataset.theme||"light";
    if(next!==theme){garden.reset();clock=0;tron.reset();theme=next;}
    if(!document.hidden&&!reduce.matches&&["tokyo","neon","matcha"].includes(theme)) {
      previous=performance.now();frame=requestAnimationFrame(draw);
    }
  };
  resize();const observer=new MutationObserver(sync);observer.observe(root,{attributes:true,attributeFilter:["data-theme"]});
  window.addEventListener("resize",resize);window.addEventListener("pointermove",pointer,{passive:true});window.addEventListener("pointerdown",pointer,{passive:true});
  document.addEventListener("visibilitychange",sync);reduce.addEventListener("change",sync);sync();
  return () => {cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("pointermove",pointer);window.removeEventListener("pointerdown",pointer);document.removeEventListener("visibilitychange",sync);reduce.removeEventListener("change",sync);ctx.clearRect(0,0,width,height);};
}
