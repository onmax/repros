import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'

const fixed = existsSync(new URL('patches/@nuxtjs__better-auth@0.3.5.patch', import.meta.url))

for (const [label, baseURL] of [['root control', '/'], ['mounted failure', '/app/']]) {
  console.log(`\n=== ${label}: app.baseURL ${baseURL} ===`)
  rmSync(new URL('.repro-result.json', import.meta.url), { force: true })
  const result = spawnSync('pnpm', ['exec', 'vitest', 'run'], {
    cwd: import.meta.dirname,
    env: { ...process.env, REPRO_BASE_URL: baseURL, REPRO_FIXED: String(fixed) },
    stdio: 'inherit',
  })
  if (result.error)
    throw result.error
  try {
    const observed = JSON.parse(readFileSync(new URL('.repro-result.json', import.meta.url), 'utf8'))
    console.log(`GET ${observed.route}: expected ${observed.expectedStatus}, actual ${observed.actualStatus}`)
    console.log(`Better Auth base path: expected ${observed.expectedBasePath}, actual ${observed.actualBasePath}`)
  }
  catch {
    console.error('No observation was recorded by the test')
    process.exit(1)
  }
  if (result.status !== 0)
    process.exit(result.status || 1)
}
