import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

const port = await new Promise((resolve, reject) => {
  const socket = createServer()
  socket.once('error', reject)
  socket.listen(0, '127.0.0.1', () => {
    const address = socket.address()
    socket.close(() => resolve(address.port))
  })
})
const server = spawn('node_modules/.bin/nuxt', ['dev', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: import.meta.dirname,
  stdio: ['ignore', 'pipe', 'pipe'],
})

let logs = ''
server.stdout.on('data', chunk => logs += chunk)
server.stderr.on('data', chunk => logs += chunk)

try {
  let response
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      response = await fetch(`http://127.0.0.1:${port}/`, {
        headers: { accept: 'text/html' },
      })
      break
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }

  if (!response) {
    throw new Error(`Nuxt did not start\n${logs}`)
  }

  const html = await response.text()
  const actual = html.match(/id="cause"[^>]*>([\s\S]*?)<\/p>/)?.[1]
    ?.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*cause:\s*/, '')
    .trim() ?? 'not rendered'
  console.log(`HTTP ${response.status}; ${response.headers.get('content-type')}; ${actual}`)

  if (actual !== 'root cause') {
    throw new Error('Expected error.vue to receive cause "root cause"')
  }

  const jsonResponse = await fetch(`http://127.0.0.1:${port}/`, {
    headers: { accept: 'application/json' },
  })
  const json = await jsonResponse.json()
  const hasCause = 'cause' in json || JSON.stringify(json).includes('root cause')
  console.log(`JSON ${jsonResponse.status}; cause ${hasCause ? 'exposed' : 'absent'}`)

  if (hasCause) {
    throw new Error('Expected JSON error response to omit the cause')
  }
} finally {
  server.kill('SIGTERM')
}
