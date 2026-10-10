import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { strict as assert } from 'node:assert'
import { rm } from 'node:fs/promises'

const run = promisify(execFile)
const fixtures = [
  ['vitehub-sandbox-transfer-bounds', false],
  ['vitehub-sandbox-transfer-bounds-fix', true],
]
for (const [name, fixed] of fixtures) {
  const cwd = new URL(`./${name}/`, import.meta.url)
  if (fixed) {
    await assert.rejects(run(process.execPath, ['index.mjs'], { cwd }), /SANDBOX_TRANSFER_LIMIT.*maxSidecars 65 > 64/)
  }
  else {
    const { stdout } = await run(process.execPath, ['index.mjs'], { cwd })
    const result = JSON.parse(stdout)
    assert.equal(result.sidecars, 200, `${name} should write every sidecar`)
  }
  await rm(new URL('assets/', cwd), { recursive: true, force: true })
}
console.log('PASS: unbounded transfer writes 200 sidecars; bounded control rejects sidecar 65 at maxSidecars=64')
