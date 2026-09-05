import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

const timeoutMs = 30_000
const port = await new Promise((resolvePort, reject) => {
  const server = createServer()
  server.once('error', reject)
  server.listen(0, '127.0.0.1', () => {
    const address = server.address()
    server.close(error => error ? reject(error) : resolvePort(address.port))
  })
})

const child = spawn('./node_modules/.bin/nuxt', ['dev', '--host', '127.0.0.1', '--port', String(port)], {
  detached: true,
  env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' },
  stdio: ['ignore', 'pipe', 'pipe'],
})

let output = ''
child.stdout.on('data', chunk => { output += chunk })
child.stderr.on('data', chunk => { output += chunk })

const deadline = Date.now() + timeoutMs
let html

try {
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`)
      if (response.ok) {
        html = await response.text()
        break
      }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  if (!html) {
    throw new Error(`Nuxt did not serve the page within ${timeoutMs}ms\n${output}`)
  }

  const observed = html.match(/id="observed-layout">observed=([^<]*)</)?.[1]
  console.log(`SSR middleware observed to.meta.layout=${observed}`)

  if (observed !== 'dynamic') {
    throw new Error('FAIL: later middleware did not observe the layout set by setPageLayout()')
  }

  console.log('PASS: later middleware observed the dynamically selected layout')
} finally {
  if (child.exitCode === null && child.signalCode === null) {
    const closed = new Promise(resolve => child.once('close', resolve))
    try {
      process.kill(-child.pid, 'SIGTERM')
    } catch (error) {
      if (error.code !== 'ESRCH') {
        throw error
      }
    }
    await closed
  }
}
