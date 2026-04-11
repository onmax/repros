import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const rootUsers = sqliteTable('root_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull()
})
