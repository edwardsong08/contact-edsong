/** Mirrors themes.css so painted architecture and moving lights stay registered. */
export function sceneLayout(width: number, height: number, kind: "cinematic" | "garden" | "tron" = "cinematic") {
  const portrait = width <= height;
  const portraitAsset = portrait;
  const imageWidth = portraitAsset ? 941 : 1672;
  const imageHeight = portraitAsset ? 1672 : 941;
  // Tall phones show the complete TRON frame above a quiet, fading foreground.
  const framed = kind === "tron" && width <= 600 && width / height <= 941 / 1672;
  const scale = framed ? width / imageWidth : Math.max(width / imageWidth, height / imageHeight);
  const offsetX = (width - imageWidth * scale) * .5;
  // Bottom anchoring keeps the floor/pond in view as the browser chrome changes.
  const offsetY = framed ? 0 : height - imageHeight * scale;
  return {
    portrait, framed, scale, offsetX, offsetY, imageWidth, imageHeight,
    toScreen: (x: number, y: number) => ({ x: x * scale + offsetX, y: y * scale + offsetY }),
    toImage: (x: number, y: number) => ({ x: (x - offsetX) / scale, y: (y - offsetY) / scale }),
  };
}
