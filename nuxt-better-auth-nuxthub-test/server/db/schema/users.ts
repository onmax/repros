import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const testData = sqliteTable('test_data', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  content: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
