# Paper-cut asset pipeline

## Minimum useful visual input

Keep intake simple. For each chapter or location, one useful photo is enough to begin when it is available. Prefer a face-visible full-body photo that shows the main people, their outfit, and some surrounding context. A single group photo can cover multiple characters and the location at once. Do not require front, side, or multi-angle portrait sets for an intentionally loose hand-drawn cartoon.

Use the photo to preserve only the recognizable essentials: rough appearance, relationship, outfit, accessories, and scene context. The target is a charming paper character, not portrait-grade identity matching.

For a niche place or a landmark that is difficult to infer from its name, request at least one additional scenery or landmark photo. For a familiar place without a supplied photo, research a reliable public visual reference, separate factual landmark traits from artistic traits, and generate new paper-style art rather than copying the source image.

## When no photos are supplied

Collect a short written description of the people, relationship, clothing, and place, then generate a simple fictional cartoon anchor. Reuse the first acceptable anchor loosely for later costumes and poses. State that likeness and obscure-landmark accuracy will be less precise, but do not turn missing photos into a high-friction intake process.

## Privacy

Confirm appropriate consent when personal photographs are used. Keep private inputs outside `public/` and runtime manifests, preferably in a gitignored `.private-inputs/` directory.

## Acceptance order

1. Confirm the asset can legally be used and, for personal photos, that the subject consent is appropriate for the intended publishing scope.
2. Study the reference implementation and write a style lock that distinguishes transferable medium, material, proportion, and edge rules from story-specific content.
3. Approve one recurring-character anchor and one assembled golden frame before generating variants; do not require a multi-option portrait review unless the user asks for it.
4. Export independent transparent images, not a flattened scene.
5. Inspect silhouette, limb count, transparency fringe, paper texture, perspective, and recurring-character consistency on contrasting backgrounds.
6. Inspect the asset again at its real browser display size and in its final layer stack.
7. Trim empty borders without clipping shadows or hand-cut edges.
8. Use lowercase descriptive filenames and place runtime files below `public/story-assets/`.
9. Run the project validators and inspect the rendered scene.

## Style-lock prompt contract

Write generation prompts from observable evidence in the chosen reference. Record both required traits and rejection traits. A useful paper-cut lock normally specifies:

- real fibrous paper across backdrop, floor, characters, props, and lettering;
- visibly human, uneven crayon, pencil, ink, or paint marks rather than a clean photo filter;
- the agreed character stylization and head-to-body proportion;
- imperfect hand-cut pigment edges with genuine transparency;
- deliberately simple perspective and shape language;
- no photoreal rendering, vector-clean geometry, AI-perfect symmetry, glossy 3D, sticker halo, or baked background.

When the intended medium is generated raster illustration, use image generation for the visible art. Do not substitute SVG drawings or programmatic vector stand-ins merely because they are easier to animate.

Use reference portraits only to preserve recognizable traits, clothing cues, and relationship—not to turn the result into a filtered photograph. For a cute or chibi direction, state the target proportion explicitly and reject long limbs or fashion-illustration anatomy.

## Asset contract

Before a cutout enters the renderer, record:

| Field | Meaning |
| --- | --- |
| `role` | Why the asset belongs in this story beat |
| `source` | Generated, supplied, or researched source plus rights/consent |
| `alpha` | Background removed, edges inspected on light and dark surfaces |
| `display` | Intended on-screen size and camera distance |
| `anchor` | Ground, center, attachment point, body centroid, hub, or path |
| `depth` | Background, midground, protagonist, foreground, or overlay |
| `shadow` | Soft cutout shadow, luminous, or intentionally flat ink |
| `motion` | Motion preset, amplitude, phase, and physical pivot/path |
| `entryExit` | How and when it arrives, remains, and leaves |
| `continuity` | Chapter ownership and handoff responsibility |

Build a contact sheet that includes the source cutout on light and dark backgrounds, its alpha bounds, the assembled composition, and its delivery-size screenshot. Keep reject outputs out of the runtime manifest.

## Preferred formats

- WebP for transparent characters and props when visual quality remains acceptable.
- PNG for note cards or assets where crisp text and lossless edges matter.
- sRGB color space.
- Moderate source resolution; oversized textures consume GPU memory without improving the notebook aesthetic.

For delivery, convert accepted raster cutouts to high-quality WebP when browser comparison shows no meaningful edge, texture, or lettering loss. Keep archival masters outside the runtime manifest. This reduces source-push failures, page weight, and GPU upload cost without changing the authored scene.

## Layered protagonist

For each costume, produce one body layer and four moving layers: left foot, right foot, left arm, and right arm. Keep all pieces in the same original canvas coordinate system while extracting them. This makes normalized pivots and offsets reproducible.

Check the assembled puppet at rest before tuning movement. Feet should touch the paper plane, arm pivots should sit at the shoulders, and no transparent halo should reveal the original chroma background.

Do not begin animation while the rest pose is broken. A disconnected hand, torso-to-leg gap, implausible center of mass, or wrong character proportion is a source-asset failure, not a motion-tuning problem.

## Handwritten text assets

- Generate or draw lettering as monochrome human marks with intentionally uneven baseline, spacing, pressure, and stroke width.
- Preserve the approved wording hierarchy. Adding a place label must not remove the existing headline, subtitle, or small handwritten note.
- Deliver pigment strokes on true transparency. Remove paper rectangles, white fill islands, checkerboard patterns, and colored marker fills unless the brief explicitly calls for them.
- Inspect counters and enclosed shapes at 400% zoom and at final display size; avoid accidental holes or lost strokes from over-aggressive background removal.
- Treat lettering as artwork, not a clean system font with a handwriting effect.

## Reject an asset when

- it contains a full baked background;
- a recurring character changes face or body proportions unintentionally;
- fingers, limbs, hats, or character counts are wrong;
- chroma color remains on the edge;
- a white sticker halo, checkerboard fragment, blank paper margin, or rectangular source plane survives the alpha cut;
- assembled character pieces leave gaps, overlap-flicker, disconnected limbs, or an implausible center of mass;
- a vehicle, seat, handlebar, wheel hub, or passenger direction does not align in the composed scene;
- text or a watermark is embedded unexpectedly;
- lettering is too regular, colorful when monochrome was required, or still contains opaque paper between strokes;
- the source or commercial-use boundary is unknown;
- it requires a binary 3D runtime merely to show a flat paper object.
