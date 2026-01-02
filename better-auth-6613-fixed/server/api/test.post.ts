// Debug: Check what AsyncLocalStorage is available
export default defineEventHandler(async () => {
  const debug = {
    hasGlobalALS: 'AsyncLocalStorage' in globalThis,
    alsType: (globalThis as any).AsyncLocalStorage?.__unenv__ ? 'unenv-polyfill' : 'native',
  }

  try {
    const result = await auth.api.signInSocial({ body: { provider: 'github', callbackURL: '/callback' } })
    return { ...result, debug }
  } catch (e) {
    return { error: (e as Error).message, debug }
  }
})
