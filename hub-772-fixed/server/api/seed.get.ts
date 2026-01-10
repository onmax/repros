import { db } from 'hub:db'
import { users } from '../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  // Create table if not exists
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `)

  // Check if data exists
  const existing = await db.select().from(users).limit(1)
  if (existing.length > 0) {
    return { message: 'Data already exists', count: (await db.select().from(users)).length }
  }

  // Seed data
  await db.insert(users).values([
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'Diana Prince', email: 'diana@example.com' },
    { name: 'Eve Wilson', email: 'eve@example.com' }
  ])

  return { message: 'Seeded 5 users', count: 5 }
})
