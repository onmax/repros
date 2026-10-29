import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

const cases = [
  ['repro', ['--expect-bug'], 0],
  ['control', ['--control'], 0],
  ['regression', [], 1],
]
for (const [name, flags, expected] of cases) {
  const result = spawnSync(process.execPath, ['case.mjs', ...flags], {
    cwd: new URL('.', import.meta.url),
    env: { ...process.env, NODE_ENV: 'development' },
    encoding: 'utf8',
    timeout: 15000,
  })
  assert.ifError(result.error)
  if (name === 'repro' || result.status !== expected) process.stdout.write(result.stdout)
  if (result.status !== expected) process.stderr.write(result.stderr)
  assert.equal(result.status, expected, `${name}: unexpected exit code`)
  if (name === 'regression') assert.match(result.stderr, /a slot called inside render must not warn/)
  console.log(`${name}: exit ${result.status}`)
}
console.log('Verified the bug and the control.')
