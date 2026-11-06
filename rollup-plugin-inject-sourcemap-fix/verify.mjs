// Builds one module twice with a shared cache, as `rollup --watch` does, and checks
// what @rollup/plugin-inject leaves on the cached module when it injects nothing.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import inject from '@rollup/plugin-inject';
import { rollup } from 'rollup';

const dir = await mkdtemp(join(tmpdir(), 'inject-sourcemap-'));
const entry = join(dir, 'index.js');

// `options.process` is a property, not a reference to the global `process`, so the
// plugin's first pass matches the text but nothing gets injected.
const code = Array.from(
  { length: 2000 },
  (_, i) => `export function step${i}(options) { return options.process(${i}); }`
).join('\n');
await writeFile(entry, code);

let cache;
const warnings = [];
let outputMap;
try {
  for (let build = 0; build < 2; build++) {
    const bundle = await rollup({
      input: entry,
      cache,
      plugins: [inject({ process: 'process' })],
      onwarn: (warning) => warnings.push(warning.code)
    });
    const { output } = await bundle.generate({ format: 'esm', sourcemap: true });
    assert.doesNotMatch(output[0].code, /import/, 'the plugin should inject nothing');
    outputMap = output[0].map;
    cache = bundle.cache;
    await bundle.close();
  }
} finally {
  await rm(dir, { recursive: true, force: true });
}

const cached = cache.modules.find((module) => module.id === entry);
const segments = cached.sourcemapChain
  .flatMap((map) => map.mappings)
  .reduce((sum, line) => sum + line.length, 0);

console.log(`code length:          ${code.length} chars`);
console.log(`maps on cached module: ${cached.sourcemapChain.length}`);
console.log(`decoded segments:      ${segments}`);
console.log(
  `output map mappings:   ${outputMap.mappings.length} chars, sha1 ${createHash('sha1').update(outputMap.mappings).digest('hex').slice(0, 12)}`
);

assert.deepEqual(warnings, [], 'no sourcemap warnings');
assert.equal(outputMap.sources.length, 1);
assert.match(outputMap.sources[0], /index\.js$/, 'output map still points at the source');
assert.ok(outputMap.mappings.length > 0, 'output map has mappings');

assert.equal(
  cached.sourcemapChain.length,
  0,
  'expected no sourcemap for a module the plugin did not change'
);
console.log('ok: the unchanged module keeps no sourcemap');
