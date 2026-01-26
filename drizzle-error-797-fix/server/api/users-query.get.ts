import { db, schema } from 'hub:db'

export default defineEventHandler(async () => {
  const result = await db.query.users.findMany()
  return result
})