import { spawn } from 'node:child_process'
import { once } from 'node:events'
import process from 'node:process'

async function verifyRuntime(name, port, authEnv, expectedStatus, expectedOutput) {
  const env = {
    ...process.env,
    NODE_ENV: 'production',
    PORT: String(port),
    NITRO_PORT: String(port),
    ...authEnv,
  }

  delete env.NUXT_BETTER_AUTH_SECRET
  delete env.AUTH_SECRET
  if (!('BETTER_AUTH_SECRET' in authEnv))
    delete env.BETTER_AUTH_SECRET
  if (!('BETTER_AUTH_SECRETS' in authEnv))
    delete env.BETTER_AUTH_SECRETS
  if (!('NUXT_PUBLIC_SITE_URL' in authEnv))
    delete env.NUXT_PUBLIC_SITE_URL

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
    if (response.status !== expectedStatus)
      throw new Error(`${name}: expected HTTP ${expectedStatus}, received ${response.status}.\n${output}`)

    await new Promise(resolve => setTimeout(resolve, 100))
    if (expectedOutput && !output.includes(expectedOutput))
      throw new Error(`${name}: expected server output to include "${expectedOutput}".\n${output}`)

    console.log(`PASS: ${name}`)
  }
  finally {
    server.kill()
    await Promise.race([
      once(server, 'exit'),
      new Promise(resolve => setTimeout(resolve, 1000)),
    ])
  }
}

await verifyRuntime(
  'BETTER_AUTH_SECRETS works without a singular secret',
  4392,
  {
    NUXT_PUBLIC_SITE_URL: 'http://127.0.0.1:4392',
    BETTER_AUTH_SECRETS: '2:current-secret-12345678901234567890123,1:old-secret-123456789012345678901234567',
  },
  200,
)

await verifyRuntime(
  'runtime-only BETTER_AUTH_SECRET works',
  4393,
  {
    NUXT_PUBLIC_SITE_URL: 'http://127.0.0.1:4393',
    BETTER_AUTH_SECRET: 'runtime-secret-12345678901234567890123',
  },
  200,
)

await verifyRuntime(
  'short runtime-only BETTER_AUTH_SECRET is rejected',
  4394,
  {
    NUXT_PUBLIC_SITE_URL: 'http://127.0.0.1:4394',
    BETTER_AUTH_SECRET: 'too-short',
  },
  500,
  'must be at least 32 characters',
)

await verifyRuntime(
  'missing secret is reported before missing siteUrl',
  4395,
  {},
  500,
  'An auth secret is required in production',
)
