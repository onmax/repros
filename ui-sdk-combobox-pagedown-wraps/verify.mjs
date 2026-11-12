import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const PORT = 5394
const URL = `http://127.0.0.1:${PORT}/`
const vite = "node_modules/vite/bin/vite.js"

const portOpen = () =>
  new Promise((resolve) => {
    const socket = createConnection({ port: PORT, host: "127.0.0.1" })
    socket.once("connect", () => (socket.destroy(), resolve(true)))
    socket.once("error", () => resolve(false))
  })

if (await portOpen()) throw new Error(`port ${PORT} is already in use`)
const build = spawnSync(process.execPath, [vite, "build", "--logLevel", "error"], { stdio: "inherit" })
if (build.status !== 0) process.exit(build.status ?? 1)

const server = spawn(process.execPath, [vite, "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], { stdio: "ignore" })
let browser
let failed = false
try {
  for (let i = 0; !(await portOpen()); i++) {
    if (i > 100) throw new Error("vite preview did not start")
    await new Promise((r) => setTimeout(r, 100))
  }
  browser = await chromium.launch()
  const page = await browser.newPage()
  const highlighted = () => page.locator("[data-highlighted]").textContent()

  // Open the list with the last item highlighted, then press PageDown.
  const run = async (name, toLast) => {
    await page.goto(URL)
    await page.getByRole("combobox", { name }).focus()
    for (const key of toLast) await page.keyboard.press(key)
    await page.getByRole("listbox").waitFor()
    const before = await highlighted()
    await page.keyboard.press("PageDown")
    return { before, afterPageDown: await highlighted() }
  }

  const expected = { before: "Item 12", afterPageDown: "Item 12" }
  const show = (s) => JSON.stringify(s)

  const control = await run("Select", ["ArrowDown", "End"])
  console.log("control: ui-select, PageDown on the last of 12 items")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(control)}`)
  if (show(control) !== show(expected)) (failed = true), console.log("  FAIL: the control does not behave as expected")

  const repro = await run("Combobox", ["ArrowUp"])
  console.log("repro: ui-combobox, PageDown on the last of 12 items")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(repro)}`)
  if (show(repro) !== show({ before: "Item 12", afterPageDown: "Item 10" })) (failed = true), console.log("  FAIL: the bug did not reproduce")
} finally {
  await browser?.close()
  server.kill()
  await new Promise((r) => (server.exitCode !== null ? r() : server.once("exit", r)))
  for (let i = 0; await portOpen(); i++) {
    if (i > 50) throw new Error(`port ${PORT} still open after stopping vite preview`)
    await new Promise((r) => setTimeout(r, 100))
  }
}
console.log(failed ? "NOT VERIFIED" : "VERIFIED: the bug reproduces and the control passes")
process.exit(failed ? 1 : 0)
