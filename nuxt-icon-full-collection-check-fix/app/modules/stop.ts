import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineNuxtModule } from 'nuxt/kit'

// At `build:before` Nuxt has run every module hook, including `nitro:config`, and written the
// templates, including `nuxt-icon-server-bundle.mjs`; Vite and Nitro have not started. Record
// what the count.mjs preload saw, hash the generated files, and stop the build.
export default defineNuxtModule({
  setup (_, nuxt) {
    const out = process.env.REPRO_OUT
    if (!out) { return }
    nuxt.hook('build:before', () => {
      const count = (globalThis as any).__reproCount
      const fixture = resolve(nuxt.options.rootDir, '..')
      // Absolute paths, pnpm's store dir names (which include a patch hash) and the random build
      // id differ between builds, and Nuxt writes the `/// <reference>` lines of nuxt.d.ts and
      // nuxt.node.d.ts in a varying order; normalize them so the hashes compare the content.
      const normalize = (s: string) => s.replaceAll(fixture, '<fixture>')
        .replace(/node_modules\/\.pnpm\/[^/]+\//g, 'node_modules/.pnpm/<pkg>/')
        .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, '<uuid>')
      const dir = nuxt.options.buildDir
      const sha = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 16)
      const files = readdirSync(dir, { recursive: true, withFileTypes: true })
        .filter(e => e.isFile()).map(e => join(e.parentPath, e.name).slice(dir.length + 1))
        .filter(f => !f.startsWith('cache/') && f !== 'nuxt.lock').sort()
      const content = (f: string) => {
        const text = normalize(readFileSync(join(dir, f), 'utf8'))
        return f.endsWith('.d.ts') ? text.split('\n').sort().join('\n') : text
      }
      const hashes = Object.fromEntries(files.map(f => [f, sha(content(f))]))
      writeFileSync(out, JSON.stringify({
        layers: nuxt.options._layers.length,
        collections: [...readFileSync(join(dir, 'nuxt-icon-server-bundle.mjs'), 'utf8').matchAll(/^ {2}'([^']+)': /gm)].map(m => m[1]),
        wrapped: count?.wrapped ?? 0,
        checks: count?.checks ?? null,
        output: { files: files.length, sha256: sha(JSON.stringify(hashes)), hashes },
      }))
      process.exit(0)
    })
  },
})
