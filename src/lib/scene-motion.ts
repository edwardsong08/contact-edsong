type Point = { x: number; y: number };
type Leaf = { x: number; y: number; targetX: number; targetY: number; age: number; duration: number; size: number; phase: number };
type Ripple = { x: number; y: number; age: number; scale: number };
type Curve = [Point, Point, Point, Point];
const point = (x: number, y: number): Point => ({ x, y });
const bezier = (p: Curve, t: number): Point => {
  const s = 1 - t;
  return point(s*s*s*p[0].x+3*s*s*t*p[1].x+3*s*t*t*p[2].x+t*t*t*p[3].x,
    s*s*s*p[0].y+3*s*s*t*p[1].y+3*s*t*t*p[2].y+t*t*t*p[3].y);
};

/** One bounded decorative renderer. No React updates in the animation loop. */
export function startSceneMotion(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx = context;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0, height = 0, frame = 0, previous = 0, clock = 0;
  let theme = "", leaves: Leaf[] = [], ripples: Ripple[] = [];
  let nextLeaf = 4, lastInput = -10, lastPond = -10;
  let laneEnergy = 0, activeLane = 0;
  const rain = Array.from({length:110}, (_, i) => ({
    x: ((i * 73.71) % 100) / 100, y: ((i * 43.13) % 100) / 100,
    depth: .25 + (i % 7) / 9,
  }));
  const resize = () => {
    width = innerWidth; height = innerHeight;
    leaves=[];ripples=[];
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
    const pulse = .055 + .025*Math.sin(clock*.63) + .012*Math.sin(clock*1.27);
    const mobile=width<=600;
    const sign=map(mobile?45:155,mobile?300:280);
    const reflection=map(mobile?65:155,mobile?1540:865);
    glow(sign.x,sign.y,width*.075,height*.3,"#ff6b91",pulse);
    glow(reflection.x,reflection.y,width*.12,height*.075,"#ff6b91",pulse*.85);
    const right=map(mobile?900:1590,mobile?800:400);
    glow(right.x,right.y,width*.07,height*.28,"#ffb674",.04+.018*Math.sin(clock*.49+2));
    ctx.globalCompositeOperation="source-over";
    for (const drop of rain) {
      drop.y += dt*(.16+drop.depth*.31);
      if(drop.y>1.04) drop.y=-.04;
      const x=drop.x*width-drop.y*18, y=drop.y*height;
      const centre=Math.abs(drop.x-.5)<.3 && drop.y>.22 && drop.y<.7;
      ctx.strokeStyle=`rgba(190,220,235,${(.05+drop.depth*.10)*(centre?.25:1)})`;
      ctx.lineWidth=.4+drop.depth*.45;
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-1.5,y+4+drop.depth*12);ctx.stroke();
    }
    ctx.restore();
  }
  function lane(curve: Curve, phase: number, color: string, energy: number) {
    const t=(clock*.16+phase)%1;
    const fade=Math.min(1,t*12,(1-t)*12);
    // A tapered tail follows the SAME curve as the painted wall, from horizon out.
    for(let i=0;i<28;i++) {
      const u=t-i*.005;
      if(u<0) continue;
      const a=bezier(curve,u),b=bezier(curve,Math.max(0,u-.006));
      const pa=map(a.x,a.y),pb=map(b.x,b.y);
      const alpha=Math.pow(1-i/28,1.8)*fade*(.5+energy*.4);
      ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=1.2+u*1.8;
      ctx.shadowColor=color;ctx.shadowBlur=8;
      ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.stroke();
      // Reflection stretches with distance from the horizon, without a second clock.
      ctx.globalAlpha=alpha*.19;ctx.lineWidth=3+u*5;ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(pa.x,pa.y+5+u*11);ctx.lineTo(pb.x,pb.y+5+u*11);ctx.stroke();
    }
    ctx.shadowBlur=0;ctx.globalAlpha=1;
  }
  function tron(dt: number) {
    laneEnergy=Math.max(0,laneEnergy-dt*.7);
    const desktop=width>600;
    const cyan: Curve=desktop
      ? [point(570,738),point(400,730),point(170,665),point(-40,570)]
      : [point(435,1340),point(620,1380),point(110,1455),point(-70,1510)];
    const amber: Curve=desktop
      ? [point(1100,738),point(1280,730),point(1490,665),point(1720,570)]
      : [point(530,1340),point(390,1380),point(870,1460),point(1020,1530)];
    ctx.save();ctx.globalCompositeOperation="screen";
    lane(cyan,0,"#a8f3ff",activeLane===0?laneEnergy:0);
    lane(amber,.5,"#ffca88",activeLane===1?laneEnergy:0);
    ctx.restore();
  }
  function releaseLeaf() {
    if(leaves.length>=3) return;
    const edge=width<=600?.94:.84;
    leaves.push({x:width*(edge+Math.random()*.025),y:height*(.12+Math.random()*.07),
      targetX:width*(edge-.045),targetY:height*(.87+Math.random()*.045),
      age:0,duration:7+Math.random()*2,size:7+Math.random()*3,phase:Math.random()*6.28});
  }
  function ripple(x: number,y: number) {
    if(ripples.length>=6) ripples.shift();
    ripples.push({x,y,age:0,scale:.8+Math.random()*.35});
  }
  function drawLeaf(leaf: Leaf, x: number, y: number, t: number) {
    ctx.save();ctx.translate(x,y);ctx.rotate(leaf.phase+t*5+Math.sin(t*10)*.4);
    ctx.scale(leaf.size*(.7+.3*Math.cos(t*12)),leaf.size);
    ctx.globalAlpha=Math.min(1,t*7,(1-t)*12)*.85;
    ctx.fillStyle="#bd6b42";ctx.strokeStyle="#7d5735";ctx.lineWidth=.09;
    ctx.beginPath();
    ctx.moveTo(0,1);ctx.lineTo(-.38,.42);ctx.lineTo(-1,.12);ctx.lineTo(-.58,-.08);
    ctx.lineTo(-.84,-.62);ctx.lineTo(-.25,-.34);ctx.lineTo(0,-1.1);
    ctx.lineTo(.25,-.4);ctx.lineTo(.78,-.67);ctx.lineTo(.6,-.12);
    ctx.lineTo(1,.08);ctx.lineTo(.36,.42);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.strokeStyle="#edb37a";ctx.lineWidth=.065;
    ctx.beginPath();ctx.moveTo(0,1.25);ctx.lineTo(0,-.75);ctx.moveTo(0,.25);ctx.lineTo(-.6,-.3);ctx.moveTo(0,.2);ctx.lineTo(.58,-.32);ctx.stroke();ctx.restore();
  }
  function garden(dt: number) {
    if(clock>nextLeaf){releaseLeaf();nextLeaf=clock+13+Math.random()*6;}
    for(const leaf of leaves) {
      leaf.age+=dt;const t=Math.min(1,leaf.age/leaf.duration);
      const x=leaf.x+(leaf.targetX-leaf.x)*t+Math.sin(t*8+leaf.phase)*width*.018;
      const y=leaf.y+(leaf.targetY-leaf.y)*t;
      drawLeaf(leaf,x,y,t);
      if(t>=1) ripple(x,leaf.targetY);
    }
    leaves=leaves.filter(l=>l.age<l.duration);
    for(const ring of ripples) {
      ring.age+=dt;
      for(let i=0;i<3;i++) {
        const t=ring.age-i*.32;if(t<0||t>3)continue;
        const radius=(8+t*22)*ring.scale;
        ctx.globalAlpha=Math.sin(Math.min(1,t/.25)*Math.PI/2)*Math.pow(1-t/3,2)*.42;
        ctx.strokeStyle=i===1?"#5e8064":"#f2edc9";ctx.lineWidth=.8;
        ctx.beginPath();ctx.ellipse(ring.x,ring.y,radius,radius*.2,0,0,Math.PI*2);ctx.stroke();
      }
    }
    ctx.globalAlpha=1;ripples=ripples.filter(r=>r.age<3.7);
  }
  const blocked = (target: EventTarget|null) => target instanceof Element && !!target.closest("a,button,input,textarea,.settings-anchor,.playground");
  const pointer = (event: PointerEvent) => {
    if(reduce.matches||document.hidden||blocked(event.target)||document.querySelector('.playground'))return;
    if(theme==="matcha") {
      if(event.type==="pointerdown"&&event.clientY>height*.82&&clock-lastPond>.3) {
        ripple(event.clientX,event.clientY);lastPond=clock;
      } else if(event.clientY<height*.3&&event.clientY>75&&event.clientX>width*.55&&clock-lastInput>2.5) {
        releaseLeaf();lastInput=clock;
      }
    }
    if(theme==="neon"&&event.clientY>height*.72){laneEnergy=1;activeLane=event.clientX<width*.5?0:1;}
  };
  const draw = (now: number) => {
    frame=requestAnimationFrame(draw);
    if(now-previous<22)return;
    const dt=Math.min((now-previous)/1000,.05);previous=now;clock+=dt;
    ctx.clearRect(0,0,width,height);
    if(theme==="tokyo")tokyo(dt);
    else if(theme==="neon")tron(dt);
    else if(theme==="matcha")garden(dt);
  };
  const sync = () => {
    cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,width,height);
    const next=root.dataset.theme||"light";
    if(next!==theme){leaves=[];ripples=[];clock=0;nextLeaf=4;lastInput=-10;lastPond=-10;laneEnergy=0;theme=next;}
    if(!document.hidden&&!reduce.matches&&["tokyo","neon","matcha"].includes(theme)) {
      previous=performance.now();frame=requestAnimationFrame(draw);
    }
  };
  resize();const observer=new MutationObserver(sync);observer.observe(root,{attributes:true,attributeFilter:["data-theme"]});
  window.addEventListener("resize",resize);window.addEventListener("pointermove",pointer,{passive:true});window.addEventListener("pointerdown",pointer,{passive:true});
  document.addEventListener("visibilitychange",sync);reduce.addEventListener("change",sync);sync();
  return () => {cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("pointermove",pointer);window.removeEventListener("pointerdown",pointer);document.removeEventListener("visibilitychange",sync);reduce.removeEventListener("change",sync);ctx.clearRect(0,0,width,height);};
}
