import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { generateNavigationTree } from './node_modules/@nuxt/content/dist/runtime/internal/navigation.js'

const { fixed } = JSON.parse(await readFile(new URL('./expectation.json', import.meta.url)))
const expectFixed = fixed || process.argv.includes('--expect-fixed')
function query(rows) {
  return {
    __params: { orderBy: ['caller-order'] },
    order() { return this },
    orWhere() { return this },
    select() { return this },
    all() { return structuredClone(rows) },
  }
}
function page(path, stem = path.slice(1)) { return { path, stem, title: path, navigation: null, meta: {} } }
async function run(rows, measure = false) {
  let comparisons = 0
  const find = Array.prototype.find
  if (measure) {
    Array.prototype.find = function (predicate, thisArg) {
      return find.call(this, (value, index, array) => { comparisons++; return predicate.call(thisArg, value, index, array) })
    }
  }
  try { return { tree: await generateNavigationTree(query(rows)), comparisons } }
  finally { Array.prototype.find = find }
}
for (const count of [100, 1000, 5000]) {
  const rows = Array.from({ length: count }, (_, i) => page(`/guide/page-${i}`))
  const { tree, comparisons } = await run(rows, true)
  assert.deepEqual(tree[0].children.map(item => item.path), rows.map(item => item.path))
  assert.equal(tree.length, 1)
  assert.equal(tree[0].path, '/guide')
  console.log(JSON.stringify({ runtime: process.version, nestedPages: count, comparisons }))
  assert.equal(comparisons, expectFixed ? count - 1 : count * (count - 1) / 2 + count - 1)
}

// Explicit expectations cover both insertion orders and repeated paths.
for (const childFirst of [false, true]) {
  const parent = page('/guide/topic', 'guide/topic/index')
  const child = page('/guide/topic/leaf')
  const { tree } = await run(childFirst ? [child, parent] : [parent, child])
  assert.deepEqual(tree[0].children[0].children.map(item => item.path), ['/guide/topic', '/guide/topic/leaf'])
  assert.equal(tree[0].children[0].page, undefined)
}
const duplicates = [page('/guide/a'), page('/guide/a'), page('/guide/b')]
assert.deepEqual((await run(duplicates)).tree[0].children.map(item => item.path), duplicates.map(item => item.path))
const hidden = [{ ...page('/guide/.navigation', 'guide/.navigation'), navigation: false }, page('/guide/a')]
assert.deepEqual((await run(hidden)).tree, [])
assert.deepEqual((await run([])).tree, [])
console.log('Nested index order, duplicate paths, hidden directory, and empty collection controls pass.')
