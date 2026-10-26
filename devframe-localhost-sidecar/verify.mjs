// Vite in middleware mode, behind a server on 127.0.0.1, as Nuxt runs it.
// Vite DevTools then starts a devframe side-car WebSocket on host "localhost".
// The page dials that side-car on its own hostname. This script dials it on
// both loopback addresses, as a page on 127.0.0.1 or on [::1] would.
import { createServer as createHttpServer } from 'node:http'
import { DevTools } from '@vitejs/devtools'
import { createServer } from 'vite'

const vite = await createServer({
  configFile: false,
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false },
  plugins: [DevTools()],
})
const http = createHttpServer(vite.middlewares)
await new Promise(resolve => http.listen(0, '127.0.0.1', resolve))
const page = `http://127.0.0.1:${http.address().port}`

const meta = await (await fetch(`${page}/__devtools/__connection.json`)).json()
const { port, path } = meta.websocket
console.log(`page:     ${page}/__devtools/`)
console.log(`side-car: port ${port}, path ${path}`)

function dial(host) {
  return new Promise((resolve) => {
    const socket = new WebSocket(`ws://${host}:${port}/${path}`)
    const done = (result) => {
      clearTimeout(timer)
      socket.close()
      resolve(result)
    }
    const timer = setTimeout(() => done('timeout'), 3000)
    socket.onopen = () => done('connected')
    socket.onerror = () => done('refused')
  })
}

let failed = false
for (const host of ['127.0.0.1', '[::1]']) {
  const actual = await dial(host)
  if (actual !== 'connected')
    failed = true
  console.log(`ws://${host}:${port}/${path}  expected: connected  actual: ${actual}`)
}

await vite.close()
http.close()
console.log(failed ? 'FAIL: the side-car listens on only one loopback address.' : 'PASS: the side-car listens on both loopback addresses.')
process.exit(failed ? 1 : 0)
