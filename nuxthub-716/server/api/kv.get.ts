export default defineEventHandler(async (event) => {
  const key = 'demo'
  const current = await kv.get(key) || 0
  await kv.set(key, Number(current) + 1)
  return { key, visits: Number(current) + 1 }
})
