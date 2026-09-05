const reproducing = process.env.NUXT_ICON_REPRO === '1'

export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    provider: 'iconify',
    serverBundle: false,
  },
  hooks: reproducing
    ? {
        'nitro:config'(config) {
          const handler = config.handlers?.find(
            handler => handler.route === '/api/_nuxt_icon/:collection',
          )

          if (handler) {
            throw new Error(
              '@nuxt/icon registered /api/_nuxt_icon/:collection with provider="iconify" and serverBundle=false',
            )
          }
        },
      }
    : {},
})
