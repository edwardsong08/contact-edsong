/** Mirrors themes.css so painted architecture and moving lights stay registered. */
export function sceneLayout(width: number, height: number, kind: "cinematic" | "garden" | "tron" = "cinematic", viewportWidth = width) {
  // Garden has a third composition so its pavilion survives intermediate crops.
  // Media queries include the reserved scrollbar; canvas bounds do not.
  const ratio = viewportWidth / height;
  const gardenTablet = kind === "garden" && ratio > 3 / 5 && ratio <= 4 / 3;
  const portrait = kind === "garden" ? ratio <= 3 / 5 : viewportWidth <= height;
  const portraitAsset = portrait;
  const imageWidth = gardenTablet ? 1200 : portraitAsset ? (kind === "tron" ? 941 : 820) : 1672;
  const imageHeight = gardenTablet ? 900 : portraitAsset ? (kind === "tron" ? 1672 : 1640) : 941;
  // Tall phones show the complete TRON frame above a quiet, fading foreground.
  const framed = kind === "tron" && width <= 600 && width / height <= 941 / 1672;
  const scale = framed ? width / imageWidth : Math.max(width / imageWidth, height / imageHeight);
  const horizontalAnchor = kind === "garden" ? (portrait ? 1 : .6) : .5;
  const offsetX = (width - imageWidth * scale) * horizontalAnchor;
  // Bottom anchoring keeps the floor/pond in view as the browser chrome changes.
  const offsetY = framed ? 0 : height - imageHeight * scale;
  return {
    portrait, gardenTablet, framed, scale, offsetX, offsetY, imageWidth, imageHeight,
    toScreen: (x: number, y: number) => ({ x: x * scale + offsetX, y: y * scale + offsetY }),
    toImage: (x: number, y: number) => ({ x: (x - offsetX) / scale, y: (y - offsetY) / scale }),
  };
}
