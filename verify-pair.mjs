import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

assert.equal(process.versions.node, '20.20.0', 'use Node 20.20.0, pinned in each fixture')
const fixtureNames = ['nuxt-auth-utils-533', 'nuxt-auth-utils-533-fix']
const sharedFiles = ['app.vue', 'nuxt.config.ts', 'server/api/session.post.ts', 'server/api/session.get.ts', 'verify.mjs']
for (const path of sharedFiles) {
  assert.equal(readFileSync(new URL(`${fixtureNames[0]}/${path}`, import.meta.url), 'utf8'), readFileSync(new URL(`${fixtureNames[1]}/${path}`, import.meta.url), 'utf8'), `${path} must be identical in both fixtures`)
}
for (const name of fixtureNames) {
  const cwd = new URL(`${name}/`, import.meta.url)
  const install = spawnSync('corepack', ['pnpm', 'install', '--frozen-lockfile'], { cwd, stdio: 'inherit', env: { ...process.env, CI: '1' } })
  assert.equal(install.status, 0, `${name}: frozen install failed`)
  const verify = spawnSync('corepack', ['pnpm', 'verify'], { cwd, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, env: { ...process.env, CI: '1' } })
  process.stdout.write(verify.stdout || '')
  process.stderr.write(verify.stderr || '')
  const line = verify.stdout?.split('\n').find(line => line.startsWith('REPRO_RESULT '))
  assert.ok(line, `${name}: verification did not reach the cookie assertions`)
  const result = JSON.parse(line.slice('REPRO_RESULT '.length))
  assert.equal(result.nuxt, '4.3.1')
  assert.equal(result.module, '0.5.30')
  assert.equal(result.h3, '1.15.5')
  if (name === fixtureNames[0]) {
    assert.equal(verify.status, 1, 'unpatched package must reproduce the defect')
    assert.deepEqual(result.failures.map(failure => failure.name), ['replace existing cookie 1', 'replace existing cookie 2', 'replace existing cookie 3', 'replacement with empty data', 'replacement removes private data'])
    for (const failure of result.failures.slice(0, 3)) {
      assert.match(failure.message, /replacement return must discard impersonatorId/, 'baseline must fail on the exact stale-data assertion')
    }
    assert.match(result.failures[3].message, /empty replacement must discard the old data/)
    assert.match(result.failures[4].message, /replacement must discard the old private data/)
    assert.equal(result.passed, 3, 'merge, first-session and clear controls must pass')
    console.log('CONFIRMED baseline: stale cookie data survives replacement in 3/3 repetitions')
  }
  else {
    assert.equal(verify.status, 0, 'patched package must pass the same verifier')
    assert.equal(result.failures.length, 0)
    assert.equal(result.passed, 8)
    console.log('CONFIRMED fixed control: all 8 checks pass')
  }
}
