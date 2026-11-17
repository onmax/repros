// Installs each variant, benchmarks it in its own process, prints a table, and
// exits nonzero when 4.0.3 is not much slower than 4.0.2 on the 32 KB inputs.
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const variants = [
  ['4.0.2', join(here, 'variants/micromark-4.0.2')],
  ['4.0.2 + core 2.0.4', join(here, 'variants/micromark-4.0.2-core-2.0.4')],
  ['4.0.3', join(here, 'variants/micromark-4.0.3')],
  ['4.0.3 + #249', join(here, '../micromark-4-0-3-slowdown-fix')]
]

const data = {}
for (const [label, dir] of variants) {
  if (!process.env.SKIP_INSTALL) {
    execFileSync('pnpm', ['install', '--frozen-lockfile', '--silent'], {cwd: dir, stdio: 'inherit'})
  }
  const out = execFileSync('node', [join(here, 'bench.mjs'), dir], {encoding: 'utf8'})
  data[label] = JSON.parse(out)
  const d = data[label]
  console.error(`${label}: micromark ${d.micromark}, core-commonmark ${d.core}, edit-map ${d.editMap}`)
}

const labels = Object.keys(data)
const first = data[labels[0]]
console.log(`\nNode ${first.node}, median of ${first.runs} runs, micromark(value), ms\n`)
console.log(`| Input | Size | ${labels.join(' | ')} |`)
console.log(`| --- | ---: | ${labels.map(() => '---:').join(' | ')} |`)
first.results.forEach((row, i) => {
  const cells = labels.map((l) => data[l].results[i].medianMs)
  console.log(`| ${row.case} | ${row.kb} KB | ${cells.join(' | ')} |`)
})

const failures = []
first.results.forEach((row, i) => {
  if (row.kb !== 32 || row.case === 'mixed sections') return
  const base = data['4.0.2'].results[i]
  const slow = data['4.0.3'].results[i]
  const fixed = data['4.0.3 + #249'].results[i]
  if (slow.medianMs < 3 * base.medianMs) {
    failures.push(`${row.case}: 4.0.3 ${slow.medianMs} ms is not 3x 4.0.2 ${base.medianMs} ms`)
  }
  if (fixed.medianMs > 1.5 * base.medianMs) {
    failures.push(`${row.case}: patched 4.0.3 ${fixed.medianMs} ms is above 1.5x 4.0.2`)
  }
  if (fixed.html !== slow.html) {
    failures.push(`${row.case}: patched 4.0.3 renders different HTML`)
  }
})

if (failures.length) {
  console.log(`\nClaim not reproduced:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log('\nReproduced: 4.0.3 is at least 3x slower than 4.0.2 on every 32 KB input, and the #249 change restores 4.0.2 times with the same HTML.')
