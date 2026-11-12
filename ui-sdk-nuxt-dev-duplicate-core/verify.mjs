import { spawn } from "node:child_process"
import { rmSync } from "node:fs"
import { connect } from "node:net"
import { setTimeout as sleep } from "node:timers/promises"
import { chromium } from "playwright"

const port = 5380
const url = `http://127.0.0.1:${port}/`
const symptom = "Cannot read properties of undefined (reading 'renders')"

function portOpen() {
  return new Promise((resolve) => {
    const socket = connect(port, "127.0.0.1")
    socket.once("connect", () => (socket.destroy(), resolve(true)))
    socket.once("error", () => resolve(false))
  })
}

async function startDev(env) {
  if (await portOpen()) throw new Error(`port ${port} is already in use`)
  const child = spawn(
    "pnpm",
    ["exec", "nuxt", "dev", "--host", "127.0.0.1", "--port", String(port)],
    { env: { ...process.env, ...env }, detached: true, stdio: ["ignore", "pipe", "pipe"] },
  )
  let log = ""
  child.stdout.on("data", (d) => (log += d))
  child.stderr.on("data", (d) => (log += d))
  const deadline = Date.now() + 120_000
  // Nuxt answers 503 with a loading page until its first build is ready.
  while ((await fetch(url).then((r) => r.status, () => 0)) === 503 || !(await portOpen())) {
    if (child.exitCode !== null) throw new Error(`nuxt dev exited:\n${log}`)
    if (Date.now() > deadline) throw new Error(`nuxt dev did not start:\n${log}`)
    await sleep(250)
  }
  return child
}

async function stopDev(child) {
  try {
    process.kill(-child.pid, "SIGTERM")
  } catch {}
  for (let i = 0; i < 40 && (await portOpen()); i++) await sleep(250)
  try {
    process.kill(-child.pid, "SIGKILL")
  } catch {}
  if (await portOpen()) throw new Error(`port ${port} is still in use after stopping nuxt dev`)
}

async function visit(browser) {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle" })
  await page.waitForTimeout(500)
  const error = await page.evaluate(() => useNuxtApp().payload.error?.message ?? null)
  const checkbox = page.getByRole("checkbox", { name: "Accept terms" })
  let checked = "no checkbox"
  if (await checkbox.count()) {
    await checkbox.click()
    checked = await checkbox.getAttribute("aria-checked")
  }
  await page.close()
  return { error, checked }
}

// Starts `nuxt dev` twice. The first start fills Vite's dependency cache in
// node_modules/.cache/vite; the second start reuses it, as a developer's next
// `nuxt dev` does.
async function run(env) {
  rmSync("node_modules/.cache", { recursive: true, force: true })
  rmSync(".nuxt", { recursive: true, force: true })
  const browser = await chromium.launch()
  try {
    let dev = await startDev(env)
    try {
      await visit(browser)
    } finally {
      await stopDev(dev)
    }
    dev = await startDev(env)
    try {
      return await visit(browser)
    } finally {
      await stopDev(dev)
    }
  } finally {
    await browser.close()
  }
}

const expected = "Nuxt error=null, checkbox aria-checked after click=true"
const show = (r) => `Nuxt error=${JSON.stringify(r.error)}, checkbox aria-checked after click=${r.checked}`

const bug = await run({})
console.log("bug: nuxt dev, second start, page imports @ui-sdk/core/checkbox")
console.log(`  expected: ${expected}`)
console.log(`  actual:   ${show(bug)}`)
const control = await run({ EXCLUDE_CORE: "1" })
console.log(`control: same, with vite.optimizeDeps.exclude ["@ui-sdk/core"]`)
console.log(`  expected: ${expected}`)
console.log(`  actual:   ${show(control)}`)

const reproduced = bug.error === symptom && bug.checked === "no checkbox"
const controlPassed = control.error === null && control.checked === "true"
console.log(`bug reproduced: ${reproduced}`)
console.log(`control passed: ${controlPassed}`)
console.log(`port ${port} free: ${!(await portOpen())}`)
process.exit(reproduced && controlPassed ? 0 : 1)
