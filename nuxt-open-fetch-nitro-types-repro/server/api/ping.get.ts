export default defineEventHandler(() => {
  const { $testApi } = useNitroApp()
  return $testApi('/ping')
})
