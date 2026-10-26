import { defineEventHandler } from 'nitro/h3'

export default defineEventHandler(() => ({
  items: Array.from({ length: 20_000 }, (_, i) => ({ id: i, label: `item ${i}` })),
}))
