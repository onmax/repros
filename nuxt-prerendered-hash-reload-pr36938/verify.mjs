// Builds the app, serves it, and for each page opens it at #section, scrolls to y=1000 and reloads.
// The reload should keep the page at y=1000. Exits 1 when a page doesn't, which is the bug.
import { execFileSync, spawn } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

const root = import.meta.dirname
const port = Number(process.env.PORT || 43928)
const origin = `http://127.0.0.1:${port}`
const position = 1000

for (const dir of ['.nuxt', '.output']) rmSync(join(root, dir), { recursive: true, force: true })
execFileSync('pnpm', ['exec', 'nuxt', 'build'], { cwd: root, stdio: 'ignore' })
execFileSync('pnpm', ['exec', 'playwright-core', 'install', 'chromium-headless-shell'], { cwd: root, stdio: 'ignore' })

const server = spawn('node', ['.output/server/index.mjs'], {
  cwd: root,
  stdio: 'ignore',
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
})

async function settle (page) {
  await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt.isHydrating === false)
  let lastScrollY = -1
  for (let checksHeld = 0; checksHeld < 5;) {
    await page.waitForTimeout(100)
    const scrollY = await page.evaluate(() => window.scrollY)
    checksHeld = scrollY === lastScrollY ? checksHeld + 1 : 0
    lastScrollY = scrollY
  }
  return lastScrollY
}

async function scrollYAfterReload (browser, path) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  const scrollToCalls = []
  page.on('console', message => scrollToCalls.push(message.text()))
  await page.addInitScript(() => {
    const scrollTo = window.scrollTo.bind(window)
    window.scrollTo = (...args) => {
      console.log(`scrollTo(${JSON.stringify(args[0])}) at scrollY ${Math.round(window.scrollY)}`)
      return scrollTo(...args)
    }
  })
  await page.goto(`${origin}${path}`, { waitUntil: 'load' })
  await settle(page)
  await page.evaluate(top => { document.scrollingElement.scrollTop = top }, position)
  await settle(page)

  scrollToCalls.length = 0
  await page.reload({ waitUntil: 'load' })
  const scrollY = await settle(page)
  await page.close()
  return { scrollY, scrollToCalls }
}

let failed = false
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await fetch(`${origin}/ssr`).then(response => response.ok, () => false)) break
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  const browser = await chromium.launch()
  console.log(`Chromium ${browser.version()}, ${origin}`)
  console.log(`scrollY after scrolling to ${position} and reloading (expected ${position}):`)
  for (const path of ['/ssr#section', '/prerendered#section']) {
    const { scrollY, scrollToCalls } = await scrollYAfterReload(browser, path)
    console.log(`  ${path}: ${scrollY}`)
    for (const call of scrollToCalls) console.log(`    ${call}`)
    if (scrollY !== position) failed = true
  }
  await browser.close()
} finally {
  server.kill()
}

if (failed) {
  console.log('FAIL: a page did not keep its position after the reload')
  process.exit(1)
}
console.log('PASS: both pages kept their position after the reload')
