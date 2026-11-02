import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL(".", import.meta.url));
const now = "2026-11-01T23:30:00Z";

// Cloudflare rejects a compatibility_date later than today's UTC date (error 10021).
const cases = [
  { name: `"latest" at ${now}, Europe/Madrid`, tz: "Europe/Madrid", input: "latest", now },
  { name: `"2026-11-01", America/New_York`, tz: "America/New_York", input: "2026-11-01" },
  { name: `"2026-11-01" resolved twice, America/New_York`, tz: "America/New_York", input: "2026-11-01", passes: 2 },
  { name: `control: "latest" at ${now}, UTC`, tz: "UTC", input: "latest", now },
  { name: `control: "2026-11-01", UTC`, tz: "UTC", input: "2026-11-01" },
];

let failed = 0;
for (const c of cases) {
  const env = { ...process.env, TZ: c.tz };
  if (c.now) {
    env.REPRO_NOW = c.now;
    env.NODE_OPTIONS = `--import ${dir}fake-now.mjs`;
  }
  const actual = execFileSync("node", ["case.mjs", c.input, String(c.passes || 1)], { cwd: dir, env })
    .toString()
    .trim();
  const ok = actual === "2026-11-01";
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${c.name}: expected 2026-11-01, got ${actual}`);
}

if (failed) {
  console.error(`\n${failed} case(s) resolved a different date than 2026-11-01`);
  process.exit(1);
}
