// Resolves an id that misses, the way Nitro 2's node-externals plugin does it: once per
// server chunk, with the chunk as the first base, so exsolve's cache never hits.
// `vue/server-renderer/index.mjs` is the id mlly guesses for Vue's server renderer; it is
// not an `exports` key, so every lookup fails after probing every base, suffix and extension.
//
// Prints the time per failed lookup and how many `statSync` calls threw per lookup.
// Exits 1 when any `statSync` call threw (the bug), 0 when none did.
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const LOOKUPS = 200;
const LAYERS = 12;
const root = import.meta.dirname;

// exsolve does `import { statSync } from "node:fs"`; syncBuiltinESMExports() makes that
// binding see this wrapper.
const realStatSync = fs.statSync;
let statThrows = 0;
fs.statSync = function (...args) {
  try {
    return realStatSync.apply(this, args);
  } catch (error) {
    statThrows++;
    throw error;
  }
};
syncBuiltinESMExports();
const { resolveModuleURL } = await import("exsolve");

// One importer per lookup, nested like a build's server chunks.
const chunksDir = join(root, "build/server/chunks");
fs.rmSync(join(root, "build"), { recursive: true, force: true });
fs.mkdirSync(chunksDir, { recursive: true });
const importers = Array.from({ length: LOOKUPS + 20 }, (_, i) => {
  const file = join(chunksDir, `chunk-${i}.mjs`);
  fs.writeFileSync(file, "export {}\n");
  return file;
});

// Nitro's `moduleDirectories`: the app's node_modules plus one per Nuxt layer, here 12
// local layers in `layers/`. A layer's node_modules dir doesn't need to exist.
const moduleDirectories = [
  join(root, "node_modules/"),
  ...Array.from({ length: LAYERS }, (_, i) => join(root, `layers/layer-${i}/node_modules/`)),
];

// The options Nitro 2.13.5 passes in `tryResolve` (src/rollup/plugins/externals.ts).
const lookup = (id, importer) =>
  resolveModuleURL(id, {
    try: true,
    conditions: ["node", "import", "production", "default"],
    from: [pathToFileURL(importer), ...moduleDirectories],
    suffixes: ["", "/index"],
    extensions: [".mjs", ".cjs", ".js", ".mts", ".cts", ".ts", ".json"],
  });

function measure(id, files) {
  statThrows = 0;
  const results = new Set();
  const cpu0 = process.cpuUsage();
  const t0 = performance.now();
  for (const file of files) results.add(lookup(id, file));
  const ms = performance.now() - t0;
  const cpu = process.cpuUsage(cpu0);
  return {
    results,
    msPerLookup: ms / files.length,
    cpuMsPerLookup: (cpu.user + cpu.system) / 1000 / files.length,
    statThrowsPerLookup: statThrows / files.length,
  };
}

// Warm up the JIT and exsolve's package.json cache on importers that aren't measured.
measure("vue/server-renderer/index.mjs", importers.slice(LOOKUPS));
const miss = measure("vue/server-renderer/index.mjs", importers.slice(0, LOOKUPS));
const hit = measure("vue/server-renderer", importers.slice(0, 20));

const exsolvePkg = JSON.parse(fs.readFileSync(join(root, "node_modules/exsolve/package.json"), "utf8"));
const patched = fs.readFileSync(join(root, "node_modules/exsolve/dist/index.mjs"), "utf8").includes("throwIfNoEntry: false });\n\t} catch");
console.log(`exsolve ${exsolvePkg.version}${patched ? " (patched)" : ""}, node ${process.version}`);
console.log(`failed lookups:        ${LOOKUPS} x "vue/server-renderer/index.mjs", one importer each, ${moduleDirectories.length + 1} bases`);
console.log(`time per lookup:       ${miss.msPerLookup.toFixed(2)} ms wall, ${miss.cpuMsPerLookup.toFixed(2)} ms CPU`);
console.log(`statSync throws:       ${miss.statThrowsPerLookup} per lookup (expected 0)`);
console.log(`control hit:           "vue/server-renderer" -> ${[...hit.results].join(", ").replace(/.*node_modules\//, "node_modules/")}`);

if (miss.results.size !== 1 || !miss.results.has(undefined)) {
  console.error(`FAIL: expected every lookup to miss, got ${[...miss.results].join(", ")}`);
  process.exit(2);
}
if (hit.results.size !== 1 || ![...hit.results][0]?.endsWith("/vue/server-renderer/index.mjs")) {
  console.error(`FAIL: control lookup did not resolve: ${[...hit.results].join(", ")}`);
  process.exit(2);
}
fs.rmSync(join(root, "build"), { recursive: true, force: true });
if (miss.statThrowsPerLookup > 0) {
  console.log(`BUG: each failed lookup throws ${miss.statThrowsPerLookup} ENOENT errors from statSync`);
  process.exit(1);
}
console.log("OK: failed lookups probe missing paths without throwing");
