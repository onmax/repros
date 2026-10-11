import { strict as assert } from "node:assert"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = dirname(fileURLToPath(import.meta.url))
const cases = [
  { directory: "vitehub-model-usage", expected: "model budget usage: 0 input bytes, 0 output bytes" },
  { directory: "vitehub-model-usage-fix", expected: "model budget usage: 12 input bytes, 4 output bytes" },
]
for (const testCase of cases) {
  const result = spawnSync(process.execPath, [join(root, testCase.directory, "index.mjs")], { encoding: "utf8" })
  assert.equal(result.status, 0, `${testCase.directory} exited with ${result.status}: ${result.stderr}`)
  assert.equal(result.stdout.trim(), testCase.expected, `${testCase.directory} output changed`)
  console.log(`${testCase.directory}: ${result.stdout.trim()}`)
}
