export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')
  if (!key) {
    throw createError({ statusCode: 400, message: 'Key is required' })
  }
  return { key, value: await kv.get(key) }
})
