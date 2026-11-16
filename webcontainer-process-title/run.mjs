// Serves this folder with cross-origin isolation, opens index.html in headless Chromium,
// and runs `window.repro()`. It prints what the page returns and exits 1 when the bug shows.
import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join, normalize } from "node:path"
import { chromium } from "playwright-core"

const root = import.meta.dirname
const port = Number(process.env.PORT ?? 47914)
const types = { ".html": "text/html", ".js": "text/javascript" }

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname
  const path = normalize(pathname === "/" ? "/index.html" : pathname)
  try {
    const body = await readFile(join(root, path))
    res.writeHead(200, {
      "content-type": types[extname(path)] ?? "application/octet-stream",
      "cross-origin-opener-policy": "same-origin",
      "cross-origin-embedder-policy": "require-corp",
    })
    res.end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise(resolve => server.listen(port, "127.0.0.1", resolve))

// CHROMIUM=/path/to/chrome uses a local build; otherwise run `npx playwright-core install chromium` first.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined })
let result
try {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/`)
  await page.waitForFunction("typeof window.repro === 'function'")
  result = await page.evaluate("window.repro()")
} finally {
  await browser.close()
  server.close()
}

for (const line of result.lines) console.log(line)
console.log(result.bug ? `\nBUG: ${result.summary}` : `\nOK: ${result.summary}`)
process.exit(result.bug ? 1 : 0)
