import { eq } from 'drizzle-orm'
import { db, schema } from 'hub:db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const records = await db.select()
    .from(schema.testData)
    .where(eq(schema.testData.userId, session.user.id))

  return records
})
