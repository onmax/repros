export default defineEventHandler(async () => {
  const storage = useStorage('kv')
  const count = (await storage.getItem<number>('count')) || 0
  await storage.setItem('count', count + 1)
  return { count: count + 1 }
})
