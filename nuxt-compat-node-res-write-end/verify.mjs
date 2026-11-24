// Builds the app, starts it, and requests /api/inner over HTTP and in process through /api/outer.
import { spawn, spawnSync } from 'node:child_process'
import { createServer } from 'node:net'
import assert from 'node:assert/strict'

const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { stdio: 'ignore' })
assert.equal(build.status, 0, 'nuxt build failed')

const port = await new Promise((resolve) => {
  const srv = createServer().listen(0, '127.0.0.1', () => {
    const { port } = srv.address()
    srv.close(() => resolve(port))
  })
})
const server = spawn('node', ['.output/server/index.mjs'], {
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
  stdio: 'ignore',
})

async function get (path) {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${path}`)
      return { status: res.status, body: await res.text() }
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }
  throw new Error(`no answer from ${path}`)
}

try {
  const http = await get('/api/inner')
  const inProcess = JSON.parse((await get('/api/outer')).body)
  console.log('HTTP        ', JSON.stringify(http))
  console.log('serverFetch ', JSON.stringify(inProcess))
  assert.deepEqual(http, { status: 200, body: 'ok' })
  assert.deepEqual(inProcess, { status: 200, body: 'ok' })
  console.log('PASS')
}
finally {
  server.kill()
}
