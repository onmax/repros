import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 120_000 })
  assert.ifError(result.error)
  return { status: result.status, output: result.stdout + result.stderr }
}
const prepare = run('pnpm', ['exec', 'nuxt', 'prepare'])
assert.equal(prepare.status, 0, prepare.output)
mkdirSync('.verify', { recursive: true })
const nuxtPaths = JSON.parse(readFileSync('.nuxt/tsconfig.app.json', 'utf8')).compilerOptions.paths
const paths = Object.fromEntries(Object.entries(nuxtPaths).map(([key, values]) => [key, values.map(value => resolve('.nuxt', value))]))
for (const dependency of ['h3', 'nitropack/types', 'ofetch'])
  assert.ok(paths[dependency]?.every(path => path.startsWith(`${resolve('node_modules')}/`)), `Nuxt resolved ${dependency} outside this fixture. Run in a directory without inherited node_modules.`)
const base = {
  compilerOptions: { target: 'ESNext', lib: ['ESNext', 'DOM'], module: 'preserve', moduleResolution: 'bundler', strict: true, noEmit: true, skipLibCheck: true, types: [], paths },
  files: ['../probe.ts'],
}
function check(name, files) {
  writeFileSync(`.verify/${name}.json`, JSON.stringify({ ...base, files }, null, 2))
  return run('pnpm', ['exec', 'tsc', '--pretty', 'false', '-p', `.verify/${name}.json`])
}
const control = check('control', base.files)
assert.notEqual(control.status, 0, 'Nuxt without the module declaration must reject invalid calls')
for (const line of [2, 3, 4])
  assert.match(control.output, new RegExp(`probe\\.ts\\(${line},`), control.output)
const actual = check('module', [...base.files, '../.nuxt/types/nuxt-better-auth-endpoints.d.ts'])
const expected = JSON.parse(readFileSync('package.json', 'utf8')).repro.expected
console.log('Expected Nuxt behavior: reject invalid method, invalid immediate option, and nonexistent result method.')
console.log(`Control without auth declaration: rejected all three calls.`)
console.log(`Actual with auth declaration: ${actual.status === 0 ? 'accepted all three calls' : 'rejected calls'}.`)
if (expected === 'accepted')
  assert.equal(actual.status, 0, actual.output)
else {
  assert.notEqual(actual.status, 0, 'The patched declaration must reject invalid calls')
  for (const line of [2, 3, 4])
    assert.match(actual.output, new RegExp(`probe\\.ts\\(${line},`), actual.output)
}
console.log(`Verified ${expected === 'accepted' ? 'the reported bug' : 'the correction'}.`)
