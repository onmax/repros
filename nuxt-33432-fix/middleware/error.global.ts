export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/error') {
    throw createError({
      statusCode: 403,
      message: 'Custom error message that should appear',
      statusMessage: 'Forbidden Access',
      fatal: true,
    })
  }
})
