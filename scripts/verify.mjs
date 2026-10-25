import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'

process.env.GOMAXPROCS = '2'
const root = fileURLToPath(new URL('../', import.meta.url))
const fixture = path.resolve(process.argv[2] || '.')
const metadata = JSON.parse(await readFile(path.join(fixture, 'package.json'), 'utf8'))
assert.equal(process.versions.node, '24.21.0', 'Use the pinned Node version in .node-version')
assert.ok(['vue-pure-initializers', 'vue-pure-initializers-fix'].includes(metadata.name))
const fixed = metadata.name.endsWith('-fix')
const require = createRequire(path.join(fixture, 'package.json'))
const esbuild = require('esbuild')
assert.equal(esbuild.version, '0.28.2')
const outputDir = path.join(fixture, 'dist')
await mkdir(outputDir, { recursive: true })
const sha256 = value => createHash('sha256').update(value).digest('hex')
const defines = {
  'process.env.NODE_ENV': '"production"',
  __VUE_OPTIONS_API__: 'true',
  __VUE_PROD_DEVTOOLS__: 'false',
  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
}
const targets = {
  reactivity: { pattern: /\bbuiltInSymbols\s*=/g, count: 1 },
  shared: { pattern: /\b(?:camelize|hyphenate|capitalize|toHandlerKey)\s*=/g, count: 4 },
  'runtime-core': { pattern: /\bemptyAppContext\s*=/g, count: 1 },
}
const expectedUsed = {
  strings: Array.from({ length: 2 }, () => ['helloWorld', 'hello-world', 'World', 'onClick']),
  count: 2,
  effectRuns: 2,
  observed: 2,
  values: [1, 2, 3],
  symbolRuns: [1, 1, 2, 2],
  contexts: [true, true],
  rendered: ['fallback', 'provided'],
  outsideContext: false,
}
const result = { state: fixed ? 'patched' : 'baseline', packages: {}, bundles: {} }
for (const name of Object.keys(targets)) {
  const packageJson = require.resolve(`@vue/${name}/package.json`)
  const pkg = JSON.parse(await readFile(packageJson, 'utf8'))
  assert.equal(pkg.version, '3.5.44')
  const source = await readFile(path.join(path.dirname(packageJson), pkg.module), 'utf8')
  result.packages[name] = { version: pkg.version, sha256: sha256(source) }
}

async function build(name, { minify = false, ignoreAnnotations = false } = {}) {
  const contents = await readFile(path.join(root, 'inputs', `${name}.mjs`), 'utf8')
  const output = await esbuild.build({
    stdin: { contents, sourcefile: `${name}.mjs`, resolveDir: fixture },
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022',
    treeShaking: true, legalComments: 'none', define: defines,
    minify, ignoreAnnotations, metafile: true,
  })
  const inputs = Object.keys(output.metafile.inputs).filter(p => p.includes('/@vue/'))
  assert.ok(inputs.length > 0)
  assert.ok(inputs.every(p => p.endsWith('.esm-bundler.js')), 'Use the browser ESM distribution')
  assert.deepEqual(output.metafile.outputs[Object.keys(output.metafile.outputs)[0]].imports, [])
  return output.outputFiles[0].text
}

try {
  for (const [name, target] of Object.entries(targets)) {
    const readable = await build(name)
    const retained = [...readable.matchAll(target.pattern)].length
    assert.equal(retained, fixed ? 0 : target.count, `${name}: unexpected retained initializer count`)
    if (name === 'runtime-core') {
      assert.ok(readable.includes('__VUE_INSTANCE_SETTERS__'), 'Keep global Vue instance setter registration')
      assert.ok(readable.includes('__VUE_SSR_SETTERS__'), 'Keep global Vue SSR setter registration')
    }
    const code = await build(name, { minify: true })
    const ignored = await build(name, { minify: true, ignoreAnnotations: true })
    await writeFile(path.join(outputDir, `${name}.readable.mjs`), readable)
    const outputFile = path.join(outputDir, `${name}.mjs`)
    await writeFile(outputFile, code)
    const module = await import(pathToFileURL(outputFile))
    if (name === 'reactivity') {
      assert.equal(module.describe(null), 'plain')
      assert.equal(module.describe({}), 'plain')
      assert.equal(module.describe({ __v_isRef: true }), 'ref')
    } else if (name === 'shared') {
      assert.equal(module.renderLabel(42), 'Total: 42')
      assert.equal(module.renderLabel({ a: 1 }), 'Total: {\n  "a": 1\n}')
    } else {
      assert.equal(module.canInject(), false)
    }
    result.bundles[name] = {
      retained, raw: Buffer.byteLength(code), gzip: gzipSync(code, { level: 9 }).length,
      ignoreAnnotationsSha256: sha256(ignored),
    }
    console.log(`${result.state} ${name}: retained=${retained}, raw=${Buffer.byteLength(code)}, gzip=${gzipSync(code, { level: 9 }).length}`)
  }
  const used = await build('used-exports')
  for (const [name, target] of Object.entries(targets)) {
    assert.equal([...used.matchAll(target.pattern)].length, target.count, `${name}: used initializer must remain`)
  }
  const usedFile = path.join(outputDir, 'used-exports.mjs')
  await writeFile(usedFile, await build('used-exports', { minify: true }))
  const { exerciseUsedExports } = await import(pathToFileURL(usedFile))
  assert.deepEqual(exerciseUsedExports(), expectedUsed)
  assert.deepEqual(exerciseUsedExports(), expectedUsed)
  result.usedExports = 'passed'
  await writeFile(path.join(outputDir, 'result.json'), JSON.stringify(result, null, 2) + '\n')
  console.log(`${result.state}: ${fixed ? 'expected tree shaking passes' : 'exact tree-shaking failure reproduced'}; used-export controls pass`)
} finally {
  esbuild.stop()
}
