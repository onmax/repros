import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

await mkdir('dist', { recursive: true });
const options = { ...(process.env.DEFU_ENTRY ? { alias: { defu: process.env.DEFU_ENTRY } } : {}), bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022', treeShaking: true, legalComments: 'none', logLevel: 'silent' };
const [readable, minified] = await Promise.all([false, true].map(minify => build({ ...options, entryPoints: ['input.mjs'], minify })));
const code = minified.outputFiles[0].text;
const readableCode = readable.outputFiles[0].text;
await writeFile('dist/bundle.mjs', code);
await writeFile('dist/readable.mjs', readableCode);
const { config } = await import('./dist/bundle.mjs');
assert.deepEqual(config, { port: 8080, host: 'localhost' });
const control = await build({ ...options, entryPoints: ['controls.mjs'], minify: true });
const controlsCode = control.outputFiles[0].text;
await writeFile('dist/controls.mjs', controlsCode);
const { run } = await import('./dist/controls.mjs');
assert.deepEqual(run(), { config: { port: 8080, host: 'localhost' }, fn: { value: 4 }, array: { values: [1, 2, 3] }, callbacks: 2 });
const packageJson = JSON.parse(await readFile('node_modules/defu/package.json', 'utf8'));
assert.equal(packageJson.version, '6.1.7');
const retained = ['defuFn', 'defuArrayFn'].filter(name => new RegExp('(?:var|const|let) ' + name + ' =').test(readableCode));
const result = { package: 'defu@6.1.7', bundler: 'esbuild@0.28.2', node: process.version, raw: Buffer.byteLength(code), gzip: gzipSync(code, { level: 9 }).length, controlsRaw: Buffer.byteLength(controlsCode), controlsHash: createHash('sha256').update(controlsCode).digest('hex'), retained };
await writeFile('dist/result.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
assert.deepEqual(retained, [], 'UNUSED_MERGERS_RETAINED: importing only defu should remove defuFn and defuArrayFn initialization');

