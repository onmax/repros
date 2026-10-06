import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
const secret = '0123456789abcdef0123456789abcdef'
const cases = [
  {
    name: 'better-auth-512',
    port: 4312,
    expectedStatus: 404,
    expectedText: '/api/auth/get-session',
  },
  {
    name: 'better-auth-512-fix',
    port: 4313,
    expectedStatus: 200,
    expectedText: 'Protected page',
  },
]

async function waitForServer(url, child) {
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null)
      throw new Error(`Nuxt exited before serving ${url}`)
    try {
      await fetch(url)
      return
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  throw new Error(`Timed out waiting for ${url}`)
}

async function installFixture(fixture) {
  try {
    await access(join(fixture, 'node_modules', '.modules.yaml'))
    return
  }
  catch {}

  await new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], {
      cwd: fixture,
      env: {
        ...process.env,
        CI: '1',
        NUXT_BETTER_AUTH_SECRET: secret,
      },
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0)
        resolve()
      else
        reject(new Error(`pnpm install exited with code ${code}`))
    })
  })
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        CI: '1',
        NUXT_BETTER_AUTH_SECRET: secret,
        PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN: 'false',
      },
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { output += chunk })
    child.on('error', reject)
    resolve({ child, getOutput: () => output })
  })
}

async function stop(child) {
  if (child.exitCode !== null)
    return
  try {
    process.kill(-child.pid, 'SIGTERM')
  }
  catch {}
  await new Promise(resolve => setTimeout(resolve, 1_000))
  if (child.exitCode === null) {
    try {
      process.kill(-child.pid, 'SIGKILL')
    }
    catch {}
  }
}

for (const testCase of cases) {
  const fixture = join(root, testCase.name)
  await access(join(fixture, 'package.json'))
  await installFixture(fixture)
  const server = await run('pnpm', ['exec', 'nuxt', 'dev', '--host', '127.0.0.1', '--port', String(testCase.port)], fixture)
  try {
    const url = `http://127.0.0.1:${testCase.port}/`
    await waitForServer(url, server.child)
    const response = await fetch(url)
    const body = await response.text()
    assert.equal(response.status, testCase.expectedStatus, `${testCase.name} returned ${response.status}: ${body.slice(0, 500)}`)
    assert.match(body, new RegExp(testCase.expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    console.log(`${testCase.name}: ${response.status} and ${testCase.expectedText}`)
  }
  catch (error) {
    throw new Error(`${testCase.name} failed.\n${server.getOutput()}`, { cause: error })
  }
  finally {
    await stop(server.child)
  }
}
