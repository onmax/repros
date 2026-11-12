import assert from "node:assert/strict"

process.env.TZ = "UTC"
const { formatDate, parseDate } = await import("@ui-sdk/core/date")

const reference = { referenceDate: "2026-06-01" }
console.log(`node ${process.version}, icu ${process.versions.icu}`)

// Control: same locale and shape; มกราคม (January) has no combining marks.
const january = "16 มกราคม 2569"
const januaryParsed = parseDate(january, "th-TH", reference)
console.log(`control th-TH ${JSON.stringify(january)}: expected "2026-01-16", actual ${JSON.stringify(januaryParsed)}`)
assert.equal(januaryParsed, "2026-01-16")

// ตุลาคม (October) contains U+0E38 THAI CHARACTER SARA U, a combining mark (\p{M}).
const october = formatDate("2026-10-16", "th-TH", { dateStyle: "long" })
assert.equal(october, "16 ตุลาคม 2569")
const octoberParsed = parseDate(october, "th-TH", reference)
console.log(`repro   th-TH ${JSON.stringify(october)}: expected "2026-10-16", actual ${JSON.stringify(octoberParsed)}`)
console.log(`        tokens /\\p{N}+|\\p{L}+/gu sees: ${JSON.stringify(october.match(/\p{N}+|\p{L}+/gu))}`)
assert.equal(octoberParsed, undefined, "the bug did not reproduce")

console.log("Reproduced: parseDate rejects th-TH's own long date when the month name has a combining mark.")
