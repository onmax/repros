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
  assert.equal(result.status, 1, 'case.mjs should exit 1 while the bug exists')
  assert.match(result.stderr, /^BUG: 4 wrong frame fields$/m)
  for (const line of [2, 4]) {
    assert.match(result.stderr, new RegExp(`handler\\.ts:${line}:1\\): filename expected "src/handler\\.ts", got "\\(/.+handler\\.ts"`))
    assert.match(result.stderr, new RegExp(`handler\\.ts:${line}:1\\): in_app expected true, got false`))
  }
  console.log(`${flags[0] ?? 'default'}: reproduced; controls passed\n`)
}
console.log('Verified the bug on both versions.')
