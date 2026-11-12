// Starts Vite on a fixed port, opens the page in Chromium, and always stops both.
import { spawn } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const listening = (port) =>
  new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port })
    socket.once("connect", () => (socket.destroy(), resolve(true)))
    socket.once("error", () => resolve(false))
  })

export async function withPage(port, path, run) {
  if (await listening(port)) throw new Error(`port ${port} is already in use`)
  const server = spawn("pnpm", ["exec", "vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: new URL(".", import.meta.url),
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  })
  let log = ""
  server.stdout.on("data", (d) => (log += d))
  server.stderr.on("data", (d) => (log += d))
  let browser
  try {
    for (let i = 0; !(await listening(port)); i++) {
      if (i > 300 || server.exitCode !== null) throw new Error(`vite did not start:\n${log}`)
      await new Promise((r) => setTimeout(r, 100))
    }
    browser = await chromium.launch()
    const page = await browser.newPage()
    page.on("pageerror", (error) => console.log(`pageerror: ${error.message}`))
    await page.goto(`http://127.0.0.1:${port}${path}`)
    return await run(page)
  } finally {
    await browser?.close()
    try { process.kill(-server.pid, "SIGTERM") } catch {}
    for (let i = 0; await listening(port); i++) {
      if (i > 50) throw new Error(`port ${port} is still in use after stopping vite`)
      await new Promise((r) => setTimeout(r, 100))
    }
  }
}
