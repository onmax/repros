// Builds the same app twice, once plain and once with SLOW=1 (node_modules transforms finish
// 50 ms later), and checks that ufo lands in the same server file both times.
// Exits 1 when it doesn't, which is the bug.
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = import.meta.dirname

function build (env) {
  for (const dir of ['.nuxt', '.output', 'node_modules/.cache']) rmSync(join(root, dir), { recursive: true, force: true })
  execFileSync('pnpm', ['exec', 'nuxt', 'build'], { cwd: root, stdio: 'ignore', env: { ...process.env, ...env } })
  const server = join(root, '.output/server')
  return readdirSync(server, { recursive: true })
    .filter(f => f.endsWith('.mjs') && readFileSync(join(server, f), 'utf8').includes('function joinRelativeURL'))
}

const plain = build({ SLOW: '' })
const slow = build({ SLOW: '1' })
console.log('ufo in .output/server, plain build: ', plain)
console.log('ufo in .output/server, SLOW=1 build:', slow)

if (plain.join() !== slow.join()) {
  console.log('FAIL: the same app gives a different server depending on load order')
  process.exit(1)
}
console.log('PASS: same output in both orders')
