// Usage: node verify.mjs <vite-latest|vite-main>
// Exits 1 while DevEnvironment.close() fails on an environment whose init() never completed.
import { fileURLToPath } from 'node:url'

const pkg = process.argv[2]
const { DevEnvironment, createServer, resolveConfig, version } = await import(pkg)
const root = fileURLToPath(new URL('.', import.meta.url))

function createTransport() {
  const transport = {
    closed: false,
    send() {},
    on() {},
    off() {},
    close() {
      transport.closed = true
    },
  }
  return transport
}

const failingOptionsPlugin = {
  name: 'failing-options',
  options() {
    throw new Error('options hook failed')
  },
}

async function closeOutcome(environment) {
  try {
    await environment.close()
    return 'resolved'
  } catch (error) {
    return `rejected: ${error.message}`
  }
}

const results = []
function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(ok)
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`)
  console.log(`  expected: ${JSON.stringify(expected)}`)
  console.log(`  actual:   ${JSON.stringify(actual)}`)
}

console.log(`${pkg} = vite@${version}`)

// 1. init() was never called.
{
  const config = await resolveConfig({ configFile: false, root, logLevel: 'silent' }, 'serve')
  const transport = createTransport()
  const environment = new DevEnvironment('ssr', config, { hot: false, transport })
  const close = await closeOutcome(environment)
  check('close() after init() was never called', { close, transportClosed: transport.closed }, { close: 'resolved', transportClosed: true })
}

// 2. init() rejected because a plugin's options hook threw.
{
  const config = await resolveConfig({ configFile: false, root, logLevel: 'silent', plugins: [failingOptionsPlugin] }, 'serve')
  const transport = createTransport()
  const environment = new DevEnvironment('ssr', config, { hot: false, transport })
  const init = await environment.init().then(() => 'resolved', error => error.message.includes('options hook failed') ? 'rejected: options hook failed' : `rejected: ${error.message}`)
  const close = await closeOutcome(environment)
  check('close() after init() rejected', { init, close, transportClosed: transport.closed }, { init: 'rejected: options hook failed', close: 'resolved', transportClosed: true })
}

// 3. Vite's own createServer() failure path closes the environment whose init() rejected.
{
  const transport = createTransport()
  const closeCalls = []
  // Records what the real DevEnvironment.close() did when Vite called it.
  class ProbeEnvironment extends DevEnvironment {
    async close() {
      closeCalls.push(await super.close().then(() => 'resolved', error => `rejected: ${error.message}`))
    }
  }
  const start = await createServer({
    configFile: false,
    root,
    logLevel: 'silent',
    plugins: [failingOptionsPlugin],
    server: { middlewareMode: true, ws: false },
    environments: {
      ssr: { dev: { createEnvironment: (name, config) => new ProbeEnvironment(name, config, { hot: false, transport }) } },
    },
  }).then(() => 'resolved', error => error.message.includes('options hook failed') ? 'rejected: options hook failed' : `rejected: ${error.message}`)
  // Before vitejs/vite#24020 (unreleased in 8.3.8), a failed start closes nothing, so there is no close() to observe.
  if (closeCalls.length === 0) console.log('SKIP createServer() failure path: this version does not close environments on a failed start')
  else check('createServer() failure path closes the failed environment', { start, closeCalls, transportClosed: transport.closed }, { start: 'rejected: options hook failed', closeCalls: ['resolved'], transportClosed: true })
}

const failed = results.filter(ok => !ok).length
console.log(failed ? `${failed} of ${results.length} checks failed: the bug is present in vite@${version}\n` : `all checks passed in vite@${version}\n`)
process.exit(failed ? 1 : 0)
