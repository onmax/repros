import { db } from 'hub:db'
import { users } from '../db/schema'

export default defineEventHandler(async () => {
  // Add more users (migrations already seed initial data)
  await db.insert(users).values([
    { name: 'Frank Miller', email: 'frank@example.com' },
    { name: 'Grace Lee', email: 'grace@example.com' }
  ])

  const all = await db.select().from(users)
  return { message: 'Added 2 more users', count: all.length }
})
