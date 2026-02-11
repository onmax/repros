import { pathToFileURL } from 'node:url'
import { readFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

const build = spawnSync('pnpm', ['build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    BETTER_AUTH_SECRET: 'abcdefghijklmnopqrstuvwxyz123456'
  }
})
assert(build.status === 0, `Build failed with exit code ${build.status}`)

const outputSchemaPath = resolve(root, '.output/server/node_modules/@nuxthub/db/schema.mjs')
assert(existsSync(outputSchemaPath), `Missing output schema: ${outputSchemaPath}`)

const schemaCode = await readFile(outputSchemaPath, 'utf8')
assert(
  schemaCode.includes('node_modules/.cache/nuxt/.nuxt') && schemaCode.includes('schema.postgresql.ts'),
  'Expected output schema to contain absolute node_modules/.cache Nuxt TS export path'
)

await rm(resolve(root, 'node_modules/.cache/nuxt/.nuxt/better-auth'), { recursive: true, force: true })

let importError
try {
  await import(pathToFileURL(outputSchemaPath).href)
}
catch (error) {
  importError = error
}

assert(importError, 'Expected import to fail after removing cache schema path')
assert(importError.code === 'ERR_MODULE_NOT_FOUND', `Expected ERR_MODULE_NOT_FOUND, got ${importError.code || 'unknown'}`)

console.log('Repro confirmed: absolute cache-path export causes ERR_MODULE_NOT_FOUND')
