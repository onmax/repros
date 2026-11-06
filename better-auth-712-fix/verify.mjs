import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { setTimeout } from 'node:timers/promises'

// Default: assert the expected behavior (exits nonzero while the bug exists).
// --expect-bug: assert the reported failure instead.
const expectBug = process.argv.includes('--expect-bug')
const port = 3712
const baseURL = `http://127.0.0.1:${port}`

const dev = spawn('pnpm', ['exec', 'nuxt', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
  env: { ...process.env, NUXT_BETTER_AUTH_SECRET: 'repro-secret-0123456789abcdefghijklmnopqrstuvwxyz' },
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe'],
})
let log = ''
dev.stdout.on('data', chunk => (log += chunk))
dev.stderr.on('data', chunk => (log += chunk))

try {
  let response
  let text
  // Nuxt answers with an HTML loading page until the Nitro dev server is ready.
  for (let attempt = 0; attempt < 240 && !response; attempt++) {
    try {
      const res = await fetch(`${baseURL}/api/auth/sign-in/email`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'origin': baseURL },
        body: JSON.stringify({ email: 'nobody@example.com', password: 'password-1234' }),
      })
      const body = await res.text()
      if (res.headers.get('content-type')?.includes('application/json')) {
        response = res
        text = body
      }
    }
    catch {}
    if (!response)
      await setTimeout(500)
  }
  assert.ok(response, `nuxt dev never answered with JSON at ${baseURL}\n${log}`)
  const actual = { status: response.status, code: JSON.parse(text).code }
  console.log('POST /api/auth/sign-in/email ->', response.status, text)
  console.log('Expected:', JSON.stringify({ status: 401, code: 'INVALID_EMAIL_OR_PASSWORD' }))
  console.log('Actual:  ', JSON.stringify(actual))

  if (expectBug) {
    assert.equal(actual.status, 400, 'Better Auth received the body; the bug did not reproduce')
    assert.equal(actual.code, 'VALIDATION_ERROR')
    assert.match(text, /\[body\]/)
    console.log('\nPASS: reproduced #712, Better Auth received the POST without its body')
  }
  else {
    assert.deepEqual(actual, { status: 401, code: 'INVALID_EMAIL_OR_PASSWORD' })
    console.log('\nPASS: Better Auth received the body and rejected the unknown user')
  }
}
finally {
  try { process.kill(-dev.pid, 'SIGTERM') }
  catch (error) { if (error.code !== 'ESRCH') throw error }
  if (dev.exitCode === null) await new Promise(resolve => dev.once('exit', resolve))
}
