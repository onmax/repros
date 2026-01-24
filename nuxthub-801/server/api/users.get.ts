import { db } from 'hub:db'
import { users } from '@nuxthub/db/schema'

export default defineEventHandler(async () => {
  return await db.select().from(users)
})
