export default defineNuxtPlugin((nuxtApp) => {
  console.log('[DEBUG] Plugin init - payload.data:', nuxtApp.payload.data)
  console.log('[DEBUG] Plugin init - payload.data type:', typeof nuxtApp.payload.data)
  console.log('[DEBUG] Plugin init - payload keys:', Object.keys(nuxtApp.payload))
  
  nuxtApp.hook('page:start', () => {
    console.log('[DEBUG] page:start - payload.data:', nuxtApp.payload.data)
  })
  
  nuxtApp.hook('page:finish', () => {
    console.log('[DEBUG] page:finish - payload.data:', nuxtApp.payload.data)
  })
})
