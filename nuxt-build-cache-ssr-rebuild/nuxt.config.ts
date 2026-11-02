import { appendFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-30',
  experimental: {
    buildCache: true,
  },
  vite: {
    plugins: [{
      // Logs one line each time the client or SSR environment builds. Changes no code.
      name: 'log-builds',
      applyToEnvironment: env => env.name === 'client' || env.name === 'ssr',
      buildStart () {
        const { name, config } = this.environment
        const detail = name === 'ssr' ? `, SSR output already on disk: ${existsSync(join(config.build.outDir, 'index.mjs'))}` : ''
        appendFileSync(join(import.meta.dirname, 'builds.log'), `${name} build started${detail}\n`)
      },
    }],
  },
})
