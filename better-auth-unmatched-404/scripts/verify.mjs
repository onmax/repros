import { spawn } from 'node:child_process'

const origin = 'http://127.0.0.1:34044'
const server = spawn('./node_modules/.bin/nuxt', ['dev', '--host', '127.0.0.1', '--port', '34044'], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

let output = ''
server.stdout.on('data', chunk => output += chunk)
server.stderr.on('data', chunk => output += chunk)

try {
  let response
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      response = await fetch(`${origin}/missing`, { redirect: 'manual' })
      break
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }

  if (!response)
    throw new Error(`Nuxt did not start\n${output}`)

  const location = response.headers.get('location')
  console.log(`GET /missing -> ${response.status}${location ? ` ${location}` : ''}`)

  if (response.status !== 404)
    throw new Error('Expected Nuxt to preserve the unmatched route as a 404')
}
finally {
  server.kill('SIGTERM')
}
