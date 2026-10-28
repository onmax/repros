import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { promises as fsp } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

assert.equal(process.versions.node, '24.22.1', 'Use the pinned Node runtime from README.md')
const require = createRequire(import.meta.url)
const modulePath = process.env.SKILL_HUB_MODULE
  ? resolve(process.env.SKILL_HUB_MODULE)
  : require.resolve('nuxt-skill-hub')
const source = await fsp.readFile(modulePath, 'utf8')
assert.match(source, /async function buildNuxtTemplateFiles\(/)
// Expose the actual bundled private function. Keep its location so import.meta.url
// and package imports resolve exactly as they do in the original published module.
const exposedPath = join(dirname(modulePath), `.repro-${randomUUID()}.mjs`)
const glob = fsp.glob
const pack = { relativePath: 'rules/abstraction-disambiguation.md' }
const expectedError = `Missing Nuxt rule pack ${pack.relativePath}`
let converted = 0
try {
  await fsp.writeFile(exposedPath, `${source}\nexport { buildNuxtTemplateFiles };\n`)
  const { buildNuxtTemplateFiles } = await import(pathToFileURL(exposedPath).href)
  function assertPack(files) {
    assert.equal(files.length, 1)
    assert.equal(files[0].path.replaceAll('\\', '/'), `references/nuxt/${pack.relativePath}`)
    assert.match(files[0].contents, /^## Abstraction Disambiguation/)
  }
  // The control returns canonical slash-separated entries even on Windows.
  for (const windowsPaths of [false, true]) {
    fsp.glob = async function* (...args) {
      for await (const path of glob(...args)) {
        const canonical = path.replaceAll('\\', '/')
        const result = windowsPaths ? canonical.replaceAll('/', '\\') : canonical
        if (windowsPaths && result.includes('\\')) converted++
        yield result
      }
    }
    if (!windowsPaths || process.argv.includes('--expect-fixed')) {
      assertPack(await buildNuxtTemplateFiles('references/nuxt', [pack]))
      console.log(`PASS ${windowsPaths ? 'Windows' : 'POSIX'} glob paths: rule pack generated`)
    }
    else {
      await assert.rejects(buildNuxtTemplateFiles('references/nuxt', [pack]), {
        message: expectedError,
      })
      console.log(`PASS Windows glob paths reproduce: ${expectedError}`)
    }
  }
  assert.ok(converted > 0, 'The Windows control must exercise nested backslash paths')
}
finally {
  fsp.glob = glob
  await fsp.rm(exposedPath, { force: true })
}
