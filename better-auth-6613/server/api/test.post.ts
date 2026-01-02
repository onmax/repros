// Issue #6613: calling auth.api directly should trigger "No request state found" error
export default defineEventHandler(async () => {
  try {
    const result = await auth.api.signInSocial({ body: { provider: 'github', callbackURL: '/callback' } })
    return result
  } catch (e) {
    return { error: (e as Error).message }
  }
})
