import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Production build of each fixture. Counts how often @nuxtjs/i18n's switch-locale-path-ssr plugin
// runs its regex over the rendered HTML (instrumented by app/plugins/count-slp-scans.server.ts).
// Bug: once per request on a page without SwitchLocalePathLink. Fixed: never on that page.
// Both: a page with the link still gets its href rewritten.
const root = dirname(fileURLToPath(import.meta.url))
const requests = 5
const env = { ...process.env, CI: '1', PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN: 'false' }
const cases = [
  { name: 'i18n-slp-html-scan', port: 38935, expectedScans: requests },
  { name: 'i18n-slp-html-scan-fix', port: 38936, expectedScans: 0 },
]

function exec(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] })
    let output = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { output += chunk })
    child.on('error', reject)
    child.on('exit', code => code === 0 ? resolve(output) : reject(new Error(`${command} ${args.join(' ')} exited with ${code}\n${output}`)))
  })
}

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

for (const testCase of cases) {
  const fixture = join(root, testCase.name)
  await access(join(fixture, 'package.json'))
  await exec('pnpm', ['install', '--frozen-lockfile'], fixture)
  await exec('pnpm', ['exec', 'nuxt', 'build'], fixture)

  const base = `http://127.0.0.1:${testCase.port}`
  const server = spawn(process.execPath, ['.output/server/index.mjs'], {
    cwd: fixture,
    env: { ...env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(testCase.port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let log = ''
  server.stdout.on('data', chunk => { log += chunk })
  server.stderr.on('data', chunk => { log += chunk })
  const scans = async () => (await fetch(`${base}/api/slp-scans`)).json()
  try {
    await waitForServer(`${base}/api/slp-scans`, server)
    const before = await scans()
    let bytes = 0
    for (let i = 0; i < requests; i++) {
      const html = await (await fetch(`${base}/`)).text()
      bytes += html.length
      assert.doesNotMatch(html, /nuxt-i18n-slp/)
    }
    const after = await scans()
    console.log(`${testCase.name}: ${requests} requests to a page without SwitchLocalePathLink (${bytes} bytes of HTML) -> ${after.calls - before.calls} HTML scans, ${after.chars - before.chars} characters scanned (expected ${testCase.expectedScans} scans)`)
    assert.equal(after.calls - before.calls, testCase.expectedScans)

    const linkHtml = await (await fetch(`${base}/with-link`)).text()
    const withLink = await scans()
    const href = linkHtml.match(/<a[^>]*href="([^"]*)"[^>]*id="to-nl"|<a[^>]*id="to-nl"[^>]*href="([^"]*)"/)
    const resolved = href?.[1] ?? href?.[2]
    console.log(`${testCase.name}: page with SwitchLocalePathLink -> ${withLink.calls - after.calls} HTML scan, href ${resolved} (expected 1 scan, /nl/with-link)`)
    assert.equal(withLink.calls - after.calls, 1)
    assert.equal(resolved, '/nl/with-link')
  }
  catch (error) {
    throw new Error(`${testCase.name} failed.\n${log}`, { cause: error })
  }
  finally {
    server.kill('SIGTERM')
    await new Promise(resolve => server.once('exit', resolve))
  }
}
