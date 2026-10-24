// Builds this app with Nuxt's own auto-imports (`nuxt:imports-transform`, unimport in
// JS) and with Rolldown's native `transform.inject` (./native-inject/index.ts), in interleaved
// rounds. Prints build times, compares the two `.output` trees after normalizing,
// checks the keys that `nuxt:compiler:keyed-functions` adds, and renders `/` from each
// build. Exits 1 when the inject build differs from the unimport build, and 2 when the
// build or a control fails. ../nuxt-auto-imports-native-inject-fix runs this same file.
//
//   REPRO_LAB=small|big3|none  layers from the build-time study's generator (default small)
//   REPRO_RUNS=2               interleaved rounds. With 2 or more, the first two unimport
//                              builds are also compared with each other, as a control.
//   REPRO_NUXT_DEFAULTS=1      keep Nuxt's tree-shake defaults (see nuxt.config.ts)
import { spawn, spawnSync } from 'node:child_process'
import { cpSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const LABS = {
  none: [],
  small: ['--layers', '4', '--components', '40', '--pages', '6', '--composables', '10', '--utils', '6', '--api', '4'],
  // The study's big3 app, file for file.
  big3: ['--layers', '12', '--components', '250', '--pages', '20', '--composables', '30', '--utils', '16', '--api', '25', '--seed', '3'],
}
const MODES = ['unimport', 'inject']
const PORT = 3917
const lab = process.env.REPRO_LAB || 'small'
const runs = Math.max(1, Number(process.env.REPRO_RUNS || 2))
const nuxtDefaults = !!process.env.REPRO_NUXT_DEFAULTS
const nuxt = JSON.parse(readFileSync('node_modules/nuxt/package.json', 'utf8'))

function fail (code, message) {
  console.error(message)
  process.exit(code)
}
const pad = (s, n) => String(s).padEnd(n)
const seconds = s => s === undefined ? '-' : `${s.toFixed(2)}s`

if (!LABS[lab]) fail(2, `REPRO_LAB must be one of: ${Object.keys(LABS).join(', ')}`)
rmSync('lab', { recursive: true, force: true })
rmSync('out', { recursive: true, force: true })
let labInfo = 'no generated layers'
if (LABS[lab].length) {
  const gen = spawnSync(process.execPath, ['scripts/gen-layers.mjs', 'lab', ...LABS[lab]], { encoding: 'utf8' })
  if (gen.status !== 0) fail(2, gen.stderr)
  labInfo = `REPRO_LAB=${lab} ${gen.stdout.trim()}`
}

// One `nuxt build`, timed, with the per-environment times Vite prints. The `.output` is
// copied to out/<mode>-<round>, and the build log to out/<mode>-<round>.log.
function build (mode, round) {
  console.error(`building with ${mode}, round ${round} of ${runs}`)
  const start = performance.now()
  const res = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8', maxBuffer: 1 << 30, env: { ...process.env, REPRO_IMPORTS: mode } })
  const total = (performance.now() - start) / 1000
  const log = `${res.stdout}${res.stderr}`.replace(/\x1B\[[0-9;]*m/g, '')
  if (res.status !== 0) fail(2, `${log}\nnuxt build failed with REPRO_IMPORTS=${mode}`)
  const envs = {}
  let env
  for (const line of log.split('\n')) {
    env = line.match(/building (\w+) environment/)?.[1] ?? env
    const t = line.match(/built in ([\d.]+)(ms|s)\b/)
    if (t && env) {
      envs[env] = Number(t[1]) / (t[2] === 'ms' ? 1000 : 1)
      env = undefined
    }
  }
  const dir = join('out', `${mode}-${round}`)
  cpSync('.output', dir, { recursive: true })
  writeFileSync(`${dir}.log`, log)
  return { mode, round, total, envs, dir }
}

const builds = []
for (let round = 1; round <= runs; round++) {
  for (const mode of MODES) builds.push(build(mode, round))
}
const first = Object.fromEntries(MODES.map(mode => [mode, builds.find(b => b.mode === mode).dir]))

// The normalizing from the study's scripts/normdiff.mjs: hashed file names, timestamps,
// and files whose line order varies between two identical clean builds. Source maps
// are left out.
const HASH = /([-.])[A-Za-z0-9_-]{8}(?=\.(m?js|css)\b)/g
const ORDER_FREE = /(^|\/)(index\.mjs|precomputed[-.][\w#-]+\.mjs|styles[-.][\w#-]+\.mjs)$|^nitro\.json$|builds\/(latest|meta\/.*)\.json$/
function normalize (path, text) {
  text = text.replace(HASH, '$1#')
    .replace(/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?Z/g, '<time>')
    .replace(/"timestamp":\s*\d+/g, '"timestamp":0')
  if (!ORDER_FREE.test(path)) return text
  return text.split(/\r?\n/).map(l => l.replace(/,\s*$/, '').trim()).filter(l => !/^"(mtime|etag)"/.test(l)).sort().join('\n')
}
// A file without the glue between chunks: chunk file names and the names Rolldown
// derives from them, the `as` aliases in import and export lists, and the order of
// top-level statements, which follows the order of modules. Equal results mean the
// same code, laid out in other chunks or in another order.
function withoutGlue (path, text) {
  text = text.replace(/[\w.$-]+-#\.(m?js|css)/g, '<chunk>').replace(/\b[A-Za-z$][\w$]*_[\w$]{8}_exports\b/g, '<chunk>_exports')
  // Manifests list chunks by file and by the name Rolldown picked for them.
  if (!/\.m?js$/.test(path) || ORDER_FREE.test(path)) return text.split('\n').map(l => l.trim()).filter(l => !/^"?name"?: /.test(l)).sort().join('\n')
  const statements = []
  for (const line of text.split('\n')) {
    const m = line.match(/^(import|export) \{([^}]*)\}(.*)$/)
    if (m) {
      const names = m[2].split(',').map(n => n.trim()).filter(Boolean).map(n => n.split(/\s+as\s+/)[m[1] === 'import' ? 1 : 0] ?? n)
      statements.push(`${m[1]} { ${names.sort().join(', ')} }${m[3]}`)
    }
    else if (/^[^\s})\]]/.test(line) || !statements.length) statements.push(line)
    else statements[statements.length - 1] += `\n${line}`
  }
  return statements.sort().join('\n')
}
const files = dir => readdirSync(dir, { recursive: true, withFileTypes: true })
  .filter(e => e.isFile() && !e.name.endsWith('.map'))
  .map(e => relative(dir, join(e.parentPath, e.name)))
const chunks = dir => files(dir).filter(p => /\.m?js$/.test(p)).map(p => readFileSync(join(dir, p), 'utf8'))

function compare (dirA, dirB, [nameA, nameB]) {
  const read = dir => p => normalize(p, readFileSync(join(dir, p), 'utf8'))
  const stem = p => p.replace(HASH, '$1#')
  const a = Map.groupBy(files(dirA), stem)
  const b = Map.groupBy(files(dirB), stem)
  let same = 0
  let glue = 0
  const diffs = []
  const left = [[], []]
  for (const key of new Set([...a.keys(), ...b.keys()])) {
    const as = (a.get(key) ?? []).map(read(dirA)).sort()
    const bs = (b.get(key) ?? []).map(read(dirB)).sort()
    for (let i = 0; i < Math.max(as.length, bs.length); i++) {
      if (as[i] === undefined || bs[i] === undefined) left[as[i] === undefined ? 1 : 0].push({ key, text: as[i] ?? bs[i] })
      else if (as[i] === bs[i]) same++
      else {
        const [ga, gb] = [withoutGlue(key, as[i]), withoutGlue(key, bs[i])]
        if (ga === gb) glue++
        else {
          let j = 0
          while (ga[j] === gb[j]) j++
          diffs.push({ key, why: 'differs', a: ga.slice(Math.max(0, j - 70), j + 70), b: gb.slice(Math.max(0, j - 70), j + 70) })
        }
      }
    }
  }
  // A chunk that only changed its name shows up once on each side.
  for (const x of left[0]) {
    const i = left[1].findIndex(y => withoutGlue(y.key, y.text) === withoutGlue(x.key, x.text))
    if (i < 0) diffs.push({ key: x.key, why: `only in ${nameA}` })
    else {
      glue++
      left[1].splice(i, 1)
    }
  }
  for (const y of left[1]) diffs.push({ key: y.key, why: `only in ${nameB}` })
  console.log(`${nameA} vs ${nameB}: ${same + glue + diffs.length} files, ${same} identical, ${glue} with the same code in other chunks, ${diffs.length} different`)
  for (const d of diffs.slice(0, 6)) {
    console.log(`  ${d.key}: ${d.why}`)
    if (d.a !== undefined) console.log(`    ${nameA}: ${JSON.stringify(d.a)}\n    ${nameB}: ${JSON.stringify(d.b)}`)
  }
  if (diffs.length > 6) console.log(`  … and ${diffs.length - 6} more`)
  return { glue, different: diffs.length }
}

// The keys keyed-functions appends: `'$' + 10 hash characters` as the last argument.
const KEY = /"\$[\w-]{10}"\s*(?:\/\*[^*]*\*\/\s*)?\)/g
const countKeys = dir => chunks(dir).reduce((n, code) => n + (code.match(KEY)?.length ?? 0), 0)
const countCalls = (dir, name) => chunks(dir).reduce((n, code) => n + (code.match(new RegExp(String.raw`\b${name}\(`, 'g'))?.length ?? 0), 0)
const CALLS = [
  { label: `useState(() => 'repro-state')`, re: /\buseState\(\(\) => "repro-state"(?:, ("\$[\w-]{10}"))?\)/ },
  { label: `useAsyncData(() => Promise.resolve('repro-async'))`, re: /\buseAsyncData\(\(\) => Promise\.resolve\("repro-async"\)(?:, ("\$[\w-]{10}"))?\)/ },
  { label: `useFetch('/api/repro')`, re: /\buseFetch\("\/api\/repro"(?:, ("\$[\w-]{10}"))?\)/ },
]
function pageKeys (dir) {
  const code = chunks(join(dir, 'server')).find(c => CALLS[0].re.test(c)) ?? ''
  return CALLS.map(({ re }) => {
    const m = code.match(re)
    return m ? m[1] ?? 'no key' : 'call not found'
  })
}

