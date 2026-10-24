// Usage: node verify.mjs [fixture ...]
// For each fixture (default: both), installs it from its lockfile when needed, runs
// `nuxt build`, and reads the report its inspect-server-auto-imports.ts plugin wrote.
// Expected: one active `nuxt:server-auto-imports` in the nitro environment, which
// transforms no id under .nuxt/vite/services/. When both fixtures are built, their
// .output trees are also compared after normalizing.
// Exits 1 while the bug is present or the outputs differ, 2 when a check is inconclusive.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compareOutputs, printComparison } from './compare-output.mjs'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURES = ['nuxt-server-auto-imports-twice', 'nuxt-server-auto-imports-twice-fix']
const SERVICES = /(^|\/)\.nuxt\/vite\/services\//
const ROUTE = 'server/api/hello.ts'

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
  const report = join(fixture, '.repro/server-auto-imports.json')
  rmSync(report, { force: true })
  const log = run(fixture, join(fixture, 'node_modules/.bin/nuxt'), ['build'])
  if (!existsSync(report)) throw new Inconclusive(`${name}: the inspector wrote no report`)
  const { instances } = JSON.parse(readFileSync(report, 'utf8'))
  if (!instances.some(i => i.changed.includes(ROUTE))) {
    throw new Inconclusive(`${name}: no nuxt:server-auto-imports instance injected the auto-import into ${ROUTE}`)
  }

  const nitroModules = log.split('building nitro environment')[1]?.match(/(\d+) modules transformed/)?.[1]
  console.log(`\n${name}`)
  console.log(`  ${log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}; nitro build: ${nitroModules} modules`)
  console.log('  expected: 1 active nuxt:server-auto-imports in the nitro environment, transforming no id under .nuxt/vite/services/')
  console.log(`  actual:   ${instances.length} active`)
  for (const [n, i] of instances.entries()) {
    const services = i.transformed.filter(id => SERVICES.test(id))
    console.log(`    #${n + 1} position ${i.position}, from ${i.source}: ${i.calls} transform calls, ${i.transformed.length} ids transformed, ${services.length} of them under .nuxt/vite/services/; changed: ${i.changed.join(', ') || 'nothing'}`)
  }
  const failures = []
  if (instances.length !== 1) failures.push(`${instances.length} active instances`)
  const touching = instances.filter(i => i.transformed.some(id => SERVICES.test(id))).length
  if (touching) failures.push(`${touching} transform .nuxt/vite/services/ ids`)
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
