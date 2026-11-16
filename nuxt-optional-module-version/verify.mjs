import { spawnSync } from 'node:child_process'

const run = spawnSync('pnpm', ['exec', 'nuxt', 'prepare'], { encoding: 'utf8' })
const output = `${run.stdout}${run.stderr}`
const failure = output.match(/Module `?optional-module`? version.*$/m)
if (run.status !== 0 && failure) {
  console.log(`FAIL: nuxt prepare exits ${run.status}:\n  ${failure[0]}\nThe app does not install optional-module, so its version should not be checked.`)
  process.exit(1)
}
if (run.status !== 0) {
  console.log(output)
  console.log(`ERROR: nuxt prepare failed for another reason (exit ${run.status})`)
  process.exit(2)
}
console.log('PASS: nuxt prepare skips the version check of an optional module the app does not install')
