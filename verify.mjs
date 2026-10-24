// Usage: node verify.mjs [fixture ...]
// Builds each fixture (default: both) from two directories with different absolute
// paths, as two checkouts of this branch would. Each checkout gets a copy of the
// fixture and of ../layer under .repro/checkouts/<fixture>/{a,second-checkout}/, is
// installed from the fixture's lockfile and built with `nuxt build`. The fixture's
// record-injected-keys.ts reports the keys `nuxt:compiler:keyed-functions` injected.
// Expected: each keyless call gets the same key in both checkouts, keys stay distinct
// per call and per file, client and ssr agree, and .output/public is identical apart
// from the build timestamp in _nuxt/builds/.
// Exits 1 while keys or client output differ, 2 when a check is inconclusive.
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURES = ['nuxt-keyed-functions-absolute-path', 'nuxt-keyed-functions-absolute-path-fix']
const CHECKOUTS = ['a', 'second-checkout']
const NOT_COPIED = new Set(['node_modules', '.nuxt', '.output', '.repro', '.data'])

class Inconclusive extends Error {}

function run (cwd, command, args) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1' } })
  if (result.status !== 0) {
    process.stderr.write(result.stdout + result.stderr)
    throw new Inconclusive(`\`${command} ${args.join(' ')}\` exited with ${result.status ?? result.signal} in ${cwd}`)
  }
  return result.stdout + result.stderr
}

function build (fixture, checkout) {
  const base = join(dirname(fixture), '.repro/checkouts', basename(fixture), checkout)
  const dir = join(base, basename(fixture))
  rmSync(base, { recursive: true, force: true })
  const copy = (from, to) => cpSync(from, to, { recursive: true, filter: src => !NOT_COPIED.has(basename(src)) })
  copy(fixture, dir)
  if (existsSync(join(dirname(fixture), 'layer'))) copy(join(dirname(fixture), 'layer'), join(base, 'layer'))
  run(dir, 'pnpm', ['install', '--frozen-lockfile', '--prefer-offline'])
  const log = run(dir, join(dir, 'node_modules/.bin/nuxt'), ['build'])
  const report = join(dir, '.repro/injected-keys.json')
  if (!existsSync(report)) throw new Inconclusive(`${dir}: record-injected-keys.ts wrote no report`)
  return { dir, log, keys: JSON.parse(readFileSync(report, 'utf8')) }
}

// One entry per call: "<module id> #<n>" -> { client, ssr }
function calls (keys) {
  const out = new Map()
  for (const [env, modules] of Object.entries(keys)) {
    for (const [id, list] of Object.entries(modules)) {
      list.forEach((key, i) => {
        const call = `${id} #${i + 1}`
        out.set(call, { ...out.get(call), [env]: key })
      })
    }
  }
  return new Map([...out].sort(([a], [b]) => a.localeCompare(b)))
}

function files (dir) {
  const out = []
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(d, e.name))
      else out.push(relative(dir, join(d, e.name)))
    }
  }
  walk(dir)
  return out.sort()
}

// _nuxt/builds/latest.json and meta/<buildId>.json carry the build time.
const normalize = (path, content) => /(^|\/)builds\/.*\.json$/.test(path)
  ? content.toString('utf8').replace(/"timestamp":\d+/g, '"timestamp":0')
  : content

function compareClientOutput (dirA, dirB) {
  const [a, b] = [dirA, dirB].map(d => join(d, '.output/public'))
  const [listA, listB] = [files(a), files(b)]
  const differences = [
    ...listA.filter(p => !listB.includes(p)).map(p => `${p} only in A`),
    ...listB.filter(p => !listA.includes(p)).map(p => `${p} only in B`),
  ]
  for (const p of listA.filter(p => listB.includes(p))) {
    const [ca, cb] = [readFileSync(join(a, p)), readFileSync(join(b, p))]
    if (!ca.equals(cb) && String(normalize(p, ca)) !== String(normalize(p, cb))) differences.push(`${p} differs`)
  }
  return { files: listA.length, differences }
}

function verify (fixture) {
  const name = relative(root, fixture) || '.'
  const [A, B] = CHECKOUTS.map(checkout => build(fixture, checkout))
  const [callsA, callsB] = [A, B].map(build => calls(build.keys))
  if (!callsA.size) throw new Inconclusive(`${name}: no key was injected`)
  for (const { dir, keys } of [A, B]) {
    const chunks = files(join(dir, '.output/public')).filter(p => p.endsWith('.js'))
      .map(p => readFileSync(join(dir, '.output/public', p), 'utf8')).join('\n')
    const missing = Object.values(keys.client ?? {}).flat().filter(key => !chunks.includes(key))
    if (missing.length) throw new Inconclusive(`${name}: ${missing.join(', ')} not found in ${relative(root, dir)}/.output/public`)
  }

  console.log(`\n${name}`)
  console.log(`  ${A.log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}`)
  for (const [label, { dir }] of [['A', A], ['B', B]]) console.log(`  ${label}: ${relative(root, dir)}`)
  console.log('  expected: the same key for each call in A and B, distinct keys, the same .output/public')
  console.log('  injected keys:')
  const failures = []
  let differing = 0
  const width = Math.max(...[...callsA.keys(), ...callsB.keys()].map(call => call.replace(/\?\S*/, '').length))
  for (const call of new Set([...callsA.keys(), ...callsB.keys()])) {
    const [a, b] = [callsA.get(call), callsB.get(call)]
    const split = [a, b].filter(k => k && k.client !== k.ssr).length
    if (split) failures.push(`${call}: client and ssr keys differ`)
    const same = a?.client && a.client === b?.client
    if (!same) differing++
    console.log(`    ${call.replace(/\?\S*/, '').padEnd(width)}  A ${a?.client ?? '(none)'}  B ${b?.client ?? '(none)'}  ${same ? 'same' : 'DIFFERENT'}${split ? ', client and ssr differ' : ''}`)
  }
  const duplicates = [A, B].map(build => [...calls(build.keys).values()].map(k => k.client))
    .filter(list => new Set(list).size !== list.length).length
  if (differing) failures.push(`${differing} of ${callsA.size} keys differ between A and B`)
  if (duplicates) failures.push(`keys repeat within ${duplicates} build(s)`)

  const client = compareClientOutput(A.dir, B.dir)
  console.log(`  actual: ${differing} of ${callsA.size} keys differ between A and B; keys ${duplicates ? 'repeat' : 'are distinct'} within each build`)
  console.log(`  .output/public: ${client.files} files, ${client.differences.length} differ${client.differences.length ? ':' : ''}`)
  for (const d of client.differences) console.log(`    ${d}`)
  if (client.differences.length) failures.push(`${client.differences.length} files in .output/public differ`)
  console.log(failures.length ? `  FAIL: ${failures.join('; ')}` : '  PASS')
  return failures.length === 0
}

const fixtures = process.argv.slice(2).map(arg => resolve(root, arg))
let code = 0
try {
  for (const fixture of fixtures.length ? fixtures : FIXTURES.map(name => join(root, name))) {
    if (!verify(fixture)) code = 1
  }
}
catch (error) {
  if (!(error instanceof Inconclusive)) throw error
  console.error(`INCONCLUSIVE: ${error.message}`)
  code = 2
}
process.exit(code)
