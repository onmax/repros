import { db, schema } from '@nuxthub/db'
export default defineEventHandler(async () => {
  const result = await db.select().from(schema.users)
  return result
})
