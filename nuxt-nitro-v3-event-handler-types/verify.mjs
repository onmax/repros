// Generates Nuxt's types, then typechecks the app with vue-tsc.
// `app/report-type.ts` only typechecks when `$fetch('/api/report')` is typed
// from the handler's return value instead of `any`.
import { spawnSync } from 'node:child_process'
import assert from 'node:assert/strict'

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { encoding: 'utf8' })
  return { status: result.status, log: (result.stdout + result.stderr).replace(/\u001B\[[0-9;]*m/g, '') }
}

const prepare = run('pnpm', ['exec', 'nuxt', 'prepare'])
assert.equal(prepare.status, 0, `nuxt prepare failed:\n${prepare.log}`)

const typecheck = run('pnpm', ['exec', 'vue-tsc', '--noEmit', '-p', '.nuxt/tsconfig.app.json'])
const errors = typecheck.log.split('\n').filter(line => /error TS\d+/.test(line))
console.log(`vue-tsc exit code: ${typecheck.status}`)
for (const line of errors) console.log(line)

console.log('expected: $fetch(\'/api/report\') is { count: number, label: string }')
console.log(`actual:   ${errors.some(line => line.includes('TS2578')) ? 'any (the @ts-expect-error on report.missing is unused)' : errors.length ? 'see errors above' : '{ count: number, label: string }'}`)
assert.equal(typecheck.status, 0, 'expected the app to typecheck')
console.log('PASS')
