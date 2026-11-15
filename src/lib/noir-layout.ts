/** Mirrors Noir's cover crop and its height-fit tablet composition in themes.css. */
export function noirLayout(width: number, height: number, viewportWidth = width, viewportHeight = height) {
  const portrait = viewportWidth <= viewportHeight;
  const tablet = portrait && viewportWidth >= 601;
  const imageWidth = portrait ? 820 : 1536;
  const imageHeight = portrait ? 1640 : 1024;
  const scale = tablet ? height / imageHeight : Math.max(width / imageWidth, height / imageHeight);
  const offsetX = tablet ? width - imageWidth * scale : (width - imageWidth * scale) / 2;
  const offsetY = height - imageHeight * scale;
  // Only the painted red reflection on the wet floor is displaced.
  const reflection = portrait
    ? { x: .65, y: .91, width: .34, height: .09 }
    : { x: .78, y: .885, width: .215, height: .115 };
  return { portrait, tablet, imageWidth, imageHeight, scale, offsetX, offsetY, reflection };
}
