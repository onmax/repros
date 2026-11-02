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
        const restored = existsSync(join(import.meta.dirname, '.nuxt/vite/services/ssr/index.mjs'))
        appendFileSync(join(import.meta.dirname, 'builds.log'), `${this.environment.name} build started, restored SSR output present: ${restored}\n`)
      },
    }],
  },
})
