import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const cwd = fileURLToPath(new URL('.', import.meta.url))
const variants = ["vue"]
const control = {"CONTROL": "1"}
for (const variant of variants) {
  for (const mode of ['repro', 'control', 'regression']) {
    const env = { ...process.env, NODE_ENV: 'development', EVLOG_PACKAGE: variant,
      CONTROL: '', NO_ASYNC_HOOK: '', ASSERT_REPRO: '',
      ...(mode === 'control' ? control : {}),
      ...(mode === 'repro' ? { ASSERT_REPRO: '1' } : {}) }
    const result = spawnSync(process.execPath, ['case.mjs'], { cwd, env, encoding: 'utf8', timeout: 15000 })
    assert.ifError(result.error)
    process.stdout.write(result.stdout)
    const expected = mode === 'regression' ? 1 : 0
    if (result.status !== expected) process.stderr.write(result.stderr)
    assert.equal(result.status, expected, `${variant} ${mode}: expected exit ${expected}`)
    console.log(`${variant} ${mode}: expected exit ${expected}, observed ${result.status}`)
  }
}
console.log('VERIFIED: exact bug reproduced, clean control passed, desired-behavior check failed as expected')
