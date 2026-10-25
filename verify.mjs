import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { expectedVisits, lookupBudget } from './input.mjs'

function runFixture(directory) {
  const result = spawnSync(process.execPath, ['verify.mjs'], {
    cwd: fileURLToPath(new URL(`${directory}/`, import.meta.url)),
    encoding: 'utf8',
  })
  if (result.error)
    throw result.error
  process.stdout.write(result.stdout)
  process.stderr.write(result.stderr)
  return { status: result.status, data: JSON.parse(result.stdout.trim()) }
}
const before = runFixture('unimport-vue-template-lookup')
const after = runFixture('unimport-vue-template-lookup-fix')
assert.equal(before.status, 42, 'baseline must reproduce repeated scans')
assert.equal(before.data.lookupPredicateVisits, expectedVisits)
assert.equal(after.status, 0, 'fixed fixture must bound repeated scans')
assert.ok(after.data.lookupPredicateVisits <= lookupBudget)
assert.equal(before.data.codeHash, after.data.codeHash, 'generated code must match')
assert.equal(before.data.sourceMapHash, after.data.sourceMapHash, 'source maps must match')
await import('./compare.mjs')
console.log(`PASS: ${expectedVisits} → ${after.data.lookupPredicateVisits} lookup predicate visits; code and source maps match`)
