# Matcha Korean-inspired study

The softer palette revision below is approved for production release on November 15, 2026. Earlier study assets and the original artwork are preserved.

Built-in image generation was used for both edits. Optimized WebP derivatives are saved in this repository:

- Desktop: public/themes/matcha-korean-study.webp (1672 x 941).
- Portrait: public/themes/matcha-korean-study-mobile.webp (941 x 1672).
- Preserved original: public/themes/matcha-painted.webp.
- Rollback: rollback/before-korean-matcha-20261115 at 365d86c.

Art direction: a contemporary garden with a partial Korean ink-and-color influence, not a historical reproduction. Research reference: [The Met, Deer amid pines](https://www.metmuseum.org/art/collection/search/910553), for its description of controlled ink brushwork and subtle color. No museum image was used as an edit input or copied into the asset. The existing site artwork was the edit target; the resulting desktop study was the portrait reference.

## Desktop prompt

Use case: style-transfer. Edit target: the supplied existing Matcha Garden website background. Create one polished 16:9 landscape background, with no UI or text. Reimagine this same garden as a contemporary painted illustration with a noticeable but partial traditional KOREAN ink-and-color painting influence (roughly 45% Joseon landscape/minhwa brush sensibility, 55% contemporary editorial illustration). Preserve the light matcha/celadon green and warm pale ivory atmosphere, coral autumn maple accents, broad calm central negative space, pond along the bottom 15%, rocks along its upper shoreline, and the asymmetrical right-side garden framing. Make the brushwork more intentional and calligraphic: textured ink contour strokes, layered mineral-green washes, expressive Korean red-pine forms mixed with the coral maple canopy, softly receding low hills visible only toward the far left perimeter, and very subtle hanji paper texture. The existing small pavilion at the far right becomes a modest Korean jeongja with a low charcoal giwa tiled roof, gently lifted eaves and restrained wood pillars; keep it small and peripheral. Keep a few existing fish in the lower pond as loose pigment gestures. Leave the middle 65% of the image softly lit and almost empty for a large dark website headline and form. Important layout invariants: coral maple branches occupy upper right, open pond water begins at approximately 85% image height across most of the width, rising right rocks remain peripheral, no dark scenery behind the central headline, full bleed to all edges. The atmosphere should feel fresh, warm and quietly sophisticated, not antique or sepia. No realism, no photographic textures, no generic clipart, no thick vector outlines, no torii, no Japanese pagoda, no extra people, no tigers or cranes, no red sun, no calligraphy, no seals, no border, no decorative lettering. This is an original interpretation, not a reproduction of a historical painting.

## Portrait prompt

Use case: style-transfer and responsive recomposition. The supplied image is the approved-direction desktop artwork for a LOCAL Matcha Garden experiment. Create its matching 9:16 PORTRAIT companion at approximately 941x1672, one full-bleed illustration, no UI, no text. Preserve exactly the art direction: contemporary editorial illustration blended with traditional Korean ink-and-color landscape sensibility, warm celadon/matcha green washes, pale ivory hanji texture, coral maple foliage, expressive Korean pine brushwork, gray-green mossy rocks, small Korean jeongja with charcoal giwa tiled roof. Recompose for a narrow phone screen, do NOT simply crop or stretch. Top 0-22%: maple and pine canopy entering from the upper right and extending lightly across the upper edge. Keep the gear area around x85%,y5% rich enough for a warm-white icon. Middle 25-72%: broad quiet pale matcha negative space, almost no details, for a dark centered two-line title, brief description, and button. Low hills may be very faint at the far left edge only. Lower 75-87%: low moss-covered shoreline with the small pavilion tucked to the far right at x87%,y76%, never the center. Bottom 85-100%: open green pond across the width, a few loose pale fish gestures and fine quiet water marks. The right shoreline can rise slightly to y91% near the edge. Keep the hand-painted ink structure and sophisticated modern simplification of the supplied art; not photographic, not monochrome historical scroll, not sepia, not generic vector clipart. No Japanese architecture or torii, no added people, seals, sun disks, calligraphy, lettering or border. An original Korean-influenced contemporary garden, restful and readable as a functional website backdrop.

## Generation sources

- Desktop: C:/Users/edwar/.codex/generated_images/01a1d35a-2e50-74d1-91da-bb883683978e/exec-c0124d9e-340a-4ba0-b52b-9584df2475f5.png
- Portrait: C:/Users/edwar/.codex/generated_images/01a1d35a-2e50-74d1-91da-bb883683978e/exec-a34d0bee-8d2a-4b05-b474-38821e955219.png

Generated originals remain in place; runtime references point only to the repository WebP copies. Portrait composition has a matching image-to-canvas transform for leaves and shoreline-clipped ripples.

## Softer palette revision after local feedback

The first study was too vivid around the homepage text, and the form's near-opaque veil washed away the art. Current runtime files are public/themes/matcha-korean-soft.webp (1672 x 941, 168982 bytes) and public/themes/matcha-korean-soft-mobile.webp (941 x 1672, 165952 bytes). The first study assets remain available alongside them.

The revision shifts yellow/coral contrast toward celadon, sage and dusty apricot, lifts the desktop pine clear of the headline, retains detail around the form, and uses ivory gear/back navigation locally with fine dark separation. This white form treatment is included in the approved artwork release.

### Final desktop edit prompt

Edit the supplied Matcha Korean garden artwork for a polished website background. Keep the scene, Korean-influenced hand-painted style, composition, pavilion, trees, fish, pond, and 16:9 dimensions. Refine only the color harmony and the upper branch placement. The current lemon-yellow paper, bright coral foliage and dark pine outlines have too much contrast together. Shift the paper toward a quiet pale celadon/stone-ivory (#e6e8d3 feel), remove the yellow cast, make the foliage muted dusty apricot and soft ochre rather than vivid orange, bring the pines/rocks into gentle sage and moss greens, and soften the darkest painted contours. Retain real brush detail and rich pigment variation: do not veil the whole image in white, blur it, desaturate to gray, or erase the art. The result should feel calm and tonal, like colored ink on soft hanji, with the subtle traditional Korean influence still clear. Important: lift the low pine branch in the upper center so all dark needles/branches stay above the top 23% or to the right of 78% width. The central area x15-78%, y25-73% must remain unobstructed pale paper for the website headline; no pine branch touching text. Keep pond water beginning around 85% height, and keep rocks/pavilion peripheral at right. No added objects, text, seals, frames, UI or typography. Clean restrained contemporary art direction, not faded or antique.

### Final portrait edit prompt

Edit the supplied portrait Matcha Korean garden artwork; retain 9:16 portrait composition, Korean pine and maple canopy at the top, quiet middle, small pavilion/right rocks near the lower right, and pond along the bottom 15%. Bring its palette into a quieter, more tonal harmony: remove lemon yellow, use pale celadon/stone-ivory paper (#e6e8d3 feel), muted dusty-apricot and soft ochre maple leaves, sage/moss pines and rocks, softly articulated ink contours rather than black. Keep beautiful visible brush detail, water texture, and nuanced pigment; this must not look washed out, veiled in white, blurry, gray, sepia, or old. Maintain the blend of contemporary illustration with traditional Korean ink-and-color sensibility. The center x10-90%,y27-70% stays softly lit and empty for dark readable text. Top foliage remains defined enough for white header icons. Pond begins near 86% height, open across the width with a few fish gestures. Preserve all existing subject elements and their placement; no extra objects, text, calligraphy, seals, border or UI.

Generated with the built-in image tool. Source files:

- C:/Users/edwar/.codex/generated_images/01a1d35a-2e50-74d1-91da-bb883683978e/exec-770ff8f6-129f-427b-a7b5-3446152bfa61.png
- C:/Users/edwar/.codex/generated_images/01a1d35a-2e50-74d1-91da-bb883683978e/exec-977be476-8ad0-4949-8a5d-1368429bd8d5.png
