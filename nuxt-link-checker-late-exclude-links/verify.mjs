import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

execFileSync('pnpm', ['exec', 'nuxt', 'build'], { stdio: 'inherit' })
const report = JSON.parse(readFileSync('.output/link-checker-report.json', 'utf8'))
const reported = report.flatMap(page => page.reports.map(link => link.link))
console.log('\nreported links:', reported)

// Both links have uppercase characters, so the checker warns about each one it does not exclude.
if (reported.includes('/Excluded-In-Config'))
  throw new Error('control failed: the exclude from nuxt.config was not applied')
if (reported.includes('/Excluded-By-Module')) {
  console.error('BUG: the exclude a module added in modules:done was ignored')
  process.exit(1)
}
console.log('OK: both excludes applied')
