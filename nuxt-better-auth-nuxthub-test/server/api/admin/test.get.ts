export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  if (session.user.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Admin only' })
  }

  return { message: 'Admin access granted', user: session.user }
})
