import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

function build(env) {
  const r = spawnSync("pnpm", ["exec", "vite", "build"], {
    env: { ...process.env, ...env, NO_COLOR: "1" },
    encoding: "utf8",
  });
  return { ok: r.status === 0, output: (r.stdout + r.stderr).replace(/\x1b\[[0-9;]*m/g, "") };
}

async function serve() {
  const url = pathToFileURL(".output/server/index.mjs").href + `?t=${Date.now()}`;
  const { default: server } = await import(url);
  return (await server.fetch(new Request("http://localhost/"))).text();
}

async function run(name, control) {
  rmSync("node_modules/.nitro", { recursive: true, force: true });
  rmSync(".output", { recursive: true, force: true });
  const env = control ? { CONTROL: "1" } : {};
  const full = build(env);
  if (!full.ok) throw new Error(`${name}: full build failed\n${full.output}`);
  const skip = build({ ...env, SKIP_SSR: "1" });
  const error = skip.output.match(/\[UNRESOLVED_IMPORT\].*/)?.[0];
  const body = skip.ok ? await serve() : undefined;
  console.log(`${name}: build with ssr skipped ${skip.ok ? `works, responds "${body}"` : `fails: ${error}`}`);
  return { skip, error, body };
}

const repro = await run("repro   ([name]-[hash].mjs)", false);
const control = await run("control (index.mjs)", true);

const reproduced = !repro.skip.ok && /vite\/services\/ssr' in #nitro\/virtual\/vite-services/.test(repro.error ?? "");
const controlPasses = control.skip.ok && control.body === "hello from ssr";
console.log(`\nbug reproduced: ${reproduced}, control passes: ${controlPasses}`);
process.exit(reproduced && controlPasses ? 0 : 1);
