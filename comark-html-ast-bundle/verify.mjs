import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build, version as esbuildVersion } from 'esbuild';
import { corpus } from './corpus.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const outputDir = path.join(root, '.output');
const desired = process.argv.includes('--desired');
assert.equal(process.version, 'v24.21.0', 'Use the pinned Node runtime');
assert.equal(esbuildVersion, '0.28.2', 'Use the pinned bundler');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const options = {
  absWorkingDir: root,
  entryPoints: ['entry.js'],
  bundle: true,
  write: false,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  metafile: true,
  logLevel: 'silent',
};

function retainedInputs(metafile) {
  const totals = new Map();
  for (const output of Object.values(metafile.outputs)) {
    for (const [input, { bytesInOutput }] of Object.entries(output.inputs)) {
      if (bytesInOutput > 0) totals.set(input, (totals.get(input) || 0) + bytesInOutput);
    }
  }
  return [...totals].map(([input, bytes]) => ({ input, bytes })).sort((a, b) => a.input.localeCompare(b.input));
}

function classify(retained) {
  return {
    yaml: retained.filter(({ input }) => /\/js-yaml\/|\/comark\/dist\/internal\/yaml\.js$/.test(input)),
    markdownHandlers: retained.filter(({ input }) =>
      /\/comark\/dist\/internal\/stringify\/handlers\/(?!index\.js$|html\.js$|comment\.js$)[^/]+\.js$/.test(input)),
  };
}

async function measure(label, plugins = []) {
  const start = performance.now();
  const result = await build({ ...options, plugins });
  const buildMs = Number((performance.now() - start).toFixed(3));
  assert.equal(result.outputFiles.length, 1, `${label}: one self-contained ESM output`);
  for (const output of Object.values(result.metafile.outputs)) {
    assert.deepEqual(output.exports, ['renderHtmlFromDocument'], `${label}: only the actual public export`);
    assert.deepEqual(output.imports, [], `${label}: no external dependencies hidden from measurement`);
  }
  const code = result.outputFiles[0].contents;
  const module = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const html = [];
  for (const test of corpus) {
    const actual = await module.renderHtmlFromDocument(structuredClone(test.document), test.options);
    assert.equal(actual, test.expected, `${label}: ${test.name}`);
    html.push({ name: test.name, actual });
  }
  const retained = retainedInputs(result.metafile);
  const report = {
    rawBytes: code.length,
    gzipBytes: gzipSync(code).length,
    sha256: sha256(code),
    buildMs,
    retained,
    ...classify(retained),
    html,
  };
  await writeFile(path.join(outputDir, `${label}.metafile.json`), JSON.stringify(result.metafile, null, 2) + '\n');
  console.log(`${label}: raw=${report.rawBytes} gzip=${report.gzipBytes} bytes; build=${buildMs} ms; corpus=${html.length}/${corpus.length}`);
  console.log(`${label}: retained YAML inputs=${report.yaml.length}; Markdown handlers=${report.markdownHandlers.length}`);
  return { report, module };
}

await mkdir(outputDir, { recursive: true });
const baseline = await measure('baseline');

