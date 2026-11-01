// Usage: node verify.mjs [fixture]
// A Vite plugin that burns 20 ms of CPU whenever it resolves `vue` or `@vue/*`. `nuxt:bundled-vue`
// does no work of its own: it awaits `this.resolve(id, importer, { skipSelf: true })`, which runs
// that plugin. The profiler charges the awaited time to `nuxt:bundled-vue` as well.
// Bug: `nuxt:bundled-vue` resolveId totalTime is more than half of the slow plugin's.
// Shared by every nuxt-profiler repro: installs <fixture>/app from its lockfile, runs
// `nuxt build` with the arguments in BUILD_ARGS, and hands the output, `.nuxt/perf-report.json`,
// `.nuxt/perf-trace.json` and the CLI's `nuxt-build.cpuprofile` to `check()` below.
// Exits 1 when the bug reproduces, 0 when it does not, and 2 when setup or the build fails
// in a way the check does not expect. Builds run through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = import.meta.dirname
const fixture = resolve(root, process.argv[2] ?? "nuxt-profiler-nested-resolve")
const app = join(fixture, 'app')
const results = join(fixture, 'results')
const heavy = process.env.REPRO_HEAVY !== '0' && spawnSync('sh', ['-c', 'command -v heavy']).status === 0
const name = relative(root, fixture)

function fail (message) {
  console.error(`${name}: ${message}`)
  process.exit(2)
}

function run (label, cmd, args, options = {}) {
  const [bin, ...rest] = heavy ? ['heavy', cmd, ...args] : [cmd, ...args]
  const result = spawnSync(bin, rest, { encoding: 'utf8', ...options, env: { ...process.env, HEAVY_WAIT: '0', ...options.env } })
  const output = (result.stdout + result.stderr)
    .replace(/\x1B\]8;[^\x07\x1B]*(?:\x07|\x1B\\)/g, '') // terminal hyperlinks
    .replace(/\x1B\[[0-9;]*m/g, '') // colors
  writeFileSync(join(results, `${label}.log`), output)
  if (result.status !== 0 && !options.allowFailure) {
    console.error(output.split('\n').slice(-30).join('\n'))
    fail(`${label} failed with ${result.status ?? result.signal}`)
  }
  return { output, status: result.status }
}

const readJson = file => existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : undefined

if (!existsSync(app)) fail('no such fixture')
mkdirSync(results, { recursive: true })
if (!existsSync(join(app, 'node_modules/.modules.yaml'))) run('install', 'pnpm', ['install', '--frozen-lockfile'], { cwd: app, env: { CI: '1' } })
const pnpmDir = join(app, 'node_modules/.pnpm')
const version = pkg => [...new Set(readdirSync(pnpmDir).map(d => d.match(new RegExp(`^${pkg.replace('/', '\\+')}@([^_(]+)`))?.[1]).filter(Boolean))].join(', ')
console.log(`${name}: Node ${process.version}, nuxt-nightly ${version('nuxt-nightly')}, @nuxt/cli-nightly ${version('@nuxt/cli-nightly')}, nitro ${version('nitro')}, vite ${version('vite')}${existsSync(join(app, 'patches')) ? ' with patches/' : ''}${heavy ? ', builds through heavy' : ''}`)

function build (label, args, env = {}, allowFailure = false) {
  for (const dir of ['.nuxt', '.output']) rmSync(join(app, dir), { recursive: true, force: true })
  for (const f of readdirSync(app)) if (f.endsWith('.cpuprofile')) rmSync(join(app, f))
  const { output, status } = run(label, join(app, 'node_modules/.bin/nuxt'), ['build', ...args], { cwd: app, env, allowFailure })
  const cpuprofile = readdirSync(app).find(f => f.startsWith('nuxt-build') && f.endsWith('.cpuprofile'))
  return {
    output,
    status,
    report: readJson(join(app, '.nuxt/perf-report.json')),
    trace: readJson(join(app, '.nuxt/perf-trace.json')),
    cpuprofile: cpuprofile ? readJson(join(app, cpuprofile)) : undefined,
  }
}

/** Milliseconds of samples in a V8 CPU profile whose stack contains a function called `fnName`. */
function cpuTimeIn (profile, fnName) {
  const parent = new Map()
  const nodes = new Map(profile.nodes.map(n => [n.id, n]))
  for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id)
  let us = 0
  profile.samples.forEach((id, i) => {
    for (let cur = id; cur !== undefined; cur = parent.get(cur)) {
      if (nodes.get(cur).callFrame.functionName === fnName) { us += profile.timeDeltas[i + 1] ?? 0; break }
    }
  })
  return Math.round(us / 1000)
}

function verdict (bug, expected, actual) {
  console.log(`expected: ${expected}`)
  console.log(`actual:   ${actual}`)
  console.log(bug ? `${name}: BUG REPRODUCED` : `${name}: not reproduced`)
  process.exit(bug ? 1 : 0)
}

const { report, output, cpuprofile } = build('build', ['--profile=verbose'])
if (!report || !cpuprofile) fail('the build wrote no perf report or CPU profile')
const hook = (plugin, h) => report.bundlerPlugins.find(p => p.name === plugin)?.hooks[h]
const slow = hook('repro:slow-resolver', 'resolveId')
const vue = hook('nuxt:bundled-vue', 'resolveId')
if (!slow || !vue) fail('expected both plugins in the perf report')
const slowest = output.match(/Bundler Plugins\s*\n\s*\n\s*• (.+)/)?.[1]
const bundle = report.phases.find(p => p.name === 'build:bundle')?.duration
const sum = report.bundlerPlugins.reduce((s, p) => s + Object.values(p.hooks).reduce((t, h) => t + h.totalTime, 0), 0)
verdict(
  vue.totalTime > slow.totalTime * 0.5,
  `nuxt:bundled-vue resolveId near 0 ms; repro:slow-resolver about ${cpuTimeIn(cpuprofile, 'busy')} ms (its CPU time in the profile)`,
  `nuxt:bundled-vue resolveId ${vue.totalTime} ms over ${vue.count} calls, repro:slow-resolver ${slow.totalTime} ms over ${slow.count} calls. ` +
    `All plugin totals add up to ${Math.round(sum)} ms inside a ${bundle} ms build:bundle. The CLI lists first: "${slowest}"`,
)
