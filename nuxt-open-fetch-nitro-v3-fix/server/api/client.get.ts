// Checks that nuxt-open-fetch's Nitro plugin installed a working `api` client.
export default defineEventHandler(async () => {
  const { $api } = useNitroApp() as any
  return { client: typeof $api, report: await $api?.('/report').catch((e: Error) => e.message) }
})
