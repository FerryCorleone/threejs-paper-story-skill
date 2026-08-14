# Paper-cut asset pipeline

## Acceptance order

1. Confirm the asset can legally be used and, for personal photos, that the subject consent is appropriate for the intended publishing scope.
2. Lock one recurring-character style anchor before generating variants.
3. Export independent transparent images, not a flattened scene.
4. Inspect silhouette, limb count, transparency fringe, paper texture, perspective, and recurring-character consistency.
5. Trim empty borders without clipping shadows or hand-cut edges.
6. Use lowercase descriptive filenames and place runtime files below `public/story-assets/`.
7. Run the project validators and inspect the rendered scene.

## Preferred formats

- WebP for transparent characters and props when visual quality remains acceptable.
- PNG for note cards or assets where crisp text and lossless edges matter.
- sRGB color space.
- Moderate source resolution; oversized textures consume GPU memory without improving the notebook aesthetic.

## Layered protagonist

For each costume, produce one body layer and four moving layers: left foot, right foot, left arm, and right arm. Keep all pieces in the same original canvas coordinate system while extracting them. This makes normalized pivots and offsets reproducible.

Check the assembled puppet at rest before tuning movement. Feet should touch the paper plane, arm pivots should sit at the shoulders, and no transparent halo should reveal the original chroma background.

## Reject an asset when

- it contains a full baked background;
- a recurring character changes face or body proportions unintentionally;
- fingers, limbs, hats, or character counts are wrong;
- chroma color remains on the edge;
- text or a watermark is embedded unexpectedly;
- the source or commercial-use boundary is unknown;
- it requires a binary 3D runtime merely to show a flat paper object.
