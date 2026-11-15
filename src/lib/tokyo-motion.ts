import { sceneLayout } from "./scene-layout";

type Point = { x:number; y:number };

/** Lights follow the painted railway; all coordinates belong to the source art. */
export function createTokyoMotion(ctx:CanvasRenderingContext2D) {
  let width=1,height=1,time=0;
  let layout=sceneLayout(1,1);
  let rail:Point[]=[],distances:number[]=[],length=0;
  const rain=Array.from({length:92},(_,i)=>({
    x:((i*73.71)%100)/100,y:((i*43.13)%100)/100,depth:.25+(i%7)/9,
  }));
  const source=(x:number,y:number)=>layout.toScreen(x*layout.imageWidth,y*layout.imageHeight);
  const resize=(w:number,h:number)=>{
    width=w;height=h;layout=sceneLayout(w,h);
    const anchors=layout.portrait
      ? [[0,.957],[.15,.918],[.33,.884],[.51,.864],[.70,.846],[.84,.834],[.90,.827],[.925,.821],[.92,.817],[.90,.814],[.85,.810],[.79,.806]]
      : [[0,.986],[.12,.923],[.24,.877],[.37,.839],[.51,.814],[.64,.797],[.73,.783],[.79,.772],[.815,.761],[.818,.755],[.806,.749],[.785,.743],[.735,.733]];
    rail=anchors.map(([x,y])=>source(x,y));distances=[0];length=0;
    for(let i=1;i<rail.length;i++){
      length+=Math.hypot(rail[i].x-rail[i-1].x,rail[i].y-rail[i-1].y);
      distances.push(length);
    }
  };
  const railPoint=(fraction:number)=>{
    const distance=Math.max(0,Math.min(1,fraction))*length;
    let i=1;while(i<distances.length-1&&distances[i]<distance)i++;
    const a=rail[i-1],b=rail[i],t=(distance-distances[i-1])/Math.max(.001,distances[i]-distances[i-1]);
    return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  };
  const train=(phase:number,reverse:boolean)=>{
    if(phase<=0||phase>=1)return;
    const fade=Math.min(1,phase*12,(1-phase)*12);
    const tail=Math.min(.045,38/length);
    for(let i=0;i<16;i++){
      const a=phase-i/16*tail,b=phase-(i+1)/16*tail;
      if(b<0)continue;
      const p=railPoint(reverse?1-a:a),q=railPoint(reverse?1-b:b);
      ctx.globalAlpha=(1-i/16)*fade;
      ctx.strokeStyle=reverse?"#b8cfff":"#ffe2ac";
      ctx.lineWidth=reverse?1:1.6;
      ctx.beginPath();ctx.moveTo(p.x,p.y+(reverse?2:0));ctx.lineTo(q.x,q.y+(reverse?2:0));ctx.stroke();
    }
  };
  const draw=(dt:number)=>{
    time+=dt;ctx.save();ctx.globalCompositeOperation="screen";
    // Two distant arrivals with long rests, rather than a continuous light sweep.
    train((time%24-2)/8,false);train((time%24-13)/9,true);
    // Existing rooftop beacons breathe very gently at different intervals.
    const beacons=layout.portrait?[[.04,.025],[.108,.027],[.95,.034],[.822,.376]]:[[.046,.018],[.086,.023],[.932,.043],[.676,.531]];
    for(let i=0;i<beacons.length;i++){
      const [x,y]=beacons[i],p=source(x,y);
      const pulse=.5+.5*Math.sin(time*.65+i*1.7);
      ctx.globalAlpha=.07+pulse*.11;ctx.fillStyle="#ff96a1";
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.7,1.5*layout.scale),0,Math.PI*2);ctx.fill();
    }
    ctx.globalCompositeOperation="source-over";
    const count=layout.portrait?54:rain.length;
    for(let i=0;i<count;i++){
      const drop=rain[i];drop.y+=dt*(.16+drop.depth*.31);if(drop.y>1.04)drop.y=-.04;
      const x=drop.x*width-drop.y*18,y=drop.y*height;
      const reading=Math.abs(drop.x-.5)<.32&&drop.y>.22&&drop.y<.72;
      ctx.globalAlpha=(.045+drop.depth*.10)*(reading?.19:1);
      ctx.strokeStyle=drop.x>.82?"#e7bfcf":"#bed0ed";ctx.lineWidth=.4+drop.depth*.4;
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-1.5,y+4+drop.depth*12);ctx.stroke();
    }
    ctx.restore();
  };
  return {draw,resize,reset:()=>{time=0;}};
}
