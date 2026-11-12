import assert from "node:assert/strict"

process.env.TZ = "UTC"
const { datePattern, formatDate, parseDate } = await import("@ui-sdk/core/date")

const reference = { referenceDate: "2026-06-01" }
console.log(`node ${process.version}, icu ${process.versions.icu}`)

// Control: a long date whose numeric field order matches its long order.
const british = formatDate("2026-10-16", "en-GB", { dateStyle: "long" })
const britishParsed = parseDate(british, "en-GB", reference)
console.log(`control en-GB ${JSON.stringify(british)} fields ${JSON.stringify(datePattern("en-GB").fields)}: expected "2026-10-16", actual ${JSON.stringify(britishParsed)}`)
assert.equal(britishParsed, "2026-10-16")

// Swedish numeric dates are year-month-day (2026-10-16), but its long date is day month year.
const swedish = formatDate("2026-10-16", "sv-SE", { dateStyle: "long" })
assert.equal(swedish, "16 oktober 2026")
const swedishParsed = parseDate(swedish, "sv-SE", reference)
console.log(`repro   sv-SE ${JSON.stringify(swedish)} fields ${JSON.stringify(datePattern("sv-SE").fields)}: expected "2026-10-16", actual ${JSON.stringify(swedishParsed)}`)
assert.equal(swedishParsed, undefined, "the bug did not reproduce")

console.log("Reproduced: parseDate rejects sv-SE's own long date.")
