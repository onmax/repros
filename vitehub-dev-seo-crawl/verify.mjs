// Crawls a site as Ahrefs Site Audit does, then asserts the issues that the Ahrefs crawl of vitehub.dev
// reported on 14 November 2026. Exits 1 while the issues reproduce, 0 when they are gone.
// Usage: node verify.mjs [origin]
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const origin = process.argv[2] ?? "https://vitehub.dev"
const here = fileURLToPath(new URL(".", import.meta.url))
const out = `${here}crawl.json`
execFileSync(process.execPath, [`${here}crawl.mjs`, origin, "8000"], {
  stdio: ["ignore", "inherit", "inherit"],
  env: { ...process.env, OUT: out, UA: "Mozilla/5.0 (compatible; AhrefsSiteAudit/6.1; +http://ahrefs.com/robot/site-audit)" },
})
const rows = JSON.parse(readFileSync(out, "utf8"))
const html = rows.filter(row => row.status === 200 && row.type.includes("html"))

const checks = []
const check = (name, failing, detail) => checks.push({ name, failing: failing.length, detail: failing.slice(0, 5).map(detail) })

// Error: "Page size exceeds 2 MB crawl limit". Googlebot reads the first 2 MB of uncompressed HTML.
check("HTML page over 2 MB", html.filter(row => row.bytes > 2 * 1024 * 1024), row => `${row.bytes} B ${row.url}`)
// Error: "4XX page". A crawled URL that a page links to answers 4xx.
check("Linked URL answers 4xx", rows.filter(row => row.status >= 400 && row.status < 500), row => `${row.status} ${row.url} <- ${row.from[0]}`)
// Warning: "Open Graph tags incomplete". Indexable pages need og:title, og:type, og:image and og:url.
const indexable = html.filter(row => !/noindex/.test(row.robots ?? ""))
const ogMissing = []
for (const row of indexable.slice(0, 20)) {
  const page = await (await fetch(row.url, { headers: { "user-agent": "Mozilla/5.0" } })).text()
  const missing = ["og:title", "og:type", "og:image", "og:url"].filter(tag => !new RegExp(`property=["']${tag}["']`).test(page))
  if (missing.length) ogMissing.push({ url: row.url, missing })
}
check("Indexable page lacks required Open Graph tags (first 20 sampled)", ogMissing, row => `${row.url} missing ${row.missing.join(", ")}`)
// Warning: "Page has links to redirect". Every page footer links to a URL that redirects.
const redirectTargets = new Map()
for (const row of html.slice(0, 1)) {
  const page = await (await fetch(row.url, { headers: { "user-agent": "Mozilla/5.0" } })).text()
  for (const match of page.matchAll(/<a\b[^>]*\shref="(https?:\/\/[^"]+)"/g)) {
    if (redirectTargets.has(match[1])) continue
    const response = await fetch(match[1], { redirect: "manual" }).catch(() => null)
    if (response && response.status >= 300 && response.status < 400) redirectTargets.set(match[1], response.status)
  }
}
check("Every page links to a redirect", [...redirectTargets], ([url, status]) => `${status} ${url}`)
// Warning: "Slow server response for AI crawlers": TTFB over 1.8 s.
check("TTFB over 1.8 s", html.filter(row => row.ttfb > 1800).sort((a, b) => b.ttfb - a.ttfb), row => `${row.ttfb} ms ${row.url}`)

const ttfb = html.map(row => row.ttfb).sort((a, b) => a - b)
console.log(`\n${origin}: ${rows.length} URLs, ${html.length} HTML, ${html.length - indexable.length} noindex, TTFB p50 ${ttfb[ttfb.length >> 1]} ms, p90 ${ttfb[Math.floor(ttfb.length * 0.9)]} ms, max ${ttfb.at(-1)} ms`)
for (const { name, failing, detail } of checks) {
  console.log(`${failing ? "REPRODUCES" : "fixed     "}  ${name}: ${failing}`)
  for (const line of detail) console.log(`              ${line}`)
}
process.exitCode = checks.some(c => c.failing) ? 1 : 0
