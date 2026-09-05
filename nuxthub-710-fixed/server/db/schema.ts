import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Test type for JSON field
export type Style = 'modern' | 'classic' | 'minimal'

export const projects = sqliteTable('projects', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  // JSON field with $type<>() - this is the issue
  styles: text('styles', { mode: 'json' }).$type<Style[]>().notNull()
})
