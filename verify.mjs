import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Production build of each fixture, 10 SSR page requests, then the number of times the module
// called the app's `defineServerAuth` factory, and whether two requests get the same Better Auth
// instance. Bug: a factory call and a new instance per request. Fixed: one of each per process.
const root = dirname(fileURLToPath(import.meta.url))
const requests = 10
const env = {
  ...process.env,
  CI: '1',
  NUXT_BETTER_AUTH_SECRET: '0123456789abcdef0123456789abcdef',
  PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN: 'false',
}
const cases = [
  { name: 'better-auth-shared-db-cache', port: 38931, expectedCalls: requests, expectedSame: false },
  { name: 'better-auth-shared-db-cache-fix', port: 38932, expectedCalls: 1, expectedSame: true },
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
    env: { ...env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(testCase.port), NUXT_PUBLIC_SITE_URL: base },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let log = ''
  server.stdout.on('data', chunk => { log += chunk })
  server.stderr.on('data', chunk => { log += chunk })
  try {
    await waitForServer(`${base}/api/factory-calls`, server)
    const before = (await (await fetch(`${base}/api/factory-calls`)).json()).calls
    for (let i = 0; i < requests; i++) {
      const response = await fetch(`${base}/`)
      await response.text()
      assert.equal(response.status, 200)
    }
    const calls = (await (await fetch(`${base}/api/factory-calls`)).json()).calls - before
    console.log(`${testCase.name}: ${requests} page requests -> defineServerAuth factory called ${calls} times (expected ${testCase.expectedCalls})`)
    assert.equal(calls, testCase.expectedCalls)
    await fetch(`${base}/api/instance`)
    const { same } = await (await fetch(`${base}/api/instance`)).json()
    console.log(`${testCase.name}: serverAuth() returns the same instance on the next request: ${same} (expected ${testCase.expectedSame})`)
    assert.equal(same, testCase.expectedSame)
  }
  catch (error) {
    throw new Error(`${testCase.name} failed.\n${log}`, { cause: error })
  }
  finally {
    server.kill('SIGTERM')
    await new Promise(resolve => server.once('exit', resolve))
  }
}
