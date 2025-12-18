export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')
  if (!key) {
    throw createError({ statusCode: 400, message: 'Key is required' })
  }
  const { value } = await readBody(event)
  await kv.set(key, value)
  setResponseStatus(event, 201)
  return { key, value }
})
