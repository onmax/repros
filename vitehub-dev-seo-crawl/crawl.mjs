// Crawl a site like a site audit does: start at / and the sitemap, follow every same-origin link
// (a href, link href, Link headers), record one row per URL. Output: crawl.json
import { writeFileSync } from "node:fs"

const origin = process.argv[2] ?? "https://vitehub.dev"
const max = Number(process.argv[3] ?? 6000)
const ua = process.env.UA ?? "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)"
const queue = []
const seen = new Map()
const rows = []

function add(url, from) {
  let u
  try { u = new URL(url, from ?? origin) } catch { return }
  if (u.origin !== new URL(origin).origin) return
  u.hash = ""
  const key = u.href
  if (seen.has(key)) { seen.get(key).inlinks.add(from ?? "(seed)"); return }
  seen.set(key, { inlinks: new Set([from ?? "(seed)"]) })
  if (seen.size <= max) queue.push(key)
}

const sitemap = await (await fetch(`${origin}/sitemap.xml`, { headers: { "user-agent": ua } })).text()
add(`${origin}/`)
for (const m of sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) add(m[1])
const sitemapSet = new Set([...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]))

async function visit(url) {
  const t0 = performance.now()
  let res
  try { res = await fetch(url, { redirect: "manual", headers: { "user-agent": ua, accept: "text/html,*/*;q=0.8" } }) }
  catch (error) { rows.push({ url, status: 0, error: String(error) }); return }
  const ttfb = Math.round(performance.now() - t0)
  const buf = Buffer.from(await res.arrayBuffer())
  const type = res.headers.get("content-type") ?? ""
  const row = { url, status: res.status, ttfb, bytes: buf.length, type, location: res.headers.get("location"), robotsHeader: res.headers.get("x-robots-tag"), cache: res.headers.get("cf-cache-status") ?? res.headers.get("x-vercel-cache") }
  if (row.location) add(row.location, url)
  for (const m of (res.headers.get("link") ?? "").matchAll(/<([^>]+)>/g)) add(m[1], url)
  if (type.includes("html")) {
    const html = buf.toString("utf8")
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ""
    const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? ""
    row.title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    row.robots = head.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)/i)?.[1]
    row.canonical = head.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? head.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical/i)?.[1]
    row.hreflang = [...head.matchAll(/hreflang=["']([^"']+)/gi)].map(m => m[1])
    row.ogImage = head.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)/i)?.[1]
    row.description = head.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i)?.[1]
    const out = new Set()
    const ext = new Set()
    for (const m of body.matchAll(/<a\b[^>]*\shref=["']([^"']+)["']/gi)) {
      const href = m[1].replaceAll("&amp;", "&")
      if (/^(mailto:|tel:|javascript:|#)/.test(href)) continue
      try {
        const u = new URL(href, url)
        if (u.origin === new URL(origin).origin) { u.hash = ""; out.add(u.href); add(u.href, url) } else ext.add(u.href)
      } catch {}
    }
    for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
      const rel = m[0].match(/rel=["']([^"']+)/i)?.[1] ?? ""
      const href = m[0].match(/href=["']([^"']+)/i)?.[1]
      if (href && /alternate|canonical|prev|next/.test(rel)) add(href.replaceAll("&amp;", "&"), url)
    }
    row.internalLinks = out.size
    row.externalLinks = ext.size
    row.imgNoAlt = [...body.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)].length
    row.h1 = [...body.matchAll(/<h1\b/gi)].length
  }
  else if (type.includes("markdown") || type.includes("text/plain")) {
    // Links inside code samples are examples, not links: crawlers do not follow them.
    const text = buf.toString("utf8").replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, "").replace(/`[^`\n]*`/g, "")
    for (const m of text.matchAll(/\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g)) add(m[1], url)
  }
  rows.push(row)
}

const conc = Number(process.env.CONC ?? 8)
let active = 0
await new Promise(resolve => {
  const pump = () => {
    while (active < conc && queue.length) {
      const url = queue.shift()
      active++
      visit(url).finally(() => { active--; if (rows.length % 200 === 0) console.error(`${rows.length} done, ${queue.length} queued`); pump() })
    }
    if (!active && !queue.length) resolve()
  }
  pump()
})
for (const row of rows) { row.inlinks = seen.get(row.url)?.inlinks.size ?? 0; row.inSitemap = sitemapSet.has(row.url); row.from = [...(seen.get(row.url)?.inlinks ?? [])].slice(0, 3) }
writeFileSync(process.env.OUT ?? "crawl.json", JSON.stringify(rows, null, 1))
console.error(`crawled ${rows.length}, discovered ${seen.size}`)
