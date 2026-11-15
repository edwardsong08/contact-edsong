import assert from "node:assert/strict";
import test from "node:test";
import { noirLayout } from "../src/lib/noir-layout.ts";

test("Noir reflection stays on the bottom-anchored painted floor across crops", () => {
  for (const [width, height] of [[305,700],[375,844],[753,1024],[1009,768],[1425,1000],[2545,1080]]) {
    const layout = noirLayout(width, height, width + 15, height);
    const bottom = layout.offsetY + layout.imageHeight * layout.scale;
    const reflectionTop = layout.offsetY + layout.reflection.y * layout.imageHeight * layout.scale;
    assert(Math.abs(bottom - height) < .001);
    assert(reflectionTop > height * .75, "water motion must stay below the reading area");
    assert(layout.reflection.x + layout.reflection.width <= 1);
    assert(layout.reflection.y + layout.reflection.height <= 1);
    if (layout.tablet) {
      assert(Math.abs(layout.imageWidth * layout.scale - height * .5) < .001);
      assert(Math.abs(layout.offsetX + layout.imageWidth * layout.scale - width) < .001);
    } else {
      assert(layout.offsetX <= .001);
      assert(layout.offsetY <= .001);
    }
  }
});

test("Noir breakpoint follows the viewport, including the reserved scrollbar gutter", () => {
  assert.equal(noirLayout(590,900,605,900).tablet, true);
  assert.equal(noirLayout(585,900,600,900).tablet, false);
  assert.equal(noirLayout(985,990,1000,990).portrait, false);
});
