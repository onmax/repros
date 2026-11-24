import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const items = sqliteTable('items', {
  id: integer('id').primaryKey(),
  name: text('name').notNull()
})
