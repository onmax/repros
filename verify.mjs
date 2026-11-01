// Usage: node verify.mjs [fixture]
// A Rolldown plugin in the Nitro bundle that declares `transform` as `{ handler }`, as Rolldown and
// Nitro plugins usually do, and burns 5 ms per module in `reproNitroBurn`. The profiler wraps only
// function-form hooks of Nitro's plugins, so it never reports this one.
// Bug: the plugin is missing from the perf report while the CPU profile shows its time.
// Shared by every nuxt-profiler repro: installs <fixture>/app from its lockfile, runs
// `nuxt build` with the arguments in BUILD_ARGS, and hands the output, `.nuxt/perf-report.json`,
// `.nuxt/perf-trace.json` and the CLI's `nuxt-build.cpuprofile` to `check()` below.
// Exits 1 when the bug reproduces, 0 when it does not, and 2 when setup or the build fails
// in a way the check does not expect. Builds run through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = import.meta.dirname
const fixture = resolve(root, process.argv[2] ?? "nuxt-profiler-nitro-object-hooks")
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

const { report, cpuprofile } = build('build', ['--profile=verbose'])
if (!report || !cpuprofile) fail('no perf report or CPU profile')
const cpu = cpuTimeIn(cpuprofile, 'reproNitroBurn')
if (cpu < 100) fail(`the plugin barely ran (${cpu} ms of CPU)`)
const entry = report.bundlerPlugins.find(p => p.name.includes('repro:slow-nitro-transform'))
verdict(
  !entry,
  `repro:slow-nitro-transform in the perf report with about ${cpu} ms of transform time`,
  entry ? `reported as ${entry.name} with ${JSON.stringify(entry.hooks)}` : `absent from the perf report; the CPU profile has ${cpu} ms in it`,
)
