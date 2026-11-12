import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const PORT = 5392
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
  await page.goto(URL)
  await page.waitForFunction(() => customElements.get("ui-radio-group"))

  // Read the Team radio's state and the form's entry list, which is what the
  // form submits.
  const run = async (id) => {
    const team = page.locator(`#${id}`).getByRole("radio", { name: "Team" })
    return {
      teamChecked: await team.isChecked(),
      teamDisabled: await team.isDisabled(),
      formData: await page.evaluate((id) => new URLSearchParams(new FormData(document.getElementById(id))).toString(), id),
    }
  }

  const expected = { teamChecked: true, teamDisabled: true, formData: "" }
  const show = (s) => JSON.stringify(s)

  const control = await run("native")
  console.log("control: native radios, the disabled one checked")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(control)}`)
  if (show(control) !== show(expected)) (failed = true), console.log("  FAIL: the control does not behave as expected")

  const repro = await run("component")
  console.log("repro: ui-radio-group whose default-value is a disabled ui-radio")
  console.log(`  expected ${show(expected)}`)
  console.log(`  actual   ${show(repro)}`)
  if (show(repro) !== show({ ...expected, formData: "plan=team" })) (failed = true), console.log("  FAIL: the bug did not reproduce")
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
