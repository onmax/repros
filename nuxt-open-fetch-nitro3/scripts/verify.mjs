import { spawn } from 'node:child_process'
import { once } from 'node:events'
import assert from 'node:assert/strict'

const origin = 'http://127.0.0.1:43100'
const expectedOpenFetchStatus = Number(process.env.EXPECT_OPEN_FETCH_STATUS || 200)
const server = spawn(process.execPath, ['.output/server/index.mjs'], {
  env: {
    ...process.env,
    HOST: '127.0.0.1',
    PORT: '43100',
    REPRO_ORIGIN: origin,
  },
  stdio: ['ignore', 'inherit', 'inherit'],
})

async function request(path) {
  const response = await fetch(`${origin}${path}`)
  const text = await response.text()
  let body = text
  try {
    body = JSON.parse(text)
  }
  catch {}
  return { status: response.status, body }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      return await request('/api/runtime')
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  throw new Error('Timed out waiting for the Nitro server')
}

try {
  const runtime = await waitForServer()
  const importedOfetch = await request('/api/imported-ofetch')
  const openFetch = await request('/api/open-fetch')
  const result = { runtime, importedOfetch, openFetch }
  console.log(JSON.stringify(result, null, 2))

  assert.deepEqual(runtime, {
    status: 200,
    body: {
      globalDollarFetch: 'undefined',
      nitroLocalFetch: 'undefined',
    },
  })
  assert.deepEqual(importedOfetch, { status: 200, body: { ok: true } })
  assert.equal(openFetch.status, expectedOpenFetchStatus)
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
