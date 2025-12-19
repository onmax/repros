import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { db } = await import('hub:db')
  // Access db to trigger binding lookup
  await db.run(sql`SELECT 1`)
  return { ok: true }
})
