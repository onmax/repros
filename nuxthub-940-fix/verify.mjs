import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('.', import.meta.url))
let failed = false

// 1. Node loads the published module entry without jiti.
const load = spawnSync(process.execPath, ['--input-type=module', '-e', "await import('@nuxthub/core')"], { cwd, encoding: 'utf8' })
const loadErr = load.stderr.match(/Error \[\w+\]: .*/)?.[0]
console.log('node import @nuxthub/core')
console.log('  expected: exit 0')
console.log(`  actual:   exit ${load.status}${loadErr ? `, ${loadErr}` : ''}`)
if (load.status !== 0) failed = true

// 2. Nuxt with compatibilityVersion 5 loads the module natively.
const prepare = spawnSync('pnpm', ['exec', 'nuxt', 'prepare'], { cwd, encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1' } })
if (prepare.status !== 0) throw new Error(`nuxt prepare failed:\n${prepare.stdout}${prepare.stderr}`)
const warning = (prepare.stdout + prepare.stderr).split('\n').find(line => line.includes('NUXT_B8023') && line.includes('@nuxthub/core'))
console.log('nuxt prepare (future.compatibilityVersion: 5)')
console.log('  expected: no NUXT_B8023 warning for @nuxthub/core')
console.log(`  actual:   ${warning ? warning.trim() : 'no warning'}`)
if (warning) failed = true

console.log(failed ? '\nFAIL: @nuxthub/core cannot be loaded natively (issue #940 reproduced)' : '\nPASS')
process.exit(failed ? 1 : 0)
