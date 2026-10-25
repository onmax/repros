import assert from 'node:assert/strict'
import { readFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

assert.equal(process.version, 'v24.21.0', 'Use Node 24.21.0')
const root = import.meta.dirname
const fixtures = ['vueuse-pure-initializers', 'vueuse-pure-initializers-fix']
const offline = process.argv.includes('--offline')
const clean = process.argv.includes('--clean')
function pnpm(args, options) {
  // Arguments are fixed below; Windows needs cmd.exe to launch pnpm.cmd.
  return process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', `pnpm.cmd ${args.join(' ')}`], options)
    : spawnSync('pnpm', args, options)
}
const pm = pnpm(['--version'], { cwd: `${root}/${fixtures[0]}`, encoding: 'utf8' })
assert.equal(pm.status, 0, 'Install pnpm 11.28.6 first')
assert.equal(pm.stdout.trim(), '11.28.6')
for (const file of ['input.mjs', 'verify.mjs'])
  assert.equal(readFileSync(`${root}/${fixtures[0]}/${file}`, 'utf8'), readFileSync(`${root}/${fixtures[1]}/${file}`, 'utf8'), `${file} must be identical`)
const rows = []
for (const [index, name] of fixtures.entries()) {
  const cwd = `${root}/${name}`
  if (clean) rmSync(`${cwd}/node_modules`, { recursive: true, force: true })
  rmSync(`${cwd}/output`, { recursive: true, force: true })
  const args = ['install', '--frozen-lockfile', '--ignore-scripts']
  if (offline) args.push('--offline')
  const installed = pnpm(args, { cwd, stdio: 'inherit' })
  assert.equal(installed.status, 0, `${name} install failed`)
  const verified = spawnSync(process.execPath, ['verify.mjs'], { cwd, stdio: 'inherit' })
  assert.equal(verified.status, index === 0 ? 1 : 0, `${name} had an unexpected verification exit status`)
  const row = JSON.parse(readFileSync(`${cwd}/output/results.json`, 'utf8'))
  assert.equal(row.annotations, index === 0 ? 0 : 2, 'Check that pnpm actually applied the patch')
  assert.equal(row.unusedHelpersRetained, index === 0)
  assert.equal(row.runtimeControls, 'PASS')
  rows.push(row)
}
assert.equal(rows[0].packageWithoutPatchSha256, rows[1].packageWithoutPatchSha256, 'Only the two comments may change package contents')
assert.equal(rows[0].ignoreAnnotationsSha256, rows[1].ignoreAnnotationsSha256, 'Ignoring annotations must produce identical output')
assert.deepEqual(rows.map(({ raw, gzip }) => ({ raw, gzip })), [{ raw: 426, gzip: 307 }, { raw: 237, gzip: 192 }])
console.log('Expected baseline FAIL / fixed PASS confirmed; runtime controls PASS in both.')
console.log('esbuild 0.28.2: 426 -> 237 raw bytes; 307 -> 192 gzip bytes.')
