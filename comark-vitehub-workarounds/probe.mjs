// Prints what each version does with the inputs behind vitehub's workarounds.
const [, , pkg = "comark", htmlPkg = "@comark/html"] = process.argv
const { parseMarkdown } = await import(pkg)
const { renderMarkdown } = await import(`${pkg}/render`)
const html = (await import(`${pkg}/plugins/html`)).default
const binding = (await import(`${pkg}/plugins/binding`)).default
const { renderHtml } = await import(htmlPkg)

// The options vitehub's markdown-template parses with.
const options = (plugins) => ({ autoClose: false, autoUnwrap: false, linkify: false, plugins })
const vitehub = () => options([html({ markdown: false }), binding()])
const show = (value) => JSON.stringify(value)

async function roundTrip(source, opts = vitehub()) {
  const tree = await parseMarkdown(source, opts)
  return { nodes: tree.nodes, markdown: (await renderMarkdown(tree)).trim() }
}

console.log("## 1 inline HTML alone in its paragraph")
for (const source of ["<policy>Use it.</policy>", "Read <policy>Use it.</policy>", "<b>bold</b>"]) {
  const vh = await roundTrip(source)
  const def = await roundTrip(source, options([]))
  console.log(show(source), "\n  html({markdown:false}) nodes", show(vh.nodes), "md", show(vh.markdown),
    "\n  default nodes", show(def.nodes), "md", show(def.markdown),
    "\n  renderHtml", show(await renderHtml(source)))
}

console.log("\n## 2 component lines inside a multi-line code span")
for (const source of [
  "``\n:insert{:markdown=\"data.section\"}\n``",
  "``\n::if{:condition=\"data.x\"}\nhi\n::\n``",
  "a `x\n:b\ny` c",
  "a `x\n# h\ny` c",
]) {
  const def = await roundTrip(source, options([]))
  console.log(show(source), "\n  nodes", show(def.nodes), "\n  md", show(def.markdown))
}

console.log("\n## 3 line break after an opening raw block tag")
for (const source of ["<script>\nlet a\n</script>", "<style>\na {}\n</style>", "<textarea>\nx\n</textarea>", "<pre>\nx\n</pre>"]) {
  const vh = await roundTrip(source)
  const def = await roundTrip(source, options([]))
  console.log(show(source), "\n  html({markdown:false}) nodes", show(vh.nodes), "md", show(vh.markdown),
    "\n  default nodes", show(def.nodes), "md", show(def.markdown),
    "\n  renderHtml", show(await renderHtml(source)))
}

console.log("\n## 4 escaped ] in link text")
for (const source of ["[a\\]b](u)", "[a\\]b]({{ data.url }})", "x \\] y"]) {
  const vh = await roundTrip(source)
  console.log(show(source), "\n  nodes", show(vh.nodes), "\n  md", show(vh.markdown))
}

console.log("\n## 5 exports for the JSON-literal rule")
const core = await import(pkg)
const render = await import(`${pkg}/render`)
const utils = await import(`${pkg}/utils`)
console.log("comark", Object.keys(core).sort().join(" "))
console.log("comark/render", Object.keys(render).sort().join(" "))
console.log("comark/utils", Object.keys(utils).sort().join(" "))
