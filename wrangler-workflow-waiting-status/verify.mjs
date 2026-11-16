// Starts `wrangler dev`, runs one Workflow instance per waiting case, and polls
// instance.status() once a second while the instance sleeps or waits.
// The docs say status is "waiting" while an instance "is hibernating and waiting
// for sleep or event to finish". Exits 1 when no poll ever reports "waiting".
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = Number(process.env.PORT ?? 48741);
const base = `http://127.0.0.1:${port}`;
const dev = spawn("pnpm", ["exec", "wrangler", "dev", "--port", String(port), "--inspector-port", String(port + 1), "--ip", "127.0.0.1"], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: true,
});
let log = "";
dev.stdout.on("data", d => (log += d));
dev.stderr.on("data", d => (log += d));
const stop = () => { try { process.kill(-dev.pid, "SIGTERM"); } catch {} };
process.on("exit", stop);

async function get(path) {
  const response = await fetch(base + path);
  return response.text();
}

try {
  for (let i = 0; ; i++) {
    if (i === 120) throw new Error(`wrangler dev did not start:\n${log}`);
    try { if ((await get("/ready")) === "ok") break; } catch {}
    await sleep(500);
  }

  let failed = false;
  for (const mode of ["sleep", "waitForEvent", "retry"]) {
    const id = await get(`/start?mode=${mode}`);
    const seen = [];
    for (let t = 0; t < 9; t++) {
      await sleep(1000);
      seen.push(await get(`/status?id=${id}`));
    }
    const ok = seen.includes("waiting");
    failed ||= !ok;
    console.log(`${mode.padEnd(13)} expected "waiting" during the 6 s wait, got: ${seen.join(" ")}  ${ok ? "OK" : "FAIL"}`);
  }
  process.exitCode = failed ? 1 : 0;
} finally {
  stop();
}
