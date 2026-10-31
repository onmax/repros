// Usage: node verify.mjs [fixture]
// Installs <fixture>/app from its lockfile and runs `nuxt build` once. app/modules/templates.ts
// adds three ordinary templates and `repro/slow.mjs`, whose getContents awaits once and then
// busy-waits 700 ms. app/modules/stop.ts stops the build at `build:before`, after generateApp
// has compiled every template and before Vite or Nitro start.
// Nuxt prints "Compiled <template> in <ms>ms" for each template it timed at more than 500 ms.
// A fixed Nuxt may instead print one "Generating templates took <ms>ms" line for the whole batch.
// Exits 1 when it prints a "Compiled" line for any template other than repro/slow.mjs, 0 when it
// prints none for other templates and reports the 700 ms block (a line for repro/slow.mjs or a batch
// line of at least 700 ms), and 2 when setup or the build fails, the build doesn't reach
// build:before, or the block isn't reported at all. Builds run through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = import.meta.dirname
const fixture = resolve(root, process.argv[2] ?? 'nuxt-template-compile-time-log')
const app = join(fixture, 'app')
const results = join(fixture, 'results')
const heavy = process.env.REPRO_HEAVY !== '0' && spawnSync('sh', ['-c', 'command -v heavy']).status === 0
const name = relative(root, fixture)
const SLOW = '#build/repro/slow.mjs'

function fail (message) {
  console.error(`${name}: ${message}`)
  process.exit(2)
}

function run (label, cmd, args, options) {
  const [bin, ...rest] = heavy ? ['heavy', cmd, ...args] : [cmd, ...args]
  const result = spawnSync(bin, rest, { encoding: 'utf8', ...options, env: { ...process.env, HEAVY_WAIT: '0', ...options.env } })
  const output = result.stdout + result.stderr
  writeFileSync(join(results, `${label}.log`), output)
  if (result.status !== 0) {
    console.error(output.split('\n').slice(-30).join('\n'))
    fail(`${label} failed with ${result.status ?? result.signal}`)
  }
  return output
}

if (!existsSync(app)) fail('no such fixture')
mkdirSync(results, { recursive: true })
if (!existsSync(join(app, 'node_modules/.modules.yaml'))) run('install', 'pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], { cwd: app, env: { CI: '1' } })
const pnpmDir = join(app, 'node_modules/.pnpm')
const version = pkg => [...new Set(readdirSync(pnpmDir).map(d => d.match(new RegExp(`^${pkg.replace('/', '\\+')}@([^_(]+)`))?.[1]).filter(Boolean))].join(', ')
const patched = existsSync(join(app, 'patches'))
console.log(`${name}: Node ${process.version}, nuxt ${version('nuxt')}${patched ? ' with patches/' : ''}, @nuxt/kit ${version('@nuxt/kit')}${heavy ? ', builds through heavy' : ''}`)

rmSync(join(app, '.nuxt'), { recursive: true, force: true })
const output = run('build', join(app, 'node_modules/.bin/nuxt'), ['build'], { cwd: app, env: {} })
  .replace(/\x1B\]8;[^\x07\x1B]*(?:\x07|\x1B\\)/g, '') // terminal hyperlinks
  .replace(/\x1B\[[0-9;]*m/g, '') // colors
rmSync(join(app, '.nuxt'), { recursive: true, force: true })

const stopped = output.match(/repro: stopped at build:before after (\d+) templates/)
if (!stopped) fail('the build did not reach build:before')
const lines = [...output.matchAll(/Compiled `?([^`\s]+)`? in ([\d.]+)ms/g)].map(m => ({ template: m[1], ms: Number(m[2]) }))
const slow = lines.find(l => l.template === SLOW)
const others = lines.filter(l => l.template !== SLOW)
const batch = output.match(/Generating templates took ([\d.]+)ms/)

console.log(`\n\`nuxt build\` to build:before compiled ${stopped[1]} templates. Nuxt printed ${lines.length} "Compiled ... in" line${lines.length === 1 ? '' : 's'}:`)
console.log(`  ${SLOW.padEnd(36)} ${slow ? `${slow.ms} ms` : 'not reported'}`)
if (batch) console.log(`and one line for the whole batch: "Generating templates took ${batch[1]}ms"`)
if (others.length) {
  const ms = others.map(l => l.ms)
  console.log(`  ${`${others.length} other templates`.padEnd(36)} ${Math.min(...ms)} to ${Math.max(...ms)} ms`)
  for (const l of others) console.log(`    ${l.template.padEnd(34)} ${l.ms} ms`)
}

console.log(`\nexpected: no line for a template that only waited; one line for ${SLOW}, the only template whose own work takes more than 500 ms (a 700 ms busy-wait), or one line for the whole batch`)
if (!slow && !(batch && Number(batch[1]) >= 700)) fail(`neither ${SLOW} nor a batch of at least 700 ms was reported; the stand-in did not block`)
if (others.length) {
  const fast = others.filter(l => l.template.startsWith('#build/repro/fast-')).map(l => l.template)
  console.log(`actual:   ${lines.length} lines; ${others.length} for templates that only waited while ${SLOW} blocked the event loop, including ${fast.join(', ') || 'none of the repro/fast-* templates'}`)
  process.exit(1)
}
console.log(slow ? `actual:   one line, for ${SLOW}` : `actual:   no per-template lines; one batch line of ${batch[1]} ms`)
