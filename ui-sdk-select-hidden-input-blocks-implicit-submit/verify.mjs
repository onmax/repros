import { spawn, spawnSync } from "node:child_process"
import { createConnection } from "node:net"
import { chromium } from "playwright"

const PORT = 5393
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

  // Type in the only text field and press Enter. The form has no submit
  // button, so only implicit submission can fill the <output>.
  const run = async (query) => {
    await page.goto(URL + query)
    const field = page.getByRole("textbox", { name: "Query" })
    await field.fill("shoes")
    await field.press("Enter")
    await page.waitForTimeout(300)
    return {
      sortControl: await page.evaluate(() => {
        const el = document.forms[0].elements.namedItem("sort")
        return `<${el.localName}${el.type === "text" ? ' type="text"' : ""}>`
      }),
      submitted: await page.locator("output").textContent(),
    }
  }

  const show = (s) => JSON.stringify(s)

  const control = await run("?native")
  const controlExpected = { sortControl: "<select>", submitted: "q=shoes&sort=new" }
  console.log("control: native <select name=sort>")
  console.log(`  expected ${show(controlExpected)}`)
  console.log(`  actual   ${show(control)}`)
  if (show(control) !== show(controlExpected)) (failed = true), console.log("  FAIL: the control does not behave as expected")

  const repro = await run("")
  console.log("repro: ui-sdk <Select name=sort>")
  console.log(`  expected {"submitted":"q=shoes&sort=new"}`)
  console.log(`  actual   ${show(repro)}`)
  if (show(repro) !== show({ sortControl: '<input type="text">', submitted: "" })) (failed = true), console.log("  FAIL: the bug did not reproduce")
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
