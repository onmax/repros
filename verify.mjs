import { strict as assert } from "node:assert"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = dirname(fileURLToPath(import.meta.url))
const cases = [
  { directory: "vitehub-execution-budget-disposal", shouldKeepProcessAlive: true },
  { directory: "vitehub-execution-budget-disposal-fix", shouldKeepProcessAlive: false },
]

for (const testCase of cases) {
  const startedAt = performance.now()
  const result = spawnSync(process.execPath, ["--no-warnings", join(root, testCase.directory, "index.mjs")], { encoding: "utf8" })
  const elapsedMs = performance.now() - startedAt
  assert.equal(result.status, 0, `${testCase.directory} exited with ${result.status}: ${result.stderr}`)
  assert.equal(result.stdout.trim(), "vitehub execution budget disposal: invocation returned")
  if (testCase.shouldKeepProcessAlive) assert.ok(elapsedMs >= 220, `${testCase.directory} exited too early (${elapsedMs.toFixed(0)}ms)`)
  else assert.ok(elapsedMs < 220, `${testCase.directory} retained a timer (${elapsedMs.toFixed(0)}ms)`)
  console.log(`${testCase.directory}: ${elapsedMs.toFixed(0)}ms`)
}
