import { spawn } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const port = 5383
const base = `http://127.0.0.1:${port}`

const portOpen = () =>
  new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port })
    socket.once("connect", () => (socket.destroy(), resolve(true)))
    socket.once("error", () => resolve(false))
  })

if (await portOpen()) throw new Error(`port ${port} is already in use`)

const server = spawn("pnpm", ["exec", "vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  detached: true,
  stdio: "ignore",
})
console.log(`vite pid ${server.pid} on ${base}`)

let browser
let ok = false
try {
  const start = Date.now()
  while (!(await portOpen())) {
    if (Date.now() - start > 30000) throw new Error("vite did not start")
    await new Promise((r) => setTimeout(r, 200))
  }
  browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(base)
  const attr = (name) =>
    page.getByRole("textbox", { name, exact: true }).getAttribute("modelmodifiers")

  const trimmed = await attr("Trimmed")
  console.log(`bug (<Input v-model.trim>), modelmodifiers attribute on <input>:`)
  console.log(`  expected: null`)
  console.log(`  actual:   ${JSON.stringify(trimmed)}`)

  const plain = await attr("Plain")
  console.log(`control (<Input v-model>), modelmodifiers attribute on <input>:`)
  console.log(`  expected: null`)
  console.log(`  actual:   ${JSON.stringify(plain)}`)

  ok = trimmed === "[object Object]" && plain === null
} finally {
  await browser?.close()
  try {
    process.kill(-server.pid, "SIGTERM")
  } catch {}
  const start = Date.now()
  while (await portOpen()) {
    if (Date.now() - start > 10000) {
      try {
        process.kill(-server.pid, "SIGKILL")
      } catch {}
      break
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  console.log(`port ${port} free: ${!(await portOpen())}`)
}

console.log(ok ? "Reproduced: v-model.trim renders modelmodifiers=\"[object Object]\"; plain v-model renders no attribute." : "Not reproduced.")
process.exit(ok ? 0 : 1)
