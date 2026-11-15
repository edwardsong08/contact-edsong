import { noirLayout } from "./noir-layout";

/** Sparse ink rain and a small displaced copy of the existing red reflection.
 * No pointer response, text manipulation, or independent animation loop. */
export function createNoirMotion(ctx: CanvasRenderingContext2D) {
  let width = 1, height = 1, clock = 0;
  let layout = noirLayout(1, 1);
  let patch: HTMLCanvasElement | null = null;
  let patchX = 0, patchY = 0, patchWidth = 0, patchHeight = 0;
  let disposed = false;
  const images = new Map<boolean, HTMLImageElement>();
  const drops = Array.from({ length: 72 }, (_, index) => ({
    x: ((index * .618033989) % 1),
    y: ((index * .414213562) % 1),
    depth: .25 + (index % 7) / 9,
  }));

  function prepareReflection() {
    patch = null;
    const image = images.get(layout.portrait);
    if (!image?.complete || !image.naturalWidth) return;
    const area = layout.reflection;
    patchX = layout.offsetX + area.x * layout.imageWidth * layout.scale;
    patchY = layout.offsetY + area.y * layout.imageHeight * layout.scale;
    patchWidth = area.width * layout.imageWidth * layout.scale;
    patchHeight = area.height * layout.imageHeight * layout.scale;
    const surface = document.createElement("canvas");
    // This tiny, cached texture is the only image work; no full-screen readback.
    surface.width = Math.max(1, Math.ceil(patchWidth));
    surface.height = Math.max(1, Math.ceil(patchHeight));
    const paint = surface.getContext("2d");
    if (!paint) return;
    paint.drawImage(image, area.x * image.naturalWidth, area.y * image.naturalHeight,
      area.width * image.naturalWidth, area.height * image.naturalHeight,
      0, 0, surface.width, surface.height);
    paint.globalCompositeOperation = "destination-in";
    const edge = paint.createLinearGradient(0, 0, surface.width, 0);
    edge.addColorStop(0, "transparent"); edge.addColorStop(.17, "black");
    edge.addColorStop(.78, "black"); edge.addColorStop(1, "transparent");
    paint.fillStyle = edge; paint.fillRect(0, 0, surface.width, surface.height);
    const floor = paint.createLinearGradient(0, 0, 0, surface.height);
    floor.addColorStop(0, "transparent"); floor.addColorStop(.2, "black");
    floor.addColorStop(.65, "#000a"); floor.addColorStop(1, "transparent");
    paint.fillStyle = floor; paint.fillRect(0, 0, surface.width, surface.height);
    patch = surface;
  }

  function activate() {
    if (!images.has(layout.portrait)) {
      const image = new Image();
      image.decoding = "async";
      images.set(layout.portrait, image);
      image.onload = () => { if (!disposed) prepareReflection(); };
      image.src = layout.portrait ? "/themes/noir-graphic-mobile.webp" : "/themes/noir-graphic.webp";
    }
    prepareReflection();
  }

  function resize(nextWidth: number, nextHeight: number) {
    width = nextWidth; height = nextHeight;
    layout = noirLayout(width, height, innerWidth, innerHeight);
    if (document.documentElement.dataset.theme === "noir") activate();
  }

  function draw(dt: number) {
    clock += dt;
    ctx.save();
    if (patch) {
      const strips = 18;
      const band = patch.height / strips;
      for (let index = 0; index < strips; index++) {
        const phase = index / strips;
        const shift = (Math.sin(clock * 1.05 - index * .62) + .35 * Math.sin(clock * 1.7 + index))
          * Math.min(2.4, width * .002) * Math.sin(phase * Math.PI);
        ctx.globalAlpha = .32 + .09 * Math.sin(clock * .7 - index * .4);
        ctx.drawImage(patch, 0, index * band, patch.width, band,
          patchX + shift, patchY + phase * patchHeight, patchWidth, patchHeight / strips + .3);
      }
    }
    const count = width < 601 ? 38 : drops.length;
    ctx.strokeStyle = "#dedee4";
    for (let index = 0; index < count; index++) {
      const drop = drops[index];
      drop.y = (drop.y + dt * (.15 + drop.depth * .19)) % 1.06;
      const y = (drop.y - .03) * height;
      const x = ((drop.x - drop.y * .12 + 1) % 1) * width;
      const readingArea = x > width * .18 && x < width * .82 && y > height * .24 && y < height * .76;
      const controls = y < 96;
      ctx.globalAlpha = (.055 + drop.depth * .105) * (readingArea ? .16 : controls ? .35 : 1);
      ctx.lineWidth = .45 + drop.depth * .3;
      const length = (width < 601 ? 6 : 10) + drop.depth * 12;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - length * .29, y + length); ctx.stroke();
    }
    ctx.restore();
  }

  return { resize, activate, draw,
    reset: () => { clock = 0; },
    dispose: () => { disposed = true; for (const image of images.values()) image.onload = null; images.clear(); patch = null; },
  };
}
