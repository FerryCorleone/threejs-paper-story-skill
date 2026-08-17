---
name: paper-story-builder
description: Build, customize, migrate, validate, and package procedural Three.js paper-cut story websites without DCC or binary 3D dependencies. Use when turning a story, family memory, children’s tale, travel diary, or branded narrative into this template; replacing chapters or paper characters; preparing transparent cutouts and layered character rigs; editing story.config.js; choosing motion presets; or proving a customized story site is ready to run and version.
---

# Paper Story Builder

Turn an authored story and a folder of transparent paper-cut assets into a working, validated Three.js story website. Treat a browser readback—not config generation alone—as the completion boundary.

Read `references/production-playbook.md` before estimating or producing a customized story. It contains the stage gates that prevent expensive late rework: reference lock, golden-frame approval, asset contracts, continuity handoffs, mechanism checks, and evidence-based release.

## Workflow

### 1. Locate and audit the template

Find the project root containing all of these files:

- `package.json`
- `src/story/story.config.js`
- `src/Experience/models/PaperWorld.jsx`
- `AGENTS.md`

The repository intentionally starts without `public/story-assets/` or a character rig. Create story-specific directories only when the new brief needs them.

Read the current config and preserve unrelated user changes. Run the existing site before changing it when practical.

### 2. Turn the brief into scenes

Use 5–8 chapters by default. Each chapter needs one narrative beat, one short title, one readable note card, and a concise list of independently movable paper cutouts.

Before editing config, write a compact scene plan containing:

- scene order and emotional purpose;
- narration and on-screen title;
- main character costume;
- cutout inventory and motion preset;
- missing asset list.

Add a handoff row between every adjacent pair of chapters. Each row records the one continuous protagonist's incoming and outgoing costume, carrier or vehicle, travel direction, swap point, next-scene entrance point, and any focal trigger. Do not design chapters as isolated tableaux.

Use `assets/story-brief.example.json` as the input shape when the user has not supplied a structured brief. Read `references/story-schema.md` before authoring or changing config.

Keep the visual brief low-friction:

- For each chapter or location, ask for at least one useful photo when available. Prefer a face-visible full-body photo that shows the main people, their outfit, and some scene context. One group photo may cover multiple people; do not demand front, side, or multi-angle portrait sets for a loose hand-drawn cartoon style.
- When a place is niche or difficult to recognize, ask for at least one additional scenery or landmark photo. For familiar places without a supplied photo, research a reliable public visual reference before generating the paper illustration.
- If no images are supplied, collect a short written description of the people, relationship, clothing, and place, then generate a simple fictional cartoon anchor. Explain only that likeness and obscure-landmark precision will be looser.
- Keep private source images in a gitignored directory such as `.private-inputs/`, never below `public/` or in the runtime manifest.

After the first acceptable character image exists, reuse it loosely as a visual reference for later costumes and poses. Exact portrait consistency is not a release gate for an intentionally imperfect hand-drawn style.

### 3. Lock the visual system before batch production

Study the reference project's rendered result, source layout, materials, cutout edges, shadow treatment, character proportions, and staging mechanics before writing generation prompts. Separate transferable style rules from the reference story's specific people, places, and props.

Produce one golden frame before generating the complete asset set. It must include:

- an assembled recurring character at the approved stylization and proportions;
- one landmark split into useful depth or motion layers;
- one transparent handwritten title asset;
- the actual paper backdrop, floor, cutout edge, and soft shadow treatment;
- one representative rod, wheel, cable, flag, or other physical mechanism when applicable.

Inspect the golden frame at delivery size in the browser. If it fails, fix the prompt, source asset, alpha, rig, or renderer before multiplying the problem across chapters.

### 4. Prepare assets

Keep each character, prop, cloud, tree, and building as a separate transparent PNG or WebP. Do not bake an entire scene into one background image. Keep one visual anchor for recurring characters and generate costume variants from that anchor.

Create an asset manifest before implementation. For every cutout record its semantic role, source and rights, alpha state, intended display size, anchor, depth band, shadow behavior, motion, attachment or pivot, entrance/exit behavior, and continuity owner. Measure body centroids, wheel hubs, cable paths, seats, and other mechanical anchors from the actual alpha bounds instead of placing them by eye.

For a layered walking character, provide a body plus the moving parts actually required by the design. Store the optional rig under a neutral story-specific path such as `src/story/character-rig.json`, and verify every referenced file exists.

Read `references/asset-pipeline.md` before generating, cutting, or accepting assets. Record source, license, and portrait consent where relevant. If images must be generated, use an available image-generation skill or tool and inspect the outputs visually.

### 5. Author the story config

Edit `src/story/story.config.js`; do not hard-code customer story data into React components.

Maintain these invariants:

- chapter thresholds start at `0`, strictly increase, and stay below `1`;
- `stageX` positions strictly increase;
- chapter IDs are unique;
- all runtime asset URLs begin with `/story-assets/`;
- all motion names exist in the current story renderer's documented registry;
- the blank template state is removed when completed chapter copy is added;
- paper geometry stays procedural in `PaperWorld.jsx`.

When optional music is present, keep it under `experience.audio`, store it below `/story-assets/`, begin playback only after a user gesture, loop it, expose an accessible on/off control, and preserve the user's preference where practical.

Keep story rendering in its own module and add a reusable motion preset only when no existing motion expresses the needed action. Do not copy example-story behavior into the base engine.

### 6. Keep the engine portable

Do not add binary 3D files, texture transcoders, external DCC build steps, or runtime model loaders to the template. Use Three.js primitives, transparent cutouts, layered puppets, CSS, and Web Audio.

If the requested experience truly requires a realistic volumetric product, skeletal creature, or scanned environment, stop and explain that it crosses the standard template boundary. Get explicit approval before expanding the architecture.

### 7. Validate and visually prove the result

Read `references/visual-delivery-checklist.md` and complete every applicable check before browser proof. Treat asset alpha, assembled anatomy, paper shadows, mechanism alignment, semantic scene filling, transition pacing, and protagonist continuity as release gates rather than polish tasks.

Run the Skill preflight first:

```bash
node skills/paper-story-builder/scripts/validate_project.mjs /absolute/path/to/project
```

Then run the project gate:

```bash
npm run verify
```

Finally open the local site in a dedicated browser window and verify:

- intro and entry action work;
- every chapter can be reached;
- configured cutouts load without console or network errors;
- character transitions work when the story includes them;
- final chapter loops into the first;
- a narrow mobile viewport remains readable.

Use deterministic progress hooks when available to inspect every chapter center, every connector midpoint, and the frame immediately before/at/after each handoff. Test focal triggers in both scroll directions and verify that the next scene is already assembled before the protagonist enters it.

Do not report the site finished when only lint/build passed. Report exact validation results, browser observations, artifact paths, and any remaining content gaps.

### 8. Version and release the customized story

Keep engine changes and Skill/content packaging in understandable commits. Before publishing, confirm no credentials, raw private photos, generated-source dumps, or obsolete binary assets are staged. Create a semantic version tag only after all automated and browser checks pass.

For a shareable release, also verify the document title, description, social preview image, public asset paths, audio delivery, deployed URL, and a browser readback of the deployed—not merely local—site.
