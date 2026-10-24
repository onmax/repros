// Builds one generated app with N lazy chunks and prints timings as JSON.
// Usage: node build-one.mjs <N>   (SCOPE=0 leaves cssScopeTo unset, as a control)
import { createHash } from 'node:crypto'
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { build } from 'vite'

const n = Number(process.argv[2])
const root = resolve('.gen', String(n))

// N chunks: main.js lazily imports c/<i>.js, and each of those imports c/<i>.css.
rmSync(root, { recursive: true, force: true })
mkdirSync(join(root, 'c'), { recursive: true })
const loaders = []
for (let i = 0; i < n; i++) {
  writeFileSync(join(root, 'c', `${i}.css`), `.c${i} { color: #${(i % 4096).toString(16).padStart(3, '0')}; }\n`)
  writeFileSync(join(root, 'c', `${i}.js`), `import './${i}.css'\nexport default function c${i}() { return ${i} }\n`)
  loaders.push(`  () => import('./c/${i}.js'),`)
}
writeFileSync(join(root, 'main.js'), `const loaders = [\n${loaders.join('\n')}\n]\nglobalThis.load = (i) => loaders[i]().then((m) => m.default())\n`)

// Scope each CSS file to its importer's default export, the same metadata
// @vitejs/plugin-vue sets on every SFC <style> block. This is what makes
// vite:css-post look up modules through its `renderedModules` Proxy.
const scopeCss = {
  name: 'scope-css-to-importer',
  enforce: 'pre',
  transform: {
    filter: { id: /\/c\/\d+\.css$/ },
    handler(code, id) {
      return { code, meta: { vite: { cssScopeTo: [id.replace(/\.css$/, '.js'), 'default'] } } }
    },
  },
}

// Time vite:css-post renderChunk. The Proxy scan runs before the hook's first
// `await`, so the synchronous part of each call is measured on its own.
let syncMs = 0
let calls = 0
const timeCssPost = {
  name: 'time-css-post',
  configResolved(config) {
    const plugin = config.plugins.find((p) => p.name === 'vite:css-post')
    const hook = plugin.renderChunk
    const handler = typeof hook === 'function' ? hook : hook.handler
    const wrapped = function (...args) {
      const t = performance.now()
      const result = handler.apply(this, args)
      syncMs += performance.now() - t
      calls++
      return result
    }
    plugin.renderChunk = typeof hook === 'function' ? wrapped : { ...hook, handler: wrapped }
  },
}

const outDir = join(root, 'dist')
const t = performance.now()
await build({
  root,
  configFile: false,
  logLevel: 'silent',
  plugins: [process.env.SCOPE === '0' ? null : scopeCss, timeCssPost],
  build: {
    outDir,
    minify: false,
    rolldownOptions: { input: join(root, 'main.js') },
  },
})
const buildMs = performance.now() - t

// Hash every output file so builds can be compared byte for byte.
const hash = createHash('sha256')
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else hash.update(p.slice(outDir.length)).update(readFileSync(p))
  }
}
walk(outDir)
const files = readdirSync(join(outDir, 'assets'))
const chunks = files.filter((f) => f.endsWith('.js')).length
const css = files.filter((f) => f.endsWith('.css')).length

console.log(JSON.stringify({ n, calls, chunks, css, syncMs, buildMs, outHash: hash.digest('hex').slice(0, 16) }))
