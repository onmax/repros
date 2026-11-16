import { execSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'

rmSync('.output', { recursive: true, force: true })
execSync('pnpm exec nuxt build', { stdio: 'inherit' })

const file = '.output/public/manifest.json'
if (existsSync(file)) {
  const keys = Object.keys(JSON.parse(readFileSync(file, 'utf8')))
  console.log(`\nFAIL: ${file} is in the public output, with ${keys.length} entries:`, keys)
  process.exit(1)
}
console.log(`\nPASS: no ${file} in the public output`)
