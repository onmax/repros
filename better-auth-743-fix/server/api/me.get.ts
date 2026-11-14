export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return { email: session.user?.email ?? null, keys: Object.keys(session).sort() }
})
