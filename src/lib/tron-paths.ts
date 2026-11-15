export type LightPoint = { x:number; y:number };
export type LightPath = { points:LightPoint[]; color:string; weight:number; speed:number; reflection:boolean };
const path=(coords:number[][],color:string,weight:number,speed:number,reflection=false):LightPath=>({points:coords.map(([x,y])=>({x,y})),color,weight,speed,reflection});
const cyan="#a8f3ff",amber="#ffcf8f";

// Traced against the actual desktop and portrait artwork in image pixels.
export const TRON_DESKTOP:LightPath[]=[
  path([[665,741],[540,738],[410,727],[290,701],[150,652],[0,581]],cyan,2,.085,true),
  path([[1008,741],[1125,739],[1260,729],[1395,699],[1530,648],[1672,580]],amber,2,.079,true),
  path([[665,741],[400,776],[0,833]],cyan,2.8,.065),
  path([[1008,741],[1275,776],[1672,834]],amber,2.8,.072),
  path([[136,-20],[91,190],[29,274],[12,373],[71,438],[135,617]],cyan,2,.045),
  path([[1539,-20],[1580,190],[1645,272],[1660,373],[1600,438],[1537,617]],cyan,2,.048),
  path([[70,-20],[32,145],[0,215]],cyan,1,.1),
  path([[1610,-20],[1648,145],[1672,220]],cyan,1,.09),
  path([[745,769],[680,812],[625,854],[587,883]],cyan,1,.09),
  path([[899,768],[960,815],[1005,855],[1049,884]],cyan,1,.085),
  path([[300,642],[345,674],[376,685],[423,688],[469,718],[518,727]],cyan,1,.07),
  path([[1370,642],[1320,677],[1280,685],[1240,689],[1198,717],[1152,727]],cyan,1,.075),
];
export const TRON_MOBILE:LightPath[]=[
  path([[435,1340],[330,1336],[240,1320],[140,1294],[0,1247]],cyan,2,.085,true),
  path([[525,1340],[630,1336],[730,1320],[830,1290],[941,1248]],amber,2,.08,true),
  path([[435,1344],[442,1350],[419,1360],[350,1386],[240,1425],[115,1480],[0,1540]],cyan,3,.065),
  path([[525,1344],[519,1350],[540,1362],[613,1391],[730,1437],[840,1490],[941,1540]],amber,3,.071),
  path([[25,-20],[72,207],[60,490],[54,732],[53,845]],cyan,1.5,.05),
  path([[917,-20],[871,209],[878,490],[887,733],[887,845]],cyan,1.5,.048),
  path([[54,845],[55,1068],[73,1187],[86,1228]],cyan,1,.09),
  path([[887,845],[888,1068],[868,1187],[853,1228]],cyan,1,.085),
  path([[87,1228],[148,1234],[215,1277],[250,1280],[300,1310]],cyan,1,.07),
  path([[853,1228],[790,1235],[729,1277],[687,1283],[642,1310]],cyan,1,.075),
];

/** Sample by travelled distance so speed stays continuous through corners. */
export function sampleLightPath(path:LightPath,count=241):LightPoint[] {
  const lengths=[0];
  for(let i=1;i<path.points.length;i++)lengths.push(lengths[i-1]+Math.hypot(path.points[i].x-path.points[i-1].x,path.points[i].y-path.points[i-1].y));
  const total=lengths[lengths.length-1];let segment=1;
  return Array.from({length:count},(_,i)=>{
    const distance=total*i/(count-1);
    while(segment<lengths.length-1&&lengths[segment]<distance)segment++;
    const a=path.points[segment-1],b=path.points[segment],t=(distance-lengths[segment-1])/(lengths[segment]-lengths[segment-1]);
    return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  });
}
