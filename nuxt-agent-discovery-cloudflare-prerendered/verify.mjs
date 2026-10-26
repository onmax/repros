// Builds the app with the cloudflare-module preset, serves the output with
// `wrangler dev` (workerd behind the Workers Static Assets router, the same
// router code a deployed Worker runs), and asks two pages for markdown the way
// an agent does. `--no-build` reuses an existing `.output`.
import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('.', import.meta.url))
const port = Number(process.env.PORT || 8797)
const origin = `http://127.0.0.1:${port}`
const env = { ...process.env, CI: '1', NO_COLOR: '1', WRANGLER_SEND_METRICS: 'false' }

if (!process.argv.includes('--no-build')) {
  const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { cwd, env, encoding: 'utf8' })
  if (build.status !== 0) {
    throw new Error(`nuxt build failed:\n${build.stdout}${build.stderr}`)
  }
}

for (const file of ['.output/server/wrangler.json', '.output/public/docs/prerendered/index.html']) {
  if (!existsSync(new URL(file, import.meta.url))) {
    throw new Error(`${file} is missing; run without --no-build`)
  }
}

const listening = await fetch(origin).then(() => true, () => false)
if (listening) {
  throw new Error(`${origin} already answers; stop that server or set PORT`)
}

const wrangler = spawn('pnpm', ['exec', 'wrangler', 'dev', '--config', '.output/server/wrangler.json', '--ip', '127.0.0.1', '--port', String(port), '--log-level', 'warn'], {
  cwd,
  env,
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe']
})
let log = ''
wrangler.stdout.on('data', (chunk) => { log += chunk })
wrangler.stderr.on('data', (chunk) => { log += chunk })

function stop() {
  try {
    process.kill(-wrangler.pid, 'SIGTERM')
  }
  catch {}
}
process.on('exit', stop)

async function ready() {
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    if (wrangler.exitCode !== null) {
      throw new Error(`wrangler dev exited with ${wrangler.exitCode}:\n${log}`)
    }
    try {
      await fetch(`${origin}/`)
      return
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  throw new Error(`wrangler dev did not answer on ${origin}:\n${log}`)
}

/** Follows redirects by hand so the output shows every hop. */
async function askForMarkdown(path) {
  const hops = []
  let url = new URL(path, origin)
  for (let i = 0; i < 5; i++) {
    const response = await fetch(url, { headers: { accept: 'text/markdown' }, redirect: 'manual' })
    const location = response.headers.get('location')
    if (response.status >= 300 && response.status < 400 && location) {
      hops.push(`${response.status} -> ${location}`)
      url = new URL(location, url)
      continue
    }
    const body = await response.text()
    return {
      hops,
      status: response.status,
      type: response.headers.get('content-type') || '',
      vary: response.headers.get('vary') || '',
      first: body.match(/^# .*/m)?.[0] || body.match(/<main>.*?<\/main>/)?.[0] || body.slice(0, 60)
    }
  }
  throw new Error(`${path} redirects more than 5 times`)
}

const negotiated = actual => actual.hops.length === 0
  && actual.status === 200
  && actual.type.startsWith('text/markdown')
  && actual.vary.includes('Accept')

const results = {}
try {
  await ready()
  for (const path of ['/docs/on-demand', '/docs/prerendered']) {
    const actual = await askForMarkdown(path)
    results[path] = negotiated(actual)
    console.log(`GET ${path} (Accept: text/markdown)`)
    console.log('  expected: 200 text/markdown, Vary: Accept, User-Agent')
    console.log(`  actual:   ${[...actual.hops, `${actual.status} ${actual.type || '(no type)'}, Vary: ${actual.vary || '(none)'}`].join(', then ')}`)
    console.log(`  body:     ${actual.first}`)
  }
}
finally {
  stop()
}

if (!results['/docs/on-demand']) {
  console.log('\nCONTROL FAILED: the Worker did not negotiate the on-demand page, so this run says nothing about prerendering')
  process.exit(2)
}
if (!results['/docs/prerendered']) {
  console.log('\nFAIL: the prerendered page answers HTML to an agent; Workers Static Assets serves it before the Worker runs')
  process.exit(1)
}
console.log('\nPASS')
