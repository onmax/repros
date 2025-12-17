import { db } from 'hub:db'
import { users } from '../db/schema'

export default defineEventHandler(async () => {
  // This will fail with "You need to specify mode" error
  const result = await db.select().from(users)
  return result
})
