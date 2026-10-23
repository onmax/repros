import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

// The `-fix` fixture is the same app with `@nuxt/image` patched. Same checks, opposite verdict.
const { name } = JSON.parse(readFileSync('package.json', 'utf8'))
const patched = name.endsWith('-fix')

function run(args) {
  const result = spawnSync('pnpm', ['exec', ...args], { encoding: 'utf8' })
  return { status: result.status, output: `${result.stdout}${result.stderr}`.trim() }
}

const prepare = run(['nuxt', 'prepare'])
assert.equal(prepare.status, 0, `nuxt prepare failed:\n${prepare.output}`)

// Same app, same @nuxt/image types. Only `checkUnknownProps` differs.
const loose = run(['vue-tsc', '--noEmit', '-p', 'tsconfig.loose.json'])
const strict = run(['vue-tsc', '--noEmit', '-p', 'tsconfig.strict.json'])

console.log(`@nuxt/image 2.2.0${patched ? ' (patched)' : ''}`)
console.log('loose  (vue-tsc defaults):  exit', loose.status)
console.log('strict (checkUnknownProps): exit', strict.status)
if (strict.output) console.log(strict.output)

assert.equal(loose.status, 0, `control failed, expected the loose check to pass:\n${loose.output}`)

if (patched) {
  assert.equal(strict.status, 0, 'expected the patched types to accept loading="lazy" on <NuxtImg>')
  console.log('\nFixed: <NuxtImg loading="lazy"> passes strict template checks.')
}
else {
  assert.notEqual(strict.status, 0, 'expected the strict check to reject loading="lazy" on <NuxtImg>')
  assert.match(strict.output, /app\/app\.vue\(2,\d+\): error TS2353: .*'loading' does not exist in type/)
  console.log('\nReproduced: <NuxtImg loading="lazy"> from the @nuxt/image docs fails strict template checks.')
}
