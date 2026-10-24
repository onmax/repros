// Usage: node verify.mjs [fixture]
// Installs the fixture from its lockfile when needed, clears the build cache, and builds
// twice with `experimental.buildCache`: once with `shared/utils/message.ts` exporting
// 'shared-v1', then again after changing it to 'shared-v2'. The file is put back afterwards.
// Expected: the second build ships 'shared-v2' in both the client and the server bundles.
// Exits 1 while the bug is present, 2 when a check is inconclusive.
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURE = 'nuxt-build-cache-shared-dir'
const CACHE_HIT = 'Restored Vue client and server builds from cache'
const MESSAGE_FILE = 'shared/utils/message.ts'
const MARKER_RE = /shared-v\d/g
const source = version => `export const sharedMessage = 'shared-v${version}'\n`

class Inconclusive extends Error {}

function run (cwd, command, args) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1' } })
  if (result.status !== 0) {
    process.stderr.write(result.stdout + result.stderr)
    throw new Inconclusive(`\`${command} ${args.join(' ')}\` exited with ${result.status ?? result.signal} in ${cwd}`)
  }
  return result.stdout + result.stderr
}

function freePort () {
  return new Promise((resolve, reject) => {
    const server = createServer().once('error', reject).listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
  })
}

/** Boot the built server and return the HTML it renders for `/`. */
async function renderIndex (fixture) {
  const port = await freePort()
  const server = spawn(process.execPath, [join(fixture, '.output/server/index.mjs')], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: 'ignore',
  })
  try {
    const deadline = Date.now() + 30_000
    while (Date.now() < deadline) {
      const html = await fetch(`http://127.0.0.1:${port}/`).then(r => r.text()).catch(() => undefined)
      if (html) return html
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    throw new Inconclusive(`the server built in ${fixture} did not start`)
  }
  finally {
    server.kill()
  }
}

/** The distinct markers found in the `.js`/`.mjs` files under `dir`. */
function markersIn (dir) {
  const found = new Set()
  for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !/\.m?js$/.test(entry.name)) continue
    for (const marker of readFileSync(join(entry.parentPath, entry.name), 'utf8').match(MARKER_RE) ?? []) found.add(marker)
  }
  return [...found].sort()
}

function build (fixture) {
  rmSync(join(fixture, '.output'), { recursive: true, force: true })
  const log = run(fixture, join(fixture, 'node_modules/.bin/nuxt'), ['build'])
  return {
    log,
    hit: log.includes(CACHE_HIT),
    client: markersIn(join(fixture, '.output/public/_nuxt')),
    server: markersIn(join(fixture, '.output/server')),
  }
}

async function verify (name) {
  const fixture = join(root, name)
  if (!existsSync(join(fixture, 'node_modules/.modules.yaml'))) run(fixture, 'pnpm', ['install', '--frozen-lockfile'])
  for (const dir of ['.nuxt', 'node_modules/.cache/nuxt']) rmSync(join(fixture, dir), { recursive: true, force: true })

  const messageFile = join(fixture, MESSAGE_FILE)
  try {
    writeFileSync(messageFile, source(1))
    const first = build(fixture)
    if (first.hit) throw new Inconclusive(`${name}: the first build hit a cache that should have been cleared`)
    if (first.client.join() !== 'shared-v1' || first.server.join() !== 'shared-v1') {
      throw new Inconclusive(`${name}: the first build does not ship 'shared-v1' (client: ${first.client}, server: ${first.server})`)
    }

    writeFileSync(messageFile, source(2))
    const second = build(fixture)
    const html = await renderIndex(fixture)

    console.log(`\n${name}`)
    console.log(`  ${first.log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}`)
    console.log(`  build 1, ${MESSAGE_FILE} = 'shared-v1': client ${first.client.join(', ')}; server ${first.server.join(', ')}`)
    console.log(`  build 2, ${MESSAGE_FILE} = 'shared-v2': ${second.hit ? 'cache hit' : 'cache miss'}; client ${second.client.join(', ') || 'none'}; server ${second.server.join(', ') || 'none'}; SSR HTML ${html.match(MARKER_RE)?.join(', ') || 'none'}`)
    const failures = []
    if (second.client.join() !== 'shared-v2') failures.push(`the client bundle ships ${second.client.join(', ') || 'no marker'} instead of shared-v2`)
    if (second.server.join() !== 'shared-v2') failures.push(`the server bundle ships ${second.server.join(', ') || 'no marker'} instead of shared-v2`)
    console.log(failures.length ? `  FAIL: ${failures.join('; ')}` : '  PASS')
    return failures.length === 0
  }
  finally {
    writeFileSync(messageFile, source(1))
  }
}

const name = (process.argv[2] ?? FIXTURE).replace(/\/$/, '')
let code = 0
try {
  if (!await verify(name)) code = 1
}
catch (error) {
  if (!(error instanceof Inconclusive)) throw error
  console.error(`INCONCLUSIVE: ${error.message}`)
  code = 2
}
process.exit(code)
