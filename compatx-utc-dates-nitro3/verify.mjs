import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL(".", import.meta.url));

// Cloudflare checks compatibility_date against the UTC date (error 10021 when later).
const cases = [
  {
    name: "unpinned, 00:30 in Madrid (23:30 UTC on Nov 1)",
    env: { TZ: "Europe/Madrid", REPRO_NOW: "2026-11-01T23:30:00Z" },
    expected: "2026-11-01",
  },
  {
    name: "pinned 2026-11-01, New York",
    env: { TZ: "America/New_York", REPRO_PIN: "2026-11-01" },
    expected: "2026-11-01",
  },
  {
    name: "control: unpinned, UTC, same instant",
    env: { TZ: "UTC", REPRO_NOW: "2026-11-01T23:30:00Z" },
    expected: "2026-11-01",
  },
  {
    name: "control: pinned 2026-11-01, UTC",
    env: { TZ: "UTC", REPRO_PIN: "2026-11-01" },
    expected: "2026-11-01",
  },
];

let failed = 0;
for (const c of cases) {
  rmSync(`${dir}.output`, { recursive: true, force: true });
  const env = { ...process.env, ...c.env, CI: "1" };
  if (c.env.REPRO_NOW) {
    env.NODE_OPTIONS = `--import ${dir}fake-now.mjs`;
  }
  execFileSync("pnpm", ["exec", "nitro", "build"], { cwd: dir, env, stdio: "ignore" });
  const { compatibility_date: actual } = JSON.parse(
    readFileSync(`${dir}.output/server/wrangler.json`, "utf8"),
  );
  const ok = actual === c.expected;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${c.name}: expected ${c.expected}, got ${actual}`);
}

if (failed) {
  console.error(`\n${failed} case(s) wrote a wrong compatibility_date to .output/server/wrangler.json`);
  process.exit(1);
}
