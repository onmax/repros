// Builds this app for production, then looks in `.output` for the page calls that
// Nuxt's `optimization.treeShake.composables` defaults list. Exits 1 while a listed
// call survives, and 2 if the build, a page or the control is wrong.
// ../nuxt-definepagemeta-treeshake-fix runs this same file.
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const nuxt = JSON.parse(readFileSync('node_modules/nuxt/package.json', 'utf8'))

// One call per page. `envs` are the environments whose defaults list the composable:
// definePageMeta in client and server, onPrehydrate in client only.
const pages = [
  { page: 'index', call: 'definePageMeta', written: 'auto-import', envs: ['client', 'server'] },
  { page: 'second', call: 'definePageMeta', written: 'auto-import', envs: ['client', 'server'] },
  { page: 'from-imports', call: 'definePageMeta', written: `import from '#imports'`, envs: ['client', 'server'] },
  { page: 'prehydrate-auto', call: 'onPrehydrate', written: 'auto-import', envs: ['client'] },
  // Control: the same plugin and lookup, with an import path that equals a defaults key.
  { page: 'prehydrate-app', call: 'onPrehydrate', written: `import from '#app'`, envs: ['client'], control: true },
]

const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8' })
if (build.status !== 0) {
  console.error(`${build.stdout}${build.stderr}\nnuxt build failed`)
  process.exit(2)
}

const chunks = dir => readdirSync(dir, { recursive: true })
  .filter(f => /\.m?js$/.test(f))
  .map(f => ({ file: join(dir, f), code: readFileSync(join(dir, f), 'utf8') }))
const output = { client: chunks('.output/public/_nuxt'), server: chunks('.output/server') }

// `definePageMeta({ reproLabel: "index" })`, or `onPrehydrate("…")` with the string the
// prehydrate transform makes of its callback.
const callRe = ({ call, page }) => call === 'definePageMeta'
  ? new RegExp(String.raw`\bdefinePageMeta\(\{\s*reproLabel:\s*["'\`]${page}["'\`]\s*\}\)`)
  : new RegExp(String.raw`\bonPrehydrate\("[^"]*\b${page}\b`)

const missing = []
const kept = []
const rows = pages.map((p) => {
  const row = { ...p }
  for (const env of ['client', 'server']) {
    if (!output[env].some(c => c.code.includes(`__name: "${p.page}"`))) missing.push(`${p.page}.vue (${env})`)
    if (!p.envs.includes(env)) {
      row[env] = '-'
      continue
    }
    const chunk = output[env].find(c => callRe(p).test(c.code))
    row[env] = chunk ? 'kept' : 'removed'
    if (chunk) kept.push({ ...p, env, chunk })
  }
  return row
})

// Nuxt extracts the meta into the route table at build time, so the call in the page is
// dead code. Check that the meta still reaches the router either way.
const metaRe = page => new RegExp(String.raw`meta:\s*\{\s*"?reproLabel"?:\s*["'\`]${page}["'\`]\s*\}`)
const metaPages = pages.filter(p => p.call === 'definePageMeta')
const metaLost = metaPages.flatMap(p => ['client', 'server'].filter(env => !output[env].some(c => metaRe(p.page).test(c.code))).map(env => `${p.page}.vue (${env})`))

const pad = (s, n) => String(s).padEnd(n)
console.log(`${nuxt.name}@${nuxt.version}, nuxt build, client chunks unminified\n`)
console.log(pad('page', 22) + pad('call', 16) + pad('written as', 26) + pad('client', 9) + 'server')
for (const r of rows) console.log(pad(`${r.page}.vue`, 22) + pad(r.call, 16) + pad(r.written, 26) + pad(r.client, 9) + r.server + (r.control ? '   (control)' : ''))
console.log(`\nExpected: "removed" in every listed cell. "-" means the defaults don't list the composable there.`)
console.log(`Route table: ${metaLost.length ? `meta missing for ${metaLost.join(', ')}` : `all ${metaPages.length} definePageMeta pages keep their meta, client and server`}.`)

if (kept.length) {
  console.log('\nKept calls, with the import of the same name in that chunk:')
  for (const k of kept) {
    const lines = k.chunk.code.split('\n')
      .filter(l => (/^import\b/.test(l) && new RegExp(String.raw`\b${k.call}\b`).test(l)) || callRe(k).test(l))
      .map(l => `    ${l.trim().slice(0, 120)}`)
    console.log(`  ${k.chunk.file}\n${lines.join('\n')}`)
  }
}

if (missing.length) {
  console.error(`\nBroken fixture: no component for ${missing.join(', ')} in .output.`)
  process.exit(2)
}
if (metaLost.length) {
  console.error(`\nPage meta missing from the route table: ${metaLost.join(', ')}.`)
  process.exit(2)
}
if (kept.some(k => k.control)) {
  console.error(`\nControl failed: the import from '#app' was not tree-shaken either, so the plugin did not run as expected.`)
  process.exit(2)
}
const failures = kept.filter(k => !k.control)
if (failures.length) {
  console.log(`\nFAIL: ${failures.length} listed calls survive in .output.`)
  process.exit(1)
}
console.log('\nPASS: every listed call is gone from .output.')
