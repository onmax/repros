import { withPage } from "./serve.mjs"

const outcome = await withPage(5385, "/", async (page) => {
  const results = await page.evaluate(() => window.results)

  // The native controls work with real key presses in the same page.
  await page.focus("#slider input")
  await page.keyboard.press("ArrowRight")
  const range = await page.$eval("#slider input", (el) => el.value)
  await page.focus("#radio-group input[value=s]")
  await page.keyboard.press("ArrowDown")
  const radio = await page.$eval("#radio-group input:checked", (el) => el.value)
  return { results, range, radio }
})

const { results, range, radio } = outcome
console.log("checkPattern on native controls in Chromium:")
for (const [id, result] of Object.entries(results)) console.log(`  ${id}: ${result}`)
console.log(`real ArrowRight on the range: 5 -> ${range}`)
console.log(`real ArrowDown on radio S: checked ${radio}`)

const checks = [
  ["control: native checkbox passes checkPattern", results.checkbox === "PASS"],
  ["control: a real ArrowRight moves the native range", range === "6"],
  ["control: a real ArrowDown checks the next native radio", radio === "m"],
  ["bug: checkPattern says ArrowRight doesn't change the native range", /ArrowRight should raise the value from 5, but it.s 5/.test(results.slider)],
  ["bug: checkPattern says arrows don't move the native radio group", /ArrowDown should move focus to the next radio/.test(results["radio-group"])],
]
console.log("")
console.log("expected: checkPattern passes the slider and radio-group, which real keys operate")
console.log(`actual:   slider ${results.slider === "PASS" ? "passes" : "fails"}, radio-group ${results["radio-group"] === "PASS" ? "passes" : "fails"}`)
for (const [name, ok] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
if (checks.every(([, ok]) => ok)) console.log("Reproduced: checkPattern reports false problems on native range and radio inputs.")
else process.exit(1)
