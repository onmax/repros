export default defineEventHandler(event => ({ origin: serverAuth(event).options.baseURL }))
