// Usage: node bench.mjs <variant-dir>
// Times `micromark(value)` for each input in one installed variant and prints JSON.
import {createHash} from 'node:crypto'
import {readFileSync, realpathSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join} from 'node:path'
import {performance} from 'node:perf_hooks'
import {pathToFileURL} from 'node:url'

const dir = process.argv[2]
const runs = Number(process.env.RUNS || 5)

const require = createRequire(join(dir, 'package.json'))
const {micromark} = await import(pathToFileURL(require.resolve('micromark')).href)

// Read the versions that this variant really resolved.
const micromarkDir = realpathSync(join(dir, 'node_modules/micromark'))
const coreDir = realpathSync(join(dirname(micromarkDir), 'micromark-core-commonmark'))
const version = (path) => JSON.parse(readFileSync(join(path, 'package.json'), 'utf8')).version
let editMap = 'none'
try {
  editMap = version(realpathSync(join(dirname(coreDir), 'micromark-util-edit-map')))
} catch {}

const p =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.\n'
const section = (i) => `Section ${i}\n----------\n\n${p}${p}\n> ${p}\n- Item\n- Item\n\n`

// Inputs from micromark/micromark#246. 16 KB is Chat SDK's default parse limit.
const cases = [
  {name: 'block quotes', unit: () => '> a\n\n', sizes: [8, 16, 32]},
  {name: 'nested lists', unit: () => '- a\n  - b\n', sizes: [8, 16, 32]},
  {name: 'setext headings', unit: () => 'a\n=\n', sizes: [8, 16, 32]},
  {name: 'mixed sections', unit: section, sizes: [32, 256]}
]

const results = []
for (const c of cases) {
  for (const kb of c.sizes) {
    let value = ''
    for (let i = 0; value.length < kb * 1024; i++) value += c.unit(i)
    micromark(value) // warm up
    const times = []
    let html = ''
    for (let r = 0; r < runs; r++) {
      const start = performance.now()
      html = micromark(value)
      times.push(performance.now() - start)
    }
    times.sort((a, b) => a - b)
    results.push({
      case: c.name,
      kb,
      medianMs: Math.round(times[Math.floor(times.length / 2)]),
      html: createHash('sha256').update(html).digest('hex').slice(0, 12)
    })
  }
}

console.log(
  JSON.stringify({
    micromark: version(micromarkDir),
    core: version(coreDir),
    editMap,
    node: process.version,
    runs,
    results
  })
)
