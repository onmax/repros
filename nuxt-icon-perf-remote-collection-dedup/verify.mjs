import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFile, rm } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'

assert.equal(process.versions.node, '24.19.0', 'Use the Node version in .node-version')
const { repro } = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
assert(['baseline', 'fixed'].includes(repro.mode))
assert.equal(repro.expectedColdOriginRequests, repro.mode === 'baseline' ? 20 : 1)
const clients = 20
const iconCount = 1000
const icons = Object.fromEntries(Array.from({ length: iconCount }, (_, i) => [
  `item-${i}`, { body: '<path d="M0 0h16v16H0z"/>' },
]))
const collection = JSON.stringify({ prefix: 'test', width: 16, height: 16, icons })
let originRequests = 0
let retryOriginRequests = 0
let nullOriginRequests = 0
let released = false
const pending = []
const origin = createServer((req, res) => {
  if (req.url === '/nullable.json') {
    nullOriginRequests++
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(nullOriginRequests === 1 ? 'null' : JSON.stringify({ prefix: 'nullable', width: 16, height: 16, icons }))
    return
  }
  if (req.url === '/retry.json') {
    retryOriginRequests++
    res.writeHead(200, { 'content-type': 'application/json' })
    // A JSON parse rejection exercises failure recovery without HTTP retry policies.
    res.end(retryOriginRequests === 1 ? 'invalid JSON' : JSON.stringify({ prefix: 'retry', width: 16, height: 16, icons }))
    return
  }
  assert.equal(req.url, '/icons.json')
  originRequests++
  const respond = () => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(collection)
  }
  if (released) respond()
  else pending.push(respond)
})
let app
let logs = ''
async function listen(server) {
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  return server.address().port
}
async function run(command, args, env) {
  const child = spawn(command, args, { stdio: 'inherit', env })
  const [code] = await once(child, 'exit')
  assert.equal(code, 0, `${command} failed`)
}
async function waitUntil(check, milliseconds = 15000) {
  const end = Date.now() + milliseconds
  while (Date.now() < end) {
    if (await check()) return true
    await delay(20)
  }
  return false
}
try {
  const originPort = await listen(origin)
  const env = { ...process.env, NUXT_TELEMETRY_DISABLED: '1', REPRO_COLLECTION_URL: `http://127.0.0.1:${originPort}/icons.json`, REPRO_RETRY_URL: `http://127.0.0.1:${originPort}/retry.json`, REPRO_NULL_URL: `http://127.0.0.1:${originPort}/nullable.json` }
  await Promise.all(['.nuxt', '.output', '.data'].map(path => rm(path, { recursive: true, force: true })))
  await run(process.execPath, ['node_modules/nuxt/bin/nuxt.mjs', 'build'], env)
  assert.equal(originRequests, 0, 'The collection must remain cold through the build')
  const portProbe = createServer()
  const appPort = await listen(portProbe)
  await new Promise(resolve => portProbe.close(resolve))
  app = spawn(process.execPath, ['.output/server/index.mjs'], { env: { ...env, HOST: '127.0.0.1', PORT: String(appPort) }, stdio: ['ignore', 'pipe', 'pipe'] })
  app.stdout.on('data', data => { logs += data })
  app.stderr.on('data', data => { logs += data })
  const base = `http://127.0.0.1:${appPort}`
  assert(await waitUntil(async () => { try { return (await fetch(base)).ok } catch { return false } }), logs)
  const requestIcon = async (i, prefix = 'test') => {
    const response = await fetch(`${base}/api/_nuxt_icon/${prefix}.json?icons=item-${i}`, { signal: AbortSignal.timeout(15000) })
    assert.equal(response.status, 200)
    const value = await response.json()
    assert.equal(value.icons[`item-${i}`].body, icons[`item-${i}`].body)
  }
  const start = performance.now()
  const requests = Array.from({ length: clients }, (_, i) => requestIcon(i))
  // Hold all origin responses until the requests have overlapped. This tests
  // pending-fetch sharing without depending on a CDN's variable latency.
  await waitUntil(() => originRequests === clients, 2000)
  released = true
  for (const respond of pending.splice(0)) respond()
  await Promise.all(requests)
  const coldRequests = originRequests
  assert.equal(coldRequests, repro.expectedColdOriginRequests, `Unexpected cold collection downloads for ${repro.mode}`)
  await Promise.all(Array.from({ length: clients }, (_, i) => requestIcon(i + clients)))
  assert.equal(originRequests, coldRequests, 'Warm control must use the existing collection cache for new icon keys')
  const failed = await fetch(`${base}/api/_nuxt_icon/retry.json?icons=item-0`, { signal: AbortSignal.timeout(15000) })
  await failed.text()
  assert.equal(failed.status, 500, 'Invalid collection JSON must fail the first API request')
  assert.equal(retryOriginRequests, 1, 'The failed request must not be retried invisibly')
  await requestIcon(0, 'retry')
  assert.equal(retryOriginRequests, 2, 'A rejected collection fetch must allow a later retry, including the same API key')
  await requestIcon(1, 'retry')
  assert.equal(retryOriginRequests, 2, 'The recovered collection must remain cached for new API keys')
  const missing = await fetch(`${base}/api/_nuxt_icon/nullable.json?icons=item-0`, { signal: AbortSignal.timeout(15000) })
  await missing.text()
  assert.equal(missing.status, 404, 'A null collection must return the existing missing-collection result')
  assert.equal(nullOriginRequests, 1)
  // Use a new API key: Nitro caches the returned 404 object separately from
  // the collection cache whose falsy-result behavior is under test here.
  await requestIcon(1, 'nullable')
  assert.equal(nullOriginRequests, 2, 'A falsy collection result must allow the existing later retry')
  await requestIcon(2, 'nullable')
  assert.equal(nullOriginRequests, 2)
  const bytes = Buffer.byteLength(collection)
  console.log(JSON.stringify({
    result: 'CONFIRMED', mode: repro.mode, environment: { node: process.versions.node, nuxt: '4.5.2', nuxtIcon: '2.5.1', mode: 'production node-server' },
    clients, collectionIcons: iconCount,
    expectedColdOriginRequests: 1, actualColdOriginRequests: coldRequests,
    warmNewIconRequests: clients, additionalWarmOriginRequests: originRequests - coldRequests,
    collectionBytes: bytes, actualColdOriginBytes: coldRequests * bytes,
    avoidableColdOriginBytes: (coldRequests - 1) * bytes,
    failureRecovery: { firstStatus: failed.status, failedFetches: 1, recoveryFetches: retryOriginRequests - 1, furtherWarmFetches: 0 },
    nullRecovery: { firstStatus: missing.status, initialFetches: 1, recoveryFetches: nullOriginRequests - 1, furtherWarmFetches: 0 },
    elapsedMsIncludingSynchronization: Math.round(performance.now() - start),
  }, null, 2))
} finally {
  released = true
  for (const respond of pending.splice(0)) respond()
  if (app && app.exitCode === null) {
    app.kill('SIGTERM')
    await Promise.race([once(app, 'exit'), delay(3000)])
    if (app.exitCode === null) app.kill('SIGKILL')
  }
  origin.closeAllConnections()
  await new Promise(resolve => origin.close(resolve))
}
