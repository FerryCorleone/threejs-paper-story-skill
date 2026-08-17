import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = path.resolve(process.argv[2] ?? process.cwd());
const requiredPaths = [
  "package.json",
  "AGENTS.md",
  "src/story/story.config.js",
  "src/Experience/models/PaperWorld.jsx",
  "skills/paper-story-builder/SKILL.md",
  "skills/paper-story-builder/references/production-playbook.md",
  "skills/paper-story-builder/references/visual-delivery-checklist.md",
];
const ignoredDirectories = new Set([".git", "dist", "node_modules", "tmp"]);
const forbiddenExtensions = new Set([
  ".3ds", ".basis", ".blend", ".blend1", ".dae", ".fbx",
  ".glb", ".gltf", ".ktx", ".ktx2", ".obj",
]);
const errors = [];

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    if (entry.isFile()) files.push(target);
  }
  return files;
}

for (const relativePath of requiredPaths) {
  if (!await exists(path.join(projectRoot, relativePath))) errors.push(`missing required path: ${relativePath}`);
}

if (!errors.length) {
  const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"));
  for (const script of ["check:no-binary-3d", "validate:story", "lint", "build", "verify"]) {
    if (!packageJson.scripts?.[script]) errors.push(`missing package script: ${script}`);
  }

  for (const file of await walk(projectRoot)) {
    if (forbiddenExtensions.has(path.extname(file).toLowerCase())) {
      errors.push(`binary 3D asset found: ${path.relative(projectRoot, file)}`);
    }
  }
}

if (errors.length) {
  console.error("Paper Story Builder preflight failed:\n" + errors.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Paper Story Builder preflight passed: ${projectRoot}`);
console.log(`Skill resources: ${skillDirectory}`);
console.log("Next: run npm run verify, then inspect every chapter and the loop in a browser.");
