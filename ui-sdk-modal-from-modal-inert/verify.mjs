import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const PORT = 5390
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

  // Ask confirm(), then read whether the question is inert and where focus is.
  const run = async (from) => {
    await page.goto(URL)
    if (from === "dialog") {
      await page.getByRole("button", { name: "Edit" }).click()
      await page.getByRole("dialog").waitFor()
    }
    await page.getByRole("button", { name: `Ask from ${from}` }).click()
    await page.getByRole("alertdialog").waitFor()
    await page.waitForTimeout(300)
    const state = await page.evaluate(() => {
      const el = document.activeElement
      return {
        inert: !!document.querySelector('[role="alertdialog"]').closest("[inert]"),
        focus: el === document.body ? "<body>" : el.textContent.trim(),
      }
    })
    const clicked = await page
      .getByRole("button", { name: "Discard", exact: true })
      .click({ timeout: 2000 })
      .then(() => true, () => false)
    return { ...state, clicked, result: await page.locator("output").textContent() }
  }

  const expected = { inert: false, focus: "Keep editing", clicked: true, result: "discarded" }
  const show = (s) => JSON.stringify(s)
  const same = (s) => show(s) === show(expected)

  const control = await run("page")
  console.log(`control: confirm() with no dialog open`)
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(control)}`)
  if (!same(control)) (failed = true), console.log("  FAIL: the control does not behave as expected")

  const repro = await run("dialog")
  console.log(`repro: confirm() from a button inside an open modal dialog`)
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(repro)}`)
  const bug = repro.inert && repro.focus === "<body>" && !repro.clicked && repro.result === ""
  if (!bug) (failed = true), console.log("  FAIL: the bug did not reproduce")
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
