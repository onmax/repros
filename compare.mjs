// Frozen-installs both fixtures, runs the identical verifier in each, and
// exits 0 only when the published package fails with the reported signature
// and the patched sibling passes.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const fixtures = [
  'oxlint-migrate-import-lite-type-specifier-style',
  'oxlint-migrate-import-lite-type-specifier-style-fix',
]
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8')
for (const file of ['verify.mjs', 'eslint.config.mjs', 'index.js'])
  assert.equal(read(`${fixtures[0]}/${file}`), read(`${fixtures[1]}/${file}`), `${file} must be identical in both fixtures`)

for (const [index, fixture] of fixtures.entries()) {
  const cwd = fileURLToPath(new URL(fixture, import.meta.url))
  console.log(`\n=== ${fixture}`)
  const install = spawnSync('pnpm', ['install', '--frozen-lockfile'], { cwd, encoding: 'utf8' })
  assert.equal(install.status, 0, `${fixture}: install failed\n${install.stdout}${install.stderr}`)
  const run = spawnSync('pnpm', ['--silent', 'verify'], { cwd, encoding: 'utf8' })
  process.stdout.write(run.stdout ?? '')
  process.stderr.write(run.stderr ?? '')
  if (index === 0) {
    assert.equal(run.status, 1, 'published @oxlint/migrate@1.88.0 must reproduce the bug (exit 1)')
    assert(run.stdout.includes('unknown variant `top-level`'))
    console.log('EXPECTED RED: `top-level` copied verbatim; oxlint rejects the config')
  }
  else {
    assert.equal(run.status, 0, 'patched @oxlint/migrate@1.88.0 must pass the same verifier')
    console.log('GREEN: patched migrate writes `prefer-top-level`; oxlint loads the config')
  }
}
console.log('\nPASS: red/green comparison')
