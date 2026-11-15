// Claim: in a Nuxt 5 production build, several core JS plugin hooks have no native filter, so Rolldown
// calls into JS for (nearly) every module, and `nuxt:vue-packages` re-resolves the same Vue specifiers
// once per importer. Each unfiltered transform hook costs measurable build time.
// Exits 1 when the counts show the claim is false.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'

const root = import.meta.dirname
const app = join(root, 'app')
if (!existsSync(join(root, 'node_modules/nuxt'))) {
  // run from `npm run`, the parent's npm_config_* settings would leak into this install
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.toLowerCase().startsWith('npm_')))
  execFileSync('npm', ['ci', '--no-audit', '--no-fund', '--loglevel=error'], { cwd: root, env, stdio: 'inherit' })
}
const { createLargeApp } = await import('./generate-app.ts')
await createLargeApp(app)
const config = join(app, 'nuxt.config.ts')
writeFileSync(config, readFileSync(config, 'utf8').replace('devtools: { enabled: false },', 'devtools: { enabled: false },\n  modules: [\'../modules/count-hooks.ts\', \'../modules/noop-hooks.ts\'],'))
const nuxt = join(root, 'node_modules/nuxt/bin/nuxt.mjs')

function build (env = {}) {
  rmSync(join(app, '.nuxt'), { recursive: true, force: true })
  rmSync(join(app, '.output'), { recursive: true, force: true })
  const start = performance.now()
  execFileSync(process.execPath, [nuxt, 'build'], { cwd: app, env: { ...process.env, ...env }, stdio: 'ignore' })
  return (performance.now() - start) / 1000
}

// 1. how many times each hook is called in one build
rmSync(join(root, 'calls-repro.tsv'), { force: true })
build({ OCEAN_WRAP: '^(nuxt|nitro):', OCEAN_TAG: 'repro', OCEAN_OUT: root })
const calls = Object.fromEntries(readFileSync(join(root, 'calls-repro.tsv'), 'utf8').trim().split('\n').map((line) => {
  const [plugin, hook, n] = line.split('\t')
  return [`${plugin} ${hook}`, Number(n)]
}))
const expected = [
  ['nuxt:runtime-paths-dep transform', 1000, 'acts only on modules containing __VITE_ASSET__'],
  ['nuxt:module-preload-polyfill transform', 1000, 'acts only on the client entry'],
  ['nuxt:remove-plugin-metadata:client transform', 1000, 'acts only on plugin files'],
  ['nuxt:build-outputs load', 1000, 'acts only on its own \\0 ids'],
  ['nuxt:nitro-virtual-bridge load', 1000, 'acts only on its own \\0 ids'],
  ['nitro:server-aliases resolveId', 5000, 'acts only on ids aliased to node: builtins'],
  ['nuxt:vue-packages resolveId', 1000, 'a handful of distinct specifiers, each re-resolved per importer'],
]
let ok = true
console.log('\nJS calls per `nuxt build` (expected: few; actual):')
for (const [key, threshold, why] of expected) {
  const n = calls[key] ?? 0
  const reproduced = n >= threshold
  ok &&= reproduced
  console.log(`${reproduced ? 'REPRODUCED' : 'not seen  '} ${String(n).padStart(6)}  ${key}  (${why})`)
}

// 2. price of one unfiltered transform hook: 0 vs 20 no-op hooks, alternating, min of 3
const times = { 0: [], 20: [] }
for (let r = 0; r < 3; r++) {
  for (const n of [0, 20]) times[n].push(build({ OCEAN_NOOP: String(n) }))
}
const delta = Math.min(...times[20]) - Math.min(...times[0])
console.log(`\nbuild with 0 no-op transform hooks: min ${Math.min(...times[0]).toFixed(2)} s; with 20: min ${Math.min(...times[20]).toFixed(2)} s`)
console.log(`=> one unfiltered transform hook costs about ${(delta / 20 * 1000).toFixed(0)} ms per build of this app`)
process.exit(ok ? 0 : 1)
