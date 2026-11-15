/** The same cover crop used by themes.css. Artwork and effects share one scale. */
export function sceneLayout(width: number, height: number, kind: "cinematic" | "garden" = "cinematic") {
  const portrait = width <= height;
  const portraitAsset = kind === "cinematic" && portrait;
  const imageWidth = portraitAsset ? 941 : 1672;
  const imageHeight = portraitAsset ? 1672 : 941;
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const positionX = kind === "garden" && portrait ? .57 : .5;
  const offsetX = (width - imageWidth * scale) * positionX;
  // Bottom anchoring keeps the floor/pond in view as the browser chrome changes.
  const offsetY = height - imageHeight * scale;
  return {
    portrait, scale, offsetX, offsetY, imageWidth, imageHeight,
    toScreen: (x: number, y: number) => ({ x: x * scale + offsetX, y: y * scale + offsetY }),
    toImage: (x: number, y: number) => ({ x: (x - offsetX) / scale, y: (y - offsetY) / scale }),
  };
}
