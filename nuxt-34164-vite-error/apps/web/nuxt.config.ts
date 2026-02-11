import process from 'node:process'

process.stderr.write('[repro] nuxt.config.ts loaded\n')

let nuxtRef: any

function hasVfs (key: string) {
  return Boolean(nuxtRef?.vfs?.[key])
}

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Match original issue context (Cloudflare). If you can't reproduce, try `node-server`.
  nitro: {
    preset: 'cloudflare_module',
  },

  // Use keys that are actually compiled into route-rules matcher.
  routeRules: {
    '/': { swr: true },
    '/api/**': { isr: true },
  },

  hooks: {
    ready: (nuxt) => {
      nuxtRef = nuxt
      process.stderr.write('[repro] ready ' + JSON.stringify({
        hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
        hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
      }) + '\n')
    },

    'app:templatesGenerated': (app, changedTemplates) => {
      const filenames = app.templates
        .map((t: any) => t?.filename)
        .filter(Boolean)

      const changed = changedTemplates
        .map((t: any) => t?.filename)
        .filter(Boolean)

      process.stderr.write('[repro] templatesGenerated ' + JSON.stringify({
        hasRouteRulesTemplate: filenames.includes('route-rules.mjs'),
        hasNuxtConfigTemplate: filenames.includes('nuxt.config.mjs'),
        changed,
        vfsAfterTemplates: {
          hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
          hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
        },
      }) + '\n')
    },

    // Closest point to the suspected failure: Vite server being created.
    'vite:serverCreated': (_server) => {
      process.stderr.write('[repro] vite:serverCreated ' + JSON.stringify({
        hasBuildRouteRules: hasVfs('#build/route-rules.mjs'),
        hasBuildNuxtConfig: hasVfs('#build/nuxt.config.mjs'),
      }) + '\n')
    },
  },
})
