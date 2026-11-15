import { sceneLayout } from "./scene-layout";
import { TRON_DESKTOP, TRON_MOBILE, sampleLightPath } from "./tron-paths";

const CIRCUIT_STAGES=[
      {lanes:[4,5],start:1,duration:3.2,reverse:false,power:1.15},
      {lanes:[0,1],start:4.05,duration:2.9,reverse:true,power:1.35},
      {lanes:[2,3],start:6.8,duration:3.4,reverse:false,power:1.2},
    ];
const PANEL_PASSES=[[6,.055,8],[1.3,.42,3]] as const;

type Pulse = { lane:number; t:number; direction:number; age:number };
export function createTronMotion(ctx:CanvasRenderingContext2D) {
  let width=0,height=0,time=0,energy=0,lastPress=-10;
  let pointerX=-1000,pointerY=-1000;
  let pulses:Pulse[]=[];
  let paths=TRON_DESKTOP;
  let horizon=0;
  let foregroundEnd=Infinity;
  let samples:{x:number;y:number}[][]=[];
  const resize=(w:number,h:number)=>{
    width=w;height=h;pulses=[];
    const layout=sceneLayout(w,h,"tron");
    foregroundEnd=layout.framed?layout.imageHeight*layout.scale:Infinity;
    paths=layout.portrait?TRON_MOBILE:TRON_DESKTOP;
    horizon=layout.toScreen(0,layout.portrait?1343:741).y;
    samples=paths.map(path=>sampleLightPath(path).map(p=>layout.toScreen(p.x,p.y)));
  };
  // Match the artwork's foreground mask, including reflected/interacting light.
  const foregroundOpacity=(y:number)=>foregroundEnd===Infinity?1:Math.max(0,Math.min(1,(foregroundEnd-y)/(foregroundEnd*.16)));
  const closest=(x:number,y:number)=>{
    let distance=Infinity,lane=0,t=0;
    samples.forEach((points,index)=>points.forEach((p,i)=>{
      const d=Math.hypot(p.x-x,p.y-y);
      if(d<distance){distance=d;lane=index;t=i/(points.length-1);}
    }));
    return {distance,lane,t};
  };
  const pointer=(x:number,y:number,down:boolean)=>{
    pointerX=x;pointerY=y;energy=1;
    if(!down||time-lastPress<.45)return;
    const near=closest(x,y);
    // A click on a light sends a paired signal along that same light path.
    if(near.distance<Math.max(38,width*.045)) {
      if(pulses.length>=10)pulses.splice(0,2);
      pulses.push({lane:near.lane,t:near.t,direction:1,age:0},{lane:near.lane,t:near.t,direction:-1,age:0});
      lastPress=time;
    }
  };
  const trail=(lane:number,t:number,power:number,direction=1)=>{
    const path=paths[lane],points=samples[lane];
    const atPoint=(t:number)=>{
      const n=t*(points.length-1),index=Math.floor(n),fraction=n-index;
      const a=points[index],b=points[Math.min(index+1,points.length-1)];
      return {x:a.x+(b.x-a.x)*fraction,y:a.y+(b.y-a.y)*fraction};
    };
    const fade=Math.min(1,t*20,(1-t)*20);
    if(fade<=0)return;
    // One continuous curve, painted in tapered segments rather than moving dots.
    for(let i=0;i<12;i++) {
      const at=t-direction*i*.007,to=at-direction*.008;
      if(at<=0||at>=1||to<=0||to>=1)continue;
      const a=atPoint(at),b=atPoint(to);
      // Quiet the overhead framing; the light walls carry the main motion.
      const sceneWeight=.38+.62*Math.min(1,a.y/(height*.62));
      const alpha=Math.min(1,(1-i/12)**1.7*fade*power*sceneWeight*foregroundOpacity(a.y));
      ctx.globalAlpha=alpha;ctx.strokeStyle=path.color;
      ctx.lineWidth=path.weight>1?2:1;ctx.shadowColor=path.color;ctx.shadowBlur=i<3?7:0;
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      if(path.reflection){
        // Mirror elevated walls about their floor intersection. The previous
        // constant offset made the reflection look like a second floating rail.
        const ay=horizon+(horizon-a.y)*.86,by=horizon+(horizon-b.y)*.86;
        const distance=Math.max(0,(ay-horizon)/(height-horizon));
        const broken=.55+.45*Math.sin(a.x*.09+ay*.14)**2;
        ctx.globalAlpha=alpha*.19*(1-Math.min(1,distance)*.65)*broken*foregroundOpacity(ay);
        ctx.lineWidth=2.8+distance*3;ctx.shadowBlur=6;
        ctx.beginPath();ctx.moveTo(a.x,ay);ctx.lineTo(b.x,by);ctx.stroke();
      }
    }
  };
  const draw=(dt:number)=>{
    time+=dt;energy=Math.max(0,energy-dt*.45);
    ctx.save();ctx.globalCompositeOperation="screen";ctx.lineCap="round";
    paths.forEach((path,i)=>{
      const t=(time*path.speed+i*.173)%1;
      trail(i,t,path.weight>1?.95:.48);
      if(i<6)trail(i,(t+.5)%1,.55);
      if(energy>0){
        // Illuminate the existing line locally. There is no cursor spotlight.
        ctx.shadowBlur=0;ctx.lineWidth=path.weight+1;ctx.strokeStyle=path.color;
        const points=samples[i];
        for(let j=1;j<points.length;j++){
          const a=points[j-1],b=points[j],distance=Math.hypot(b.x-pointerX,b.y-pointerY);
          if(distance>110)continue;
          ctx.globalAlpha=(1-distance/110)**2*energy*.9*foregroundOpacity(b.y);
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    });
    // One architectural circuit: overhead feeds the walls, the walls converge
    // at the horizon, then the floor carries the signal toward the visitor.
    // The same trail function paints its corresponding wet-floor reflection.
    const cycle=time%15;
    for(const stage of CIRCUIT_STAGES){
      const progress=(cycle-stage.start)/stage.duration;
      if(progress<=0||progress>=1)continue;
      for(const lane of stage.lanes)trail(lane,stage.reverse?1-progress:progress,stage.power,stage.reverse?-1:1);
    }
    // Short sections of the existing side panels wake in a measured sequence.
    // No free-floating dots, new geometry, or washes across the central copy.
    for(let lane=0;lane<2;lane++){
      const points=samples[lane];
      for(let panel=0;panel<5;panel++){
        const age=cycle-(3.5+panel*.42);
        if(age<0||age>2.6)continue;
        const strength=Math.sin(Math.min(1,age/.55)*Math.PI/2)*Math.max(0,1-age/2.6);
        const start=Math.floor((.84-panel*.13)*(points.length-1));
        const end=Math.min(points.length-1,start+10);
        const floor=samples[lane+2];
        const floorY=(x:number)=>{
          for(let index=1;index<floor.length;index++){
            const a=floor[index-1],b=floor[index];
            if(x<Math.min(a.x,b.x)||x>Math.max(a.x,b.x))continue;
            const mix=(x-a.x)/(b.x-a.x||1);
            return a.y+(b.y-a.y)*mix;
          }
          return floor[floor.length-1].y;
        };
        const a=points[start],b=points[end];
        const lowA=floorY(a.x),lowB=floorY(b.x);
        // A translucent section of the actual wall, bounded by its two rails.
        const face=ctx.createLinearGradient(0,Math.min(a.y,b.y),0,Math.max(lowA,lowB));
        face.addColorStop(0,paths[lane].color);face.addColorStop(.7,"transparent");
        ctx.fillStyle=face;ctx.shadowBlur=0;ctx.globalAlpha=strength*.085*foregroundOpacity(lowA);
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.lineTo(b.x,lowB);ctx.lineTo(a.x,lowA);ctx.closePath();ctx.fill();
        ctx.strokeStyle=paths[lane].color;ctx.shadowColor=paths[lane].color;
        for(const [lineWidth,alpha,blur] of PANEL_PASSES){
          ctx.lineWidth=lineWidth;ctx.shadowBlur=blur;ctx.globalAlpha=strength*alpha*foregroundOpacity(points[start].y);
          ctx.beginPath();ctx.moveTo(points[start].x,points[start].y);
          for(let point=start+1;point<=end;point++)ctx.lineTo(points[point].x,points[point].y);
          ctx.stroke();
        }
      }
    }
    for(const pulse of pulses){pulse.age+=dt;pulse.t+=dt*.27*pulse.direction;trail(pulse.lane,pulse.t,Math.max(0,1-pulse.age/3)*1.4,pulse.direction);}
    pulses=pulses.filter(p=>p.age<3&&p.t>0&&p.t<1);
    ctx.restore();
  };
  const reset=()=>{time=0;energy=0;lastPress=-10;pulses=[];pointerX=-1000;pointerY=-1000;};
  return {resize,pointer,draw,reset};
}
