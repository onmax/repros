// Written by an AI agent for onmax. Not reviewed by a human.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
const root = fileURLToPath(new URL('../', import.meta.url))
process.chdir(root)
// Re-execute under flock so separate fixtures never benchmark concurrently.
if (process.env.CONTENT_PERF_LOCKED !== '1') {
  console.log('Waiting for exclusive benchmark lock: /tmp/nuxt-perf-benchmark.lock')
  const locked = spawnSync('flock', ['-x', '/tmp/nuxt-perf-benchmark.lock', process.execPath, fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    cwd: root, env: { ...process.env, CONTENT_PERF_LOCKED: '1' }, stdio: 'inherit',
  })
  if (locked.error) throw locked.error
  process.exit(locked.status ?? 1)
}
const variant = JSON.parse(await readFile('variant.json', 'utf8'))
const original = process.env.EXPECT_CACHE_LOSS === '1'
if (original) { process.env.ORDERING_CONTROL = '0'; process.env.APPLY_FIX = '0' }
const docs = Number(process.env.DOCS || (variant.kind === 'cache-index' ? 300 : 30))
const mode = original ? 'cold' : process.env.MODE || (variant.kind === 'cache-index' ? 'warm' : 'cold')
const runs = Number(process.env.RUNS || (original ? 2 : 1))
assert.ok(['warm', 'cold', 'invalidated'].includes(mode))
assert.ok(Number.isInteger(docs) && docs > 0 && docs <= 1000)
const artifacts = resolve(root, 'artifacts', process.env.RUN_LABEL || `${mode}-${docs}`)
await mkdir(artifacts, { recursive: true })
await rm(resolve(root, 'content'), { recursive: true, force: true })
await mkdir(resolve(root, 'content'))
for (let i = 0; i < docs; i++) {
  await writeFile(resolve(root, 'content', `report-${String(i).padStart(4, '0')}.md`), `---\ntitle: Report ${i}\ndescription: Quarterly report ${i} with repeatable sample content.\n---\n\n<!-- Written by an AI agent for onmax. Not reviewed by a human. -->\n\n# Report ${i}\n\nThis report describes a regular documentation page, with a paragraph and a short list.\n\n## Results\n\n- The first measured item is available.\n- The second measured item has supporting detail.\n\nRead the [related report](/report-${String((i + 1) % docs).padStart(4, '0')}) for context.\n` + '\nA documentation paragraph with ordinary words and a [link](/reference).\n'.repeat(Number(process.env.EXTRA_PARAGRAPHS || 0)))
}
if (process.env.KEEP_CACHE !== '1') {
  await rm(resolve(root, '.data'), { recursive: true, force: true })
  await rm(resolve(root, '.nuxt'), { recursive: true, force: true })
}
const prep = spawnSync(process.execPath, ['scripts/prepare.mjs'], { encoding: 'utf8' })
await writeFile(resolve(artifacts, 'prepare.log'), prep.stdout + prep.stderr)
assert.equal(prep.status, 0, prep.stdout + prep.stderr)
const run = async (label, extra = {}) => {
  const resultPath = resolve(artifacts, `${label}.json`)
  const start = performance.now()
  const child = spawnSync(process.execPath, ['scripts/worker.mjs'], {
    cwd: root, env: { ...process.env, DOCS: String(docs), RESULT_PATH: resultPath, NUXT_TELEMETRY_DISABLED: '1', ...extra },
    encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024,
  })
  const processWallMs = performance.now() - start
  await writeFile(resolve(artifacts, `${label}.log`), child.stdout + child.stderr)
  assert.equal(child.status, 0, child.stdout + child.stderr + String(child.error || ''))
  const result = JSON.parse(await readFile(resultPath, 'utf8'))
  result.processWallMs = processWallMs
  await writeFile(resultPath, JSON.stringify(result, null, 2) + '\n')
  return result
}
// Seed the real SQLite cache using the same real module, outside measured runs.
let seed
if (mode !== 'cold' && process.env.KEEP_CACHE !== '1') seed = await run('seed', { CONTENT_TOC_DEPTH: '2' })
const results = []
for (let i = 0; i < runs; i++) {
  if (mode === 'cold' && (!original || i === 0)) await rm(resolve(root, '.data'), { recursive: true, force: true })
  // Changing the real Markdown configuration invalidates parser checksums.
  const result = await run(`run-${i + 1}`, { CONTENT_TOC_DEPTH: mode === 'invalidated' ? String(process.env.INVALIDATION_DEPTH || (i % 2 === 0 ? 4 : 2)) : '2' })
  if (mode === 'warm') {
    assert.equal(result.cachedFilesCount, docs)
    assert.equal(result.parsedFilesCount, 0)
    assert.equal(result.index.rows, docs + 1)
    assert.equal(result.cacheWrites.statements, 0)
    assert.equal(result.index.copiedProperties, variant.fixed && variant.kind === 'cache-index' ? 0 : (docs + 1) * docs / 2)
  } else {
    assert.equal(result.parsedFilesCount, docs)
    assert.equal(result.cacheWrites.statements, docs * 2)
    assert.equal(result.cacheWrites.outsideTransaction, !original && variant.fixed && variant.kind === 'cache-writes' ? 0 : docs * 2)
    assert.equal(result.cacheWrites.insideTransaction, !original && variant.fixed && variant.kind === 'cache-writes' ? docs * 2 : 0)
  }
  if (seed && mode === 'warm') assert.deepEqual(result.output, seed.output)
  if (results.length) assert.deepEqual(result.output, results[0].output)
  results.push(result)
  console.log(JSON.stringify({ variant, docs, mode, run: i + 1, loadNuxtMs: result.loadNuxtMs, processWallMs: result.processWallMs, index: result.index, cacheWrites: result.cacheWrites, output: result.output }))
}
if (!original && variant.kind === 'cache-writes' && variant.fixed && process.env.SKIP_ROLLBACK !== '1') {
  await rm(resolve(root, '.data'), { recursive: true, force: true })
  await run('rollback', { INJECT_CACHE_FAILURE: '1', CONTENT_TOC_DEPTH: '2' })
}
await writeFile(resolve(artifacts, 'summary.json'), JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', variant, docs, mode, results }, null, 2) + '\n')
console.log(`Verified ${runs} run(s); raw evidence: ${artifacts}`)
