import { readFileSync } from 'node:fs'

const configDts = 'node_modules/@onmax/nuxt-better-auth/dist/runtime/config.d.ts'

console.log('--- Fix: schema.casing properly typed ---\n')

const content = readFileSync(configDts, 'utf8')

const hasBrokenImport = content.includes("from '../schema-generator")
const hasInlineType = content.includes("type CasingOption = 'camelCase' | 'snake_case'")

console.log(`Broken import from schema-generator: ${hasBrokenImport}`)
console.log(`Inline CasingOption type: ${hasInlineType}`)

if (hasBrokenImport || !hasInlineType) {
  console.log('\n❌ Patch not applied correctly.')
  process.exit(1)
}

console.log('\n✅ CasingOption is inlined - casing will be properly typed.')
