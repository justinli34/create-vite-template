#!/usr/bin/env node
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2] ?? "my-app";
const from = fileURLToPath(new URL("./template", import.meta.url));
const to = resolve(process.cwd(), target);

if (existsSync(to)) {
  console.error(`Target already exists: ${to}`);
  process.exit(1);
}

cpSync(from, to, { recursive: true });
console.log(`Created ${target}`);
