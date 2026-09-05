export default defineNuxtRouteMiddleware((to) => {
  if (to.matched.length === 0) {
    throw createError({ statusCode: 410, statusMessage: 'Gone', fatal: true })
  }
})
