let requests = 0

export default defineEventHandler(async (event) => {
  const body = await readBody<{ criteria?: string[] }>(event)
  await new Promise(resolve => setTimeout(resolve, 75))

  requests += 1
  console.log(`[report] #${requests}`, JSON.stringify({ criteria: body.criteria }))

  return [{
    request: requests,
    criteria: body.criteria ?? [],
    at: new Date().toISOString(),
  }]
})
