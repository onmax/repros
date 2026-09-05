import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createRequire, stripTypeScriptTypes } from 'node:module'
import { cpus, platform, tmpdir } from 'node:os'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { pathToFileURL } from 'node:url'

assert.equal(process.version, 'v24.19.0', 'Use Node 24.19.0 for this comparison')
assert.equal(typeof globalThis.gc, 'function', 'Run node --expose-gc bench.mjs')
const commits = {
  before: '656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11',
  after: 'd999720ceb530873f01935d75ca6a99d603d21b5',
}
const require = createRequire(new URL('./nuxt-content-nested-navigation/package.json', import.meta.url))
const contentRequire = createRequire(require.resolve('@nuxt/content'))
const scule = pathToFileURL(contentRequire.resolve('scule')).href
const directory = await mkdtemp(join(tmpdir(), 'content-navigation-bench-'))
const samples = 25
const warmups = 5

async function source(commit, file) {
  const response = await fetch(`https://raw.githubusercontent.com/nuxt/content/${commit}/src/runtime/internal/${file}.ts`)
  assert.ok(response.ok, `Download ${commit}/${file}: ${response.status}`)
  return response.text()
}
function query(rows) {
  return {
    __params: { orderBy: ['caller-order'] },
    order() { return this },
    orWhere() { return this },
    select() { return this },
    all() { return rows },
  }
}
function stats(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const at = fraction => sorted[Math.floor((sorted.length - 1) * fraction)]
  return { medianMs: at(0.5), p25Ms: at(0.25), p75Ms: at(0.75), samplesMs: values }
}
try {
  const generators = {}
  for (const [name, commit] of Object.entries(commits)) {
    const utils = stripTypeScriptTypes(await source(commit, 'utils'))
    await writeFile(join(directory, `${name}-utils.mjs`), utils)
    const navigation = stripTypeScriptTypes(await source(commit, 'navigation'))
      .replace("'scule'", JSON.stringify(scule))
      .replace("'./utils'", JSON.stringify(`./${name}-utils.mjs`))
    await writeFile(join(directory, `${name}.mjs`), navigation)
    generators[name] = (await import(pathToFileURL(join(directory, `${name}.mjs`)))).generateNavigationTree
  }
  const results = []
  for (const layout of ['root', 'nested']) {
    for (const count of [100, 1000, 5000, 10000]) {
      const rows = Array.from({ length: count }, (_, i) => {
        const path = `${layout === 'nested' ? '/guide' : ''}/page-${i}`
        return { path, stem: path.slice(1), title: path, navigation: null, meta: {} }
      })
      const invoke = name => generators[name](query(structuredClone(rows)))
      assert.deepEqual(await invoke('before'), await invoke('after'))
      for (let i = 0; i < warmups; i++) {
        await invoke('before')
        await invoke('after')
      }
      const times = { before: [], after: [] }
      for (let i = 0; i < samples; i++) {
        for (const name of i % 2 ? ['after', 'before'] : ['before', 'after']) {
          const input = query(structuredClone(rows))
          globalThis.gc()
          const start = performance.now()
          await generators[name](input)
          times[name].push(performance.now() - start)
        }
      }
      const before = stats(times.before)
      const after = stats(times.after)
      results.push({ layout, pages: count, before, after, speedup: before.medianMs / after.medianMs })
      console.error(`${layout} ${count}: ${before.medianMs.toFixed(2)} ms -> ${after.medianMs.toFixed(2)} ms`)
    }
  }
  console.log(JSON.stringify({ node: process.version, platform: platform(), cpu: cpus()[0].model, commits, samples, warmups, results }, null, 2))
}
finally {
  await rm(directory, { recursive: true, force: true })
}
