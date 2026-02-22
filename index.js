#!/usr/bin/env node
import { cp, readFile, writeFile, rename, access } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2] ?? "my-app";
const from = fileURLToPath(new URL("./template", import.meta.url));
const to = resolve(process.cwd(), target);

try {
  await access(to);
  console.error(`Target already exists: ${to}`);
  process.exit(1);
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}

await cp(from, to, { recursive: true });

const files = [
  resolve(to, "package.json"),
  resolve(to, "index.html"),
  resolve(to, "src/App.tsx"),
]

for (const file of files) {
  const content = await readFile(file, "utf8");
  await writeFile(file, content.replace(/vite-template/g, target));
}

const gitignore = resolve(to, "_gitignore");
await rename(gitignore, resolve(to, ".gitignore"));

console.log(`Created ${target}`);
