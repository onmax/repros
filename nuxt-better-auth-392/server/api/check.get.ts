export default defineEventHandler(async (event) => {
  const auth = serverAuth(event)
  await auth.$context
  return { ok: true }
})
