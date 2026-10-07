export default defineEventHandler(async (event) => {
  const { operation, data } = await readBody(event)
  let result
  if (operation === 'replace') result = await replaceUserSession(event, data)
  else if (operation === 'clear') result = await clearUserSession(event)
  else result = await setUserSession(event, data)
  return { result, session: await getUserSession(event) }
})
