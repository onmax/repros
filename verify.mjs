// Usage: node verify.mjs [fixture ...]
// For each fixture (default: both), installs it from its lockfile when needed, runs
// `nuxt build`, and reads the report its inspect-nitro-plugins.ts plugin wrote.
// Expected: one active copy each of nuxt:nitro-v2-compat and nuxt:nitro-resolve-fallback
// in the nitro environment. The two import protection (impound) copies are listed but
// not checked: they aren't equivalent there (see README). When both fixtures are built,
// their .output trees are also compared after normalizing.
// Exits 1 while the bug is present or the outputs differ, 2 when a check is inconclusive.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compareOutputs, printComparison } from './compare-output.mjs'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURES = ['nuxt-nitro-plugins-twice', 'nuxt-nitro-plugins-twice-fix']
const PLUGINS = ['nuxt:nitro-v2-compat', 'nuxt:nitro-resolve-fallback']
const LISTED = ['import protection (impound)']

class Inconclusive extends Error {}

function run (cwd, command, args) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1' } })
  if (result.status !== 0) {
    process.stderr.write(result.stdout + result.stderr)
    throw new Inconclusive(`\`${command} ${args.join(' ')}\` exited with ${result.status ?? result.signal} in ${cwd}`)
  }
  return result.stdout + result.stderr
}

function verify (name) {
  const fixture = join(root, name)
  if (!existsSync(join(fixture, 'node_modules/.modules.yaml'))) run(fixture, 'pnpm', ['install', '--frozen-lockfile'])
  const report = join(fixture, '.repro/nitro-plugins.json')
  rmSync(report, { force: true })
  const log = run(fixture, join(fixture, 'node_modules/.bin/nuxt'), ['build'])
  if (!existsSync(report)) throw new Inconclusive(`${name}: the inspector wrote no report`)
  const { instances } = JSON.parse(readFileSync(report, 'utf8'))
  if (!instances.some(i => i.resolveId > 0)) throw new Inconclusive(`${name}: no watched plugin was called`)

  const nitroModules = log.split('building nitro environment')[1]?.match(/(\d+) modules transformed/)?.[1]
  console.log(`\n${name}`)
  console.log(`  ${log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}; nitro build: ${nitroModules} modules`)
  console.log(`  expected: 1 active copy each of ${PLUGINS.join(' and ')} in the nitro environment`)
  const failures = []
  for (const plugin of [...PLUGINS, ...LISTED]) {
    const copies = instances.filter(i => i.plugin === plugin)
    console.log(`  ${plugin}: ${copies.length} active`)
    for (const i of copies) console.log(`    "${i.name}" at position ${i.position}, from ${i.source}: resolveId ${i.resolveId} calls, ${i.answered} answered; transform ${i.transform} calls, ${i.changed} changed`)
    if (PLUGINS.includes(plugin) && copies.length !== 1) failures.push(`${copies.length} copies of ${plugin}`)
  }
  console.log(failures.length ? `  FAIL: ${failures.join('; ')}` : '  PASS')
  return failures.length === 0
}

const names = process.argv.slice(2).map(a => a.replace(/\/$/, ''))
let code = 0
try {
  for (const name of names.length ? names : FIXTURES) if (!verify(name)) code = 1
  if (!names.length) {
    console.log(`\n.output of ${FIXTURES[0]} vs ${FIXTURES[1]}, after normalizing`)
    const result = compareOutputs(...FIXTURES.map(name => join(root, name, '.output')))
    printComparison(result)
    if (result.diffs.length) code = 1
  }
}
catch (error) {
  if (!(error instanceof Inconclusive)) throw error
  console.error(`INCONCLUSIVE: ${error.message}`)
  code = 2
}
process.exit(code)
