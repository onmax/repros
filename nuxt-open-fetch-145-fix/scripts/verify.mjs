import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

const origin = 'http://127.0.0.1:43100'
const server = spawn(process.execPath, ['.output/server/index.mjs'], {
  env: { ...process.env, HOST: '127.0.0.1', PORT: '43100' },
  stdio: ['ignore', 'inherit', 'inherit'],
})

async function request(path) {
  const response = await fetch(`${origin}${path}`)
  return { status: response.status, body: await response.json() }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      return await request('/api/ping')
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  throw new Error('Timed out waiting for the Nitro server')
}

try {
  await waitForServer()
  assert.deepEqual(await request('/api/open-fetch'), {
    status: 200,
    body: { ok: true },
  })
}
finally {
  if (server.exitCode === null) {
    server.kill('SIGTERM')
    await Promise.race([
      once(server, 'exit'),
      new Promise(resolve => setTimeout(resolve, 5000)).then(() => server.kill('SIGKILL')),
    ])
  }
}
