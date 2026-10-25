import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

// Bounded candidate: ordinary intrinsics and unmodified Hookable base prototype.
// Custom base prototype effects are measured explicitly as a contract limitation.
const root = path.dirname(fileURLToPath(import.meta.url));
const offline = process.argv.includes('--offline');
const skipInstall = process.argv.includes('--skip-install');
const hash = (source) => createHash('sha256').update(source).digest('hex');
const baselineHash = '377b65805bb3ae06066a557acb72834d753053199ab1af8ec719492006992c51';
const annotation = '/*#__NO_SIDE_EFFECTS__*/\n';
const measurements = {};
assert.equal(process.version, 'v24.21.0', 'Use the pinned Node version from .node-version');

function install(cwd) {
  const args = ['install', '--frozen-lockfile', '--ignore-scripts', ...(offline ? ['--offline'] : [])];
  const command = process.platform === 'win32' ? 'cmd.exe' : 'pnpm';
  const commandArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'pnpm.cmd', ...args] : args;
  const child = spawnSync(command, commandArgs, { cwd, stdio: 'inherit', timeout: 180_000 });
  if (child.error) throw child.error;
  assert.equal(child.status, 0, `${command} install failed`);
}

for (const variant of ['hookable-pure-factory', 'hookable-pure-factory-fix']) {
  const cwd = path.join(root, variant);
  if (!skipInstall) install(cwd);
  const require = createRequire(path.join(cwd, 'package.json'));
  const packageEntry = require.resolve('hookable');
  const source = await fs.readFile(packageEntry, 'utf8');
  const unannotated = source.replace(annotation, '');
  assert.equal(hash(unannotated), baselineHash, 'Only the declaration comment may differ');
  assert.equal(source.includes(annotation), variant === 'hookable-pure-factory-fix');
  const hookableManifest = JSON.parse(await fs.readFile(path.resolve(packageEntry, '../../package.json'), 'utf8'));
  assert.equal(hookableManifest.version, '6.1.2');
  assert.equal(hookableManifest.exports['.'], './dist/index.mjs');
  const rollup = await import(pathToFileURL(require.resolve('rollup')).href);
  const esbuild = await import(pathToFileURL(require.resolve('esbuild')).href);
  const { nodeResolve } = await import(pathToFileURL(require.resolve('@rollup/plugin-node-resolve')).href);
  assert.equal(rollup.VERSION, '4.64.12');
  assert.equal(esbuild.version, '0.28.2');
  const output = path.join(cwd, 'output');
  await fs.mkdir(output, { recursive: true });
  const fixtureDirectory = path.join(root, 'fixtures');
  const fixtures = (await fs.readdir(fixtureDirectory)).filter((name) => name.endsWith('.mjs')).sort();
  measurements[variant] = { packageSha256: hash(source), publicEntry: hookableManifest.exports['.'], fixtures: {} };
  for (const fixture of fixtures) {
    // Copy identical committed inputs beside each installation for ordinary public-entry resolution.
    const input = path.join(output, fixture);
    const contents = await fs.readFile(path.join(fixtureDirectory, fixture), 'utf8');
    await fs.writeFile(input, contents);
    const direct = JSON.parse(JSON.stringify(await import(pathToFileURL(input).href)));
    const warnings = [];
    const bundle = await rollup.rollup({
      input,
      plugins: [nodeResolve()],
      treeshake: true,
      onwarn(warning) { warnings.push(warning); },
    });
    let readable;
    try {
      assert(bundle.watchFiles.includes(await fs.realpath(packageEntry)), 'Bundle must resolve the public package entry');
      const generated = await bundle.generate({ format: 'esm' });
      readable = generated.output.find((item) => item.type === 'chunk').code;
    } finally {
      await bundle.close();
    }
    assert.deepEqual(warnings, [], 'No invalid or ignored annotation warnings');
    if (fixture === 'live.mjs') {
      assert.equal(readable.includes(annotation), variant === 'hookable-pure-factory-fix', 'Retained emitted declaration annotation');
    }
    if (fixture === 'mixed.mjs') {
      const checkUnusedFactoryRemoval = () => assert(!readable.includes('function createHooks()'), 'Unused createHooks factory remains');
      if (variant === 'hookable-pure-factory') assert.throws(checkUnusedFactoryRemoval, /Unused createHooks factory remains/);
      else checkUnusedFactoryRemoval();
    }
    const minified = (await esbuild.transform(readable, {
      minify: true, treeShaking: false, format: 'esm', target: 'es2022', legalComments: 'none',
    })).code;
    await fs.writeFile(path.join(output, fixture.replace('.mjs', '.readable.mjs')), readable);
    const resultPath = path.join(output, fixture.replace('.mjs', '.bundle.mjs'));
    await fs.writeFile(resultPath, minified);
    const bundled = JSON.parse(JSON.stringify(await import(pathToFileURL(resultPath).href)));
    measurements[variant].fixtures[fixture] = {
      inputSha256: hash(contents), direct, bundled,
      raw: Buffer.byteLength(minified), gzip: gzipSync(minified, { level: 9 }).length,
    };
  }
  assert.equal(hash(await fs.readFile(packageEntry)), hash(source), 'Installed package must remain unchanged during verification');
}

