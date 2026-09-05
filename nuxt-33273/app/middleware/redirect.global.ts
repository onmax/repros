export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/trigger') {
    return navigateTo('/target?callback=https://example.com', { redirectCode: 302 })
  }
})
