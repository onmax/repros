import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
function run(name, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [join(root, name, 'index.mjs')], { stdio: ['ignore', 'pipe', 'pipe'] })
    let output = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { output += chunk })
    const timer = setTimeout(() => {
      child.kill('SIGTERM')
      resolve({ timedOut: true, output })
    }, timeoutMs)
    child.on('error', reject)
    child.on('exit', code => {
      clearTimeout(timer)
      resolve({ timedOut: false, code, output })
    })
  })
}
const before = await run('vitehub-budget-disposal', 250)
assert.equal(before.timedOut, true, `unfixed budget exited early: ${before.output}`)
const after = await run('vitehub-budget-disposal-fix', 250)
assert.equal(after.timedOut, false, 'disposed budget kept the process alive')
assert.equal(after.code, 0)
assert.match(after.output, /invocation complete/)
console.log('budget disposal: unfixed process stays alive; fixed process exits')
