// Runs build-one.mjs at several N, each in a fresh process, and fails when the
// time spent in vite:css-post renderChunk grows faster than N.
// Usage: node bench.mjs [N...]   (default: 250 500 1000 2000 4000)
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const sizes = process.argv.slice(2).map(Number)
if (!sizes.length) sizes.push(250, 500, 1000, 2000, 4000)

const script = fileURLToPath(new URL('./build-one.mjs', import.meta.url))
const rows = sizes.map((n) => JSON.parse(execFileSync(process.execPath, ['--preserve-symlinks-main', script, String(n)], { encoding: 'utf8' })))

console.log('N      chunks  renderChunk sync  per chunk  whole build  output hash')
for (const r of rows) {
  console.log(
    `${String(r.n).padEnd(6)} ${String(r.chunks).padEnd(7)} ${r.syncMs.toFixed(0).padStart(8)} ms ${((r.syncMs / r.n) * 1000).toFixed(0).padStart(10)} µs ${r.buildMs.toFixed(0).padStart(9)} ms  ${r.outHash}`,
  )
}

// Growth exponent between the smallest and largest N: 1 is linear, 2 is quadratic.
const a = rows[0]
const b = rows.at(-1)
const exponent = Math.log(b.syncMs / a.syncMs) / Math.log(b.n / a.n)
console.log(`\ngrowth exponent ${exponent.toFixed(2)} (expected about 1, fails above 1.5)`)
if (exponent > 1.5) {
  console.error('FAIL: vite:css-post renderChunk grows faster than the number of chunks')
  process.exit(1)
}
console.log('PASS: vite:css-post renderChunk grows linearly')
