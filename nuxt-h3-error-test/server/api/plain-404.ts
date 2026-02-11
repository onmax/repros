export default defineEventHandler(() => {
  throw { status: 404 }
})
