import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Production build of each fixture, then a concurrent burst of 100 SSR requests to a page with one `useFetch('/api/report')`.
// probe.mjs forces GC and counts request apps (nuxtApp) that are still alive.
// Bug: several finished apps survive the GC and are only freed after a later event-loop turn,
// because the signal Nuxt passes to the in-process fetch is held by undici's Request finalizer.
// Fixed: no app survives the GC.
const root = dirname(fileURLToPath(import.meta.url))
// nodejs/node#64024 (Node 24.22.0, 26.9.0) drops removed `{ signal }` listeners, which hides the bug.
const [major, minor] = process.versions.node.split('.').map(Number)
if ((major === 24 && minor >= 22) || (major === 26 && minor >= 9) || major > 26) {
  console.error(`Node ${process.version} is not affected; run with Node 22 or Node 24 before 24.22`)
  process.exit(1)
}
const requests = 100
// A large initial old space keeps V8 from running a full GC (and undici's finalizers) in the middle of the burst,
// which would free part of the backlog early and make the count depend on timing.
const nodeFlags = ['--expose-gc', '--initial-old-space-size=1024']
const env = { ...process.env, CI: '1', PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN: 'false' }
const only = process.argv[2]
const cases = [
  { name: 'nuxt-asyncdata-request-signal', port: 38941, retained: true },
  { name: 'nuxt-asyncdata-request-signal-fix', port: 38942, retained: false },
].filter(c => !only || c.name === only)

function exec (command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] })
    let output = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { output += chunk })
    child.on('error', reject)
    child.on('exit', code => code === 0 ? resolve(output) : reject(new Error(`${command} ${args.join(' ')} exited with ${code}\n${output}`)))
  })
}

async function waitFor (check, what, timeout = 60_000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    const value = await check()
    if (value) return value
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error(`timed out waiting for ${what}`)
}

let failed = false
for (const testCase of cases) {
  const fixture = join(root, testCase.name)
  await exec('pnpm', ['install', '--frozen-lockfile'], fixture)
  await exec('pnpm', ['exec', 'nuxt', 'build'], fixture)

  const base = `http://127.0.0.1:${testCase.port}`
  const server = spawn(process.execPath, [...nodeFlags, '--import', join(root, testCase.name, 'probe.mjs'), '.output/server/index.mjs'], {
    cwd: fixture,
    env: { ...env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(testCase.port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let log = ''
  server.stdout.on('data', chunk => { log += chunk })
  server.stderr.on('data', chunk => { log += chunk })
  try {
    await waitFor(() => fetch(`${base}/api/report`).then(r => r.ok, () => false), base)
    // One concurrent burst, like steady traffic: no idle turn between requests for cleanup tasks to run in.
    const pages = await Promise.all(Array.from({ length: requests }, () => fetch(`${base}/`).then(r => r.text())))
    for (const html of pages) assert.match(html, /20000 items/, 'page did not render the fetched data')
    server.kill('SIGUSR2')
    const probe = JSON.parse(await waitFor(() => log.match(/PROBE (\{.*\})/)?.[1], 'probe output'))
    console.log(`${testCase.name}: ${probe.total} requests; alive after GC: ${probe.afterGC.apps} apps (${probe.afterGC.heapMB} MB heap); all freed after ${probe.freedAfterTurns} setTimeout(0) turns (${probe.finalHeapMB} MB)`)
    assert.equal(probe.total, requests)
    if (testCase.retained) {
      assert.ok(probe.afterGC.apps >= requests / 4, `expected finished request apps to survive a forced GC, got ${probe.afterGC.apps}`)
      assert.notEqual(probe.freedAfterTurns, null, 'expected them to be freed a few event-loop turns later')
    }
    else assert.ok(probe.afterGC.apps <= 1, `expected no request app to survive GC, got ${probe.afterGC.apps}`)
    console.log(`  ok: ${testCase.retained ? 'bug reproduced' : 'fixed control is clean'}`)
  } catch (error) {
    failed = true
    console.error(`  FAIL ${testCase.name}: ${error.message}`)
  } finally {
    server.kill('SIGINT')
    await new Promise(resolve => server.exitCode !== null ? resolve() : server.once('exit', resolve))
  }
}
process.exit(failed ? 1 : 0)
