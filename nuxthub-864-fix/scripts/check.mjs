import { createServer } from 'node:net'
import { spawn } from 'node:child_process'

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        reject(new Error('Unable to determine a free port'))
        return
      }
      const { port } = address
      server.close(() => resolve(port))
    })
    server.on('error', reject)
  })
}

async function waitForBlobDriver(port) {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/blob-driver`)
      if (response.ok) {
        return await response.json()
      }
    } catch {
    }

    await new Promise(resolve => setTimeout(resolve, 200))
  }

  throw new Error('Timed out waiting for the built Nuxt server')
}

const port = await getFreePort()
const server = spawn('node', ['.output/server/index.mjs'], {
  env: {
    ...process.env,
    PORT: String(port),
    NITRO_PORT: String(port),
    S3_ACCESS_KEY_ID: 'runtime-key',
    S3_SECRET_ACCESS_KEY: 'runtime-secret',
    S3_BUCKET: 'runtime-bucket',
    S3_REGION: 'eu-west-1'
  },
  stdio: ['ignore', 'pipe', 'pipe']
})

let output = ''
server.stdout.on('data', (chunk) => {
  output += chunk.toString()
})
server.stderr.on('data', (chunk) => {
  output += chunk.toString()
})

try {
  const result = await waitForBlobDriver(port)

  if (result.driver !== 's3') {
    throw new Error(`Expected blob driver to be "s3" but got "${result.driver}"`)
  }

  console.log(`Runtime blob driver: ${result.driver}`)
} finally {
  server.kill('SIGTERM')
  await new Promise(resolve => server.once('exit', resolve))
}
