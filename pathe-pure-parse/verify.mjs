import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rolldown } from 'rolldown';
import { transform } from 'esbuild';

const root = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(await readFile(resolve(root, 'config.json'), 'utf8'));
const packageEntry = import.meta.resolve(config.package);
assert.match(packageEntry, /\/dist\/index\.mjs$/, 'Resolve the public ESM export');
const packageRoot = dirname(dirname(fileURLToPath(packageEntry)));
const manifest = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'));
assert.equal(manifest.version, config.version);
const annotation = /\/\*\s*[@#]__NO_SIDE_EFFECTS__\s*\*\/\s*(?:function parseQuery\(|function\()/;
const annotated = annotation.test(await readFile(resolve(packageRoot, config.annotationFiles[0]), 'utf8'));
for (const file of config.annotationFiles) {
  assert.equal(annotation.test(await readFile(resolve(packageRoot, file), 'utf8')), annotated, file);
}
await mkdir(resolve(root, 'dist'), { recursive: true });
const results = { node: process.version, package: config.package, version: config.version, entry: 'dist/index.mjs', annotated, bundlers: {} };
for (const name of ['rollup', 'rolldown']) {
  const rows = {};
  for (const fixture of ['input', 'helper', 'live', 'arguments', 'regexp']) {
    const bundle = await (name === 'rollup' ? rollup : rolldown)({
      input: resolve(root, fixture + '.mjs'), treeshake: true,
      ...(name === 'rollup' ? { plugins: [nodeResolve({ browser: true })] } : { platform: 'browser' }),
      onwarn(warning) { throw new Error(warning.code + ': ' + warning.message); },
    });
    let code;
    try {
      const generated = await bundle.generate({ format: 'esm', ...(name === 'rolldown' ? { minify: true, comments: false } : {}) });
      code = generated.output.find(output => output.type === 'chunk').code;
    } finally { await bundle.close(); }
    if (name === 'rollup') code = (await transform(code, { minify: true, treeShaking: false, format: 'esm', target: 'es2022', legalComments: 'none' })).code;
    const output = resolve(root, 'dist', name + '.' + fixture + '.mjs');
    await writeFile(output, code);
    const calls = [];
    const originals = Object.fromEntries(['log', 'warn', 'error'].map(key => [key, console[key]]));
    let exports;
    try {
      for (const key of Object.keys(originals)) console[key] = (...args) => calls.push([key, ...args]);
      exports = await import(pathToFileURL(output).href + '?verify=' + Date.now());
    } finally { Object.assign(console, originals); }
    assert.deepEqual(calls, [], fixture + ' unexpectedly logged');
    rows[fixture] = { raw: Buffer.byteLength(code), gzip: gzipSync(code, { level: 9 }).length, sha256: createHash('sha256').update(code).digest('hex'), exports: JSON.parse(JSON.stringify(exports)) };
  }
  assert.deepEqual(rows.arguments.exports.result, ['argument', 'argument-throw']);
  assert.deepEqual(rows.input.exports, rows.helper.exports);
  assert.deepEqual(rows.live.exports.result, config.package === 'ufo' ? { page: '2', tag: ['a', 'b'] } : { root: '/', dir: '/app/src', base: 'index.ts', ext: '.ts', name: 'index' });
  assert.equal(rows.input.sha256 === rows.helper.sha256, annotated, 'Only the annotation should make the unused-call fixture match the helper-only bundle');
  results.bundlers[name] = rows;
}

const api = await import(packageEntry);
if (config.package === 'ufo') {
  for (const [input, expected] of [
    ['', {}], ['?', {}], ['?a=1&a=2&empty=&flag', { a: ['1', '2'], empty: '', flag: '' }],
    ['x=hello+world&bad=%E0%A4%A&encoded=%26%3D', { x: 'hello world', bad: '%E0%A4%A', encoded: '&=' }],
    ['__proto__=bad&constructor=bad&safe=ok', { safe: 'ok' }],
  ]) {
    const value = api.parseQuery(input);
    assert.equal(Object.getPrototypeOf(value), null);
    assert.deepEqual(JSON.parse(JSON.stringify(value)), expected);
  }
  assert.deepEqual(Object.keys(api.parseQuery()), []);
} else {
  for (const [input, expected] of [
    ['', { root: '', dir: '.', base: '', ext: '', name: '' }],
    ['/', { root: '/', dir: '/', base: '', ext: '', name: '' }],
    ['.', { root: '', dir: '.', base: '.', ext: '', name: '.' }],
    ['..', { root: '', dir: '.', base: '..', ext: '', name: '..' }],
    ['/a/.gitignore', { root: '/', dir: '/a', base: '.gitignore', ext: '', name: '.gitignore' }],
    ['/a/file.', { root: '/', dir: '/a', base: 'file.', ext: '.', name: 'file' }],
    ['C:\\Users\\file.txt', { root: 'C:/', dir: 'C:/Users', base: 'file.txt', ext: '.txt', name: 'file' }],
    ['a?x#y', { root: '', dir: '.', base: 'a?x#y', ext: '', name: 'a?x#y' }],
  ]) assert.deepEqual(api.parse(input), expected);
}
results.runtimeControls = 'used outputs, empty/edge strings, argument mutation and throw, no logging: passed';
await writeFile(resolve(root, 'dist/result.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify({ package: config.package, annotated, bundlers: results.bundlers }, null, 2));
assert.ok(annotated, 'UNUSED_PARSE_RETAINED: expected removal of the unused call');