// Starts the build's Nitro server on a fixed port, requests `/`, and stops it.
async function render (dir) {
  const server = spawn(process.execPath, [join(dir, 'server/index.mjs')], { env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' }, stdio: ['ignore', 'pipe', 'pipe'] })
  let logs = ''
  server.stdout.on('data', (d) => { logs += d })
  server.stderr.on('data', (d) => { logs += d })
  const exited = new Promise(resolve => server.once('exit', resolve))
  try {
    for (let i = 0; i < 150 && server.exitCode === null; i++) {
      const res = await fetch(`http://127.0.0.1:${PORT}/`).catch(() => undefined)
      if (res) {
        const body = await res.text()
        const shown = ['state', 'async', 'fetch', 'route'].filter(id => new RegExp(`id="${id}">[^<]+<`).test(body))
        return { status: res.status, shown, ok: res.status === 200 && shown.length === 4, logs }
      }
      await sleep(100)
    }
    return { status: 0, shown: [], ok: false, logs }
  }
  finally {
    server.kill()
    await exited
  }
}

console.log(`\n${nuxt.name}@${nuxt.version}, nuxt build, ${labInfo}${nuxtDefaults ? ', REPRO_NUXT_DEFAULTS=1' : ''}\n`)
console.log(pad('round', 7) + pad('auto-imports', 14) + pad('total', 9) + pad('client', 9) + pad('ssr', 9) + 'nitro')
for (const b of builds) console.log(pad(b.round, 7) + pad(b.mode, 14) + pad(seconds(b.total), 9) + pad(seconds(b.envs.client), 9) + pad(seconds(b.envs.ssr), 9) + seconds(b.envs.nitro))
if (runs > 1) {
  const mean = (mode, pick) => {
    const xs = builds.filter(b => b.mode === mode).map(pick)
    return xs.includes(undefined) ? undefined : xs.reduce((s, x) => s + x, 0) / xs.length
  }
  for (const mode of MODES) console.log(pad('mean', 7) + pad(mode, 14) + [b => b.total, b => b.envs.client, b => b.envs.ssr, b => b.envs.nitro].map(pick => pad(seconds(mean(mode, pick)), 9)).join('').trimEnd())
}

console.log('\nOutput after normalizing, source maps left out:')
const control = runs > 1 ? compare(first.unimport, builds.find(b => b.mode === 'unimport' && b.round === 2).dir, ['unimport #1', 'unimport #2']) : undefined
const { glue, different } = compare(first.unimport, first.inject, ['unimport', 'inject'])

console.log('\nKeys from nuxt:compiler:keyed-functions on the calls in pages/index.vue (server chunk):')
const keys = Object.fromEntries(MODES.map(mode => [mode, pageKeys(first[mode])]))
console.log(pad('call', 54) + pad('unimport', 16) + 'inject')
CALLS.forEach(({ label }, i) => console.log(pad(label, 54) + pad(keys.unimport[i], 16) + keys.inject[i]))
const totals = Object.fromEntries(MODES.map(mode => [mode, { client: countKeys(join(first[mode], 'public')), server: countKeys(join(first[mode], 'server')) }]))
console.log(`Keys in all of .output: ${MODES.map(m => `${m} ${totals[m].client} client, ${totals[m].server} server`).join('; ')}`)
console.log(`definePageMeta( calls in .output: ${MODES.map(m => `${m} ${countCalls(first[m], 'definePageMeta')}`).join(', ')}`)

if (await fetch(`http://127.0.0.1:${PORT}/`).then(() => true, () => false)) fail(2, `Port ${PORT} is busy, so / can't be rendered.`)
console.log(`\nGET / from each build's server, port ${PORT}:`)
const pages = {}
for (const mode of MODES) {
  pages[mode] = await render(first[mode])
  const error = pages[mode].logs.split('\n').find(l => /NUXT_E\d+|Error/.test(l))
  console.log(`${pad(mode, 10)}${pad(pages[mode].status, 5)}rendered: ${pages[mode].shown.join(', ') || 'nothing'}${error ? `\n          ${error.trim().slice(0, 160)}` : ''}`)
}

if (keys.unimport.some(k => !k.startsWith('"$')) || !pages.unimport.ok) fail(2, '\nControl failed: the unimport build should key all three calls and render /.')
if (control && control.glue + control.different) fail(2, '\nControl failed: two unimport builds differ, so the normalizing misses some nondeterminism.')
if (keys.inject.includes('call not found')) fail(2, '\nBroken fixture: a call from pages/index.vue is missing from the inject build.')
const problems = []
const missing = totals.unimport.client + totals.unimport.server - totals.inject.client - totals.inject.server
if (missing) problems.push(`${missing} compiler keys missing`)
if (!pages.inject.ok) problems.push(`/ returned ${pages.inject.status}`)
if (different && !nuxtDefaults) problems.push(`${different} files differ`)
if (problems.length) {
  console.log(`\nFAIL: the inject build differs from the unimport build: ${problems.join(', ')}.`)
  process.exit(1)
}
console.log(`\nPASS: same keys and the same page${nuxtDefaults ? '' : `, and every file has the same code after normalizing (${glue} of them laid out in other chunks)`}.`)
