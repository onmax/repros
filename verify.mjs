// Usage: node verify.mjs [fixture] [--sizes 500,2000,5000] [--rounds N]
// Installs the fixture, then for each size generates that many components in its layer and
// runs `nuxt build` until `vite:extend`. app/modules/measure.ts records how long
// `@nuxt/vite-builder` takes from `build:before` to `vite:extend`, where it builds
// `server.fs.allow`, and the list it built. Exits 1 when the time grows quadratically with
// the number of components, 0 when it grows about linearly, and 2 when setup or a build fails. Builds run through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = import.meta.dirname
const argv = process.argv.slice(2)
const flag = (name, fallback) => argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback
const fixture = resolve(root, argv.find((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--')) ?? 'nuxt-vite-allow-dirs-quadratic')
const sizes = flag('--sizes', '500,2000,5000').split(',').map(Number)
const rounds = Number(flag('--rounds', '3'))
const app = join(fixture, 'app')
const components = join(fixture, 'layer/app/components')
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
}

mkdirSync(results, { recursive: true })
if (!existsSync(join(app, 'node_modules/.modules.yaml'))) run('install', 'pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], { cwd: app, env: { CI: '1' } })
const pnpmDir = join(app, 'node_modules/.pnpm')
const version = pkg => [...new Set(readdirSync(pnpmDir).map(d => d.match(new RegExp(`^${pkg.replace('/', '\\+')}@([^_]+)`))?.[1]).filter(Boolean))].join(', ')
const patched = existsSync(join(app, 'patches'))
console.log(`${name}: Node ${process.version}, nuxt-nightly ${version('nuxt-nightly')}, @nuxt/vite-builder-nightly ${version('@nuxt/vite-builder-nightly')}${patched ? ' with patches/' : ''}, vite ${version('vite')}${heavy ? ', builds through heavy' : ''}`)

function generate (n) {
  rmSync(components, { recursive: true, force: true })
  mkdirSync(components, { recursive: true })
  for (let i = 0; i < n; i++) writeFileSync(join(components, `C${i}.vue`), `<template><p>C${i}</p></template>\n`)
}

const rows = []
for (const n of sizes) {
  generate(n)
  const runs = []
  let last
  for (let r = 1; r <= rounds; r++) {
    const out = join(results, `n${n}-r${r}.json`)
    rmSync(out, { force: true })
    rmSync(join(app, '.nuxt'), { recursive: true, force: true })
    run(`n${n}-r${r}`, join(app, 'node_modules/.bin/nuxt'), ['build'], { cwd: app, env: { REPRO_OUT: out } })
    if (!existsSync(out)) fail(`n${n} round ${r} did not reach vite:extend`)
    last = JSON.parse(readFileSync(out, 'utf8'))
    runs.push(last.ms)
  }
  runs.sort((a, b) => a - b)
  rows.push({ n, registered: last.components, ms: runs[Math.floor(runs.length / 2)], allow: last.allow.map(d => d.replace(fixture, '<fixture>')) })
}
rmSync(components, { recursive: true, force: true })
writeFileSync(join(results, 'summary.json'), JSON.stringify(rows, null, 2))

console.log(`\ntime from build:before to vite:extend, median of ${rounds} build(s) per size:`)
for (const row of rows) console.log(`  ${String(row.n).padStart(5)} components (${row.registered} registered)   ${row.ms.toFixed(1).padStart(8)} ms   fs.allow: ${row.allow.length} entries`)
// Fixed work (resolving the entry, merging the Vite config) cancels out of the cost per extra
// component. That cost stays flat when the time grows linearly. When it grows quadratically it
// rises with the size: (5000 + 2000) / (2000 + 500) = 2.8x for the default sizes.
if (rows.length < 3) fail('needs three sizes')
const [a, b, c] = rows.slice(-3)
const low = (b.ms - a.ms) / (b.n - a.n)
const high = (c.ms - b.ms) / (c.n - b.n)
const ratio = high / low
const quadratic = (c.n + b.n) / (b.n + a.n)
console.log(`\neach extra component costs ${(low * 1000).toFixed(1)} µs from ${a.n} to ${b.n} and ${(high * 1000).toFixed(1)} µs from ${b.n} to ${c.n}: ${ratio.toFixed(1)}x (linear 1x, quadratic ${quadratic.toFixed(1)}x)`)
console.log(`server.fs.allow for ${c.n} components:\n${c.allow.map(d => `  ${d}`).join('\n')}`)
console.log('\nexpected: the cost per extra component stays flat (linear)')
if (ratio > (1 + quadratic) / 2) {
  console.log(`actual:   it rises ${ratio.toFixed(1)}x, and ${c.n} components take ${c.ms.toFixed(0)} ms (quadratic)`)
  process.exit(1)
}
console.log(`actual:   it changes ${ratio.toFixed(1)}x, and ${c.n} components take ${c.ms.toFixed(0)} ms`)
