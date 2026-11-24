// Checks two things on Nuxt 4.7 + Nitro v3:
// 1. `nuxt build` does not apply the Nitro v2 compatibility layer to @nuxthub/core (NUXT_B9003)
// 2. `nuxt dev` still runs the dev migrations plugin (GET /api/items reads the migrated table)
import { spawn, spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

let failed = false

for (const dir of ['.nuxt', '.output', '.data']) rmSync(dir, { recursive: true, force: true })

const build = spawnSync('node_modules/.bin/nuxt', ['build'], { encoding: 'utf8', env: { ...process.env, CI: '1' } })
const buildLog = `${build.stdout}${build.stderr}`
if (build.status !== 0) {
  console.error(buildLog)
  throw new Error(`nuxt build exited with ${build.status}`)
}
const lines = buildLog.split('\n')
const at = lines.findIndex(line => line.includes('NUXT_B9003'))
const compat = at === -1 ? [] : lines.slice(at, at + 2).map(line => line.trim())
console.log('expected: no NUXT_B9003 warning for @nuxthub/core')
console.log(`actual:   ${compat.length ? compat.join(' ') : 'none'}`)
if (compat.some(line => line.includes('@nuxthub/core'))) failed = true

const port = String(4300 + Math.floor(Math.random() * 500))
const dev = spawn('node_modules/.bin/nuxt', ['dev', '--host', '127.0.0.1', '--port', port], { detached: true, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, CI: '1' } })
let devLog = ''
dev.stdout.on('data', d => { devLog += d })
dev.stderr.on('data', d => { devLog += d })
let items
try {
  for (let i = 0; i < 120; i++) {
    await sleep(1000)
    const res = await fetch(`http://127.0.0.1:${port}/api/items`).catch(() => undefined)
    if (res?.ok) { items = await res.json(); break }
  }
} finally {
  try { process.kill(-dev.pid, 'SIGTERM') } catch {}
}
console.log('expected: GET /api/items returns [] (dev migrations applied)')
console.log(`actual:   ${items === undefined ? 'no successful response' : JSON.stringify(items)}`)
if (!Array.isArray(items)) {
  console.error(devLog.split('\n').slice(-30).join('\n'))
  failed = true
}

process.exit(failed ? 1 : 0)
