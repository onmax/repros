import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { pathToFileURL } from 'node:url'

process.env.GOMAXPROCS ||= '2'
const { build, version } = await import('esbuild')
assert.equal(version, '0.28.2')
assert.equal(process.version, 'v24.21.0')
const here = import.meta.dirname
const manifest = JSON.parse(await readFile(new URL('./node_modules/@vueuse/shared/package.json', import.meta.url)))
assert.equal(manifest.version, '15.0.0')
const installed = await readFile(new URL('./node_modules/@vueuse/shared/dist/index.js', import.meta.url), 'utf8')
const annotations = [...installed.matchAll(/const (?:hyphenate|camelize) = \/\* #__PURE__ \*\/ cacheStringFunction\(/g)].length
assert.ok(annotations === 0 || annotations === 2, 'Both named callsites must have the same annotation state')
for (const name of ['hyphenate', 'camelize'])
  assert.equal([...installed.matchAll(new RegExp(`const ${name} = (?:/\\* #__PURE__ \\*/ )?cacheStringFunction\\(`, 'g'))].length, 1)

const options = {
  absWorkingDir: here,
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  treeShaking: true,
  minify: true,
  legalComments: 'none',
  define: {
    'process.env.NODE_ENV': '"production"',
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
}
await mkdir(`${here}/output`, { recursive: true })
async function bundle(name, extra) {
  const result = await build({ ...options, ...extra })
  assert.equal(result.warnings.length, 0)
  const code = result.outputFiles[0].text
  await writeFile(`${here}/output/${name}.mjs`, code)
  return code
}
const code = await bundle('bundle', { entryPoints: ['input.mjs'] })
const readable = await bundle('readable', { entryPoints: ['input.mjs'], minify: false })
const ignored = await bundle('ignore-annotations', { entryPoints: ['input.mjs'], ignoreAnnotations: true })
const runtime = await import(pathToFileURL(`${here}/output/bundle.mjs`))
const first = runtime.load()
assert.equal(first, runtime.load())
assert.equal(await first, 42)
await runtime.load.reset()
const second = runtime.load()
assert.notEqual(first, second)
assert.equal(await second, 42)

await bundle('controls', {
  stdin: {
    contents: "export { createSingletonPromise, hyphenate, camelize } from '@vueuse/shared'",
    resolveDir: here,
    sourcefile: 'controls.mjs',
  },
})
const { createSingletonPromise, hyphenate, camelize } = await import(pathToFileURL(`${here}/output/controls.mjs`))
let calls = 0
const load = createSingletonPromise(async () => ++calls)
assert.equal(calls, 0)
const pending = load()
assert.equal(pending, load())
assert.equal(await pending, 1)
assert.equal(calls, 1)
await load.reset()
const afterReset = load()
assert.notEqual(pending, afterReset)
assert.equal(await afterReset, 2)
assert.equal(calls, 2)
for (let repeat = 0; repeat < 2; repeat++) {
  for (const [input, expected] of [['', ''], ['fooBar', 'foo-bar'], ['XMLHttpRequest', 'x-m-l-http-request'], ['__proto__', '__proto__']])
    assert.equal(hyphenate(input), expected)
  for (const [input, expected] of [['', ''], ['foo-bar', 'fooBar'], ['-foo', 'Foo'], ['foo-', 'foo-'], ['__proto__', '__proto__']])
    assert.equal(camelize(input), expected)
}

const retained = /cacheStringFunction|hyphenateRE|camelizeRE/.test(readable)
const result = {
  annotations,
  raw: Buffer.byteLength(code),
  gzip: gzipSync(code, { level: 9 }).length,
  unusedHelpersRetained: retained,
  runtimeControls: 'PASS',
  ignoreAnnotationsSha256: createHash('sha256').update(ignored).digest('hex'),
  packageWithoutPatchSha256: createHash('sha256').update(installed.replace(/(const (?:hyphenate|camelize) = )\/\* #__PURE__ \*\/ /g, '$1')).digest('hex'),
}
await writeFile(`${here}/output/results.json`, `${JSON.stringify(result, null, 2)}\n`)
console.log(JSON.stringify(result))
if (retained) {
  console.error('FAIL: unused hyphenate/camelize initializers remain in a live singleton bundle')
  process.exitCode = 1
}
else {
  console.log('PASS: unused hyphenate/camelize initializers are removed')
}
