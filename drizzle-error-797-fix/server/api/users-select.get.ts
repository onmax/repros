import { db, schema } from 'hub:db'

export default defineEventHandler(async () => {
  const result = await db.select().from(schema.users)
  return result
})