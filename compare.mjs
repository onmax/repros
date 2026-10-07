import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const fixtures = ['unstorage-long-ttl', 'unstorage-long-ttl-fix']
assert.equal(readFileSync(new URL(`${fixtures[0]}/verify.mjs`, import.meta.url), 'utf8'),
  readFileSync(new URL(`${fixtures[1]}/verify.mjs`, import.meta.url), 'utf8'), 'both fixtures must use the identical verifier')
for (const [index, fixture] of fixtures.entries()) {
  const cwd = fileURLToPath(new URL(fixture, import.meta.url))
  const install = spawnSync('pnpm', ['install', '--frozen-lockfile'], { cwd, encoding: 'utf8' })
  process.stdout.write(install.stdout ?? '')
  process.stderr.write(install.stderr ?? '')
  assert.equal(install.status, 0, `${fixture}: install failed`)
  const run = spawnSync('pnpm', ['verify'], { cwd, encoding: 'utf8' })
  process.stdout.write(run.stdout ?? '')
  process.stderr.write(run.stderr ?? '')
  const nativeLine = run.stdout?.split('\n').find(line => line.startsWith('NATIVE '))
  assert(nativeLine, `${fixture}: missing native evidence`)
  const native = JSON.parse(nativeLine.slice(7))
  assert.equal(native.node, 'v24.21.0')
  assert.equal(native.package, 'unstorage@2.0.0-alpha.10')
  assert.equal(native.trials.length, 3)
  if (index === 0) {
    assert.equal(run.status, 1, 'baseline must fail its retention assertion')
    assert(native.trials.every(trial => trial.value === null && trial.raw === null))
    assert.equal(native.warnings.length, 6)
    assert(native.warnings.every(w => w.name === 'TimeoutOverflowWarning' &&
      w.message.includes('2592000000') && w.message.includes('set to 1')))
    assert(run.stderr.includes('30-day TTL entries must remain cached after 30ms, including raw writes'))
    console.log('EXPECTED RED: six monthly writes disappear after native timer overflow')
  } else {
    assert.equal(run.status, 0, 'patched fixture must pass the same verifier')
    assert(native.trials.every(trial => trial.value === 'cached response' && trial.raw === 'raw response'))
    assert.equal(native.warnings.length, 0)
    assert(run.stdout.includes('"cancellationBeforeAndAfterRearm":"PASS"'))
    console.log('GREEN: patched monthly writes remain; exact deadline and cancellation controls pass')
  }
}
console.log('PASS: pinned native red/green comparison')
