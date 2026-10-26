import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Server CPU per request, before and after the fix. Run `node verify.mjs` first, it builds both fixtures.
// Reads process.cpuUsage() through /api/cpu around a batch of requests, so client time is not counted,
// and the time spent in the switch-locale-path regex through /api/slp-scans.
// One server runs at a time, and the order alternates every round. Prints the median of the rounds.
const root = dirname(fileURLToPath(import.meta.url))
const rounds = Number(process.env.ROUNDS ?? 4)
const requests = Number(process.env.REQUESTS ?? 2000)
const warmup = 500
const cases = [
  { name: 'i18n-slp-html-scan', label: 'before', port: 38935 },
  { name: 'i18n-slp-html-scan-fix', label: 'after', port: 38936 },
]
const paths = [
  { path: '/', label: 'page without SwitchLocalePathLink' },
]
const metrics = ['server CPU', 'HTML scan']

async function waitForServer(url, child) {
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null)
      throw new Error(`server exited before serving ${url}`)
    try {
      await fetch(url)
      return
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  throw new Error(`timed out waiting for ${url}`)
}

const cpu = async base => {
  const { user, system } = await (await fetch(`${base}/api/cpu`)).json()
  return user + system
}
const scanMs = async base => (await (await fetch(`${base}/api/slp-scans`)).json()).ms

async function measure(testCase) {
  const fixture = join(root, testCase.name)
  await access(join(fixture, '.output/server/index.mjs'))
  const base = `http://127.0.0.1:${testCase.port}`
  const server = spawn(process.execPath, ['.output/server/index.mjs'], {
    cwd: fixture,
    env: { ...process.env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(testCase.port) },
    stdio: 'ignore',
  })
  try {
    await waitForServer(`${base}/api/cpu`, server)
    const result = {}
    for (const { path } of paths) {
      for (let i = 0; i < warmup; i++) await (await fetch(base + path)).arrayBuffer()
      const scanStart = await scanMs(base)
      const start = await cpu(base)
      for (let i = 0; i < requests; i++) await (await fetch(base + path)).arrayBuffer()
      result[path] = {
        'server CPU': (await cpu(base) - start) / requests / 1000,
        'HTML scan': (await scanMs(base) - scanStart) / requests,
      }
    }
    return result
  }
  finally {
    server.kill('SIGTERM')
    await new Promise(resolve => server.once('exit', resolve))
  }
}

const samples = Object.fromEntries(cases.map(c => [c.name, []]))
for (let round = 0; round < rounds; round++) {
  for (const testCase of round % 2 ? [...cases].reverse() : cases) {
    const result = await measure(testCase)
    samples[testCase.name].push(result)
    console.log(`round ${round + 1} ${testCase.label}: ${paths.map(({ path }) => metrics.map(m => `${path} ${m} ${result[path][m].toFixed(3)} ms`).join(', ')).join(', ')}`)
  }
}

const median = values => {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = sorted.length >> 1
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}
console.log(`\nServer CPU per request, median of ${rounds} rounds of ${requests} requests (Node ${process.versions.node})\n`)
console.log('| request | measure | before | after |')
console.log('|---|---|---|---|')
for (const { path, label } of paths) {
  for (const metric of metrics) {
    const [before, after] = cases.map(c => median(samples[c.name].map(s => s[path][metric])))
    console.log(`| ${label} (\`${path}\`) | ${metric} | ${before.toFixed(3)} ms | ${after.toFixed(3)} ms |`)
  }
}
