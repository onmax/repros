import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.argv[2]
if (!baseURL) {
  console.error('Usage: node probe-auth-ui.mjs <baseURL>')
  process.exit(2)
}

const ts = new Date().toISOString().replace(/[:.]/g, '-')
const outRoot = '/Users/maxi/repros/.scratch/causality-matrix/results-cf-deployed-runtime/probe/playwright'
const outDir = path.join(outRoot, ts)
await fs.mkdir(outDir, { recursive: true })

const email = `t+${Date.now()}@example.com`
const password = 'Passw0rd!Passw0rd!Passw0rd!' // deterministic
const name = 'Test User'

const events = {
  console: [],
  pageerror: [],
  api: []
}

function safeSlice(str, max = 1000) {
  if (typeof str !== 'string') return ''
  return str.length > max ? `${str.slice(0, max)}...<truncated>` : str
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ baseURL })
await context.tracing.start({ screenshots: true, snapshots: true, sources: false })

const page = await context.newPage()
page.on('console', (msg) => {
  events.console.push({ type: msg.type(), text: msg.text() })
})
page.on('pageerror', (err) => {
  events.pageerror.push({ message: err?.message, stack: safeSlice(err?.stack || '', 2000) })
})
page.on('response', async (res) => {
  const url = res.url()
  if (!url.includes('/api/auth/')) return
  const entry = {
    url,
    status: res.status(),
    statusText: res.statusText(),
    method: res.request().method()
  }
  if (res.status() >= 400) {
    try {
      entry.body = safeSlice(await res.text(), 2000)
    } catch {
      entry.body = '<unreadable>'
    }
  }
  events.api.push(entry)
})

async function screenshot(label) {
  await page.screenshot({ path: path.join(outDir, `${label}.png`), fullPage: true })
}

async function step(label, fn) {
  try {
    await fn()
  } catch (err) {
    await screenshot(`error-${label}`)
    throw err
  }
}

try {
  await step('open-signup', async () => {
    await page.goto('/signup', { waitUntil: 'domcontentloaded' })
    await screenshot('signup')
  })

  await step('fill-signup', async () => {
    await page.getByLabel(/name/i).fill(name)
    await page.getByLabel(/^email$/i).fill(email)
    await page.getByLabel(/^password$/i).fill(password)
    await screenshot('signup-filled')
  })

  await step('submit-signup', async () => {
    // Prefer click without navigation assumptions; some flows may show inline errors.
    await page.getByRole('button', { name: /create account/i }).click()
    // Wait until either we land on /app, or we see any API call beyond get-session.
    await Promise.race([
      page.waitForURL(/\/app(\/|$)/, { timeout: 45_000 }),
      page.waitForResponse((r) => r.url().includes('/api/auth/') && !r.url().includes('/api/auth/get-session'), { timeout: 45_000 }).catch(() => {})
    ])
    await page.waitForTimeout(1000)
    await screenshot('after-signup')
  })

  // Controls
  await step('control-home', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await screenshot('home')
  })

  await step('open-app', async () => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })
    await screenshot('app')
  })

  await fs.writeFile(path.join(outDir, 'result.json'), JSON.stringify({ ok: true, baseURL, email, ts, events }, null, 2))
} catch (err) {
  const message = err instanceof Error ? err.message : String(err)
  const stack = err instanceof Error ? err.stack : undefined
  await fs.writeFile(path.join(outDir, 'result.json'), JSON.stringify({ ok: false, baseURL, email, ts, error: { message, stack }, events }, null, 2))
  throw err
} finally {
  await context.tracing.stop({ path: path.join(outDir, 'trace.zip') })
  await context.close().catch(() => {})
  await browser.close().catch(() => {})
}
