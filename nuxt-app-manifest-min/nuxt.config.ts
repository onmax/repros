import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const TRACE_ENABLED = process.env.REPRO_TRACE === '1'
const TRACE_LOG_PATH = resolve(
  process.cwd(),
  process.env.REPRO_TRACE_LOG ?? '.nuxt/repro-trace.log',
)

function trace(event: string, data: Record<string, unknown> = {}) {
  if (!TRACE_ENABLED) {
    return
  }
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    event,
    ...data,
  })
  mkdirSync(dirname(TRACE_LOG_PATH), { recursive: true })
  appendFileSync(TRACE_LOG_PATH, `${line}\n`)
  console.log(`[repro-trace] ${event}`, data)
}

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  experimental: {
    appManifest: true,
  },
  hooks: {
    ready(nuxt) {
      trace('nuxt.hook.ready', {
        buildDir: nuxt.options.buildDir,
        hasBuildNuxtConfig: Boolean((nuxt as any).vfs?.['#build/nuxt.config.mjs']),
        hasBuildRouteRules: Boolean((nuxt as any).vfs?.['#build/route-rules.mjs']),
      })
    },
    'vite:serverCreated'(viteServer, env) {
      trace('nuxt.hook.vite:serverCreated', {
        env,
        preTransformRequests: Boolean((viteServer.config.server as any).preTransformRequests),
      })
    },
  },
})
