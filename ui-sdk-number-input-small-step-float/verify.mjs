import assert from "node:assert/strict"

process.env.TZ = "UTC"
const { numberInput } = await import("@ui-sdk/core/number-input")

// Alt+ArrowUp is a small step. The input's keydown listener calls api.internal.keydown with the event.
function altArrowUp(step) {
  const changes = []
  const instance = numberInput({ id: "n", defaultValue: 1, step, locale: "en-US", onValueChange: (value) => changes.push(value) })
  instance.api.internal.keydown({ key: "ArrowUp", altKey: true, preventDefault() {} })
  return changes
}

console.log(`node ${process.version}`)

const integer = altArrowUp(1)
console.log(`control step 1:   expected onValueChange [1.1], actual ${JSON.stringify(integer)}`)
assert.deepEqual(integer, [1.1])

const fractional = altArrowUp(0.7)
console.log(`repro   step 0.7: expected onValueChange [1.05], actual ${JSON.stringify(fractional)}`)
assert.deepEqual(fractional, [1.0499999999999998], "the bug did not reproduce")

console.log("Reproduced: the default small step 0.7 / 10 = 0.06999999999999999 leaks float error into the value.")
