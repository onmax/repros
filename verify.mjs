import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join } from 'node:path'
const run = promisify(execFile)
const before = await run(process.execPath, [join('vitehub-capability-tool-budget', 'index.mjs')])
assert.match(before.stdout, /tool calls: 2/)
const after = await run(process.execPath, [join('vitehub-capability-tool-budget-fix', 'index.mjs')])
assert.match(after.stdout, /tool calls: 1/)
console.log('capability tool budget: unfixed generic tool bypasses; fixed tool is bounded')
