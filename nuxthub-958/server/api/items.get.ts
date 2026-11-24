import { defineEventHandler } from 'nuxt/server'
import { db, schema } from 'hub:db'

// Reads the table that the dev migrations plugin creates
export default defineEventHandler(() => db.select().from(schema.items))
