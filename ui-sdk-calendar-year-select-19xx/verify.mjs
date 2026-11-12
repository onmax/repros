import assert from "node:assert/strict"

process.env.TZ = "UTC"
const { calendar } = await import("@ui-sdk/core/calendar")
const { partState } = await import("@ui-sdk/core/renderer")

function yearOption(month) {
  const instance = calendar({ id: "c", defaultMonth: month, locale: "en-US" })
  const state = partState(instance.part("year-select"))
  return { value: state.value, option: state.options.find((option) => option.value === state.value) }
}

console.log(`node ${process.version}, icu ${process.versions.icu}`)

const control = yearOption("2050-03")
console.log(`control 2050-03: expected selected year 2050 labelled "2050", actual ${control.value} labelled ${JSON.stringify(control.option?.label)}`)
assert.equal(control.value, 2050)
assert.equal(control.option?.label, "2050")

const repro = yearOption("0050-03")
console.log(`repro   0050-03: expected selected year 50 labelled "50", actual ${repro.value} labelled ${JSON.stringify(repro.option?.label)}`)
assert.equal(repro.value, 50)
assert.equal(repro.option?.label, "1950", "the bug did not reproduce")

console.log("Reproduced: Date.UTC maps years 0-99 to 1900-1999, so year 50 is labelled 1950.")
