import { sql } from 'drizzle-orm'
import { db } from '@nuxthub/db'

type QueryRow = {
  database: string | null
  currentUser: string | null
  now: Date | string
  version: string
}

export default defineEventHandler(async () => {
  const result = await db.execute<QueryRow>(sql`
    select
      current_database() as "database",
      current_user as "currentUser",
      now() as "now",
      version() as "version"
  `)

  const rows = Array.isArray(result)
    ? result
    : ((result as { rows?: QueryRow[] }).rows ?? result)

  return {
    ok: true,
    driver: 'nuxthub-db',
    rows,
  }
})
