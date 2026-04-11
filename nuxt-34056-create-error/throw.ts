import { createError } from '#app/composables/error'

export function fail () {
  throw createError({ statusCode: 404 })
}
