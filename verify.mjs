// Usage: node verify.mjs [fixture]
// Installs the fixture from its lockfile when needed, clears the build cache, and builds twice
// with `experimental.buildCache`: once with `content/index.md` saying 'report-v1', then again after
// changing it to 'report-v2'. As a control, it builds the edited tree once more without the cache
// (NO_BUILD_CACHE=1). After each build it deploys `.output` to an empty folder, starts the server
// and asks the Content query API for `/`, as client-side navigation does. The page is put back
// afterwards.
// Expected: the second build ships 'report-v2' and a new content checksum, like the control.
// Exits 1 while the bug is present, 2 when a check is inconclusive.
import { spawn, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURE = 'nuxt-buildcache-content-stale'
const CACHE_HIT = 'Restored Vue client and server builds from cache'
const PAGE_FILE = 'content/index.md'
const MARKER_RE = /report-v\d/g
const CHECKSUM_RE = /v\d+\.\d+\.\d+--[\w-]{20,}/g
const QUERY = `SELECT * FROM _content_content WHERE ("path" = '/') ORDER BY stem ASC LIMIT 1`
const source = version => `# Report\n\nreport-v${version}\n`

class Inconclusive extends Error {}

function run (cwd, command, args, env = {}) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1', ...env } })
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

/** Copy `.output` to an empty folder, start it, and return the SSR HTML of `/` and the API answer. */
async function deployAndQuery (fixture) {
  const dir = mkdtempSync(join(tmpdir(), `${FIXTURE}-`))
  cpSync(join(fixture, '.output'), join(dir, '.output'), { recursive: true })
  const port = await freePort()
  const server = spawn(process.execPath, ['.output/server/index.mjs'], {
    cwd: dir,
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: 'ignore',
  })
  try {
    const base = `http://127.0.0.1:${port}`
    const deadline = Date.now() + 30_000
    let html
    while (!html && Date.now() < deadline) {
      html = await fetch(`${base}/`).then(r => r.text()).catch(() => undefined)
      if (!html) await new Promise(resolve => setTimeout(resolve, 100))
    }
    if (!html) throw new Inconclusive(`the server built in ${fixture} did not start`)
    const answer = await fetch(`${base}/__nuxt_content/content/query`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sql: QUERY }),
    }).then(r => r.text())
    if (!answer.includes('"path":"/"')) throw new Inconclusive(`the content API did not return the page: ${answer.slice(0, 200)}`)
    return { html: markers(html), api: markers(answer) }
  }
  finally {
    server.kill()
    rmSync(dir, { recursive: true, force: true })
  }
}

const markers = text => [...new Set(text.match(MARKER_RE) ?? [])].sort().join(', ') || 'none'

/** The distinct content checksums found in the `.js` files of the client bundle. */
function clientChecksums (fixture) {
  const found = new Set()
  const dir = join(fixture, '.output/public/_nuxt')
  for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue
    for (const checksum of readFileSync(join(entry.parentPath, entry.name), 'utf8').match(CHECKSUM_RE) ?? []) found.add(checksum)
  }
  return [...found].sort().join(', ') || 'none'
}

async function build (fixture, env = {}) {
  rmSync(join(fixture, '.output'), { recursive: true, force: true })
  const log = run(fixture, join(fixture, 'node_modules/.bin/nuxt'), ['build'], env)
  return { log, hit: log.includes(CACHE_HIT), checksum: clientChecksums(fixture), ...await deployAndQuery(fixture) }
}

const describe = b => `${b.hit ? 'cache hit' : 'cache miss'}; client checksum ${b.checksum}; deployed SSR HTML ${b.html}; deployed content API ${b.api}`

async function verify (name) {
  const fixture = join(root, name)
  if (!existsSync(join(fixture, 'node_modules/.modules.yaml'))) run(fixture, 'pnpm', ['install', '--frozen-lockfile'])
  for (const dir of ['.nuxt', '.data', 'node_modules/.cache/nuxt']) rmSync(join(fixture, dir), { recursive: true, force: true })

  const pageFile = join(fixture, PAGE_FILE)
  try {
    writeFileSync(pageFile, source(1))
    const first = await build(fixture)
    if (first.hit) throw new Inconclusive(`${name}: the first build hit a cache that should have been cleared`)
    if (first.api !== 'report-v1') throw new Inconclusive(`${name}: the first build does not serve 'report-v1' (${describe(first)})`)

    writeFileSync(pageFile, source(2))
    const second = await build(fixture)

    rmSync(join(fixture, '.nuxt'), { recursive: true, force: true })
    const control = await build(fixture, { NO_BUILD_CACHE: '1' })
    if (control.api !== 'report-v2' || control.checksum === first.checksum) {
      throw new Inconclusive(`${name}: even without the cache the edited tree does not ship 'report-v2' with a new checksum (${describe(control)})`)
    }

    console.log(`\n${name}`)
    console.log(`  ${first.log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}`)
    console.log(`  build 1, ${PAGE_FILE} = 'report-v1': ${describe(first)}`)
    console.log(`  build 2, ${PAGE_FILE} = 'report-v2': ${describe(second)}`)
    console.log(`  control, same tree, NO_BUILD_CACHE=1: ${describe(control)}`)
    const failures = []
    if (second.api !== 'report-v2') failures.push(`the deployed content API answers ${second.api} instead of report-v2`)
    if (second.checksum === first.checksum) failures.push('the client bundle keeps the checksum of build 1')
    console.log(failures.length ? `  FAIL: ${failures.join('; ')}` : '  PASS')
    return failures.length === 0
  }
  finally {
    writeFileSync(pageFile, source(1))
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
