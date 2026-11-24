// Runs `nuxt build` with Nitro v3. Exits 1 when the build fails, which is the bug:
// the server plugin's import of `@nuxthub/core/db` pulls tsdown into the server bundle.
import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'

const root = import.meta.dirname
for (const dir of ['.nuxt', '.output']) rmSync(join(root, dir), { recursive: true, force: true })

const { status, stdout, stderr } = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { cwd: root, encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
const log = (stdout + stderr).replace(/\x1b\[[0-9;]*m/g, '')
const errors = log.split('\n').filter(line => /MISSING_EXPORT|ast-kit/.test(line))

console.log('expected: nuxt build succeeds')
console.log(`actual:   nuxt build exited with ${status}`)
if (errors.length) console.log(errors.map(line => `  ${line.trim()}`).join('\n'))

if (status !== 0) {
  console.log('FAIL: importing @nuxthub/core/db in server code breaks the Nitro v3 build')
  process.exit(1)
}
console.log('PASS: the server bundle builds')
