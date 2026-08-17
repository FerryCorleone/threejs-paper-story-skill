# Paper story production playbook

Use this playbook for any new paper-story website, regardless of its characters, locations, or plot. Its purpose is to catch expensive systemic mistakes while they affect one representative frame instead of an entire story.

## Stage gates

### Gate 0: reference lock

Inspect the reference project's rendered frames and implementation before producing assets. Record observable rules for:

- paper grain, drawing medium, imperfection, palette, and lighting;
- character proportion, face language, recurring identity, and clothing logic;
- alpha edge, whitespace trim, shadow softness, and depth separation;
- camera distance, floor/backdrop balance, and landmark scale;
- rods, pivots, vehicles, cables, crowds, and offscreen entrances;
- lettering material, irregularity, hierarchy, and transparency.

Write a short `must` and `reject` list. A style name such as “hand-drawn” is not sufficient evidence. Keep the reference's visual grammar while replacing all story-specific people, places, words, and props.

Exit evidence: style lock plus three annotated reference observations.

### Gate 1: story and continuity map

Plan chapters and connector spaces together. For every chapter record the hero beat, readable landmark, protagonist state, supporting depth bands, ambient life, focal trigger, and exit condition. For every boundary record the incoming/outgoing state and the physical handoff.

Use one continuous recurring protagonist unless the story explicitly introduces another person. Costume or vehicle changes happen near the boundary where the new context begins, not after the traveler reaches the new scene's center. Allocate enough world distance that connector travel feels deliberate rather than like a final fast burst.

Exit evidence: chapter table, handoff table, and final-to-first loop row.

### Gate 2: golden frame

Build one representative browser frame using final rendering paths. Include an assembled protagonist, a layered landmark, transparent lettering, paper floor/backdrop, and production shadows. Include the story's hardest mechanism when possible.

Reject the frame if the character is anatomically disconnected, too realistic, too elongated, visually inconsistent with the reference, surrounded by a halo, or supported by a rod that misses the body center. Reject it if the landmark is unreadable, the floor covers it, or independent planes flicker.

Exit evidence: source contact sheet, assembled-rest screenshot, desktop frame, and narrow-mobile frame.

### Gate 3: asset production

Create an asset manifest and accept each cutout before animation. Split only elements that benefit from independent depth, motion, replacement, or reuse. Useful splits include water layers, hanging ornaments, flags, wheels, cable cars, individual crowd members, character limbs, and foreground plants. Do not split a rigid landmark merely to create busy motion.

Generate several genuinely different background visitors when repetition would be visible. Recoloring or mirroring one person is not a substitute for variety at close range.

Exit evidence: manifest, alpha contact sheets, assembled character sheets, and a rejected-assets list.

### Gate 4: scene construction

Build each scene in stable depth bands: backdrop, atmosphere, landmark, ground, supporting life, protagonist, foreground, and overlay. Use render order and depth settings deliberately; tiny z offsets alone are not a reliable fix for transparent-plane flicker.

Every paper cutout shares one family of subtle silhouette-following shadow. Luminous effects may be unshadowed. Avoid rectangular real-time shadows from transparent planes.

The next scene's landmark, ground, atmosphere, and supporting life complete their entrance before the protagonist reaches it. Connector space uses nearby landscape logic and restrained ambient motion instead of unrelated surprise objects.

Exit evidence: chapter-center frames and connector-midpoint frames.

### Gate 5: mechanics and triggers

Test depicted mechanics from the asset's measured anchors:

- wheels rotate around visible hubs and remain attached to the chassis;
- passengers face travel direction, sit on the seat, clear controls, and remain behind the correct vehicle layers;
- cable cars follow the cable line for their full path;
- rods extend behind the torso centroid and remain visually continuous through foreground occlusion;
- hanging props rotate from their attachment point;
- flags bend from pole or rope anchors;
- water uses layered low-amplitude motion rather than moving as one rigid card;
- crowds have independent silhouettes and believable depth around the shared action.

