import { withPage } from "./serve.mjs"

const outcome = await withPage(5386, "/", async (page) => {
  await page.waitForFunction(() => window.check)
  const check = () =>
    page.evaluate(async () => ({
      radio: await window.check("radio", "radio-group"),
      checkbox: await window.check("checkbox", "checkbox"),
    }))
  // What a screen reader gets: the hidden form inputs aren't in the accessibility tree.
  const radios = await page.getByRole("radio").count()
  const checkedRadios = await page.getByRole("radio", { checked: true }).count()
  const bug = await check()
  // Control: the same widgets with only their aria-hidden form inputs removed.
  await page.evaluate(() => document.querySelectorAll('input[aria-hidden="true"]').forEach((el) => el.remove()))
  const control = await check()
  return { radios, checkedRadios, bug, control }
})

const { radios, checkedRadios, bug, control } = outcome
console.log(`accessibility tree: ${radios} radios, ${checkedRadios} checked`)
console.log(`RadioGroup checkPattern:\n${bug.radio}\n`)
console.log(`CheckboxGroup checkPattern:\n${bug.checkbox}\n`)
console.log(`without the aria-hidden inputs: radio-group ${control.radio}, checkbox ${control.checkbox}\n`)

const checks = [
  ["control: the accessibility tree has 2 radios, 1 checked", radios === 2 && checkedRadios === 1],
  ["control: both checks pass once the aria-hidden inputs are removed", control.radio === "PASS" && control.checkbox === "PASS"],
  ["bug: RadioGroup reported with 2 checked radios", /has 2 checked radios/.test(bug.radio)],
  ["bug: CheckboxGroup's hidden input reported without a name", /input: has no accessible name/.test(bug.checkbox)],
]
console.log('expected: checkPattern(root, "radio-group") and checkPattern(root, "checkbox") pass on ui-sdk RadioGroup and CheckboxGroup')
console.log(`actual:   ${bug.radio.split("\n")[1] ?? bug.radio} / ${bug.checkbox.split("\n")[1] ?? bug.checkbox}`)
for (const [name, ok] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
if (checks.every(([, ok]) => ok)) console.log("Reproduced: checkPattern counts aria-hidden form inputs as radios and checkboxes.")
else process.exit(1)
