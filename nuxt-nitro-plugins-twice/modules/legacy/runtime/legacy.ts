import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

export default defineEventHandler(event => ({ query: getQuery(event), config: typeof useRuntimeConfig() }))
