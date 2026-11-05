import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// `npx wrangler` resolves `node_modules/.bin` first, so the stub runs instead of Wrangler.
// An empty HOME hides npx's cache and any Wrangler login, so nothing else can run or deploy.
copyFileSync("stub/wrangler", "node_modules/.bin/wrangler");
const home = mkdtempSync(join(tmpdir(), "no-wrangler-login-"));
const env = {
  ...process.env,
  NO_COLOR: "1",
  HOME: home,
  XDG_CONFIG_HOME: home,
  CLOUDFLARE_API_TOKEN: "",
  CLOUDFLARE_ACCOUNT_ID: "",
};

const run = (args) => {
  const r = spawnSync("pnpm", ["exec", ...args], { encoding: "utf8", env });
  return { ok: r.status === 0, output: (r.stdout + r.stderr).replace(/\x1b\[[0-9;]*m/g, "") };
};

try {
  rmSync(".output", { recursive: true, force: true });
  const build = run(["vite", "build"]);
  if (!build.ok) throw new Error(`vite build failed\n${build.output}`);

  const saved = JSON.parse(readFileSync(".output/nitro.json", "utf8")).commands?.deploy;
  const deploy = run(["nitro", "deploy", "--prebuilt"]);
  const ran = deploy.output.match(/^STUB (wrangler .*)$/m)?.[1];
  if (!deploy.ok || !ran) throw new Error(`the stub did not run\n${deploy.output}`);

  console.log(`saved in .output/nitro.json:  ${saved}`);
  console.log(`nitro deploy --prebuilt ran:  ${ran}`);

  const expected = "wrangler deploy --config .output/server/wrangler.json";
  const reproduced = ran !== expected;
  console.log(reproduced ? `\nbug reproduced: expected "${expected}"` : "\nbug not reproduced: the saved command ran");
  process.exitCode = process.env.EXPECT_FIXED ? (reproduced ? 1 : 0) : reproduced ? 0 : 1;
} finally {
  rmSync(home, { recursive: true, force: true });
}
