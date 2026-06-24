import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const root = resolve(scriptDir, "..");

const targets = [
  "frontend/dist",
  "backend/dist",
  "frontend/node_modules/.tmp",
  "backend/node_modules/.tmp",
  "frontend/tsconfig.app.tsbuildinfo",
  "frontend/tsconfig.node.tsbuildinfo",
  "backend/tsconfig.tsbuildinfo",
];

let removed = 0;

for (const relative of targets) {
  const targetPath = resolve(root, relative);
  if (!existsSync(targetPath)) continue;
  rmSync(targetPath, { recursive: true, force: true });
  removed += 1;
  process.stdout.write(`Supprime: ${relative}\n`);
}

process.stdout.write(
  removed > 0
    ? `Nettoyage termine (${removed} element(s)).\n`
    : "Rien a nettoyer.\n"
);
