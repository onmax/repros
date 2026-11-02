// Builds the app twice with `experimental.buildCache`. The second build is a cache hit and
// restores the SSR output. The `log-builds` plugin in nuxt.config.ts logs each client and SSR build.
// Exits 1 when the SSR environment builds again after the restore, which is the bug.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = import.meta.dirname
const log = join(root, 'builds.log')

for (const path of ['.nuxt', '.output', 'node_modules/.cache']) rmSync(join(root, path), { recursive: true, force: true })
// Creates `.nuxt`, as `pnpm install` does in a real project. With `.nuxt` present, every
// `nuxt build` writes to `node_modules/.cache/nuxt/.nuxt`, so both builds use the same dir.
execFileSync('pnpm', ['exec', 'nuxt', 'prepare'], { cwd: root, stdio: 'ignore' })

function build (name) {
  rmSync(log, { force: true })
  const out = execFileSync('pnpm', ['exec', 'nuxt', 'build'], { cwd: root, encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
  const restored = out.includes('Restored Vue client and server builds from cache')
  const builds = existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n') : []
  console.log(`${name}: cache restored: ${restored}`)
  for (const line of builds) console.log(`  ${line}`)
  return { restored, ssr: builds.filter(line => line.startsWith('ssr ')) }
}

build('build 1 (cache miss)')
const hit = build('build 2 (cache hit)')

if (!hit.restored) {
  console.log('SKIP: build 2 did not restore from the cache')
  process.exit(2)
}
if (hit.ssr.length) {
  console.log('FAIL: the cache hit restored the SSR output, then built SSR again')
  process.exit(1)
}
console.log('PASS: the cache hit reused the restored SSR output')
