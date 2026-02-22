#!/usr/bin/env node
import { cp, readFile, writeFile, rename, access, readdir } from "node:fs/promises";
import { resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2] ?? "my-app";
const targetName = target === "." ? basename(process.cwd()) : target;
const from = fileURLToPath(new URL("./template", import.meta.url));
const to = resolve(process.cwd(), target);

try {
  await access(to);
  const entries = await readdir(to);
  if (entries.length > 0) {
    console.error(`Failed to create. Target directory is not empty: ${to}`);
    process.exit(1);
  }
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
  await writeFile(file, content.replace(/vite-template/g, targetName));
}

const gitignore = resolve(to, "_gitignore");
await rename(gitignore, resolve(to, ".gitignore"));

console.log(`Created ${targetName}`);
