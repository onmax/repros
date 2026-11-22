// Runs every playground link in the #525 body through one Comark build: parse, then save as Markdown.
import { readFileSync } from "node:fs"
import { inflateRawSync } from "node:zlib"

const [, , bodyFile, pkg = "comark", only] = process.argv
const { parseMarkdown } = await import(pkg)
const { renderMarkdown } = await import(`${pkg}/render`)
const { renderHtml } = await import(pkg === "comark" ? "@comark/html" : pkg.replace("comark-", "comark-html-"))

const decode = (code) => inflateRawSync(Buffer.from(code, "base64url")).toString("utf8")
const body = readFileSync(bodyFile, "utf8")
for (const line of body.split("\n")) {
  const number = line.match(/^- \[[ x]\] (\d+)\./)?.[1]
  if (!number || (only && !only.split(",").includes(number))) continue
  for (const [, code] of line.matchAll(/comark\.dev\/play#code\/([\w-]+)/g)) {
    const source = decode(code)
    let out
    try {
      const tree = await parseMarkdown(source)
      out = { nodes: tree.nodes, markdown: await renderMarkdown(tree), html: await renderHtml(source) }
    }
    catch (error) {
      out = { throws: String(error).slice(0, 120) }
    }
    console.log(`## ${number}\n  input ${JSON.stringify(source.length > 200 ? `${source.slice(0, 80)}… (${source.length} chars)` : source)}`)
    for (const [key, value] of Object.entries(out)) console.log(`  ${key} ${JSON.stringify(value)?.slice(0, 600)}`)
  }
}