Trigger focal actions at the authored focal position. Implement crossing-based state so the action can replay after the user reverses and crosses again. Do not tie a one-shot story beat only to elapsed page time.

Exit evidence: before/at/after screenshots for every handoff and forward/backward proof for every focal trigger.

### Gate 6: audio

Treat music as optional enhancement. Create a web delivery file separately from the archival master, check its loudness and peak, and test the compressed file's natural loop. Start only after user interaction, expose an accessible control, and remember the preference where appropriate.

Exit evidence: media inspection output plus browser proof for start, pause, resume, persistence, and one complete loop.

### Gate 7: release

Run the Skill preflight, `npm run verify`, and deterministic browser readback. Inspect all centers, all connectors, all handoffs, the loop, console, failed requests, desktop, and mobile. Then verify the deployed URL again. A build artifact or successful upload is not proof that the story works online.

Exit evidence: exact commands, tested URLs, viewport sizes, screenshot paths, deployment state, and known exceptions.

## Failure patterns and standard responses

| Symptom | Usually means | Standard response |
| --- | --- | --- |
| The whole site feels unlike the reference | Style was summarized by a vague label | Re-open the reference, write observable material/proportion/edge rules, rebuild the golden frame |
| Assets look like filtered photos or perfect AI sketches | Prompt lacks human imperfection and explicit rejects | Regenerate as raster artwork with uneven marks, simplified shapes, and a strong reject list |
| Character hands, torso, or legs separate | Broken source extraction or incompatible rig canvases | Stop animation, repair/regenerate parts, inspect assembled rest pose |
| A white card or halo surrounds the drawing | Alpha cleanup stopped at the paper background | Re-extract to pigment edge and inspect on light/dark backgrounds at 400% |
| Handwriting looks typed, colorful, or filled with white | Font/effect substituted for authored stroke art | Generate monochrome irregular lettering, preserve copy hierarchy, remove everything except strokes |
| Landmark is tiny or hidden | No delivery-size composition check | Rebalance camera, landmark scale, ground height, and depth band |
| Cutouts shimmer or flash where they overlap | Transparent planes share depth or unstable ordering | Set render order/depth behavior, separate bands, inspect motion through the overlap |
| New scenery appears after the traveler arrives | Scene entrance is centered on its own chapter | Lead scene assembly before the protagonist boundary and test the pre-entry frame |
| Traveler duplicates or teleports | Chapters own isolated protagonist instances | Define one continuity owner and explicit state replacement across the handoff |
| Transition suddenly accelerates | Too little connector distance or nonlinear mapping | Allocate a larger handoff interval and match in-scene travel speed |
| Rod floats beside or ends at a head | Endpoint was eyeballed or occluded incorrectly | Measure torso centroid, extend behind it, and fix foreground layer order |
| Wheel, cable car, flag, or rider detaches | Motion ignores physical anchors | Measure and animate from hubs, paths, seats, ropes, and attachment points |
| Flash happens late or only once | Trigger is time-based or one-way | Fire at focal crossing and reset/replay on reverse crossing |
| “Richer” scenery becomes random pop-ins | Decoration was added without semantic ownership | Add persistent location-appropriate sky, plants, animals, surfaces, and visitors |
| Visitors look cloned | One asset was reused too visibly | Generate distinct silhouettes, clothing, poses, scales, phases, and paths |
| Music works locally but not for visitors | Autoplay, asset path, codec, or loop was not tested online | Start after gesture, use public asset path, verify compressed file and deployed loop |

## Definition of done

A paper-story delivery is complete only when:

1. the visual system matches the approved golden frame;
2. every asset passes alpha, anatomy, rights, and delivery-size inspection;
3. one continuous protagonist crosses every handoff coherently;
4. scene entrances lead the traveler and connector pacing is comfortable;
5. every visible mechanism follows its physical anchor;
6. paper depth and shadows stay stable without flicker;
7. text is intact, readable, stylistically consistent, and truly transparent;
8. optional audio is controllable and loops in the deployed browser;
9. automated checks, desktop/mobile readback, loop proof, and live deployment proof all pass.
