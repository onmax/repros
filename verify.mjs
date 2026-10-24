// Usage: node verify.mjs [fixture ...]
// For each fixture (default: both), installs it from its lockfile when needed, clears
// the build cache, and builds twice with `experimental.buildCache`: a cold build, then
// a cache hit after deleting `.output`. Each build's server renders `/` once.
// Expected: the cache-hit HTML equals the cold HTML, which inlines the page's scoped
// style and links no stylesheet.
// Exits 1 while the bug is present, 2 when a check is inconclusive.
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { createServer } from 'node:net'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const FIXTURES = ['nuxt-build-cache-inlined-css', 'nuxt-build-cache-inlined-css-fix']
const CACHE_HIT = 'Restored Vue client and server builds from cache'
const INLINE_STYLE_RE = /<style[^>]*>[^<]*color\s*:\s*red/
const STYLESHEET_LINK_RE = /<link[^>]+rel="stylesheet"[^>]*>/g

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

function build (fixture) {
  rmSync(join(fixture, '.output'), { recursive: true, force: true })
  const log = run(fixture, join(fixture, 'node_modules/.bin/nuxt'), ['build'])
  return { log, hit: log.includes(CACHE_HIT) }
}

const links = html => html.match(STYLESHEET_LINK_RE) ?? []

async function verify (name) {
  const fixture = join(root, name)
  if (!existsSync(join(fixture, 'node_modules/.modules.yaml'))) run(fixture, 'pnpm', ['install', '--frozen-lockfile'])
  for (const dir of ['.nuxt', 'node_modules/.cache/nuxt']) rmSync(join(fixture, dir), { recursive: true, force: true })

  const cold = build(fixture)
  if (cold.hit) throw new Inconclusive(`${name}: the first build hit a cache that should have been cleared`)
  const coldHtml = await renderIndex(fixture)
  if (!INLINE_STYLE_RE.test(coldHtml)) throw new Inconclusive(`${name}: the cold build did not inline the page's scoped style`)

  const cached = build(fixture)
  if (!cached.hit) throw new Inconclusive(`${name}: the second build missed the cache`)
  const cachedHtml = await renderIndex(fixture)

  console.log(`\n${name}`)
  console.log(`  ${cold.log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0]}`)
  console.log(`  cold build:      inline style ${INLINE_STYLE_RE.test(coldHtml) ? 'yes' : 'no'}; stylesheet links: ${links(coldHtml).join(' ') || 'none'}`)
  console.log(`  cache-hit build: inline style ${INLINE_STYLE_RE.test(cachedHtml) ? 'yes' : 'no'}; stylesheet links: ${links(cachedHtml).join(' ') || 'none'}`)
  const failures = []
  if (links(coldHtml).length) failures.push('the cold build links a stylesheet for inlined styles')
  if (cachedHtml !== coldHtml) {
    const onlyLinks = cachedHtml.replace(STYLESHEET_LINK_RE, '') === coldHtml.replace(STYLESHEET_LINK_RE, '')
    failures.push(`the cache-hit HTML differs from the cold HTML${onlyLinks ? ', only by its stylesheet links' : ''}`)
  }
  console.log(failures.length ? `  FAIL: ${failures.join('; ')}` : '  PASS')
  return failures.length === 0
}

const names = process.argv.slice(2).map(a => a.replace(/\/$/, ''))
let code = 0
try {
  for (const name of names.length ? names : FIXTURES) if (!await verify(name)) code = 1
}
catch (error) {
  if (!(error instanceof Inconclusive)) throw error
  console.error(`INCONCLUSIVE: ${error.message}`)
  code = 2
}
process.exit(code)
