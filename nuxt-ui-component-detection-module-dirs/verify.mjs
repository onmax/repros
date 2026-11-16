import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync, rmSync } from 'node:fs'

rmSync('.output', { recursive: true, force: true })
const run = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8' })
if (run.status !== 0) {
  console.log(`${run.stdout}${run.stderr}`)
  console.log(`ERROR: nuxt build failed (exit ${run.status})`)
  process.exit(2)
}

const sources = readFileSync('.nuxt/ui.css', 'utf8')
const themes = [...sources.matchAll(/@source "\.\/ui\/([\w-]+)\.ts"/g)].map(m => m[1])
console.log(`theme sources in .nuxt/ui.css: ${themes.join(', ')}`)

const dir = '.output/public/_nuxt'
const css = readdirSync(dir).filter(f => f.endsWith('.css')).map(f => readFileSync(`${dir}/${f}`, 'utf8')).join('\n')
// `text-[10px]/3` only appears in the `sm` size of the Badge theme.
const badgeSm = css.includes('.text-\\[10px\\]\\/3{')

if (!themes.includes('button')) {
  console.log('ERROR: component detection did not run (no button theme from app/app.vue)')
  process.exit(2)
}
if (!themes.includes('badge') || !badgeSm) {
  console.log(`FAIL: <UBadge size="sm"> in a component that the card-kit module registers with addComponentsDir() is not detected.`)
  console.log(`  badge theme in .nuxt/ui.css: ${themes.includes('badge')}, .text-[10px]/3 in the built CSS: ${badgeSm}`)
  process.exit(1)
}
console.log('PASS: component detection includes Nuxt UI components used in module component dirs')
