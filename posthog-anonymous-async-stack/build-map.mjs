// Writes dist/handler.mjs and a source map back to src/handler.ts.
// Each arrow function gets the source-map name "async", as Nitro's minified build emitted.
import { writeFileSync } from 'node:fs'

const js = [
  'function validateQuery(e){throw new Error("Invalid value: Expected >=1 but received 0")}',
  'const handler=async e=>validateQuery(e);',
  'function dispatch(e){return handler(e)}',
  'const route=async e=>{await null;return dispatch(e)};',
  'export const outer=async e=>await route(e);',
]
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const vlq = n => {
  let v = n < 0 ? (-n << 1) | 1 : n << 1
  let out = ''
  do {
    let digit = v & 31
    v >>>= 5
    if (v) digit |= 32
    out += chars[digit]
  } while (v)
  return out
}
let prevLine = 0
let prevName = 0
const mappings = js.map((code, line) => {
  let prevCol = 0
  let prevSourceCol = 0
  const segment = (col, name) => {
    let s = vlq(col - prevCol) + 'A' + vlq(line - prevLine) + vlq(0 - prevSourceCol)
    prevCol = col
    prevLine = line
    if (name !== undefined) {
      s += vlq(name - prevName)
      prevName = name
    }
    return s
  }
  const segments = [segment(0)]
  const arrow = code.indexOf('async e=>')
  if (arrow !== -1) {
    segments.push(segment(arrow, 0))
    segments.push(segment(arrow + 'async e=>'.length))
  }
  return segments.join(',')
}).join(';')

writeFileSync('dist/handler.mjs', js.join('\n') + '\n//# sourceMappingURL=handler.mjs.map\n')
writeFileSync('dist/handler.mjs.map', JSON.stringify({
  version: 3,
  file: 'handler.mjs',
  sources: ['../src/handler.ts'],
  names: ['async'],
  mappings,
}) + '\n')
