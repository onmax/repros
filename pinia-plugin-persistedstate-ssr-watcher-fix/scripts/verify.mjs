// Renders N requests per variant against the production build, forces GC, and counts
// how many NuxtApps are still reachable. Usage: node scripts/verify.mjs --expect leak|fixed
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const expect = process.argv.includes('--expect') ? process.argv[process.argv.indexOf('--expect') + 1] : 'leak'
const REQUESTS = Number(process.env.REQUESTS ?? 300)
const RUNS = Number(process.env.RUNS ?? 5)
const PORT = Number(process.env.PORT ?? 47391)
const root = fileURLToPath(new URL('..', import.meta.url))
const variants = ['fresh-plain', 'fresh-persist', 'shared-plain', 'shared-persist']

const base = `http://127.0.0.1:${PORT}`
const median = xs => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const mib = n => `${(n / 1024 / 1024).toFixed(1)} MiB`

async function startServer(variant) {
  const child = spawn(process.execPath, ['--expose-gc', '.output/server/index.mjs'], {
    cwd: root,
    env: { ...process.env, NUXT_VARIANT: variant, HOST: '127.0.0.1', PORT: String(PORT), NITRO_HOST: '127.0.0.1', NITRO_PORT: String(PORT) },
    stdio: ['ignore', 'ignore', 'inherit'],
  })
  for (let i = 0; i < 100; i++) {
    try {
      await fetch(`${base}/_measure`)
      return child
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  child.kill()
  throw new Error('server did not start')
}

async function stopServer(child) {
  const exited = new Promise(resolve => child.once('exit', resolve))
  child.kill()
  await exited
}

const measure = async () => (await fetch(`${base}/_measure`)).json()

async function render(n) {
  let next = 0
  await Promise.all(Array.from({ length: 10 }, async () => {
    while (next++ < n) {
      const res = await fetch(`${base}/`)
      if (!res.ok)
        throw new Error(`GET / returned ${res.status}`)
      await res.text()
    }
  }))
}

async function run(variant) {
  const child = await startServer(variant)
  try {
    await render(20)
    const before = await measure()
    await render(REQUESTS)
    const after = await measure()
    return { retained: after.retained - before.retained, heap: after.heapUsed - before.heapUsed }
  }
  finally {
    await stopServer(child)
  }
}

async function cookieCheck() {
  const child = await startServer('fresh-persist')
  try {
    const res = await fetch(`${base}/?status=closed`)
    await res.text()
    return res.headers.getSetCookie().find(c => c.startsWith('fresh-persist=')) ?? null
  }
  finally {
    await stopServer(child)
  }
}

const results = {}
for (const variant of variants) {
  const runs = []
  for (let i = 0; i < RUNS; i++)
    runs.push(await run(variant))
  results[variant] = { retained: median(runs.map(r => r.retained)), heap: median(runs.map(r => r.heap)) }
}

console.log(`\n${REQUESTS} requests per run, median of ${RUNS} runs, Node ${process.version}\n`)
console.log('| variant | NuxtApps retained after GC | heap growth |')
console.log('|---|---|---|')
for (const variant of variants)
  console.log(`| ${variant} | ${results[variant].retained} | ${mib(results[variant].heap)} |`)

const cookie = await cookieCheck()
console.log(`\nSet-Cookie after changing state during SSR: ${cookie ?? '(none)'}\n`)

const failures = []
const leakLimit = REQUESTS * 0.1
for (const variant of ['fresh-plain', 'fresh-persist', 'shared-plain']) {
  if (results[variant].retained > leakLimit)
    failures.push(`${variant} retained ${results[variant].retained} apps, expected none`)
}
const sharedLeaks = results['shared-persist'].retained > REQUESTS * 0.9
if (expect === 'leak' && !sharedLeaks)
  failures.push(`expected shared-persist to retain about ${REQUESTS} apps, got ${results['shared-persist'].retained}`)
if (expect === 'fixed' && results['shared-persist'].retained > leakLimit)
  failures.push(`expected shared-persist to retain no apps, got ${results['shared-persist'].retained}`)
if (!cookie?.includes('closed'))
  failures.push('expected a fresh-persist cookie with status "closed"')

if (failures.length) {
  console.error(failures.map(f => `FAIL: ${f}`).join('\n'))
  process.exit(1)
}
console.log(expect === 'leak'
  ? 'PASS: only shared-persist keeps every request\'s NuxtApp alive'
  : 'PASS: no variant keeps NuxtApps alive')
