// Builds the app, serves it and opens /page#target in Chromium, with and without JavaScript.
// Once the scroll settles, #target should sit at the top of the viewport.
// Exits 1 when it doesn't, which is the bug.
import { execFileSync, spawn } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

const root = import.meta.dirname
const port = 43917
const url = `http://127.0.0.1:${port}/page#target`

for (const dir of ['.nuxt', '.output']) rmSync(join(root, dir), { recursive: true, force: true })
execFileSync('pnpm', ['exec', 'nuxt', 'build'], { cwd: root, stdio: 'ignore' })
execFileSync('pnpm', ['exec', 'playwright-core', 'install', 'chromium-headless-shell'], { cwd: root, stdio: 'ignore' })

const server = spawn('node', ['.output/server/index.mjs'], {
  cwd: root,
  stdio: 'ignore',
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
})

async function settledOffset (browser, javaScriptEnabled) {
  const page = await browser.newPage({ javaScriptEnabled, viewport: { width: 1280, height: 720 } })
  const scrollToCalls = []
  page.on('console', message => scrollToCalls.push(message.text()))
  await page.addInitScript(() => {
    const scrollTo = window.scrollTo.bind(window)
    window.scrollTo = (...args) => {
      console.log(`scrollTo(${JSON.stringify(args[0])}) at scrollY ${Math.round(window.scrollY)}`)
      return scrollTo(...args)
    }
  })
  // The first script arrives 150 ms late, so the app hydrates while the browser is still scrolling.
  await page.route(/\.js/, async (route) => {
    await new Promise(resolve => setTimeout(resolve, 150))
    await route.continue()
  }, { times: 1 })
  await page.goto(url, { waitUntil: 'load' })

  let lastScrollY = -1
  for (let checksHeld = 0; checksHeld < 5;) {
    await page.waitForTimeout(100)
    const scrollY = await page.evaluate(() => window.scrollY)
    checksHeld = scrollY === lastScrollY ? checksHeld + 1 : 0
    lastScrollY = scrollY
  }
  const offset = await page.locator('#target').evaluate(el => Math.round(el.getBoundingClientRect().top))
  await page.close()
  return { offset, scrollToCalls }
}

let failed = false
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await fetch(url).then(response => response.ok, () => false)) break
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  const browser = await chromium.launch()
  console.log(`Chromium ${browser.version()}, ${url}`)
  console.log('Distance from the top of the viewport to #target once the scroll settles (expected 0):')
  for (const [name, javaScriptEnabled] of [['with JavaScript', true], ['without JavaScript', false]]) {
    const { offset, scrollToCalls } = await settledOffset(browser, javaScriptEnabled)
    console.log(`  ${name}: ${offset}px`)
    for (const call of scrollToCalls) console.log(`    ${call}`)
    if (offset !== 0) failed = true
  }
  await browser.close()
} finally {
  server.kill()
}

if (failed) {
  console.log('FAIL: the page does not stop at #target')
  process.exit(1)
}
console.log('PASS: the page stops at #target')
