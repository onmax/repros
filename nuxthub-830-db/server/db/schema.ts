import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', { id: text('id').primaryKey() })
