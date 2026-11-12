import { spawn } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const port = 5382
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

  async function typeInto(path) {
    const page = await browser.newPage()
    await page.goto(base + path)
    const input = page.getByRole("textbox", { name: "Fixed input" })
    await input.click()
    await page.keyboard.press("End")
    await page.keyboard.type("zzz")
    await page.waitForTimeout(200)
    const value = await input.inputValue()
    await page.close()
    return value
  }

  const vue = await typeInto("/")
  console.log(`bug (Vue <Input model-value="abc">, type "zzz"):`)
  console.log(`  expected: "abc"`)
  console.log(`  actual:   ${JSON.stringify(vue)}`)

  const react = await typeInto("/react.html")
  console.log(`control (React <Input value="abc">, type "zzz"):`)
  console.log(`  expected: "abc"`)
  console.log(`  actual:   ${JSON.stringify(react)}`)

  ok = vue === "abczzz" && react === "abc"
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

console.log(ok ? "Reproduced: the Vue input shows text its parent never set; the React control keeps \"abc\"." : "Not reproduced.")
process.exit(ok ? 0 : 1)
