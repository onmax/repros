import { db } from 'hub:db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db.run(sql`SELECT 1 as ok`)
  return { ok: true, result }
})
