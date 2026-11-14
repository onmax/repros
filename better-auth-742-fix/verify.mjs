import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

// Default: assert the expected behavior (exits nonzero while the bug exists).
// --expect-bug: assert the reported failure instead.
const expectBug = process.argv.includes('--expect-bug')
const env = { ...process.env, NUXT_BETTER_AUTH_SECRET: 'repro-secret-0123456789abcdefghijklmnopqrstuvwxyz' }

const prepare = spawnSync('pnpm', ['exec', 'nuxt', 'prepare'], { stdio: 'inherit', env })
assert.equal(prepare.status, 0, 'nuxt prepare failed')

const tsc = spawnSync('pnpm', ['exec', 'vue-tsc', '--noEmit', '--pretty', 'false', '-p', '.nuxt/tsconfig.server.json'], { encoding: 'utf8', env })
const output = `${tsc.stdout}${tsc.stderr}`.trim()
const missing = [...output.matchAll(/error TS2339: Property '(\w+)' does not exist/g)].map(match => match[1]).sort()

console.log('\nvue-tsc -p .nuxt/tsconfig.server.json exit:', tsc.status)
console.log(output || '(no diagnostics)')
console.log('\nExpected missing plugin endpoints: []')
console.log('Actual missing plugin endpoints:  ', JSON.stringify(missing))

if (expectBug) {
  assert.deepEqual(missing, ['createUser', 'hasPermission', 'signInAnonymous'])
  console.log('\nPASS: reproduced #742, serverAuth().api lacks the admin, organization and anonymous endpoints')
}
else {
  assert.equal(tsc.status, 0, 'server typecheck failed')
  console.log('\nPASS: serverAuth().api has the plugin endpoints')
}
