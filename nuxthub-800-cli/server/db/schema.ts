import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { accountTypes } from '#shared/utils/accounts'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: accountTypes }).notNull()
})
