// h3 v1 code that sends its response through the Node response.
export default defineEventHandler((event) => {
  event.node.res.end('ok')
})
