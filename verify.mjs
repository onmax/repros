// Usage: node verify.mjs [fixture]
// Installs the fixture from its lockfile if needed. Then, each in a fresh process, it runs the
// fixture's check.mjs: isPackageExists('@iconify/json', { paths }) for a package that is not
// installed, with 1, 2, 4, 8, 16 and 23 paths, counting fs.statSync and fs.existsSync calls.
// It also checks that isPackageExists still gives local-pkg 1.2.1's answers for names that do
// resolve. The verdict uses call counts only; times are printed for information.
// Exit codes: 1 when the calls grow linearly with the paths and are mostly repeats (the bug),
// 0 when they don't, 3 when an answer differs from stock local-pkg 1.2.1, 2 when setup fails.
// The install runs through `heavy` when it is installed.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { isDeepStrictEqual } from 'node:util'

const root = import.meta.dirname
const fixture = resolve(root, process.argv[2] ?? 'local-pkg-is-package-exists-paths')
const name = relative(root, fixture)
const sizes = [1, 2, 4, 8, 16, 23]
const heavy = process.env.REPRO_HEAVY !== '0' && spawnSync('sh', ['-c', 'command -v heavy']).status === 0

function fail (message) {
  console.error(`${name}: ${message}`)
  process.exit(2)
}
process.on('uncaughtException', error => fail(error.stack))

function run (cmd, args, env = {}) {
  const result = spawnSync(cmd, args, { cwd: fixture, encoding: 'utf8', env: { ...process.env, ...env } })
  if (result.status !== 0) fail(`${[cmd, ...args].join(' ')} failed with ${result.status ?? result.signal}\n${result.stdout}${result.stderr}`)
  return result.stdout
}

if (!existsSync(join(fixture, 'check.mjs'))) fail('not a fixture directory')
if (!existsSync(join(fixture, 'node_modules/.modules.yaml'))) {
  const install = ['pnpm', 'install', '--frozen-lockfile']
  heavy ? run('heavy', install, { HEAVY_WAIT: '0', CI: '1' }) : run(install[0], install.slice(1), { CI: '1' })
}

// pnpm links each package's dependencies next to it, so mlly beside local-pkg is the one it imports.
const localPkg = realpathSync(join(fixture, 'node_modules/local-pkg'))
const version = dir => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).version
const patched = existsSync(join(fixture, 'patches'))
console.log(`${name}: Node ${process.version}, local-pkg ${version(localPkg)}${patched ? ' with patches/' : ''}, mlly ${version(realpathSync(join(dirname(localPkg), 'mlly')))}`)
console.log(`paths: the fixture dir, ${fixture.split(sep).length - 1} levels below /, then layers/layer-0, layers/layer-1, ... inside it`)

const json = args => JSON.parse(run(process.execPath, ['check.mjs', ...args]).trim().split('\n').at(-1))

// What stock local-pkg 1.2.1 with mlly 1.8.2 returns. The fix must not change any of these.
const stockAnswers = {
  'installed (mlly), 1 path': { exists: true, errorsLogged: 0 },
  'installed (mlly), 23 paths': { exists: true, errorsLogged: 0 },
  'builtin (fs), 1 path': { exists: true, errorsLogged: 0 },
  'builtin (fs), 23 paths': { exists: true, errorsLogged: 0 },
  'self (local-pkg-is-package-exists-paths), 1 path': { exists: true, errorsLogged: 0 },
  'self (local-pkg-is-package-exists-paths), 23 paths': { exists: true, errorsLogged: 0 },
  'non-exported subpath (mlly/package.json), 1 path': { exists: false, errorsLogged: 0 },
  'non-exported subpath (mlly/package.json), 23 paths': { exists: false, errorsLogged: 0 },
  'missing (@iconify/json), 1 path': { exists: false, errorsLogged: 0 },
  'missing (@iconify/json), 23 paths': { exists: false, errorsLogged: 0 },
  'extension variant (ext-variant, only ext-variant.js installed), 1 path': { exists: true, errorsLogged: 0 },
}
const answers = json(['answers'])
const wrong = Object.keys(stockAnswers).filter(k => !isDeepStrictEqual(answers[k], stockAnswers[k]))
console.log(`\nisPackageExists answers (stock local-pkg 1.2.1 in brackets when different):`)
for (const [k, v] of Object.entries(stockAnswers)) console.log(`  ${k.padEnd(72)} ${answers[k]?.exists}${wrong.includes(k) ? `  [${v.exists}] DIFFERENT` : ''}`)

const rows = sizes.map(n => json(['count', String(n)]))
console.log(`\nisPackageExists('@iconify/json', { paths }), not installed, one fresh process per row:`)
console.log('  paths   statSync  existsSync   distinct paths   calls per distinct path   time (information only)')
for (const r of rows) {
  if (r.found !== false) fail(`@iconify/json was found with ${r.paths} paths`)
  r.calls = r.statSync + r.existsSync
  console.log(`  ${String(r.paths).padStart(5)} ${String(r.statSync).padStart(10)} ${String(r.existsSync).padStart(11)} ${String(r.distinct).padStart(16)} ${(r.calls / r.distinct).toFixed(1).padStart(25)}   ${r.ms.toFixed(1).padStart(8)} ms`)
}

const first = rows[0]
const last = rows.at(-1)
const growth = last.calls / first.calls
const repeats = last.calls / last.distinct
const perPath = (last.calls - first.calls) / (last.paths - first.paths)
console.log(`\n${last.paths} paths make ${growth.toFixed(1)}x the calls of 1 path (${last.paths}x if every path cost the same); each extra path adds ${perPath.toFixed(1)} calls; each distinct path is probed ${repeats.toFixed(1)} times`)
console.log('\nexpected: each path on disk is probed about once, so an extra layer root adds a few calls')
// The bug: calls grow at least half as fast as the number of paths, and almost all are repeats.
const bug = growth >= last.paths / 2 && repeats >= 10
if (bug) console.log(`actual:   ${last.paths} paths make ${last.calls} calls on ${last.distinct} distinct paths, ${repeats.toFixed(0)} calls per distinct path (calls grow linearly, mostly repeats)`)
else console.log(`actual:   ${last.paths} paths make ${last.calls} calls on ${last.distinct} distinct paths`)
if (wrong.length) {
  console.log(`\n${wrong.length} answer(s) differ from stock local-pkg 1.2.1`)
  process.exit(3)
}
process.exit(bug ? 1 : 0)