if (desired) {
  const unwanted = [...baseline.report.yaml, ...baseline.report.markdownHandlers];
  if (unwanted.length) {
    console.error(`FAIL: expected 0 unrelated YAML/Markdown inputs; actual ${unwanted.length}`);
    for (const { input, bytes } of unwanted) console.error(`  ${bytes} bytes: ${input}`);
    process.exitCode = 1;
  } else {
    console.log('PASS: desired HTML-only dependency boundary');
  }
} else {
  const htmlEntry = fileURLToPath(import.meta.resolve('@comark/html'));
  const coreEntry = createRequire(htmlEntry).resolve('comark');
  const registry = path.join(path.dirname(coreEntry), 'internal/stringify/handlers/index.js');
  const originalRegistry = await readFile(registry);
  const readPackage = async (entry) => JSON.parse(await readFile(path.join(path.dirname(entry), '../package.json'), 'utf8'));
  assert(baseline.report.yaml.some(({ input }) => input.includes('/js-yaml/')), 'Bug absent: no retained js-yaml code');
  assert(baseline.report.yaml.some(({ input }) => input.endsWith('/internal/yaml.js')), 'Bug absent: no retained YAML wrapper');
  assert(baseline.report.markdownHandlers.some(({ input }) => input.endsWith('/mdc.js')), 'Bug absent: no retained MDC serializer');
  assert(baseline.report.markdownHandlers.some(({ input }) => input.endsWith('/heading.js')), 'Bug absent: no retained Markdown heading serializer');

  let replacementCount = 0;
  const control = await measure('diagnostic-html-registry', [{
    name: 'diagnostic-only-html-registry',
    setup(builder) {
      builder.onLoad({ filter: /\/internal\/stringify\/handlers\/index\.js$/ }, ({ path: input }) => {
        assert.equal(input, registry, 'Change only the pinned Comark handler registry');
        replacementCount++;
        return {
          contents: 'import {html} from "./html.js"; import {comment} from "./comment.js"; export const handlers={html,comment};',
          loader: 'js',
        };
      });
    },
  }]);
  assert.equal(replacementCount, 1, 'The diagnostic must replace exactly one module');
  assert.deepEqual(control.report.yaml, [], 'The diagnostic must remove retained YAML code');
  assert.deepEqual(control.report.markdownHandlers, [], 'The diagnostic must remove retained Markdown handlers');
  assert.deepEqual(control.report.html, baseline.report.html, 'Explicit corpus outputs must agree');
  assert.deepEqual(await readFile(registry), originalRegistry, 'The package on disk must remain unchanged');

  const formatDocument = { nodes: [['h1', {}, 'Title']] };
  const formatOptions = { format: 'markdown/comark' };
  const customDocument = { nodes: [['demo', {}, 'value']] };
  const customOptions = {
    components: {
      demo: ([_tag, attrs, ...children], state) => state.handlers.strong(['strong', attrs, ...children], state),
    },
  };
  const baselineFormat = await baseline.module.renderHtmlFromDocument(formatDocument, formatOptions);
  assert.equal(baselineFormat, '# Title');
  await assert.rejects(control.module.renderHtmlFromDocument(formatDocument, formatOptions), {
    name: 'TypeError',
    message: /\.mdc is not a function/,
  });
  const baselineCustom = await baseline.module.renderHtmlFromDocument(customDocument, customOptions);
  assert.equal(baselineCustom, '**value**');
  await assert.rejects(control.module.renderHtmlFromDocument(customDocument, customOptions), {
    name: 'TypeError',
    message: /\.strong is not a function/,
  });

  const report = {
    environment: { node: process.version, platform: process.platform, arch: process.arch, esbuild: esbuildVersion },
    packages: { html: (await readPackage(htmlEntry)).version, comark: (await readPackage(coreEntry)).version },
    registrySha256: sha256(originalRegistry),
    baseline: baseline.report,
    diagnostic: control.report,
    delta: {
      rawBytes: baseline.report.rawBytes - control.report.rawBytes,
      gzipBytes: baseline.report.gzipBytes - control.report.gzipBytes,
    },
    compatibilityCounterexamples: {
      formatOverride: { baseline: baselineFormat, diagnostic: 'TypeError' },
      customMarkdownHandler: { baseline: baselineCustom, diagnostic: 'TypeError' },
    },
  };
  await writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`diagnostic delta: raw=${report.delta.rawBytes} gzip=${report.delta.gzipBytes} bytes`);
  console.log('contract caveats: format override and custom Markdown handler both throw in diagnostic');
  console.log('PASS: bug reproduced; diagnostic isolated one registry; HTML corpus matched; package unchanged');
}
