// AI-authored; not reviewed by a human.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
const root = fileURLToPath(new URL('../', import.meta.url))
process.chdir(root)
const disclosure = 'AI-authored; not reviewed by a human.'
if (process.env.CONTENT_PERF_LOCKED !== '1') {
  console.log('Waiting for exclusive application-run lock: /tmp/nuxt-perf-benchmark.lock')
  const locked = spawnSync('flock', ['-x', '/tmp/nuxt-perf-benchmark.lock', process.execPath, fileURLToPath(import.meta.url)], {
    cwd: root, env: { ...process.env, CONTENT_PERF_LOCKED: '1' }, stdio: 'inherit',
  })
  if (locked.error) throw locked.error
  process.exit(locked.status ?? 1)
}
assert.equal(process.version, 'v24.19.0')
const variant = JSON.parse(await readFile('variant.json', 'utf8'))
const artifacts = resolve('artifacts')
await mkdir(artifacts, { recursive: true })
await rm('content', { recursive: true, force: true })
await mkdir('content')
for (let i = 0; i < 30; i++) {
  await writeFile(`content/report-${String(i).padStart(4, '0')}.md`, `---\ntitle: Report ${i}\n---\n\n<!-- ${disclosure} -->\n\n# Report ${i}\n\nA repeatable documentation page.\n`)
}
const prep = spawnSync(process.execPath, ['scripts/prepare.mjs'], { encoding: 'utf8' })
await writeFile(resolve(artifacts, 'prepare.log'), prep.stdout + prep.stderr)
assert.equal(prep.status, 0, prep.stdout + prep.stderr)
const scenarios = []
for (const connector of ['default', 'native']) {
  await rm('.data', { recursive: true, force: true })
  await rm('.nuxt', { recursive: true, force: true })
  const retained = variant.fixed || connector === 'native'
  const runs = []
  for (let run = 1; run <= 2; run++) {
    const resultPath = resolve(artifacts, `${connector}-${run}.json`)
    const child = spawnSync(process.execPath, ['scripts/worker.mjs'], {
      cwd: root, env: { ...process.env, CONNECTOR: connector, RESULT_PATH: resultPath, NUXT_TELEMETRY_DISABLED: '1' },
      encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024,
    })
    await writeFile(resolve(artifacts, `${connector}-${run}.log`), child.stdout + child.stderr)
    assert.equal(child.status, 0, child.stdout + child.stderr + String(child.error || ''))
    const result = JSON.parse(await readFile(resultPath, 'utf8'))
    assert.equal(result.filesCount, 30)
    assert.equal(result.parsedFilesCount, retained && run === 2 ? 0 : 30)
    assert.equal(result.cachedFilesCount, retained && run === 2 ? 30 : 0)
    assert.equal(result.cacheRows, retained ? 30 : 0)
    if (runs.length) {
      assert.equal(result.contentSha256, runs[0].contentSha256)
      assert.equal(result.cacheSha256, runs[0].cacheSha256)
    }
    runs.push(result)
    console.log(`${connector}, ${variant.fixed ? 'fixed' : 'baseline'}, start ${run}: parsed=${result.parsedFilesCount}, cached=${result.cachedFilesCount}, retained cache rows=${result.cacheRows}`)
  }
  scenarios.push({ connector, runs })
}
await writeFile(resolve(artifacts, 'verification.json'), JSON.stringify({ disclosure, variant, scenarios }, null, 2) + '\n')
console.log('Verified two starts with the default connector and native SQLite control. No timing claim.')
