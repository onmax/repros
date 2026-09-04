import assert from 'node:assert/strict'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { performance } from 'node:perf_hooks'

const packageURL = new URL('./node_modules/@nuxt/content/', import.meta.url)
const sourceURL = new URL('dist/runtime/internal/navigation.js', packageURL)
const source = await readFile(sourceURL, 'utf8')
const pkg = JSON.parse(await readFile(new URL('package.json', packageURL), 'utf8'))
assert.equal(pkg.version, '3.16.0')
const originalLine = 'const existed2 = nav2.find((item) => item.path === navItem.path && item.page === false);'
const fixedLine = 'const existed2 = isIndex && nav2.find((item) => item.path === navItem.path && item.page === false);'
const fixture = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
const fixed = fixture.repro.expectFixed
assert.equal(typeof fixed, 'boolean')
assert.equal(source.includes(fixedLine), fixed, 'Installed patch must match explicit fixture expectation')
assert.ok(source.includes(originalLine) || fixed, 'Pinned source must contain the tested code')
const { generateNavigationTree } = await import(sourceURL)

// The oracle uses the identical installed module with only the guard removed.
const resolve = createRequire(await realpath(sourceURL)).resolve
const oracleSource = source.replace(fixedLine, originalLine)
  .replace('"scule"', JSON.stringify(pathToFileURL(resolve('scule')).href))
  .replace('"./utils.js"', JSON.stringify(new URL('utils.js', sourceURL).href))
const { generateNavigationTree: oracle } = await import(`data:text/javascript;base64,${Buffer.from(oracleSource).toString('base64')}`)

// Matches the upstream navigation unit-test boundary: SQL rows are already loaded.
function query(input, ordered = true) {
  const rows = structuredClone(input)
  const builder = {
    __params: { orderBy: ordered ? [['stem', 'ASC']] : [] },
    order() { rows.sort((a, b) => a.stem.localeCompare(b.stem)); return builder },
    orWhere() { return builder },
    select() { return builder },
    async all() { return rows }
  }
  return builder
}
const row = (path, stem = path.slice(1), extra = {}) => ({ path, stem, title: stem, ...extra })
const cases = [
  [], [row('/', 'index')], [row('/about')],
  [row('/guide/intro'), row('/guide', 'guide/index')],
  [row('/guide', 'guide/index'), row('/guide/intro')],
  [row('/guide/intro'), row('/guide')],
  [row('/guide/intro'), row('/guide', 'guide/1.index')],
  [row('/guide/intro'), row('/guide/.navigation', 'guide/.navigation', { navigation: false })],
  [row('/guide/intro'), row('/guide', 'guide/index'), row('/guide/.navigation', 'guide/.navigation', { navigation: { title: 'Manual' }, meta: { icon: 'book' } })],
  [row('/a'), row('/a', '2.a')],
  [row('/guide/intro'), row('/guide', 'guide/index'), row('/guide', 'guide/2.index')],
  [row('/guide/deep/intro'), row('/guide/deep', 'guide/deep/index'), row('/guide', 'guide/index')]
]
let seed = 1234567
for (let run = 0; run < 80; run++) {
  const input = [row('/', 'index'), row('/about'), row('/guide/a'), row('/guide/b'), row('/guide', 'guide/index'), row('/guide/sub/c'), row('/guide/sub', 'guide/sub/index')]
  for (let i = input.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    const j = seed % (i + 1)
    ;[input[i], input[j]] = [input[j], input[i]]
  }
  cases.push(input)
}
for (const input of cases) {
  for (const ordered of [true, false]) {
    assert.deepEqual(await generateNavigationTree(query(input, ordered), ['icon']), await oracle(query(input, ordered), ['icon']))
  }
}
console.log(`Semantic controls: ${cases.length * 2} passed (order, index merges, nested paths, hidden directories, metadata).`)

async function countComparisons(input) {
  const originalFind = Array.prototype.find
  let comparisons = 0
  Array.prototype.find = function (callback, thisArg) {
    return originalFind.call(this, function (...args) { comparisons++; return callback.apply(thisArg, args) })
  }
  try { return { tree: await generateNavigationTree(query(input)), get comparisons() { return comparisons } } }
  finally { Array.prototype.find = originalFind }
}
for (const size of [100, 1000, 5000]) {
  const input = Array.from({ length: size }, (_, i) => row(`/page-${String(i).padStart(5, '0')}`))
  const { tree, comparisons } = await countComparisons(input)
  assert.deepEqual(tree, input, 'Navigation output and input ordering stay unchanged')
  const expected = fixed ? 0 : size * (size - 1) / 2
  assert.equal(comparisons, expected)
  const times = []
  for (let run = 0; run < 8; run++) {
    const builder = query(input)
    const start = performance.now()
    await generateNavigationTree(builder)
    if (run > 0) times.push(performance.now() - start)
  }
  times.sort((a, b) => a - b)
  console.log(JSON.stringify({ size, siblingComparisons: comparisons, medianMs: +times[3].toFixed(3) }))
  if (process.argv.includes('--expect-fixed')) assert.equal(comparisons, 0, 'Ordinary root pages must not scan prior siblings')
}
console.log(`PASS: ${fixed ? 'patched control' : 'baseline reproduces quadratic sibling scans'}`)
