# Story configuration schema

Use this reference while editing `src/story/story.config.js`.

## Template state

The repository starts with `meta.templateState: "blank"`. Blank mode intentionally allows pages without titles, narration, cutouts, notes, or characters. When a real story is authored, remove `templateState` (or set it to `"custom"`) so validation requires story copy for every chapter.

## Top-level sections

| Field | Purpose | Rule |
| --- | --- | --- |
| `meta` | Project title, subtitle and entry prompt | Keep user-facing copy short |
| `theme` | Ink, paper and accent colors | Use CSS-compatible colors |
| `stage` | Procedural paper geometry and palette | Keep geometry numeric and page arrays non-empty |
| `experience` | FOV, scroll speed, easing and sound | Avoid story-specific data here |
| `chapters` | Ordered story pages | Use 3–12; 5–8 is the default |
| `characters` | Optional story-specific character definitions | Add only when the story needs them |

## Chapter fields

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Unique stable slug |
| `stageX` | yes | Horizontal center in world units; strictly increasing |
| `threshold` | yes | Scroll progress in `[0, 1)`; strictly increasing |
| `number` | recommended | Display index |
| `title` | completed story | Short scene heading |
| `narration` | completed story | One concise paragraph |
| `note` | optional | Note-card asset, position, rotation and width |
| `cutouts` | optional | Independent scene sprites |

## Cutout fields

A typical cutout uses `src`, `position: [x, y, z]`, positive `height`, and a `motion` name. `anchor: "center"` makes the provided position the visual center; otherwise the renderer may ground the object on the paper floor.

Motion names are project-defined. Keep the registry in the story-specific renderer, document each reusable motion, and reject config values that are not present in that registry. Do not carry motions, characters, or props from an earlier story into a new one merely as placeholders.

## Optional character rig

Add a rig only when the selected art direction needs a layered walking or gesturing paper character. Prefer a neutral path such as `src/story/character-rig.json`; keep the character renderer in a story-specific module rather than in the base paper world.

A layered rig may contain a body plus independent feet and arms. Every runtime URL must begin with `/story-assets/`, map to a real file below `public/story-assets/`, and preserve a common source canvas so pivots stay reproducible.

## Validation gates

1. Every configured URL maps to a real file below `public/story-assets/`.
2. Thresholds and stage positions strictly increase.
3. Every motion name exists in the current story renderer.
4. Completed chapters have titles and narration.
5. `npm run check:no-binary-3d` passes.
6. `npm run lint` and `npm run build` pass.
7. Every page, interaction, and the loop are inspected in a browser.
