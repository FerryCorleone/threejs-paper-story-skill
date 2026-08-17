# Paper story visual delivery checklist

Use this checklist for every paper-story customization. Convert the user's specific feedback into checks that remain valid when the story, characters, locations, and assets change.

## 1. Scene semantics

- Every visible prop has a clear relationship to the current location, action, season, or story beat.
- “Richer” means adding contextual foreground, middle-ground, background, and atmospheric detail—not inserting unrelated surprise objects.
- Passing or appearing objects need an intentional narrative reason. Ambient fillers should remain present or loop naturally; they must not pop in and disappear because of a narrow progress window.
- Landmarks are recognizable, correctly scaled, and given enough unobstructed screen area to read at first glance.
- Empty travel space contains appropriate connective scenery, while chapter centers retain comfortable breathing room.
- Ground treatments are location-scoped. Do not repeat a signature surface such as stone paving, snow, sand, or water through unrelated regions merely to fill space.

## 2. Asset integrity

- Inspect the source asset and the composed browser frame on both light and dark contrasting backgrounds.
- The alpha edge follows the outermost pigment or pencil stroke. Reject sticker-like white borders, paper rectangles, checkerboard remnants, chroma fringes, or untrimmed blank margins.
- Intended white drawing areas remain; unintended white islands and background holes are removed.
- Characters pass an anatomy check: head, torso, arms, hands, legs, and feet are all present, proportionate to the chosen style, and physically connected at rest.
- When copy is extended, preserve the existing hierarchy and wording unless replacement was explicitly requested. Adding a place label must not silently delete a subtitle, caption, note, or second handwritten line.
- Layered pieces pass an assembled-rest screenshot check before animation. No gap, doubled limb, disconnected hand, missing torso, or flashing overlap is acceptable.
- Vehicle occupants face the travel direction, sit on the seat, clear the controls, and align with the chassis and wheel positions.

## 3. Paper material and depth

- Background paper, floor paper, characters, buildings, and props share a compatible real paper grain and hand-made imperfection level.
- Every independent paper cutout receives the same family of shallow, soft, slightly offset paper shadow unless the element is intentionally luminous or flat ink.
- Shadows follow the cutout silhouette. Reject hard rectangles, gray floor blobs, jagged edges, excessive blur, or inconsistent directions.
- Transparent planes do not use hard real-time shadows when those shadows reveal the rectangular source plane.
- Layer order remains stable through motion. Reject z-fighting, shimmer, flicker, or visible seams where paper panels meet.
- Ground and foreground textures must not cover the readable half of a landmark. Reduce their height, move them lower, or place them behind the architecture while keeping the travel surface legible.

## 4. Motion mechanics

- The recurring protagonist is one continuous traveler. A new costume replaces the existing traveler near the scene boundary; it never creates a second copy.
- Cross-scene travel occupies a generous portion of the chapter interval and reads at the same pace as in-scene movement. Reject teleports or a fast final burst.
- Motion follows the depicted mechanism: wheels rotate around their hubs, cable cars remain on the cable, water moves as layered waves, flags bend from their attachment points, and crowds act around—not through—the landmark.
- Ambient motion is subtle and repeatable: clouds drift, birds pass or glide, grass breathes, water ripples, and hanging ornaments swing from their actual attachment points.
- Ambient sprites remain recognizable at display size. A bird should read as a bird rather than a generic glyph, and each independently moving subject should have its own phase or path.
- A control rod appears only on an intentionally puppeteered foreground subject. It runs behind the paper, uses a tactile material, and extends far enough into the subject's visual center of mass that the hidden joint feels physically attached.
- Measure multi-person sprite silhouettes before placing rods. The rod endpoint should land behind the chosen torso centroid, not at the head, feet, or transparent space between people, and the visible rod must remain continuous above foreground plants.
- For a multi-person cutout, choose rod count and offsets deliberately. Never place a single rod in empty space between bodies; use one body-aligned rod or separate rods for separately puppeteered people.
- Entry animation direction matches physical staging. Attached lanterns remain attached to architecture; roadside plants do not drop from the sky.
- A triggered action such as a camera flash, impact, wave, or reveal fires when its subject reaches the intended focal position—not after the subject has already passed it.
- Scroll-driven triggers must be repeatable in both directions. Crossing the same focal point again after reversing should replay the action without requiring a page reload.

## 5. Composition and continuity

- Each chapter has readable foreground, middle-ground, background, and sky detail where the location supports them.
- Connector spaces reuse nearby landscape logic so the world feels continuous without duplicating the chapter's hero landmark.
- The next scene's landmark, ground, atmosphere, and supporting layers finish their entrance before the protagonist crosses into that scene. Reject any scene that visibly assembles only after the traveler reaches its center.
- Contextual filler examples include stone paving in an old town, shore plants near water, grass and wildflowers along a road, persistent visitors at a festival, and clouds or birds in an open sky.
- Check the frame immediately before, at, and after every handoff. Character count, costume, position, scale, travel direction, and vehicle state remain coherent.
- Check the final-to-first loop with the same standards as any other transition.

## 6. Browser proof

- Capture every chapter center and a second frame after a short wait to confirm intended motion.
- Capture every interlude midpoint and every protagonist handoff.
- Inspect desktop and narrow mobile viewports; landmarks, characters, text, and ground must remain visible without exposing dead space.
- Confirm zero console errors, zero failed asset requests, a working intro, all reachable chapters, and a working loop.
- Do not sign off from source review alone. Record the tested URL, viewport sizes, screenshot paths, and any known visual exception.

## 7. Audio and shareability

- Music starts only after a user gesture, never blocks entry, loops without an obvious click or long silence, and remains subordinate to any spoken content.
- The music control is visible but unobtrusive, keyboard accessible, has an accurate accessible label/state, and works after pause, resume, reload, and preference restoration.
- Verify the actual compressed web asset, duration, channel layout, loudness, peak level, and natural loop in the browser rather than relying only on the source master.
- The deployed document has a correct title, description, social preview image, and no private source material or credentials in public assets.
- Repeat a compact live readback after deployment: entry, representative chapter centers, final-to-first loop, audio toggle, console, failed requests, desktop, and narrow mobile.
