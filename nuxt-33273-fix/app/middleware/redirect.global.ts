export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/trigger') {
    return navigateTo('/target?callback=/other', { redirectCode: 302 })
  }
})
