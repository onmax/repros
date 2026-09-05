// Written by an AI agent for onmax. Not reviewed by a human.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { basename, dirname, resolve } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
if (process.env.CONTENT_PERF_LOCKED !== '1') {
  const result = spawnSync('flock', ['-x', '/tmp/nuxt-perf-benchmark.lock', process.execPath, fileURLToPath(import.meta.url)], {
    env: { ...process.env, CONTENT_PERF_LOCKED: '1' }, stdio: 'inherit',
  })
  if (result.error) throw result.error
  process.exit(result.status ?? 1)
}
const fixed = resolve(dirname(root), basename(root).replace(/-fix$/, '') + '-fix')
const artifacts = resolve(root, 'artifacts', 'memory-bounded')
await mkdir(artifacts, { recursive: true })
const samples = []
for (let round = 1; round <= 3; round++) {
  const pair = {}
  for (const scope of round % 2 ? ['chunk', 'all'] : ['all', 'chunk']) {
    const label = `memory-${scope}-${round}`
    const result = spawnSync(process.execPath, ['scripts/verify.mjs'], {
      cwd: fixed,
      env: { ...process.env, DOCS: '300', MODE: 'cold', RUNS: '1', KEEP_CACHE: '0', SKIP_ROLLBACK: '1',
        MEASURE_QUEUE: '1', EXTRA_PARAGRAPHS: '100', BATCH_SCOPE: scope, RUN_LABEL: label },
      encoding: 'utf8', timeout: 300000, maxBuffer: 8 * 1024 * 1024,
    })
    await writeFile(resolve(artifacts, `${label}.log`), result.stdout + result.stderr)
    assert.equal(result.status, 0, result.stdout + result.stderr + String(result.error || ''))
    const raw = JSON.parse(await readFile(resolve(fixed, 'artifacts', label, 'run-1.json'), 'utf8'))
    assert.equal(raw.queue.peakRecords, scope === 'chunk' ? 25 : 300)
    assert.equal(raw.cacheWrites.batches, scope === 'chunk' ? 12 : 1)
    pair[scope] = raw
    samples.push({ round, scope, queue: raw.queue, memory: raw.memory, loadNuxtMs: raw.loadNuxtMs, output: raw.output })
    console.log(JSON.stringify(samples.at(-1)))
  }
  assert.deepEqual(pair.chunk.output, pair.all.output)
  assert.equal(pair.chunk.queue.totalUtf8Bytes, pair.all.queue.totalUtf8Bytes)
  assert.ok(pair.chunk.queue.peakUtf8Bytes < pair.all.queue.peakUtf8Bytes / 10)
  await writeFile(resolve(artifacts, 'summary.json'), JSON.stringify({
    disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.',
    claim: 'Bounded candidate versus experimental one-flush control; this is not the unpatched package comparison.',
    docs: 300, extraParagraphsPerDocument: 100, samples,
  }, null, 2) + '\n')
}
console.log(`Queue payload and output equivalence verified; measurements: ${artifacts}`)
