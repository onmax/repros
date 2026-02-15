import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const dbShim = join(import.meta.dirname, 'node_modules/@nuxthub/db/db.mjs')
const content = readFileSync(dbShim, 'utf-8')

if (content.includes("drizzle-orm/d1")) {
  console.error('FAIL: Build uses d1 driver instead of libsql')
  process.exit(1)
}

if (content.includes("drizzle-orm/libsql")) {
  console.log('PASS: Build correctly uses libsql driver')
  process.exit(0)
}

console.error('FAIL: Unexpected driver in build output')
console.error(content)
process.exit(1)
