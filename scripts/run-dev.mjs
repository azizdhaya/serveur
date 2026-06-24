/**
 * API + Vite avec cwd explicites (évite les échecs de `concurrently` + `npm --prefix` sous Windows,
 * notamment si le chemin du projet contient des espaces).
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backendDir = path.join(root, "backend");
const frontendDir = path.join(root, "frontend");
const shell = process.platform === "win32";

function start(name, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell,
    env: { ...process.env },
  });
  child.on("error", (err) => {
    console.error(`[${name}]`, err);
    process.exit(1);
  });
  return child;
}

const api = start("api", "npx", ["tsx", "watch", "src/index.ts"], backendDir);
const web = start("web", "npx", ["vite"], frontendDir);

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  api.kill();
  web.kill();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function onChildExit(name, code, signal) {
  if (shuttingDown) process.exit(0);
  console.error(`[${name}] arrêt`, { code, signal });
  shutdown();
  process.exit(code ?? 1);
}

api.on("exit", (code, signal) => onChildExit("api", code, signal));
web.on("exit", (code, signal) => onChildExit("web", code, signal));
