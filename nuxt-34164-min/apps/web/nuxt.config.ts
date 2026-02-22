import process from 'node:process'
import linkedReproPlugin from 'linked-repro-plugin'

let nuxtRef: any

function hasVfs (key: string) {
  return Boolean(nuxtRef?.vfs?.[key])
}

const scenario = process.env.REPRO_SCENARIO || 'baseline'
const useLinkedPlugin = process.env.REPRO_LINKED_PLUGIN === '1'
const dropRouteRules = process.env.REPRO_DROP_ROUTE_RULES === '1'

process.stderr.write(`[repro] nuxt.config.ts loaded (${scenario})\n`)

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  experimental: {
    appManifest: true,
  },
  nitro: {
    preset: 'cloudflare_module',
  },
  routeRules: {
    '/': { swr: true },
    '/api/**': { isr: true },
  },
  vite: {
    ...(useLinkedPlugin
      ? {
          plugins: [linkedReproPlugin()],
        }
      : {}),
  },
  hooks: {
    ready: (nuxt) => {
      nuxtRef = nuxt
      process.stderr.write('[repro] ready ' + JSON.stringify({
        scenario,
        hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
        hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
      }) + '\n')
    },
    'app:templatesGenerated': (app, changedTemplates) => {
      if (dropRouteRules && nuxtRef) {
        app.templates = app.templates.filter((t: any) => t?.filename !== 'route-rules.mjs')
        if (nuxtRef.vfs) {
          delete nuxtRef.vfs['#build/route-rules.mjs']
        }
      }

      const filenames = app.templates
        .map((t: any) => t?.filename)
        .filter(Boolean)
      const changed = changedTemplates
        .map((t: any) => t?.filename)
        .filter(Boolean)

      process.stderr.write('[repro] templatesGenerated ' + JSON.stringify({
        scenario,
        hasRouteRulesTemplate: filenames.includes('route-rules.mjs'),
        hasNuxtConfigTemplate: filenames.includes('nuxt.config.mjs'),
        changed,
        vfsAfterTemplates: {
          hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
          hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
        },
      }) + '\n')
    },
    'vite:serverCreated': () => {
      process.stderr.write('[repro] vite:serverCreated ' + JSON.stringify({
        scenario,
        hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
        hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
      }) + '\n')
    },
  },
})
