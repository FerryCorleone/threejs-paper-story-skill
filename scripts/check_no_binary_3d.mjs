import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const currentScript = fileURLToPath(import.meta.url);
const excludedDirectories = new Set([".git", "dist", "node_modules", "tmp"]);
const forbiddenExtensions = new Set([
  ".3ds", ".basis", ".blend", ".blend1", ".dae", ".fbx",
  ".glb", ".gltf", ".ktx", ".ktx2", ".obj",
]);
const sourceRoots = ["src", "scripts"];
const forbiddenRuntimeTerms = [/\bbpy\b/i, /GLTFLoader/, /KTX2Loader/, /useGLTF/];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    if (entry.isFile()) files.push(target);
  }
  return files;
}

const allFiles = await walk(projectRoot);
const violations = [];

for (const file of allFiles) {
  const extension = path.extname(file).toLowerCase();
  if (forbiddenExtensions.has(extension)) {
    violations.push(`binary 3D asset: ${path.relative(projectRoot, file)}`);
  }
}

for (const sourceRoot of sourceRoots) {
  const root = path.join(projectRoot, sourceRoot);
  for (const file of await walk(root)) {
    if (file === currentScript) continue;
    if (!/[.](?:js|jsx|mjs|ts|tsx|py)$/.test(file)) continue;
    const contents = await readFile(file, "utf8");
    for (const term of forbiddenRuntimeTerms) {
      if (term.test(contents)) {
        violations.push(`forbidden loader/tool reference in ${path.relative(projectRoot, file)}: ${term}`);
      }
    }
  }
}

if (violations.length) {
  console.error("Pure Three.js boundary failed:\n" + violations.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Pure Three.js boundary passed (${allFiles.length} project files scanned).`);
