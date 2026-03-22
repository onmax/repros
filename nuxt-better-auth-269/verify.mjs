import { readFileSync, existsSync } from 'node:fs'

const configDts = 'node_modules/@onmax/nuxt-better-auth/dist/runtime/config.d.ts'
const schemaGen = 'node_modules/@onmax/nuxt-better-auth/dist/schema-generator.d.ts'

console.log('--- Bug: schema.casing typed as `any` ---\n')

// 1. config.d.ts imports CasingOption from ../schema-generator.js
const content = readFileSync(configDts, 'utf8')
const importLine = content.split('\n').find(l => l.includes('CasingOption'))
console.log(`config.d.ts imports: ${importLine?.trim()}`)

// 2. schema-generator.d.ts doesn't exist in dist/
const exists = existsSync(schemaGen)
console.log(`dist/schema-generator.d.ts exists: ${exists}`)

if (!exists) {
  console.log('\n❌ CasingOption resolves to `any` because the import target is missing.')
  console.log('   In nuxt.config.ts, `auth.schema.casing` will be typed as `any`.')
  process.exit(1)
}

console.log('\n✅ CasingOption resolves correctly.')
