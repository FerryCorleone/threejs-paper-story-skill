import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configUrl = pathToFileURL(path.join(projectRoot, "src/story/story.config.js"));
const { storyConfig } = await import(configUrl.href);
const errors = [];
const assetPaths = new Set();

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function collectAssets(value, context = "storyConfig") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectAssets(item, `${context}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    const childContext = `${context}.${key}`;
    if (key === "src") {
      assert(
        typeof child === "string" && child.startsWith("/story-assets/"),
        `${childContext} must begin with /story-assets/`,
      );
      if (typeof child === "string" && child.startsWith("/story-assets/")) assetPaths.add(child);
    } else {
      collectAssets(child, childContext);
    }
  }
}

assert(storyConfig?.meta?.title, "meta.title is required");
assert(storyConfig?.theme?.ink && storyConfig?.theme?.paper && storyConfig?.theme?.accent, "theme colors are required");
assert(Array.isArray(storyConfig?.stage?.pageColors) && storyConfig.stage.pageColors.length > 0, "stage.pageColors is required");
assert(Array.isArray(storyConfig?.stage?.pageTilts) && storyConfig.stage.pageTilts.length > 0, "stage.pageTilts is required");
assert(
  Array.isArray(storyConfig?.chapters) && storyConfig.chapters.length >= 3 && storyConfig.chapters.length <= 12,
  "chapters must contain 3–12 pages",
);

const chapterIds = new Set();
storyConfig.chapters?.forEach((chapter, index) => {
  const context = `chapter ${index + 1}`;
  assert(chapter.id && !chapterIds.has(chapter.id), `${context} needs a unique id`);
  chapterIds.add(chapter.id);
  assert(Number.isFinite(chapter.stageX), `${context} stageX must be a number`);
  assert(
    Number.isFinite(chapter.threshold) && chapter.threshold >= 0 && chapter.threshold < 1,
    `${context} threshold must be within [0, 1)`,
  );
  if (index === 0) assert(chapter.threshold === 0, "first chapter threshold must equal 0");
  if (index > 0) {
    assert(chapter.stageX > storyConfig.chapters[index - 1].stageX, `${context} stageX must increase`);
    assert(chapter.threshold > storyConfig.chapters[index - 1].threshold, `${context} threshold must increase`);
  }

  if (storyConfig.meta.templateState !== "blank") {
    assert(chapter.title && chapter.narration, `${context} needs title and narration`);
  }
});

collectAssets(storyConfig);

for (const assetPath of assetPaths) {
  try {
    await access(path.join(projectRoot, "public", assetPath.slice(1)));
  } catch {
    errors.push(`missing asset: ${assetPath}`);
  }
}

if (errors.length) {
  console.error("Story validation failed:\n" + errors.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

const state = storyConfig.meta.templateState === "blank" ? "blank template" : "custom story";
console.log(`Story validation passed (${state}, ${storyConfig.chapters.length} pages, ${assetPaths.size} assets).`);
