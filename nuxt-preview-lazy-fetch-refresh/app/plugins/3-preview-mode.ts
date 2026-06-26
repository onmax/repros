export default defineNuxtPlugin(() => {
  if (!useRuntimeConfig().public.previewMode)
    return

  usePreviewMode({
    shouldEnable: () => true,
  })
})
