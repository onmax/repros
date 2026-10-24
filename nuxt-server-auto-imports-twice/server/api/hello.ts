import { defineEventHandler } from 'nuxt/server'

// `greeting` comes from server/utils/ as a server auto-import: no import statement.
export default defineEventHandler(() => ({ message: greeting() }))
