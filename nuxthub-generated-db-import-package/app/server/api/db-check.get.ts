import { sql } from 'drizzle-orm'
import { db } from '#generated-db'

type QueryRow = {
  value: number
}

export default defineEventHandler(async () => {
  const result = await db.execute<QueryRow>(sql`select 1 as "value"`)
  const rows = Array.isArray(result) ? result : ((result as { rows?: QueryRow[] }).rows ?? result)

  return {
    ok: true,
    rows,
  }
})
