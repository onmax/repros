import { db, schema } from 'hub:db'

export default defineEventHandler(async () => {
  // Get all tables by querying sqlite_master
  const tables = await db.all(`
    SELECT name FROM sqlite_master
    WHERE type='table'
    ORDER BY name
  `)

  // Get user count
  const users = await db.select().from(schema.user)

  return {
    tables: tables.map((t: any) => t.name),
    userCount: users.length,
    users: users.map(u => ({ id: u.id, email: u.email, role: u.role })),
  }
})
