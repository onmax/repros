// Written by an AI agent for onmax. Not reviewed by a human.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { basename, dirname, resolve } from 'node:path'
const root = fileURLToPath(new URL('../', import.meta.url))
if (process.env.CONTENT_PERF_LOCKED !== '1') {
  console.log('Waiting for exclusive benchmark lock: /tmp/nuxt-perf-benchmark.lock')
  const result = spawnSync('flock', ['-x', '/tmp/nuxt-perf-benchmark.lock', process.execPath, fileURLToPath(import.meta.url)], {
    cwd: root, env: { ...process.env, CONTENT_PERF_LOCKED: '1' }, stdio: 'inherit',
  })
  if (result.error) throw result.error
  process.exit(result.status ?? 1)
}
const variant = JSON.parse(await readFile(resolve(root, 'variant.json'), 'utf8'))
const before = resolve(dirname(root), basename(root).replace(/-fix$/, ''))
const after = `${before}-fix`
const artifactRoot = resolve(root, 'artifacts', process.env.BENCHMARK_LABEL || 'comparison-bounded')
await mkdir(artifactRoot, { recursive: true })
const scenarios = variant.kind === 'cache-index'
  ? [{ mode: 'warm', docs: 300 }, { mode: 'warm', docs: 1000 }]
  : [{ mode: 'cold', docs: 30 }, { mode: 'cold', docs: 300 }, { mode: 'invalidated', docs: 300 }]
const median = values => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)]
const comparisons = []
for (const scenario of scenarios.filter(item => !process.env.BENCHMARK_SCENARIO || item.mode === process.env.BENCHMARK_SCENARIO)) {
  const samples = { before: [], after: [] }
  for (let round = 0; round <= 5; round++) {
    // Round zero is an unreported warmup for each sibling. Alternate pair order.
    const order = round % 2 === 0 ? [['before', before], ['after', after]] : [['after', after], ['before', before]]
    const pair = {}
    for (const [name, cwd] of order) {
      const label = `${process.env.BENCHMARK_LABEL || "comparison-bounded"}-${scenario.mode}-${scenario.docs}-round-${round}`
      const result = spawnSync(process.execPath, ['scripts/verify.mjs'], {
        cwd, env: { ...process.env, CONTENT_PERF_LOCKED: '1', DOCS: String(scenario.docs), MODE: scenario.mode, RUNS: '1', RUN_LABEL: label,
          KEEP_CACHE: round === 0 ? '0' : '1', INVALIDATION_DEPTH: round % 2 === 0 ? '4' : '2', SKIP_ROLLBACK: '1' },
        encoding: 'utf8', timeout: 300000, maxBuffer: 8 * 1024 * 1024,
      })
      await writeFile(resolve(artifactRoot, `${scenario.mode}-${scenario.docs}-${name}-${round}.log`), result.stdout + result.stderr)
      assert.equal(result.status, 0, result.stdout + result.stderr + String(result.error || ''))
      const raw = JSON.parse(await readFile(resolve(cwd, 'artifacts', label, 'run-1.json'), 'utf8'))
      pair[name] = raw
      if (round > 0) samples[name].push(raw)
      console.log(JSON.stringify({ ...scenario, round, name, loadNuxtMs: raw.loadNuxtMs, processWallMs: raw.processWallMs, indexMs: raw.index.elapsedMs, cacheNativeMs: raw.cacheWrites.nativeDatabaseMsIncludingCommit }))
    }
    // Collection source roots differ. Each worker verifies its exact checksums;
    // compare parsed cache values, version row and complete content rows across roots.
    assert.deepEqual(pair.before.output, pair.after.output)
  }
  const medians = Object.fromEntries(['before', 'after'].map(name => [name, {
    loadNuxtMs: median(samples[name].map(row => row.loadNuxtMs)),
    processWallMs: median(samples[name].map(row => row.processWallMs)),
    indexMs: median(samples[name].map(row => row.index.elapsedMs)),
    nativeCacheDatabaseMsIncludingCommit: median(samples[name].map(row => row.cacheWrites.nativeDatabaseMsIncludingCommit)),
  }]))
  for (const name of ['before', 'after']) {
    medians[name].peakRssKiB = median(samples[name].map(row => row.memory.peakRssKiB))
    medians[name].cacheBatches = median(samples[name].map(row => row.cacheWrites.batches))
  }
  comparisons.push({ ...scenario, medians, samples })
  await writeFile(resolve(artifactRoot, 'summary.json'), JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', comparisons }, null, 2) + '\n')
  console.log(JSON.stringify({ ...scenario, medians }))
}
console.log(`All before/after outputs matched; raw comparison: ${artifactRoot}`)
