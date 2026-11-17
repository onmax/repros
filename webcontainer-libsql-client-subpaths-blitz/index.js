import { readFileSync } from 'node:fs'

// Node prints: @libsql/client@0.17.2 with ., ./node, ./http, ./web and more.
const pkg = JSON.parse(readFileSync('node_modules/@libsql/client/package.json', 'utf8'))
console.log(`installed: ${pkg.name}@${pkg.version}`)
console.log(`exports: ${Object.keys(pkg.exports).join(', ')}`)

for (const id of ['@libsql/client/http', '@libsql/client/web']) {
  try {
    await import(id)
    console.log(`import ${id}: ok`)
  } catch (error) {
    console.log(`import ${id}: ${error.code}`)
  }
}
