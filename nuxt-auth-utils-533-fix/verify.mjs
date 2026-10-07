import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

function installedVersion(name) {
  let directory = dirname(fileURLToPath(import.meta.resolve(name)))
  while (directory !== dirname(directory)) {
    try {
      const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
      if (manifest.name === name) return manifest.version
    }
    catch {}
    directory = dirname(directory)
  }
  throw new Error(`Cannot find the installed ${name} manifest`)
}
const versions = { nuxt: installedVersion('nuxt'), module: installedVersion('nuxt-auth-utils'), h3: installedVersion('h3') }
const portProbe = createServer()
portProbe.listen(0, '127.0.0.1')
await once(portProbe, 'listening')
const port = portProbe.address().port
await new Promise(resolve => portProbe.close(resolve))
const child = spawn(process.execPath, ['.output/server/index.mjs'], {
  cwd: import.meta.dirname,
  env: { ...process.env, NITRO_HOST: '127.0.0.1', NITRO_PORT: String(port), NUXT_SESSION_PASSWORD: 'public-reproduction-password-32-characters' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let output = ''
let origin
for (const stream of [child.stdout, child.stderr]) {
  stream.on('data', chunk => {
    output += chunk.toString()
    const address = output.match(/Listening on (http:\/\/127\.0\.0\.1:\d+)/)
    if (address) origin = address[1]
  })
}
const failures = []
let passed = 0

function client() {
  let cookie = ''
  return async (operation, data) => {
    const response = await fetch(`${origin}/api/session`, {
      method: operation === 'get' ? 'GET' : 'POST',
      headers: { ...(cookie ? { cookie } : {}), 'content-type': 'application/json' },
      ...(operation === 'get' ? {} : { body: JSON.stringify({ operation, data }) }),
    })
    assert.equal(response.status, 200, await response.clone().text())
    for (const value of response.headers.getSetCookie()) cookie = value.split(';', 1)[0]
    return response.json()
  }
}

async function check(name, run) {
  try {
    await run()
    passed++
    console.log(`PASS ${name}`)
  }
  catch (error) {
    failures.push({ name, message: error.message })
    console.log(`FAIL ${name}: ${error.message}`)
  }
}

try {
  const deadline = Date.now() + 30_000
  while (!origin && child.exitCode === null && Date.now() < deadline) await sleep(25)
  assert.ok(origin, `Nuxt server failed to listen: ${output}`)
  for (let iteration = 1; iteration <= 3; iteration++) {
    await check(`replace existing cookie ${iteration}`, async () => {
      const request = client()
      const seeded = await request('set', { impersonatorId: 'admin' })
      const replaced = await request('replace', { userId: 'user' })
      const following = await request('get')
      console.log(JSON.stringify({ iteration, returned: replaced.result, sameRequest: replaced.session, followingRequest: following }))
      assert.deepEqual(replaced.result, { userId: 'user' }, 'replacement return must discard impersonatorId')
      assert.deepEqual(replaced.session, { userId: 'user', id: seeded.session.id }, 'current request must discard impersonatorId and preserve the ID')
      assert.deepEqual(following, { userId: 'user', id: seeded.session.id }, 'following request must discard impersonatorId')
    })
  }
  await check('set preserves existing fields', async () => {
    const request = client()
    await request('set', { impersonatorId: 'admin' })
    await request('set', { userId: 'user' })
    assert.equal((await request('get')).impersonatorId, 'admin')
  })
  await check('replacement without an incoming cookie', async () => {
    const request = client()
    const replaced = await request('replace', { userId: 'user' })
    assert.deepEqual(replaced.result, { userId: 'user' })
    assert.equal((await request('get')).userId, 'user')
  })
  await check('clear removes existing data', async () => {
    const request = client()
    await request('set', { impersonatorId: 'admin' })
    await request('clear')
    assert.equal(Object.hasOwn(await request('get'), 'impersonatorId'), false)
  })
  await check('replacement with empty data', async () => {
    const request = client()
    await request('set', { impersonatorId: 'admin' })
    const replaced = await request('replace', {})
    assert.deepEqual(replaced.result, {}, 'empty replacement must discard the old data')
    assert.equal(Object.hasOwn(await request('get'), 'impersonatorId'), false)
  })
  await check('replacement removes private data', async () => {
    const request = client()
    await request('set', { user: { id: 'old' }, secure: { impersonatorId: 'admin' } })
    const replaced = await request('replace', { user: { id: 'new' } })
    assert.deepEqual(replaced.result, { user: { id: 'new' } }, 'replacement must discard the old private data')
    const { id, ...data } = await request('get')
    assert.equal(typeof id, 'string')
    assert.deepEqual(data, { user: { id: 'new' } })
  })
  console.log(`REPRO_RESULT ${JSON.stringify({ node: process.version, ...versions, passed, failures })}`)
  process.exitCode = failures.length ? 1 : 0
}
finally {
  if (child.exitCode === null && child.signalCode === null) {
    const exited = once(child, 'exit')
    child.kill('SIGTERM')
    const force = setTimeout(() => child.kill('SIGKILL'), 5000)
    force.unref()
    await exited
    clearTimeout(force)
  }
}
