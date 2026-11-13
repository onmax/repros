export default defineEventHandler(async () => {
  const g = globalThis as any
  for (let i = 0; i < 6; i++) {
    g.gc()
    await new Promise(resolve => setTimeout(resolve, 25))
  }
  return {
    created: g.__apps?.created ?? 0,
    retained: (g.__apps?.created ?? 0) - (g.__apps?.collected ?? 0),
    heapUsed: process.memoryUsage().heapUsed,
  }
})
