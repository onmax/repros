// Written by an AI agent for onmax. Not reviewed by a human.
import { cp, mkdir, readFile, readdir, realpath, rm, symlink, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import assert from 'node:assert/strict'
const root = fileURLToPath(new URL('../', import.meta.url))
const variant = JSON.parse(await readFile(resolve(root, 'variant.json'), 'utf8'))
const source = await realpath(resolve(root, 'node_modules/@nuxt/content'))
const target = resolve(root, '.instrumented-content')
const pkg = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'))
assert.equal(pkg.version, '3.16.0')
await rm(target, { recursive: true, force: true })
await mkdir(target)
await cp(resolve(source, 'dist'), resolve(target, 'dist'), { recursive: true })
await cp(resolve(source, 'package.json'), resolve(target, 'package.json'))
// Mirror direct package resolution plus pnpm's normal hoisted dynamic-import fallback.
const modules = resolve(target, 'node_modules')
await mkdir(modules)
const linked = new Set()
for (const dependencyRoot of [dirname(dirname(source)), resolve(root, 'node_modules'), resolve(root, 'node_modules/.pnpm/node_modules')]) {
  for (const entry of await readdir(dependencyRoot)) {
    if (entry.startsWith('.')) continue
    const names = entry.startsWith('@') ? (await readdir(resolve(dependencyRoot, entry))).map(name => `${entry}/${name}`) : [entry]
    for (const name of names) {
      if (linked.has(name)) continue
      linked.add(name)
      await mkdir(dirname(resolve(modules, name)), { recursive: true })
      await symlink(resolve(dependencyRoot, name), resolve(modules, name), 'dir')
    }
  }
}
if (variant.fixed) {
  const patch = spawnSync('patch', ['--batch', '-p1', '-i', resolve(root, 'fix.patch')], { cwd: target, encoding: 'utf8' })
  assert.equal(patch.status, 0, patch.stdout + patch.stderr)
}
const modulePath = resolve(target, 'dist/module.mjs')
const originalCode = await readFile(resolve(source, 'dist/module.mjs'), 'utf8')
let code = await readFile(modulePath, 'utf8')
const anchor = '  const endTime = performance.now();'
assert.equal(code.split(anchor).length - 1, 1)
code = code.replace(anchor, anchor + '\n  Object.assign(globalThis.__contentOrder, { parsedFilesCount, cachedFilesCount, filesCount });')
await writeFile(modulePath, '// AI-authored measurement instrumentation; not reviewed by a human.\n' + code)
const { createHash } = await import('node:crypto')
const hash = value => createHash('sha256').update(value).digest('hex')
const provenance = { disclosure: 'AI-authored; not reviewed by a human.', node: process.version, contentVersion: pkg.version, fixed: variant.fixed, originalModuleSha256: hash(originalCode), patchSha256: variant.fixed ? hash(await readFile(resolve(root, 'fix.patch'))) : null, instrumentedModuleSha256: hash(code) }
await writeFile(resolve(target, 'provenance.json'), JSON.stringify(provenance, null, 2) + '\n')
console.log(JSON.stringify(provenance))
