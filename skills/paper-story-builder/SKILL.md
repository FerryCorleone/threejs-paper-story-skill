---
name: paper-story-builder
description: Build, customize, migrate, validate, and package procedural Three.js paper-cut story websites without DCC or binary 3D dependencies. Use when turning a story, family memory, children’s tale, travel diary, or branded narrative into this template; replacing chapters or paper characters; preparing transparent cutouts and layered character rigs; editing story.config.js; choosing motion presets; or proving a customized story site is ready to run and version.
---

# Paper Story Builder

Turn an authored story and a folder of transparent paper-cut assets into a working, validated Three.js story website. Treat a browser readback—not config generation alone—as the completion boundary.

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

Use `assets/story-brief.example.json` as the input shape when the user has not supplied a structured brief. Read `references/story-schema.md` before authoring or changing config.

### 3. Prepare assets

Keep each character, prop, cloud, tree, and building as a separate transparent PNG or WebP. Do not bake an entire scene into one background image. Keep one visual anchor for recurring characters and generate costume variants from that anchor.

For a layered walking character, provide a body plus the moving parts actually required by the design. Store the optional rig under a neutral story-specific path such as `src/story/character-rig.json`, and verify every referenced file exists.

Read `references/asset-pipeline.md` before generating, cutting, or accepting assets. Record source, license, and portrait consent where relevant. If images must be generated, use an available image-generation skill or tool and inspect the outputs visually.

### 4. Author the story config

Edit `src/story/story.config.js`; do not hard-code customer story data into React components.

Maintain these invariants:

- chapter thresholds start at `0`, strictly increase, and stay below `1`;
- `stageX` positions strictly increase;
- chapter IDs are unique;
- all runtime asset URLs begin with `/story-assets/`;
- all motion names exist in the current story renderer's documented registry;
- the blank template state is removed when completed chapter copy is added;
- paper geometry stays procedural in `PaperWorld.jsx`.

Keep story rendering in its own module and add a reusable motion preset only when no existing motion expresses the needed action. Do not copy example-story behavior into the base engine.

### 5. Keep the engine portable

Do not add binary 3D files, texture transcoders, external DCC build steps, or runtime model loaders to the template. Use Three.js primitives, transparent cutouts, layered puppets, CSS, and Web Audio.

If the requested experience truly requires a realistic volumetric product, skeletal creature, or scanned environment, stop and explain that it crosses the standard template boundary. Get explicit approval before expanding the architecture.

### 6. Validate and visually prove the result

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

Do not report the site finished when only lint/build passed. Report exact validation results, browser observations, artifact paths, and any remaining content gaps.

### 7. Version the customized story

Keep engine changes and Skill/content packaging in understandable commits. Before publishing, confirm no credentials, raw private photos, generated-source dumps, or obsolete binary assets are staged. Create a semantic version tag only after all automated and browser checks pass.
