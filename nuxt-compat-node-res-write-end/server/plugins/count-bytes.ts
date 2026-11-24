// Wraps `res.write` and `res.end` to count response bytes, as h3 v1 telemetry code does,
// and marks the response once it has. Nitro hands an error a request hook throws to the
// `error` hook and carries on, so that hook prints it.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    if (!event.path.startsWith('/api/inner'))
      return
    const res = event.node.res
    const write = res.write.bind(res)
    const end = res.end.bind(res)
    res.write = ((...args: any[]) => (write as any)(...args)) as typeof res.write
    res.end = ((...args: any[]) => (end as any)(...args)) as typeof res.end
    res.setHeader('x-count-bytes', 'wrapped')
  })
  nitroApp.hooks.hook('error', (error, { tags }) => {
    console.error(`[error hook] tags=${tags} ${error}`)
  })
})
