import assert from "node:assert/strict"
import { invoke as broken } from "./vitehub-provider-readiness/index.mjs"
import { invoke as fixed } from "./vitehub-provider-readiness-fix/index.mjs"

const snapshot = {
  installed: true,
  auth: { status: "authenticated" },
  usageLimits: { windows: [{ usedPercent: 25 }] },
  configuredModel: "gpt-6-astra",
  models: [{ slug: "gpt-5" }],
}
let prepared = 0
await broken(snapshot, async () => { prepared++ })
assert.equal(prepared, 1, "the failing control must reproduce late preparation")
await assert.rejects(() => fixed(snapshot, async () => { prepared++ }), /configured model gpt-6-astra is unavailable/)
assert.equal(prepared, 1, "the fixed control must reject before preparation")
console.log("provider readiness repro: broken control prepared=1; fixed control prepared=0 for incompatible model")
