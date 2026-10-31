// Usage: node verify.mjs [fixture] [--layers 1,20]
// Installs the fixture, then for each layer count generates that many empty layers in
// <fixture>/layers/ and runs `nuxt build` twice: with the default icon options, and with
// `icon.serverBundle.externalizeIconsJson: true`. app/modules/stop.ts stops each build at
// `build:before`, after Nuxt has run the `nitro:config` hooks and written the templates and
// before Vite or Nitro start. The count.mjs preload counts each time @nuxt/icon checks whether
// @iconify/json is installed, and the node:fs calls each check makes.
// Exits 1 when a build checks more than once, 0 when every build checks once, and 2 when setup
// or a build fails. Builds run through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = import.meta.dirname
const argv = process.argv.slice(2)
const flag = (name, fallback) => argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback
const fixture = resolve(root, argv.find((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--')) ?? 'nuxt-icon-full-collection-check')
const layerCounts = flag('--layers', '1,20').split(',').map(Number)
const app = join(fixture, 'app')
const layersDir = join(fixture, 'layers')
const results = join(fixture, 'results')
const heavy = process.env.REPRO_HEAVY !== '0' && spawnSync('sh', ['-c', 'command -v heavy']).status === 0
const name = relative(root, fixture)

function fail (message) {
  console.error(`${name}: ${message}`)
  process.exit(2)
}

function run (label, cmd, args, options) {
  const [bin, ...rest] = heavy ? ['heavy', cmd, ...args] : [cmd, ...args]
  const result = spawnSync(bin, rest, { encoding: 'utf8', ...options, env: { ...process.env, HEAVY_WAIT: '0', ...options.env } })
  writeFileSync(join(results, `${label}.log`), result.stdout + result.stderr)
  if (result.status !== 0) {
    console.error((result.stdout + result.stderr).split('\n').slice(-30).join('\n'))
    fail(`${label} failed with ${result.status ?? result.signal}`)
  }
  return result.stdout + result.stderr
}

mkdirSync(results, { recursive: true })
if (!existsSync(join(app, 'node_modules/.modules.yaml'))) run('install', 'pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], { cwd: app, env: { CI: '1' } })
const pnpmDir = join(app, 'node_modules/.pnpm')
const version = pkg => [...new Set(readdirSync(pnpmDir).map(d => d.match(new RegExp(`^${pkg.replace('/', '\\+')}@([^_]+)`))?.[1]).filter(Boolean))].join(', ')
if (version('@iconify/json')) fail('@iconify/json is installed; the bug needs it missing')
const patched = existsSync(join(app, 'patches'))
console.log(`${name}: Node ${process.version}, nuxt ${version('nuxt')}, @nuxt/icon ${version('@nuxt/icon')}${patched ? ' with patches/' : ''}, local-pkg ${version('local-pkg')}, mlly ${version('mlly')}, @iconify/json not installed${heavy ? ', builds through heavy' : ''}`)

function generate (n) {
  rmSync(layersDir, { recursive: true, force: true })
  for (let i = 0; i < n; i++) {
    mkdirSync(join(layersDir, `layer-${i}`), { recursive: true })
    writeFileSync(join(layersDir, `layer-${i}`, 'nuxt.config.ts'), 'export default defineNuxtConfig({})\n')
  }
}

const configs = [
  { label: 'default', env: {} },
  { label: 'externalizeIconsJson', env: { REPRO_EXTERNALIZE: '1' } },
]
const rows = []
for (const n of layerCounts) {
  generate(n)
  for (const config of configs) {
    const label = `${config.label}-${n}`
    const out = join(results, `${label}.json`)
    rmSync(out, { force: true })
    rmSync(join(app, '.nuxt'), { recursive: true, force: true })
    run(label, join(app, 'node_modules/.bin/nuxt'), ['build'], {
      cwd: app,
      env: { ...config.env, REPRO_LAYERS: String(n), REPRO_OUT: out, NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --import ${pathToFileURL(join(root, 'count.mjs')).href}` },
    })
    if (!existsSync(out)) fail(`${label} did not reach build:before`)
    const r = JSON.parse(readFileSync(out, 'utf8'))
    if (!r.wrapped) fail(`${label}: count.mjs did not attach to local-pkg`)
    const bySite = {}
    for (const c of r.checks) bySite[c.site] = (bySite[c.site] ?? 0) + 1
    rows.push({
      config: config.label,
      layers: n,
      paths: [...new Set(r.checks.map(c => c.paths))].join('/') || '-',
      collections: r.collections.length,
      checks: r.checks.length,
      bySite,
      found: [...new Set(r.checks.map(c => c.found))],
      stat: r.checks.reduce((s, c) => s + (c.fs.statSync ?? 0), 0),
      output: r.output,
    })
  }
}
rmSync(layersDir, { recursive: true, force: true })
rmSync(join(app, '.nuxt'), { recursive: true, force: true })
writeFileSync(join(results, 'summary.json'), JSON.stringify(rows, null, 2))

const collections = rows[0]?.collections
console.log(`\n@iconify/json checks in one \`nuxt build\` (to build:before), ${collections} collections in the server bundle:`)
console.log('  options               layers  paths  discover  nitro:config  template  checks  statSync  per check  .nuxt output')
for (const r of rows) {
  const at = s => String(r.bySite[s] ?? 0)
  console.log(`  ${r.config.padEnd(20)}  ${String(r.layers).padStart(6)}  ${String(r.paths).padStart(5)}  ${at('discover collections').padStart(8)}  ${at('nitro:config hook').padStart(12)}  ${at('server-bundle template').padStart(8)}  ${String(r.checks).padStart(6)}  ${String(r.stat).padStart(8)}  ${String(r.checks ? Math.round(r.stat / r.checks) : 0).padStart(9)}  ${r.output.files} files ${r.output.sha256}`)
}
const plural = n => `${n} layer${n === 1 ? '' : 's'}`
const answers = new Set(rows.flatMap(r => r.found))
const first = rows.find(r => r.layers === layerCounts[0] && r.config === 'default')
const last = rows.find(r => r.layers === layerCounts.at(-1) && r.config === 'externalizeIconsJson')
console.log(`\npaths: the resolvePaths of each check, rootDir + workspaceDir + every layer root in a Set (here rootDir is in it twice, with and without the trailing slash of its layer root).`)
console.log(`every check answered ${[...answers].join(' and ')}. statSync calls in the checks: ${first.stat} (${plural(first.layers)}, default) to ${last.stat} (${plural(last.layers)}, externalizeIconsJson), ${(last.stat / first.stat).toFixed(1)}x.`)

console.log('\nexpected: one @iconify/json check per build, since the answer cannot change during a build')
const repeated = rows.filter(r => r.checks > 1)
if (rows.some(r => r.checks === 0)) fail('a build made no @iconify/json check; the counter missed it')
if (repeated.length) {
  const worst = repeated.reduce((a, b) => b.checks >= a.checks ? b : a)
  console.log(`actual:   ${repeated.length} of ${rows.length} builds check more than once: once to discover collections, once per collection in the template, and once more per collection in nitro:config with externalizeIconsJson (${worst.checks} checks and ${worst.stat} statSync calls with ${plural(worst.layers)})`)
  process.exit(1)
}
console.log(`actual:   every build checks once (${rows.map(r => r.stat).join(', ')} statSync calls)`)
