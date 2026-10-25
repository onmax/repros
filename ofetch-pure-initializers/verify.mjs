import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { build, stop } from 'esbuild';

const hash = code => createHash('sha256').update(code).digest('hex');
const here = import.meta.dirname;
const sourceEntry = process.env.OFETCH_SOURCE_ENTRY;
const outputDirectory = process.env.OFETCH_OUTPUT_DIR || path.join(here, 'dist');
const config = {
  absWorkingDir: here, bundle: true, write: false, format: 'esm',
  platform: 'browser', target: 'es2022', minify: true, treeShaking: true,
  legalComments: 'none', logLevel: 'silent', metafile: true,
  ...(sourceEntry ? { alias: { ofetch: sourceEntry } } : {}),
};
const importCode = (code, label) => import('data:text/javascript;base64,' + Buffer.from(code).toString('base64') + '#' + label);
await mkdir(outputDirectory, { recursive: true });
try {
  const bundles = {};
  for (const fixture of ['input', 'controls']) {
    const result = await build({ ...config, entryPoints: [fixture + '.mjs'] });
    assert.ok(Object.keys(result.metafile.inputs).some(p => sourceEntry ? p.endsWith('index.mjs') : /ofetch.*\/dist\/index\.mjs$/.test(p)), 'Must resolve the public v2 entry');
    bundles[fixture] = result.outputFiles[0].text;
    await writeFile(path.join(outputDirectory, fixture + '.mjs'), bundles[fixture]);
  }
  const globals = Object.fromEntries(['fetch', 'Headers', 'AbortController'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const observations = {};
  try {
    for (const value of ['defined', 'undefined', 'throws']) {
      const reads = { fetch: 0, Headers: 0, AbortController: 0 };
      for (const key of Object.keys(reads)) Object.defineProperty(globalThis, key, { configurable: true, get() {
        reads[key]++;
        if (key === 'fetch' && value === 'throws') throw new Error('global fetch getter failed');
        return key === 'fetch' && value === 'defined' ? async () => { throw new Error('No external requests'); } : undefined;
      } });
      if (value === 'throws') await assert.rejects(importCode(bundles.input, value), /global fetch getter failed/);
      else assert.equal((await importCode(bundles.input, value)).errorName, 'FetchError');
      assert.deepEqual(reads, { fetch: 1, Headers: 0, AbortController: 0 });
      observations[value] = reads;
    }
  } finally {
    for (const [key, descriptor] of Object.entries(globals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
    }
  }
  // The retained default wrapper must still consult the current global fetch.
  const savedFetch = Object.getOwnPropertyDescriptor(globalThis, 'fetch');
  try {
    let calls = 0;
    Object.defineProperty(globalThis, 'fetch', { configurable: true, writable: true, value: async () => {
      calls++;
      return new Response('{"ok":true}', { headers: { 'content-type': 'application/json' } });
    } });
    const controls = await importCode(bundles.controls, 'controls');
    assert.equal(typeof controls.$fetch, 'function');
    assert.deepEqual(controls.result, { ok: true });
    assert.deepEqual(controls.events, [ ['request', 'POST', '{"item":1}'], 'argument', 'options getter', 'options getter failed', 'TypeError' ]);
    assert.deepEqual(await controls.$fetch('/report'), { ok: true });
    assert.equal(calls, 1);
    // A public call with no options must still read its global fallback.
    let fallbackReads = 0;
    Object.defineProperty(globalThis, 'fetch', { configurable: true, get() { fallbackReads++; return undefined; } });
    assert.equal(typeof controls.createFetch(), 'function');
    assert.equal(fallbackReads, 1);
    const missing = await importCode(bundles.controls, 'missing-global');
    await assert.rejects(missing.$fetch('/report', { retry: false }), /global\.fetch is not supported/);
    observations.controls = { events: controls.events, result: controls.result, defaultCalls: calls, fallbackReads: 1, missingFetchRejection: true };
  } finally {
    if (savedFetch) Object.defineProperty(globalThis, 'fetch', savedFetch); else delete globalThis.fetch;
  }
  const result = {
    raw: Buffer.byteLength(bundles.input), gzip: gzipSync(bundles.input, { level: 9 }).length,
    controlsRaw: Buffer.byteLength(bundles.controls), controlsGzip: gzipSync(bundles.controls, { level: 9 }).length,
    controlsHash: hash(bundles.controls), observations,
    unusedClientRetained: bundles.input.includes('retryStatusCodes'),
  };
  await writeFile(path.join(outputDirectory, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
  assert.equal(result.unusedClientRetained, false, 'UNUSED_CLIENT_RETAINED: FetchError-only bundle retains the default client');
} finally { stop(); }
