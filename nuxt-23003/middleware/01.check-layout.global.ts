export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    useState('observed-layout', () => String(to.meta.layout))
  }
})
