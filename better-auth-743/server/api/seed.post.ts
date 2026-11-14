// Creates a user and an API key for it. Only the verifier calls this.
export default defineEventHandler(async (event) => {
  const auth = serverAuth(event)
  const { user } = await auth.api.signUpEmail({
    body: { name: 'Ada', email: 'ada@example.com', password: 'password-1234' },
  })
  const created = await auth.api.createApiKey({ body: { userId: user.id } })
  return { key: created.key }
})
