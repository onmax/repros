import { chromium } from '@playwright/test'

const targetUrl = process.env.REPRO_URL || 'http://localhost:3000/?preview=true'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

await page.goto(targetUrl, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('[data-testid="mode"]', { timeout: 20_000 })
await page.waitForTimeout(1_000)

const state = await page.evaluate(() => {
  const nuxtApp = window.useNuxtApp?.()
  const mode = document.querySelector('[data-testid="mode"]')

  return {
    routeQuery: nuxtApp?._route?.query?.preview ?? null,
    className: mode?.className ?? null,
    backgroundColor: mode ? getComputedStyle(mode).backgroundColor : null,
  }
})

console.log(JSON.stringify(state, null, 2))
await browser.close()

if (state.routeQuery === 'true' && state.className !== 'preview-mode') {
  console.error('FAIL: query true but class not preview-mode')
  process.exit(1)
}

console.log('PASS')
