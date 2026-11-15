import { sceneLayout } from "./scene-layout";
type Leaf = { x:number; y:number; targetX:number; targetY:number; age:number; duration:number; size:number; phase:number; ink:number };
type Ripple = { x:number; y:number; age:number; scale:number; phase:number };

/** Small gouache washes, cached once. No image assets or filters per frame. */
function paintedLeaf(tone:number) {
  const canvas=document.createElement("canvas"); canvas.width=96; canvas.height=112;
  const ctx=canvas.getContext("2d")!;
  ctx.translate(48,52); ctx.scale(36,36);
  const silhouette=new Path2D("M0 1 L-.38 .42 L-.85 .16 L-.67 .02 L-1 -.12 L-.6 -.22 L-.72 -.7 L-.46 -.52 L-.25 -.38 L-.08 -1.08 L.08 -.86 L.19 -.43 L.63 -.78 L.59 -.42 L.52 -.18 L.94 -.05 L.73 .12 L.37 .4 Z");
  ctx.save(); ctx.clip(silhouette);
  const wash=ctx.createLinearGradient(-.7,-.8,.6,.7);
  wash.addColorStop(0,tone?"#c6a17b":"#cfaa84"); wash.addColorStop(.55,tone?"#ad8865":"#bc946f"); wash.addColorStop(1,"#a28262");
  ctx.fillStyle=wash; ctx.fillRect(-1.2,-1.2,2.4,2.6);
  // Deterministic broken pigment, close to the paper texture in the illustration.
  for(let i=0;i<190;i++) {
    const x=((i*71)%191)/191*2.2-1.1, y=((i*43)%193)/193*2.3-1.1;
    ctx.fillStyle=i%3?"#f7d594":"#895337"; ctx.globalAlpha=i%3?.18:.13;
    ctx.fillRect(x,y,.018+(i%4)*.012,.014+(i%3)*.016);
  }
  ctx.restore(); ctx.globalAlpha=.3; ctx.strokeStyle="#f3c38c";ctx.lineWidth=.035;
  ctx.beginPath();ctx.moveTo(0,.95);ctx.quadraticCurveTo(.06,.1,0,-.83);ctx.moveTo(0,.25);ctx.lineTo(-.51,-.3);ctx.moveTo(0,.2);ctx.lineTo(.43,-.32);ctx.stroke();
  ctx.globalAlpha=.65;ctx.strokeStyle="#997345";ctx.lineWidth=.04;
  ctx.beginPath();ctx.moveTo(0,.85);ctx.quadraticCurveTo(.1,1.15,.05,1.37);ctx.stroke();
  return canvas;
}

export function createGardenMotion(ctx:CanvasRenderingContext2D) {
  let width=0,height=0,time=0,nextLeaf=4,lastCanopy=-10,lastPond=-10;
  let leaves:Leaf[]=[],ripples:Ripple[]=[];
  let layout=sceneLayout(1,1,"garden");
  const brushes=[paintedLeaf(0),paintedLeaf(1)];
  // Shoreline follows the right-hand rocks, including the narrow-screen crop.
  const shoreline=(x:number)=>{
    const sourceX=layout.toImage(x,0).x/layout.imageWidth;
    const bank=layout.portrait?.864:.85;
    return layout.toScreen(0,layout.imageHeight*(bank+.046*Math.max(0,Math.min(1,sourceX))**3)).y;
  };
  const ripple=(x:number,y:number)=>{
    if(y<shoreline(x)||y>height*.975)return;
    if(ripples.length>=6)ripples.shift();
    ripples.push({x,y,age:0,scale:.8+Math.random()*.3,phase:Math.random()*6.28});
  };
  const release=()=>{
    if(leaves.length>=3)return;
    const edge=layout.portrait?.92:.84, targetX=width*(edge-.04-Math.random()*.035);
    leaves.push({x:width*(edge+Math.random()*.02),y:Math.max(75,layout.toScreen(0,layout.imageHeight*(.12+Math.random()*.07)).y),targetX,targetY:Math.min(height*.955,shoreline(targetX)+height*.035),age:0,duration:8+Math.random()*2,size:10+Math.random()*3,phase:Math.random()*6.28,ink:Math.random()>.5?1:0});
  };
  const pointer=(x:number,y:number,down:boolean)=>{
    if(down&&y>shoreline(x)&&time-lastPond>.3){ripple(x,y);lastPond=time;}
    else if(y>75&&layout.toImage(x,y).y<layout.imageHeight*.303&&layout.toImage(x,y).x>layout.imageWidth*.54&&time-lastCanopy>2.5){release();lastCanopy=time;}
  };
  const draw=(dt:number)=>{
    time+=dt;
    if(time>nextLeaf){release();nextLeaf=time+13+Math.random()*6;}
    ctx.save();
    for(const leaf of leaves){
      leaf.age+=dt;const t=Math.min(1,leaf.age/leaf.duration);
      const sway=Math.sin(t*9+leaf.phase)*Math.sin(t*Math.PI)*width*.018;
      const x=leaf.x+(leaf.targetX-leaf.x)*t+sway, y=leaf.y+(leaf.targetY-leaf.y)*t;
      ctx.save();ctx.translate(x,y);ctx.rotate(leaf.phase+t*3+Math.sin(t*8)*.35);
      ctx.scale(.7+.3*Math.cos(t*11),1);
      ctx.globalAlpha=Math.min(1,t*6,(1-t)*18)*.82;
      ctx.drawImage(brushes[leaf.ink],-leaf.size,-leaf.size,leaf.size*2,leaf.size*2.33);ctx.restore();
      if(t>=1)ripple(leaf.targetX,leaf.targetY);
    }
    leaves=leaves.filter(l=>l.age<l.duration);
    // Keep every wash on the water, even beside the right-hand rocks.
    ctx.beginPath();ctx.moveTo(0,height);
    for(let i=0;i<=24;i++){const x=width*i/24;ctx.lineTo(x,shoreline(x));}
    ctx.lineTo(width,height);ctx.closePath();ctx.clip();
    for(const ring of ripples){
      ring.age+=dt;
      for(let band=0;band<3;band++){
        const age=ring.age-band*.38;if(age<0||age>3.4)continue;
        const radius=(6+age*21)*ring.scale;
        const opacity=Math.min(1,age/.3)*(1-age/3.4)**1.8;
        // Uneven broken arcs have the same dry-brush softness as the painted pond.
        for(let arc=0;arc<5;arc++){
          ctx.beginPath();
          for(let i=0;i<=15;i++){
            const a=arc*1.256+i/15*.96+ring.phase;
            const r=radius*(1+.026*Math.sin(a*5+ring.phase)+.015*Math.sin(a*9));
            const x=ring.x+Math.cos(a)*r, y=ring.y+Math.sin(a)*r*.19;
            if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
          }
          ctx.strokeStyle=band===1?"#6c8967":"#f3edce";
          ctx.lineWidth=2.2;ctx.globalAlpha=opacity*.10;ctx.stroke();
          ctx.lineWidth=.7;ctx.globalAlpha=opacity*(.22+arc*.025);ctx.stroke();
        }
      }
    }
    ripples=ripples.filter(r=>r.age<4.2);ctx.restore();
  };
  const reset=()=>{leaves=[];ripples=[];time=0;nextLeaf=4;lastCanopy=-10;lastPond=-10;};
  return {draw,pointer,reset,resize:(w:number,h:number)=>{width=w;height=h;layout=sceneLayout(w,h,"garden");reset();}};
}
