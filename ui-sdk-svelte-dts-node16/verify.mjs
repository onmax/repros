import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"

const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc")

function typecheck(project) {
  const result = spawnSync(process.execPath, [tsc, "-p", project, "--pretty", "false"], { encoding: "utf8", env: { ...process.env, LC_ALL: "C", LANG: "C", TZ: "UTC" } })
  assert.ifError(result.error)
  const errors = result.stdout.split("\n").filter((line) => line.includes(": error TS"))
  return { status: result.status, errors }
}

console.log(`node ${process.version}`)

const bundler = typecheck("tsconfig.bundler.json")
console.log(`control moduleResolution bundler: expected exit 0 and 0 errors, actual exit ${bundler.status} and ${bundler.errors.length} errors`)
assert.equal(bundler.status, 0, bundler.errors.join("\n"))

const node16 = typecheck("tsconfig.node16.json")
const extensionless = node16.errors.filter((line) => line.includes("error TS2835"))
const missingExport = node16.errors.filter((line) => line.startsWith("index.ts(") && line.includes("error TS2305"))
console.log(`repro   moduleResolution node16: expected exit 0 and 0 errors, actual exit ${node16.status} and ${node16.errors.length} errors`)
console.log(`        ${extensionless.length} x TS2835 in @ui-sdk/svelte/dist/*.d.ts, first: ${extensionless[0]?.replace(/^.*node_modules\//, "")}`)
console.log(`        in the consumer: ${missingExport[0]}`)
assert.notEqual(node16.status, 0, "the bug did not reproduce")
assert.ok(extensionless.length > 0, "no TS2835 errors")
assert.ok(extensionless.every((line) => line.includes("@ui-sdk/svelte/dist/")), "TS2835 outside @ui-sdk/svelte")
assert.equal(missingExport.length, 1, "no TS2305 for Checkbox")

console.log("Reproduced: @ui-sdk/svelte's .d.ts files use extensionless relative imports, so node16 resolution loses its exports.")
