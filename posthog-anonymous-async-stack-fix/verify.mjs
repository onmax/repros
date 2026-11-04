import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

for (const flags of [[], ['--next']]) {
  const result = spawnSync(process.execPath, ['--enable-source-maps', 'case.mjs', ...flags], {
    cwd: new URL('.', import.meta.url),
    encoding: 'utf8',
    timeout: 15000,
  })
  assert.ifError(result.error)
  process.stdout.write(result.stdout)
  process.stderr.write(result.stderr)
  assert.equal(result.status, 0, 'case.mjs should exit 0 with the patched parser')
  assert.match(result.stdout, /^OK: every frame has a clean filename and in_app: true$/m)
  console.log(`${flags[0] ?? 'default'}: fixed; controls passed\n`)
}
console.log('Verified the fix on both versions.')
