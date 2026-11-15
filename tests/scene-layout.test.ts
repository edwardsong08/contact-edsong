import assert from "node:assert/strict";
import test from "node:test";
import { sceneLayout } from "../src/lib/scene-layout.ts";

test("scene crops preserve proportions and cover phone, tablet and wide screens", () => {
  for (const [width, height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[2560,1080]]) {
    for (const kind of ["cinematic", "garden"] as const) {
      const layout = sceneLayout(width, height, kind);
      const start = layout.toScreen(0, 0), end = layout.toScreen(layout.imageWidth, layout.imageHeight);
      assert(start.x <= .001 && start.y <= .001);
      assert(end.x >= width - .001 && end.y >= height - .001);
      assert(Math.abs(end.y - height) < .001, "floor stays bottom anchored");
      const xStep = layout.toScreen(100,0).x - start.x;
      const yStep = layout.toScreen(0,100).y - start.y;
      assert(Math.abs(xStep-yStep) < .001, "equal scale on both axes");
      const screen = layout.toScreen(530,740);
      const roundTrip = layout.toImage(screen.x,screen.y);
      assert(Math.abs(roundTrip.x-530) < .001 && Math.abs(roundTrip.y-740) < .001);
    }
  }
});

test("garden tablets use their own composition while tall phones retain portrait art", () => {
  assert.equal(sceneLayout(768,1024).imageWidth,820);
  assert.equal(sceneLayout(768,1024).imageHeight,1640);
  assert.equal(sceneLayout(1024,768).imageWidth,1672);
  const garden = sceneLayout(768,1024,"garden");
  assert.equal(garden.imageWidth,1200);
  assert.equal(garden.imageHeight,900);
  assert.equal(garden.offsetX,(768-1200*garden.scale)*.6);
  const phone=sceneLayout(390,844,"garden");
  assert.equal(phone.imageWidth,820);
  assert.equal(phone.offsetX,390-820*phone.scale);
});

test("garden pavilion remains in frame with a scrollbar at responsive breakpoints", () => {
  for(const [viewportWidth,height] of [[320,700],[390,844],[600,1000],[601,1000],[768,1024],[1024,768],[1100,1000],[1440,1000],[2560,1080]]) {
    const width=viewportWidth-15;
    const layout=sceneLayout(width,height,"garden",viewportWidth);
    // Measured roof edges in the three final art files, not generated geometry.
    const [left,right,top]=layout.portrait?[.38,.94,.74]:layout.gardenTablet?[.495,.738,.70]:[.589,.872,.627];
    const a=layout.toScreen(layout.imageWidth*left,layout.imageHeight*top);
    const b=layout.toScreen(layout.imageWidth*right,layout.imageHeight*.93);
    assert(a.x>=0 && b.x<=width,`complete pavilion at ${viewportWidth}x${height}`);
    assert(a.y>height*(viewportWidth/height>2?.45:.6) && b.y<height,"pavilion remains in lower composition");
  }
  assert.equal(sceneLayout(600-15,1000,"garden",600).portrait,true);
  assert.equal(sceneLayout(601-15,1000,"garden",601).gardenTablet,true);
  assert.equal(sceneLayout(1334-15,1000,"garden",1334).gardenTablet,false);
});

test("TRON tall phones keep both side frames and map lights to the raised floor", () => {
  for (const [width,height] of [[360,800],[390,844],[430,932]]) {
    const layout=sceneLayout(width,height,"tron");
    assert.equal(layout.framed,true);
    assert.deepEqual(layout.toScreen(0,0),{x:0,y:0});
    assert(Math.abs(layout.toScreen(941,1672).x-width)<.001);
    assert(layout.toScreen(941,1672).y<height);
    assert(layout.toScreen(0,1343).y<height*.72,"light walls sit near the CTA, not the footer");
    const p=layout.toScreen(420,1343);
    assert(Math.abs(layout.toImage(p.x,p.y).y-1343)<.001);
  }
  for (const [width,height] of [[390,450],[768,1024],[1440,900]]) {
    const layout=sceneLayout(width,height,"tron");
    assert.equal(layout.framed,false);
    assert(Math.abs(layout.toScreen(0,layout.imageHeight).y-height)<.001);
  }
});
