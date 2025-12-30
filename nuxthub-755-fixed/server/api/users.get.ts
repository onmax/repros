import { db, schema } from 'hub:db'

export default defineEventHandler(async () => {
  return db.select().from(schema.users)
})
