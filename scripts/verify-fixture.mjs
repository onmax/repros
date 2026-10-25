import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const root = process.cwd();
process.env.RAYON_NUM_THREADS ||= "2";
process.env.GOMAXPROCS ||= "2";
const require = createRequire(resolve(root, "package.json"));
const { rolldown } = await import(pathToFileURL(require.resolve("rolldown")));
const esbuild = await import(pathToFileURL(require.resolve("esbuild")));
const pkg = require("./package.json");
const h3 = require("h3/package.json");
assert.equal(h3.version, pkg.dependencies.h3);
const installedH3 = await readFile(resolve(require.resolve("h3/package.json"), "../dist/cache.mjs"), "utf8");
const annotation = "/* @__NO_SIDE_EFFECTS__ */\nfunction defineLazyEventHandler(loader)";
const patched = pkg.name === "h3-pure-lazy-fix";
assert.equal(installedH3.includes(annotation), patched, "Installed package must match the intended patch state");
assert.equal(require("rolldown/package.json").version, "1.2.14");
assert.equal(require("esbuild/package.json").version, "0.28.2");
const outputDir = resolve(root, ".output");
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const report = {
  h3: h3.version,
  installedAnnotation: patched,
  node: process.version,
  platform: `${process.platform}-${process.arch}`,
  rolldown: "1.2.14",
  esbuild: "0.28.2",
  measurements: [],
  runtimeChecks: [],
};
const marker = "H3_UNUSED_LAZY_HANDLER";
const queryEvent = { url: new URL("http://localhost/?item=1&item=2") };
function checkQuery(module) {
  assert.deepEqual({ ...module.getQuery(queryEvent) }, { item: ["1", "2"] });
}
async function checkLazy(module) {
  let loads = 0;
  let calls = 0;
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const handler = module.defineLazyEventHandler(async () => {
    loads++;
    await gate;
    return { default: (event) => {
      calls++;
      return { query: module.getQuery(event) };
    } };
  });
  assert.equal(loads, 0, "construction must not load the handler");
  assert.equal(typeof handler.fetch, "function");
  const first = handler.fetch("http://localhost/?item=1&item=2");
  const second = handler.fetch("http://localhost/?item=1&item=2");
  assert.equal(loads, 1, "concurrent calls must share one pending loader");
  release();
  for (const response of await Promise.all([first, second])) {
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { query: { item: ["1", "2"] } });
  }
  const third = await handler.fetch("http://localhost/?item=1&item=2");
  assert.deepEqual(await third.json(), { query: { item: ["1", "2"] } });
  assert.equal(loads, 1, "later calls must reuse the loaded handler");
  assert.equal(calls, 3);
}

for (const entry of ["generic", "node"]) {
  const inputDir = resolve(outputDir, "inputs", entry);
  await mkdir(inputDir, { recursive: true });
  for (const file of await readdir(resolve(root, "src"))) {
    const source = await readFile(resolve(root, "src", file), "utf8");
    await writeFile(resolve(inputDir, file), entry === "node"
      ? source.replaceAll('"h3/generic"', '"h3"')
      : source);
  }
  // Unbundled package behavior, before minification or dead-code removal.
  const unbundled = await import(pathToFileURL(resolve(inputDir, "runtime.mjs")));
  await checkLazy(unbundled);
  report.runtimeChecks.push(`${entry}: unbundled lazy loading, concurrent reuse, cached reuse, fetch`);
  for (const bundler of ["rolldown", "esbuild"]) {
    for (const [fixture, file] of [
      ["mixed", "entry.mjs"], ["live-only", "live-only.mjs"],
      ["dead-argument", "effects.mjs"], ["runtime", "runtime.mjs"],
    ]) {
      const input = resolve(inputDir, file);
      let code;
      if (bundler === "rolldown") {
        const build = await rolldown({ input, platform: "node" });
        try {
          const output = await build.generate({ format: "es", minify: true, comments: false });
          const chunks = output.output.filter((item) => item.type === "chunk");
          assert.equal(chunks.length, 1);
          code = chunks[0].code;
        } finally {
          await build.close();
        }
      } else {
        const output = await esbuild.build({ entryPoints: [input], bundle: true,
          write: false, minify: true, platform: "node", format: "esm",
          target: "es2022", legalComments: "none" });
        code = output.outputFiles[0].text;
      }
      const outputFile = resolve(outputDir, `${entry}-${bundler}-${fixture}.mjs`);
      await writeFile(outputFile, code);
      if (fixture === "dead-argument") {
        globalThis.__h3ArgumentCalls = 0;
        globalThis.__h3LoaderCalls = 0;
      }
      const module = await import(pathToFileURL(outputFile));
      checkQuery(module);
      if (fixture === "runtime") {
        await checkLazy(module);
        report.runtimeChecks.push(`${entry}/${bundler}: lazy loading, concurrent reuse, cached reuse, fetch`);
      }
      if (fixture === "dead-argument") {
        assert.equal(globalThis.__h3ArgumentCalls, 1, "dead call arguments must run exactly once");
        assert.equal(globalThis.__h3LoaderCalls, 0, "unused loader must never run");
        delete globalThis.__h3ArgumentCalls;
        delete globalThis.__h3LoaderCalls;
        report.runtimeChecks.push(`${entry}/${bundler}: dead argument executes once; unused loader never runs`);
      }
      report.measurements.push({ entry, bundler, fixture,
        raw: Buffer.byteLength(code), gzip: gzipSync(code, { level: 9 }).length,
        sha256: createHash("sha256").update(code).digest("hex"),
        unusedHandlerRetained: code.includes(marker),
        deadEffectHandlerRetained: code.includes("H3_UNUSED_EFFECT_HANDLER"),
      });
    }
  }
}
const failures = report.measurements.filter((m) =>
  m.bundler === "rolldown" && m.fixture === "mixed" && m.unusedHandlerRetained);
report.acceptance = failures.length ? "FAIL_UNUSED_LAZY_HANDLER" : "PASS";
await writeFile(resolve(outputDir, "results.json"), JSON.stringify(report, null, 2) + "\n");
for (const m of report.measurements.filter((m) => ["mixed", "live-only"].includes(m.fixture))) {
  console.log(`${m.entry}/${m.bundler}/${m.fixture}: ${m.raw} raw, ${m.gzip} gzip; unused=${m.unusedHandlerRetained}`);
}
console.log(`Runtime controls passed: ${report.runtimeChecks.length}`);
if (failures.length) {
  console.error("FAIL_UNUSED_LAZY_HANDLER: Rolldown retains the unconsumed defineLazyEventHandler call.");
  process.exitCode = 42;
} else {
  console.log("PASS: Rolldown removes the unconsumed defineLazyEventHandler call.");
}
