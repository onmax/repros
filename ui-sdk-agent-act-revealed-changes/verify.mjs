import { withPage } from "./serve.mjs"

const outcome = await withPage(5387, "/", async (page) => {
  await page.waitForFunction(() => window.agent)
  const setValue = (value) =>
    page.evaluate(
      (value) => window.agent.act({ steps: [{ ref: "Card holder", action: "setValue", args: [value] }] }),
      value
    )
  const revealed = await setValue("Jane") // the Input is inside the closed accordion
  const subscribed = await page.evaluate(() => window.subscribed.filter((c) => c.component === "input"))
  const visible = await setValue("Joe") // the accordion is open now
  return { revealed, subscribed, visible }
})

const { revealed, subscribed, visible } = outcome
const inputChange = (result, value) =>
  result.steps[0].changes?.some((c) => c.component === "input" && c.key === "value" && c.value === value)
const show = (result) => JSON.stringify(result.steps[0].changes)
console.log(`act setValue "Jane" while the accordion is closed, step changes: ${show(revealed)}`)
console.log(`  same call, appeared: ${JSON.stringify(revealed.appeared)}`)
console.log(`subscribe input changes: ${JSON.stringify(subscribed.map((c) => [c.label, c.key, c.value]))}`)
console.log(`act setValue "Joe" while the accordion is open, step changes: ${show(visible)}\n`)

const checks = [
  ["control: the step on the visible Input lists its value change", inputChange(visible, "Joe")],
  ["control: subscribe reports the revealed Input's value change", subscribed.some((c) => c.value === "Jane")],
  ["bug: the step that revealed the Input omits its value change", revealed.ok && !inputChange(revealed, "Jane")],
]
console.log('expected: step changes include {"component":"input","label":"Card holder","key":"value","value":"Jane"}')
console.log(`actual:   step changes ${show(revealed)}`)
for (const [name, ok] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
if (checks.every(([, ok]) => ok)) console.log("Reproduced: act() leaves the revealed Input's value out of the step's changes.")
else process.exit(1)
