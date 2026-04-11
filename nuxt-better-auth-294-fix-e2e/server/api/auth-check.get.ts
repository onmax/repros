export default defineEventHandler(async (event) => {
  const auth = serverAuth(event)
  try {
    const current = await auth.api.getSession({
      headers: event.headers,
    })

    return {
      ok: true,
      authenticated: Boolean(current?.session),
      user: current?.user ?? null,
      session: current?.session ?? null,
    }
  }
  finally {
    await cleanupRequestDatabase(event)
  }
})
