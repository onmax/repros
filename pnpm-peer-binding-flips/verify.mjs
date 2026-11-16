// Replays the bug on a pinned public workspace (53 projects).
// Adding a dependency with no dependencies or peers to one project
// changes the peer bindings that pnpm writes for other projects.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const PNPM = '12.21.0'
const REPO = 'https://github.com/vite-hub/vitehub.git'
const SHA = '22199a7613d3a73784953f39ece7dfe2aafad8ba'
const dir = join(import.meta.dirname, 'workspace')
const env = { ...process.env, npm_config_manage_package_manager_versions: 'false', CI: 'true' }

function sh(cmd, args, cwd = dir) {
  return execFileSync(cmd, args, { cwd, env, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' })
}
const pnpm = (...args) => sh('npx', ['-y', `pnpm@${PNPM}`, ...args])

if (!existsSync(join(dir, '.git'))) {
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir)
  sh('git', ['init', '-q'])
  sh('git', ['fetch', '-q', '--depth', '1', REPO, SHA])
}
sh('git', ['checkout', '-q', '-f', SHA])
sh('git', ['clean', '-qfdx'])

// The root project's oxlint snapshot key carries its peer bindings.
const rootOxlint = () => {
  const lock = readFileSync(join(dir, 'pnpm-lock.yaml'), 'utf8')
  const root = lock.slice(lock.indexOf('\n  .:\n'))
  return root.match(/\n      oxlint:\n        specifier: .*\n        version: (.*)\n/)[1]
}

console.log(`pnpm ${pnpm('--version').trim()}`)
pnpm('install', '--lockfile-only', '--ignore-scripts')
sh('git', ['add', 'pnpm-lock.yaml'])
const before = rootOxlint()

pnpm('--filter', '@vite-hub/env', 'add', 'is-number@7.0.0', '--lockfile-only', '--ignore-scripts')
const after = rootOxlint()
const diff = sh('git', ['diff', '--numstat', '--', 'pnpm-lock.yaml']).trim()

console.log(`root oxlint before: ${before.slice(0, 80)}`)
console.log(`root oxlint after:  ${after.slice(0, 80)}`)
console.log(`pnpm-lock.yaml added/removed lines: ${diff}`)

if (before !== after) {
  console.error('FAIL: adding is-number to packages/env changed the peer bindings of the root project')
  process.exit(1)
}
console.log('PASS: the root project kept its peer bindings')
