export default defineEventHandler(async () => {
  const { db } = await import('@nuxthub/db')
  return { ok: !!db }
})
