// Test NuxtHub v0.10 hub:db virtual import pattern
import { db } from 'hub:db'

export default defineEventHandler(async () => {
  const users = await db.query.user.findMany()
  return { users }
})