for (const [fixture, before] of Object.entries(measurements['hookable-pure-factory'].fixtures)) {
  const after = measurements['hookable-pure-factory-fix'].fixtures[fixture];
  assert.equal(before.inputSha256, after.inputSha256, 'Pair inputs differ');
  assert.deepEqual(before.direct, after.direct, 'A comment must not alter unbundled runtime');
  assert.deepEqual(before.direct, before.bundled, `Baseline must preserve ${fixture}`);
  if (fixture === 'prototype.mjs') {
    assert.deepEqual(before.direct, { reads: 3 });
    assert.deepEqual(after.bundled, { reads: 0 }, 'Must reproduce erased constructor getters');
  } else if (fixture === 'own-bind.mjs') {
    assert.deepEqual(before.direct, { binds: 1 });
    assert.deepEqual(after.bundled, { binds: 0 }, 'Must reproduce erased method-owned bind call');
  } else {
    assert.deepEqual(after.bundled, before.bundled, `Control changed: ${fixture}`);
  }
}
for (const pair of Object.values(measurements)) {
  assert.deepEqual(pair.fixtures['retained-prototype.mjs'].bundled, { reads: 3, result: 7 });
  assert.deepEqual(pair.fixtures['live.mjs'].bundled, { result: 7 });
  assert.deepEqual(pair.fixtures['arguments.mjs'].bundled, { argumentEffects: ['argument'], result: 7 });
  assert.deepEqual(pair.fixtures['effectful-controls.mjs'].bundled, { flatOutputWritten: true, registrations: 2, unregistrations: 2 });
  assert.deepEqual(pair.fixtures['subclass.mjs'].bundled, { constructions: 2, registrations: 1, result: 7 });
}
const beforeMixed = measurements['hookable-pure-factory'].fixtures['mixed.mjs'];
const afterMixed = measurements['hookable-pure-factory-fix'].fixtures['mixed.mjs'];
assert(afterMixed.raw < beforeMixed.raw, 'Stock diagnostic should shrink');
assert.equal(measurements['hookable-pure-factory'].fixtures['live.mjs'].raw, measurements['hookable-pure-factory-fix'].fixtures['live.mjs'].raw);
const report = {
  verdict: 'bounded-candidate-with-explicit-prototype-mutation-limitation',
  node: process.version,
  hookable: '6.1.2',
  rollup: '4.64.12',
  esbuild: '0.28.2',
  upstreamHead: '6815e4fed0411f3e2f91a31bdb107d8aeac0a266',
  config: { treeshake: true, format: 'esm', minifierTreeShaking: false, target: 'es2022', gzipLevel: 9 },
  measurements,
};
await fs.writeFile(path.join(root, 'results.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log('PASS: baseline preserves getter reads 3 and bind calls 1.');
console.log('PASS: unused-factory removal fails as expected before, passes after. Documented subclass controls preserve construction and method effects.');
console.log('KNOWN CONTRACT LIMITATION: annotation erases getter reads 3 -> 0 and bind calls 1 -> 0.');
console.log('PASS: retained prototype, live dispatch, argument effects, debugger registration, flatHooks output controls.');
console.log(`Stock mixed diagnostic: raw ${beforeMixed.raw} -> ${afterMixed.raw}; gzip ${beforeMixed.gzip} -> ${afterMixed.gzip}.`);
console.log('Optimization passes for stock factory; prototype instrumentation is outside the measured purity assumption.');
