import { writeFileSync } from 'node:fs'
import { performance } from 'node:perf_hooks'
import { defineNuxtModule } from 'nuxt/kit'

// `@nuxt/vite-builder` builds `server.fs.allow` at the start of its `bundle()`, between
// `build:before` and `vite:extend`. Time that stretch, record the list, and stop the build.
export default defineNuxtModule({
  setup (_, nuxt) {
    const out = process.env.REPRO_OUT
    if (!out) { return }
    let start = 0
    nuxt.hook('build:before', () => { start = performance.now() })
    nuxt.hook('vite:extend', ({ config }) => {
      const ms = performance.now() - start
      const components = Object.values(nuxt.apps).reduce((n, app) => n + app.components.length, 0)
      writeFileSync(out, JSON.stringify({ ms, components, allow: config.server?.fs?.allow }))
      process.exit(0)
    })
  },
})
