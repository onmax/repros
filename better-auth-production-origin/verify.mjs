import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'
import { readFile } from 'node:fs/promises'

assert.equal(process.version, 'v24.19.0', 'Use the pinned Node.js 24.19.0 runtime')
const fixed = (await readFile(new URL('./pnpm-workspace.yaml', import.meta.url), 'utf8')).includes('patchedDependencies:')
const env = { ...process.env, NODE_ENV: 'production', NUXT_TELEMETRY_DISABLED: '1' }
for (const key of ['NUXT_PUBLIC_SITE_URL', 'VERCEL_URL', 'CF_PAGES_URL', 'URL', 'HOST', 'NITRO_HOST', '__NUXT_DEV__', 'NUXT_VITE_NODE_OPTIONS']) delete env[key]

async function run(command, args) {
  const child = spawn(command, args, { env, stdio: 'inherit', detached: true })
  const timeout = setTimeout(() => process.kill(-child.pid, 'SIGKILL'), 180_000)
  try {
    await new Promise((resolve, reject) => {
      child.on('error', reject)
      child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)))
    })
  }
  finally { clearTimeout(timeout) }
}

await run('pnpm', ['exec', 'nuxt', 'build'])
const listener = createServer()
await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve))
const port = listener.address().port
await new Promise(resolve => listener.close(resolve))
const origin = `http://127.0.0.1:${port}`
let output = ''
const server = spawn(process.execPath, ['.output/server/index.mjs'], {
  env: { ...env, NITRO_PORT: String(port), NITRO_HOST: '127.0.0.1', VERCEL_URL: 'deployment.example.test' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
server.stdout.on('data', chunk => { output += chunk })
server.stderr.on('data', chunk => { output += chunk })
const timeout = setTimeout(() => server.kill('SIGKILL'), 60_000)
try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(output)
    try { if ((await fetch(`${origin}/api/origin`)).ok) { ready = true; break } } catch {}
    await delay(100)
  }
  assert.ok(ready, `Production server did not start: ${output}`)
  const headers = { 'x-forwarded-host': 'attacker.example.test', 'x-forwarded-proto': 'https' }
  const response = await fetch(`${origin}/api/origin`, { headers })
  const actual = (await response.json()).origin
  assert.equal(actual, fixed ? 'https://deployment.example.test' : 'https://attacker.example.test')
  assert.equal((await fetch(`${origin}/api/seed`, { method: 'POST' })).status, 200)
  const reset = await fetch(`${origin}/api/auth/request-password-reset`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json', origin: 'https://attacker.example.test' },
    body: JSON.stringify({ email: 'repro@example.test', redirectTo: '/' }),
  })
  if (fixed) {
    assert.equal(reset.status, 200, await reset.text())
    assert.ok(output.includes('REPRO_RESET_ORIGIN=https://deployment.example.test'), output)
    assert.ok(!output.includes('REPRO_RESET_ORIGIN=https://attacker.example.test'), output)
  }
  else {
    assert.equal(reset.status, 200, await reset.text())
    assert.ok(output.includes('REPRO_RESET_ORIGIN=https://attacker.example.test'), output)
  }
  const validReset = await fetch(`${origin}/api/auth/request-password-reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://deployment.example.test', 'x-forwarded-host': 'deployment.example.test', 'x-forwarded-proto': 'https' },
    body: JSON.stringify({ email: 'repro@example.test', redirectTo: '/' }),
  })
  assert.equal(validReset.status, 200, await validReset.text())
  assert.ok(output.includes('REPRO_RESET_ORIGIN=https://deployment.example.test'), output)
  console.log('Control: legitimate reset succeeds and uses deployment.example.test.')
  console.log(`Expected canonical origin: https://deployment.example.test`)
  console.log(`Actual canonical origin: ${actual}`)
  console.log(fixed ? 'PASS: supplied host ignored; reset link uses deployment.example.test.' : 'REPRODUCED: password-reset link uses attacker.example.test.')
}
finally {
  clearTimeout(timeout)
  server.kill('SIGTERM')
  await new Promise(resolve => { if (server.exitCode !== null) resolve(); else server.once('exit', resolve) })
}
