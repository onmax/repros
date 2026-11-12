import assert from "node:assert/strict"

process.env.TZ = "UTC"
const { formatNumber, isPartialNumber, parseNumber } = await import("@ui-sdk/core/number")

const kilometers = { style: "unit", unit: "kilometer", unitDisplay: "long" }
console.log(`node ${process.version}, icu ${process.versions.icu}`)

// Control: English has one plural form for 5, 12345.6 and -12345.6 ("kilometers").
const english = formatNumber(5, "en-US", kilometers)
const englishParsed = parseNumber(english, "en-US", kilometers)
console.log(`control en-US ${JSON.stringify(english)}: expected parse 5 and partial true, actual ${englishParsed} and ${isPartialNumber(english, "en-US", kilometers)}`)
assert.equal(englishParsed, 5)
assert.equal(isPartialNumber(english, "en-US", kilometers), true)

// Russian 50 takes the "many" form, which no sample number (-12345.6, 12345.6, 1) produces.
const russian = formatNumber(50, "ru-RU", kilometers)
assert.equal(russian, "50 километров")
const russianParsed = parseNumber(russian, "ru-RU", kilometers)
const russianPartial = isPartialNumber(russian, "ru-RU", kilometers)
console.log(`repro   ru-RU ${JSON.stringify(russian)}: expected parse 50 and partial true, actual ${russianParsed} and ${russianPartial}`)
assert.equal(russianParsed, null, "the bug did not reproduce")
assert.equal(russianPartial, false, "the bug did not reproduce")

console.log("Reproduced: parseNumber rejects the text formatNumber wrote for ru-RU.")
