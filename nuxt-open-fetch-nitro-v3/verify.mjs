// Builds the app, starts the production server, and asks it whether
// nuxt-open-fetch's Nitro plugin installed the `api` client.
import { spawn, spawnSync } from 'node:child_process'
import { createServer } from 'node:net'
import assert from 'node:assert/strict'

const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8' })
const buildLog = build.stdout + build.stderr
const missing = buildLog.match(/\[MISSING_EXPORT\].*/)?.[0]
console.log(`nuxt build exit code: ${build.status}`)
if (missing)
  console.log(`build error: ${missing.replace(/\u001B\[[0-9;]*m/g, '')}`)
if (build.status !== 0)
  console.log(buildLog.split('\n').slice(-25).join('\n'))
assert.equal(build.status, 0, 'expected `nuxt build` to succeed')

const port = await new Promise((resolve) => {
  const srv = createServer().listen(0, '127.0.0.1', () => {
    const { port } = srv.address()
    srv.close(() => resolve(port))
  })
})
const server = spawn('node', ['.output/server/index.mjs'], {
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
  stdio: ['ignore', 'inherit', 'inherit'],
})
try {
  let body
  for (let i = 0; i < 50 && !body; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/client`)
      body = await res.json()
    }
    catch {
      await new Promise(r => setTimeout(r, 200))
    }
  }
  console.log('GET /api/client ->', JSON.stringify(body))
  assert.deepEqual(body, { client: 'function', report: { ok: true } }, 'expected the Nitro plugin to install a working `api` client')
  console.log('PASS')
}
finally {
  server.kill()
}
