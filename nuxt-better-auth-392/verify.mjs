import { spawn } from 'node:child_process'
import process from 'node:process'

const port = 4392
const env = {
  ...process.env,
  NODE_ENV: 'production',
  PORT: String(port),
  NITRO_PORT: String(port),
  NUXT_PUBLIC_SITE_URL: `http://127.0.0.1:${port}`,
  BETTER_AUTH_SECRETS: '2:current-secret-12345678901234567890123,1:old-secret-123456789012345678901234567',
}

delete env.NUXT_BETTER_AUTH_SECRET
delete env.BETTER_AUTH_SECRET
delete env.AUTH_SECRET

const server = spawn(process.execPath, ['.output/server/index.mjs'], { env })
let output = ''

server.stdout.on('data', chunk => output += chunk)
server.stderr.on('data', chunk => output += chunk)

try {
  let response

  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      response = await fetch(`http://127.0.0.1:${port}/api/check`)
      break
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  if (!response)
    throw new Error(`Server did not start.\n${output}`)

  if (!response.ok)
    throw new Error(`Expected /api/check to return 200, received ${response.status}.\n${output}`)

  console.log('PASS: BETTER_AUTH_SECRETS works without a singular secret')
}
finally {
  server.kill()
}
