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
const applyFix = variant.fixed && process.env.APPLY_FIX !== '0'
const orderingControl = process.env.ORDERING_CONTROL !== '0'
for (const patchName of [...(orderingControl ? ['ordering.patch'] : []), ...(applyFix ? ['fix.patch'] : [])]) {
  const patch = spawnSync('patch', ['--batch', '-p1', '-i', resolve(root, patchName)], { cwd: target, encoding: 'utf8' })
  assert.equal(patch.status, 0, patch.stdout + patch.stderr)
}
const modulePath = resolve(target, 'dist/module.mjs')
let code = await readFile(modulePath, 'utf8')
const replaceOnce = (before, after) => {
  assert.equal(code.split(before).length - 1, 1, `Expected one instrumentation anchor: ${before}`)
  code = code.replace(before, after)
}
const expression = applyFix && variant.kind === 'cache-index'
  ? 'Object.fromEntries(result.map((cur) => [cur.id, cur]))'
  : 'result.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})'
replaceOnce(`    return ${expression};`, `    const indexStart = performance.now();
    const indexed = ${expression};
    globalThis.__contentPerf.index = { elapsedMs: performance.now() - indexStart, rows: result.length, copiedProperties: ${applyFix && variant.kind === 'cache-index' ? '0' : 'result.length * (result.length - 1) / 2'} };
    return indexed;`)
replaceOnce('  const databaseContents = await db.fetchDevelopmentCache();', '  globalThis.__contentPerf.phase = "process";\n  const databaseContents = await db.fetchDevelopmentCache();')
replaceOnce('            const checksum = getContentChecksum(configHash + collectionHash + content);', '            const checksum = getContentChecksum(configHash + collectionHash + content);\n            globalThis.__contentPerf.expectedChecksums[keyInCollection] = checksum;')
replaceOnce('  const endTime = performance.now();', '  const endTime = performance.now();\n  Object.assign(globalThis.__contentPerf, { parsedFilesCount, cachedFilesCount, filesCount, contentProcessingMs: endTime - startTime });')
await writeFile(modulePath, '// Written by an AI agent for onmax. Not reviewed by a human. Measurement instrumentation on a local dependency copy.\n' + code)
await writeFile(resolve(target, 'provenance.json'), JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', ...variant, fixed: applyFix, orderingControl }, null, 2) + '\n')
console.log(`Prepared pinned Content module copy; ordering prerequisite=${orderingControl}, candidate fix=${applyFix}; pnpm store remains unchanged.`)
