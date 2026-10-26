import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Production build of each fixture. Checks whether @nuxtjs/i18n set up its server context
// (`event.context.nuxtI18n`) for requests that render no page, through the `x-repro-i18n-context`
// header from server/plugins/i18n-context-header.ts.
// Bug: set up for the API route, the public file and the `/_nuxt` asset. Fixed: for none of them.
// Both: the page still renders translated text for each locale.
const root = dirname(fileURLToPath(import.meta.url))
const env = { ...process.env, CI: '1', PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN: 'false' }
const cases = [
  { name: 'i18n-4144', port: 38937, expectedContext: 'true' },
  { name: 'i18n-4144-fix', port: 38938, expectedContext: 'false' },
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
  try {
    await waitForServer(`${base}/api/report`, server)

    for (const [path, title] of [['/', 'Report'], ['/nl', 'Rapport'], ['/fr', 'Rapport (fr)']]) {
      const html = await (await fetch(base + path)).text()
      assert.match(html, new RegExp(`<h1>${title.replace(/[()]/g, '\\$&')}</h1>`), `${path} renders "${title}"`)
    }
    console.log(`${testCase.name}: pages /, /nl and /fr render their translated title`)

    const asset = (await (await fetch(base)).text()).match(/\/_nuxt\/[\w.-]+\.js/)?.[0]
    assert.ok(asset, 'the page links a /_nuxt asset')
    for (const path of ['/api/report', '/robots.txt', asset]) {
      const response = await fetch(base + path)
      assert.equal(response.status, 200, `${path} status`)
      const context = response.headers.get('x-repro-i18n-context')
      console.log(`${testCase.name}: ${path} -> i18n server context set up: ${context} (expected ${testCase.expectedContext})`)
      assert.equal(context, testCase.expectedContext)
    }
  }
  catch (error) {
    throw new Error(`${testCase.name} failed.\n${log}`, { cause: error })
  }
  finally {
    server.kill('SIGTERM')
    await new Promise(resolve => server.once('exit', resolve))
  }
}
