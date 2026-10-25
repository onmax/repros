import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFile, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const offline = process.argv.includes('--offline')
assert.ok(process.argv.slice(2).every(arg => arg === '--offline'), 'Usage: node verify.mjs [--offline]')
assert.equal(process.versions.node, '24.21.0', 'Use Node 24.21.0 from .node-version')
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const version = spawnSync(pnpm, ['--version'], {
  cwd: path.join(root, 'vue-pure-initializers'), encoding: 'utf8',
})
assert.equal(version.status, 0, 'Install pnpm 11.28.5 before running the repro')
assert.equal(version.stdout.trim(), '11.28.5', 'Use pnpm 11.28.5')

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, GOMAXPROCS: '2' } })
  if (result.error) throw result.error
  assert.equal(result.status, 0, `${command} ${args.join(' ')} failed`)
}

const results = []
for (const name of ['vue-pure-initializers', 'vue-pure-initializers-fix']) {
  const fixture = path.join(root, name)
  await rm(path.join(fixture, 'node_modules'), { recursive: true, force: true })
  await rm(path.join(fixture, 'dist'), { recursive: true, force: true })
  run(pnpm, ['install', '--frozen-lockfile', ...(offline ? ['--offline'] : [])], fixture)
  run(process.execPath, [path.join(root, 'scripts/verify.mjs'), fixture], root)
  results.push(JSON.parse(await readFile(path.join(fixture, 'dist/result.json'), 'utf8')))
}
const [baseline, patched] = results
const beforeRequire = createRequire(path.join(root, 'vue-pure-initializers/package.json'))
const afterRequire = createRequire(path.join(root, 'vue-pure-initializers-fix/package.json'))
for (const [name, count] of [['reactivity', 1], ['shared', 4], ['runtime-core', 1]]) {
  const entry = `@vue/${name}/dist/${name}.esm-bundler.js`
  const before = await readFile(beforeRequire.resolve(entry), 'utf8')
  const after = await readFile(afterRequire.resolve(entry), 'utf8')
  assert.equal(after.split('/*@__PURE__*/').length - before.split('/*@__PURE__*/').length, count)
  assert.equal(after.replaceAll('/*@__PURE__*/ ', ''), before,
    `${name}: the control must change only the intended PURE comments`)
}
for (const name of Object.keys(baseline.bundles)) {
  const before = baseline.bundles[name]
  const after = patched.bundles[name]
  assert.equal(after.retained, 0)
  assert.ok(before.retained > 0)
  assert.ok(after.raw < before.raw, `${name}: annotated bundle must be smaller`)
  assert.equal(before.ignoreAnnotationsSha256, after.ignoreAnnotationsSha256,
    `${name}: turning off annotation handling must produce identical bundles`)
  console.log(`${name}: ${before.raw} -> ${after.raw} raw bytes; ${before.gzip} -> ${after.gzip} gzip bytes`)
}
console.log('PASS: baseline fails tree shaking at all six sites; patched output removes them; runtime controls pass.')
