import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const PORT = 5391
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

  // Focus the dialog's last control, press Tab twice, and record where focus
  // lands each time, looking through shadow roots.
  const run = async (which) => {
    await page.goto(URL)
    await page.getByRole("button", { name: `Open ${which}` }).click()
    await page.getByRole("dialog").waitFor()
    await page.getByRole("button", { name: "Last" }).focus()
    const where = () =>
      page.evaluate(() => {
        let el = document.activeElement
        while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement
        const name = el === document.body ? "<body>" : el.getAttribute("aria-label") || el.textContent.trim()
        const inDialog = !!document.activeElement.closest('[role="dialog"]')
        return `${name} (${inDialog ? "in dialog" : "outside dialog"})`
      })
    await page.keyboard.press("Tab")
    const tab1 = await where()
    await page.keyboard.press("Tab")
    const tab2 = await where()
    return { tab1, tab2, dialogOpen: await page.getByRole("dialog").isVisible() }
  }

  const expected = { tab1: "First (in dialog)", tab2: "Last (in dialog)", dialogOpen: true }
  const show = (s) => JSON.stringify(s)

  const control = await run("light")
  console.log("control: last control is a light-DOM <button>")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(control)}`)
  if (show(control) !== show(expected)) (failed = true), console.log("  FAIL: the control does not behave as expected")

  const repro = await run("shadow")
  console.log("repro: last control is a <button> in an open shadow root")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(repro)}`)
  if (!repro.tab1.endsWith("(outside dialog)")) (failed = true), console.log("  FAIL: the bug did not reproduce")
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
