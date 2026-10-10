import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join } from 'node:path'
const run = promisify(execFile)
const before = await run(process.execPath, [join('vitehub-retry-accounting', 'index.mjs')])
assert.match(before.stdout, /repairs: 2/)
const after = await run(process.execPath, [join('vitehub-retry-accounting-fix', 'index.mjs')])
assert.match(after.stdout, /repairs: 1/)
console.log('retry accounting: unfixed repairs exceed the budget; fixed repairs stop at the limit')
