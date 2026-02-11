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
  !schemaCode.includes('export * from "/') && !schemaCode.includes('schema.postgresql.ts"'),
  'Expected output schema to be bundled and not contain absolute TS export path'
)

await rm(resolve(root, 'node_modules/.cache/nuxt/.nuxt/better-auth'), { recursive: true, force: true })

try {
  await import(pathToFileURL(outputSchemaPath).href)
  console.log('Fix confirmed: output schema remains importable without cache schema files')
}
catch (error) {
  throw new Error(`Expected import success after cache removal, got ${error.code || error.message}`)
}
