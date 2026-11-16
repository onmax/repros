// 1. miniflare@latest (4.20260730.0) with a current compatibility date.
// 2. The Quick Start from the miniflare 5 beta README, unchanged.
// Exits 1 when either fails.
import * as v4 from "miniflare";
import * as v5 from "miniflare-v5";

let failed = false;
async function run(label, create) {
  let mf;
  try {
    mf = create();
    const text = await (await mf.dispatchFetch("http://localhost:8787/")).text();
    console.log(`${label}: OK (${text})`);
  } catch (error) {
    failed = true;
    console.log(`${label}: FAIL\n  ${String(error.message).split("\n").filter(Boolean).slice(0, 3).join("\n  ")}`);
  } finally {
    await mf?.dispose().catch(() => {});
  }
}

const script = `addEventListener("fetch", (event) => {
    event.respondWith(new Response("Hello Miniflare!"));
  })`;

await run("miniflare 4.20260730.0 (latest tag), compatibilityDate 2026-11-14", () =>
  new v4.Miniflare({ script, compatibilityDate: "2026-11-14" }));
await run("miniflare 5.20261116.0-beta, README Quick Start", () =>
  new v5.Miniflare({ script }));

process.exitCode = failed ? 1 : 0;
