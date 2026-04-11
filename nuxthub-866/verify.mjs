import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = import.meta.dirname
const buildSchemaPath = join(rootDir, '.nuxt/hub/db/schema.mjs')
const outputSchemaPath = join(rootDir, '.output/server/node_modules/@nuxthub/db/schema.mjs')
const expectedExports = ['layerPosts', 'rootUsers']

function ensureFile(path) {
  if (existsSync(path)) {
    return
  }

  console.error(`FAIL: expected file was not generated: ${path}`)
  process.exit(1)
}

async function loadModule(path) {
  return import(`${pathToFileURL(path).href}?t=${Date.now()}`)
}

function missingExports(mod) {
  return expectedExports.filter(name => !(name in mod))
}

ensureFile(buildSchemaPath)
ensureFile(outputSchemaPath)

const buildSchema = await loadModule(buildSchemaPath)
const outputSchema = await loadModule(outputSchemaPath)

const buildMissing = missingExports(buildSchema)
if (buildMissing.length > 0) {
  console.error(`FAIL: build schema is missing expected exports: ${buildMissing.join(', ')}`)
  process.exit(1)
}

const outputMissing = missingExports(outputSchema)
if (outputMissing.length > 0) {
  console.error(`FAIL: output schema is missing expected exports: ${outputMissing.join(', ')}`)
  process.exit(1)
}

console.log('PASS: both schema files export rootUsers and layerPosts')
