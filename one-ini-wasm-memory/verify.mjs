// Parses the same .editorconfig file over and over with @one-ini/wasm and
// reads the size of its WebAssembly memory after each batch. Exits 1 when the
// memory grows, which is the bug, and 0 when it stays flat.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

// The package doesn't expose its memory, so keep the instance it creates.
const instances = [];
const Instance = WebAssembly.Instance;
WebAssembly.Instance = function (module, imports) {
  const instance = new Instance(module, imports);
  instances.push(instance);
  return instance;
};

const require = createRequire(import.meta.url);
const pkg = process.argv.includes("--0.2.1") ? "one-ini-0.2.1" : "@one-ini/wasm";
const oneIni = require(pkg);
const wasm = instances.at(-1).exports;
const memory = () => wasm.memory.buffer.byteLength;
const KiB = 1024;
const MiB = 1024 * KiB;

console.log(`${pkg} ${oneIni.version()}, Node ${process.version}`);

// Bytes the WebAssembly memory grows by per call, after a warm-up batch.
function growthPerCall(fn, calls = 2000) {
  for (let i = 0; i < calls; i++) fn();
  const before = memory();
  for (let i = 0; i < calls; i++) fn();
  return (memory() - before) / calls;
}

if (process.argv.includes("--limit")) {
  // Keep parsing until the memory reaches wasm32's 4 GiB limit.
  const file = readFileSync(new URL("large.editorconfig", import.meta.url));
  let calls = 0;
  try {
    for (;;) {
      oneIni.parse_to_uint32array(file);
      calls++;
    }
  } catch (error) {
    console.log(`call ${calls + 1} throws ${error.name}: ${error.message}, memory ${(memory() / MiB).toFixed(0)} MiB`);
  }
  // Every later call throws too, even on a one-line file.
  assert.throws(() => oneIni.parse_to_uint32array(Buffer.from("root = true\n")), /unreachable/);
  console.log("a 12-byte file now throws the same error");
  process.exit(1);
}

let failed = false;
for (const name of ["small.editorconfig", "medium.editorconfig", "large.editorconfig"]) {
  const file = readFileSync(new URL(name, import.meta.url));
  const grows = growthPerCall(() => oneIni.parse_to_uint32array(file));
  const toLimit = grows ? Math.round((4096 * MiB - memory()) / grows) : Infinity;
  console.log(
    `${name}, ${file.length} bytes: memory grows ${(grows / KiB).toFixed(1)} KiB per call` +
      (grows ? `, 4 GiB after about ${toLimit.toLocaleString("en")} more calls` : ""),
  );
  if (grows > 0) failed = true;
}

// The same growth with no parser code: the allocator alone, growing a buffer
// by doubling as a Rust Vec does, then freeing it.
const allocator = growthPerCall(() => {
  let size = 16;
  let ptr = wasm.__wbindgen_malloc(size, 1);
  while (size < 8 * KiB) {
    ptr = wasm.__wbindgen_realloc(ptr, size, size * 2, 1);
    size *= 2;
  }
  wasm.__wbindgen_free(ptr, size, 1);
});
console.log(`allocator only, grow a buffer to 8 KiB and free it: memory grows ${(allocator / KiB).toFixed(1)} KiB per call`);

process.exit(failed ? 1 : 0);
