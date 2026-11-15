import { sceneLayout } from "./scene-layout";
import { TRON_DESKTOP, TRON_MOBILE, sampleLightPath } from "./tron-paths";

type Pulse = { lane:number; t:number; direction:number; age:number };
export function createTronMotion(ctx:CanvasRenderingContext2D) {
  let width=0,height=0,time=0,energy=0,lastPress=-10;
  let pointerX=-1000,pointerY=-1000;
  let pulses:Pulse[]=[];
  let paths=TRON_DESKTOP;
  let horizon=0;
  let samples:{x:number;y:number}[][]=[];
  const resize=(w:number,h:number)=>{
    width=w;height=h;pulses=[];
    const layout=sceneLayout(w,h);
    paths=layout.portrait?TRON_MOBILE:TRON_DESKTOP;
    horizon=layout.toScreen(0,layout.portrait?1343:741).y;
    samples=paths.map(path=>sampleLightPath(path).map(p=>layout.toScreen(p.x,p.y)));
  };
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
      const alpha=(1-i/12)**1.7*fade*power*sceneWeight;
      ctx.globalAlpha=alpha;ctx.strokeStyle=path.color;
      ctx.lineWidth=path.weight>1?2:1;ctx.shadowColor=path.color;ctx.shadowBlur=i<3?7:0;
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      if(path.reflection){
        // Mirror elevated walls about their floor intersection. The previous
        // constant offset made the reflection look like a second floating rail.
        const ay=horizon+(horizon-a.y)*.86,by=horizon+(horizon-b.y)*.86;
        const distance=Math.max(0,(ay-horizon)/(height-horizon));
        const broken=.55+.45*Math.sin(a.x*.09+ay*.14)**2;
        ctx.globalAlpha=alpha*.19*(1-Math.min(1,distance)*.65)*broken;
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
          ctx.globalAlpha=(1-distance/110)**2*energy*.9;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    });
    for(const pulse of pulses){pulse.age+=dt;pulse.t+=dt*.27*pulse.direction;trail(pulse.lane,pulse.t,Math.max(0,1-pulse.age/3)*1.4,pulse.direction);}
    pulses=pulses.filter(p=>p.age<3&&p.t>0&&p.t<1);
    ctx.restore();
  };
  const reset=()=>{time=0;energy=0;lastPress=-10;pulses=[];pointerX=-1000;pointerY=-1000;};
  return {resize,pointer,draw,reset};
}
