import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CAUSE = 'ROOT_CAUSE: the token file is missing'
const URL_ = 'https://example.com/docs/my-plugin-error'
const env = { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }

// `vite build`: the terminal shows the cause.
const build = spawnSync('node_modules/.bin/vite', ['build'], { encoding: 'utf8', env })
const buildOut = build.stdout + build.stderr
console.log('vite build prints cause:', buildOut.includes(CAUSE))

// `vite dev`: request the module and read what the terminal shows.
const port = 47000 + Math.floor(Math.random() * 900)
const dev = spawn('node_modules/.bin/vite', ['--host', '127.0.0.1', '--port', String(port), '--strictPort'], { env })
let devOut = ''
dev.stdout.on('data', (d) => { devOut += d })
dev.stderr.on('data', (d) => { devOut += d })
try {
  let ready = false
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(250)
    ready = await fetch(`http://127.0.0.1:${port}/`).then(() => true, () => false)
  }
  assert.ok(ready, 'dev server did not start')
  const res = await fetch(`http://127.0.0.1:${port}/src/index.js`)
  console.log('dev request status:', res.status)
  await sleep(500)
} finally {
  dev.kill()
}
console.log('--- vite dev terminal ---\n' + devOut.trim() + '\n---')
console.log('vite dev prints message:', devOut.includes('Something is misconfigured'))
console.log('vite dev prints cause:', devOut.includes(CAUSE))
console.log('vite dev prints url:', devOut.includes(URL_))
assert.ok(buildOut.includes(CAUSE), 'control failed: vite build did not print the cause')
assert.ok(devOut.includes('Something is misconfigured'), 'control failed: no dev error logged')
assert.ok(devOut.includes(CAUSE), 'BUG: vite dev drops error.cause from the terminal log')
assert.ok(devOut.includes(URL_), 'BUG: vite dev drops error.url from the terminal log')
console.log('OK')
