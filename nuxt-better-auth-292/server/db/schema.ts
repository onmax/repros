import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { schema } from '#auth/schema'

export const dashboards = sqliteTable('dashboards', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const usersDashboards = sqliteTable('users_dashboards', {
  userId: text('user_id').references(() => schema.user.id),
  dashboardId: text('dashboard_id').references(() => dashboards.id),
  role: text('role', { enum: ['owner', 'admin', 'user'] }).default('user'),
})
