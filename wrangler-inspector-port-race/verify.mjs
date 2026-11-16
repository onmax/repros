// Starts two `wrangler dev` processes at the same moment, each with its own
// --port and no --inspector-port, and checks that both answer.
// Both pick a free inspector port starting at 9229 before either binds it,
// so they can pick the same one. Repeats TRIALS times and exits 1 when any
// trial leaves a process that does not answer.
// CONTROL=1 pnpm verify runs the same trials with distinct --inspector-port values.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const trials = Number(process.env.TRIALS ?? 5);
const ports = { a: 48751, b: 48752 };
// CONTROL=1 gives each process its own --inspector-port; then both start.
const control = process.env.CONTROL === "1";

function start(app) {
  const child = spawn("pnpm", ["exec", "wrangler", "dev", "--config", `app-${app}/wrangler.jsonc`, "--port", String(ports[app]), "--ip", "127.0.0.1", ...(control ? ["--inspector-port", String(ports[app] + 100)] : [])], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  child.log = "";
  child.stdout.on("data", d => (child.log += d));
  child.stderr.on("data", d => (child.log += d));
  return child;
}

async function answers(port) {
  try {
    return (await (await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(2000) })).text()) === "ok";
  } catch {
    return false;
  }
}

const kill = child => { try { process.kill(-child.pid, "SIGTERM"); } catch {} };
let failures = 0;
for (let trial = 1; trial <= trials; trial++) {
  const children = { a: start("a"), b: start("b") };
  let up = { a: false, b: false };
  for (let i = 0; i < 40 && !(up.a && up.b); i++) {
    await sleep(500);
    up = { a: await answers(ports.a), b: await answers(ports.b) };
  }
  for (const child of Object.values(children)) kill(child);
  const errors = Object.entries(children)
    .map(([app, child]) => [app, child.log.replace(/\x1b\[[0-9;]*m/g, "").match(/Address already in use[^\n]*/)?.[0]])
    .filter(([, error]) => error);
  const ok = up.a && up.b;
  if (!ok) failures++;
  console.log(`trial ${trial}: app-a ${up.a ? "up" : "DOWN"}, app-b ${up.b ? "up" : "DOWN"}${errors.map(([app, e]) => `\n  app-${app}: ${e}`).join("")}`);
  await sleep(3000);
}
console.log(`${failures}/${trials} trials left a wrangler dev process that never answered`);
process.exitCode = failures > 0 ? 1 : 0;
