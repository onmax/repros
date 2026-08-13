import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { readOds } from "hucre/ods"

const input = new Uint8Array(await readFile(new URL("./libreoffice-basic.ods", import.meta.url)))
const rows = (await readOds(input)).sheets[0].rows

console.log("row lengths:", rows.map((row) => row.length))

assert.equal(rows[0].length, 5)
assert.equal(rows[4][1], "#DIV/0!")
