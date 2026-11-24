// Builds the app, starts the production server, and calls /api/inner twice: over HTTP,
// and in process through `serverFetch` from /api/outer. A request hook wraps
// `event.node.res.write` and `.end` on both and marks the response `x-count-bytes: wrapped`.
import { spawn, spawnSync } from 'node:child_process'
import { createServer } from 'node:net'
import assert from 'node:assert/strict'

const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8' })
console.log(`nuxt build exit code: ${build.status}`)
if (build.status !== 0)
  console.log((build.stdout + build.stderr).split('\n').slice(-25).join('\n'))
assert.equal(build.status, 0, 'expected `nuxt build` to succeed')

const port = await new Promise((resolve) => {
  const srv = createServer().listen(0, '127.0.0.1', () => {
    const { port } = srv.address()
    srv.close(() => resolve(port))
  })
})
const server = spawn('node', ['.output/server/index.mjs'], {
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let log = ''
server.stdout.on('data', (chunk) => { log += chunk })
server.stderr.on('data', (chunk) => { log += chunk })

async function get (path) {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${path}`)
      return { status: res.status, wrapped: res.headers.get('x-count-bytes'), body: await res.text() }
    }
    catch {
      await new Promise(r => setTimeout(r, 200))
    }
  }
  throw new Error(`server did not answer ${path}`)
}

try {
  const direct = await get('/api/inner')
  console.log('GET /api/inner (HTTP)         ->', JSON.stringify(direct))
  const nested = await get('/api/outer')
  const inner = JSON.parse(nested.body)
  console.log('GET /api/inner (serverFetch)  ->', JSON.stringify(inner))
  await new Promise(r => setTimeout(r, 200))
  const captured = log.match(/\[error hook\].*/g) ?? []
  for (const line of captured)
    console.log('server log:', line)

  const expected = { status: 200, wrapped: 'wrapped', body: '{"ok":true}' }
  assert.deepEqual(direct, expected, 'expected the request hook to wrap the response of /api/inner over HTTP')
  assert.deepEqual(captured, [], 'expected the request hook to throw no error')
  assert.deepEqual(inner, expected, 'expected the request hook to wrap the response of /api/inner through serverFetch')
  console.log('PASS')
}
finally {
  server.kill()
}
