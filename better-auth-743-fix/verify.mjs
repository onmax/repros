import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout } from 'node:timers/promises'

// Default: assert the expected behavior (exits nonzero while the bug exists).
// --expect-bug: assert the reported failure instead.
const expectBug = process.argv.includes('--expect-bug')
const port = 3743
const baseURL = `http://127.0.0.1:${port}`
const env = {
  ...process.env,
  NUXT_BETTER_AUTH_SECRET: 'repro-secret-0123456789abcdefghijklmnopqrstuvwxyz',
  NUXT_PUBLIC_SITE_URL: baseURL,
  HOST: '127.0.0.1',
  PORT: String(port),
}

const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { stdio: 'inherit', env })
assert.equal(build.status, 0, 'nuxt build failed')

let log = ''
const server = spawn('node', ['.output/server/index.mjs'], { env, detached: true })
server.stdout.on('data', chunk => (log += chunk))
server.stderr.on('data', chunk => (log += chunk))

try {
  let seed
  for (let attempt = 0; attempt < 60 && !seed; attempt++) {
    try {
      seed = await fetch(`${baseURL}/api/seed`, { method: 'POST' })
    }
    catch {
      await setTimeout(250)
    }
  }
  assert.ok(seed, `server did not answer at ${baseURL}`)
  const seedBody = await seed.text()
  assert.equal(seed.status, 200, `seed failed: ${seedBody}\n${log}`)
  const { key } = JSON.parse(seedBody)
  const headers = { 'x-api-key': key }

  // Control: Better Auth's own endpoint resolves the API-key session.
  const direct = await fetch(`${baseURL}/api/auth/get-session`, { headers })
  const directBody = await direct.json()
  console.log('\nControl, GET /api/auth/get-session:', direct.status, JSON.stringify({ email: directBody?.user?.email ?? null }))
  assert.equal(directBody?.user?.email, 'ada@example.com', 'Better Auth must resolve the API-key session over HTTP')

  const me = await fetch(`${baseURL}/api/me`, { headers })
  const actual = { status: me.status, body: await me.json() }
  console.log('Expected requireUserSession():', JSON.stringify({ status: 200, body: { email: 'ada@example.com', keys: ['session', 'user'] } }))
  console.log('Actual requireUserSession():  ', JSON.stringify(actual))

  if (expectBug) {
    assert.equal(actual.status, 200, 'requireUserSession() threw; the reported shape did not reproduce')
    assert.deepEqual(actual.body, { email: null, keys: ['headers', 'response'] })
    console.log('\nPASS: reproduced #743, requireUserSession() returned the { headers, response } wrapper')
  }
  else {
    assert.deepEqual(actual, { status: 200, body: { email: 'ada@example.com', keys: ['session', 'user'] } })
    console.log('\nPASS: requireUserSession() returned the API-key session')
  }
}
finally {
  try { process.kill(-server.pid, 'SIGTERM') }
  catch (error) { if (error.code !== 'ESRCH') throw error }
  if (server.exitCode === null) await new Promise(resolve => server.once('exit', resolve))
}
