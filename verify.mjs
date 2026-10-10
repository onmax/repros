import { spawnSync } from "node:child_process"
import { strict as assert } from "node:assert"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = dirname(fileURLToPath(import.meta.url))
const cases = [
  { directory: "vitehub-execution-budget", expected: "budget repro: second shell call bypassed the invocation limit" },
  { directory: "vitehub-execution-budget-fix", expected: "budget repro: second shell call rejected by the invocation limit" },
]

for (const testCase of cases) {
  const result = spawnSync(process.execPath, [join(root, testCase.directory, "index.mjs")], { encoding: "utf8" })
  assert.equal(result.status, 0, `${testCase.directory} exited with ${result.status}: ${result.stderr}`)
  assert.equal(result.stdout.trim(), testCase.expected, `${testCase.directory} output changed`)
}

console.log(cases.map(testCase => `${testCase.directory}: ${testCase.expected}`).join("; "))
