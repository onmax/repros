// Instrumentation for the repro: reports whether @nuxtjs/i18n set up its server context
// (`event.context.nuxtI18n`) by the time the response is sent.
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', (event) => {
    setResponseHeader(event, 'x-repro-i18n-context', String(event.context.nuxtI18n != null))
  })
})
