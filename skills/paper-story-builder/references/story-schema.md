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
| `interludes` | Persistent contextual scenery between chapter centers | Use location-appropriate environment layers; avoid progress-window pop-ins |
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

## Continuity and handoff plan

The continuity plan can live beside the config rather than in runtime data, but it is required for authored stories. For every adjacent chapter pair record:

| Field | Question |
| --- | --- |
| protagonist | Is this visibly the same traveler or recurring subject? |
| incoming/outgoing state | Which costume, pose, vehicle, and scale exist on each side? |
| swap point | Where does the old state end and the new state begin? |
| scene lead | When are the next landmark, floor, atmosphere, and support layers fully visible? |
| mechanism | What physically carries the subject through the transition? |
| trigger | What action fires at the focal point, and can it replay in reverse? |
| connector | Which contextual elements fill the travel space without stealing the hero beat? |

Treat the final-to-first loop as another handoff row.

## Optional audio

`experience.audio` may contain:

| Field | Required | Rule |
| --- | --- | --- |
| `src` | yes | Runtime URL below `/story-assets/` |
| `title` | yes | Accessible human-readable track title |
| `volume` | yes | Number from `0` through `1` |

Audio must not be the only way to understand the story. Browser autoplay restrictions mean playback begins after the entry gesture or explicit music-button gesture.

## Optional character rig

Add a rig only when the selected art direction needs a layered walking or gesturing paper character. Prefer a neutral path such as `src/story/character-rig.json`; keep the character renderer in a story-specific module rather than in the base paper world.

A layered rig may contain a body plus independent feet and arms. Every runtime URL must begin with `/story-assets/`, map to a real file below `public/story-assets/`, and preserve a common source canvas so pivots stay reproducible.

## Validation gates

1. Every configured or source-literal runtime URL maps to a real file below `public/story-assets/`; do not validate config while missing CSS or renderer assets.
2. Thresholds and stage positions strictly increase.
3. Every motion name exists in the current story renderer.
4. Completed chapters have titles and narration.
5. `npm run check:no-binary-3d` passes.
6. `npm run lint` and `npm run build` pass.
7. Every page, interaction, and the loop are inspected in a browser.
8. Every applicable item in `visual-delivery-checklist.md` is inspected and recorded.
9. Every chapter boundary has a continuity handoff plan, including the loop.
