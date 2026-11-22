// Asserts what Comark does with the inputs behind vitehub markdown-template's workarounds (vite-hub/vitehub#5217).
// Exits nonzero when a claim no longer holds.
import assert from "node:assert/strict"

const builds = [
  { name: "comark 0.9.2", core: "comark", html: "@comark/html" },
  { name: "main 74ba41bd", core: "comark-main", html: "comark-html-main" },
  { name: "#530 c7dc995", core: "comark-pr530", html: "comark-html-pr530", control: true },
]

let failed = 0
const check = (label, fn) => {
  try { fn(); console.log(`  ok   ${label}`) }
  catch (error) { failed++; console.log(`  FAIL ${label}\n       expected ${JSON.stringify(error.expected)}\n       actual   ${JSON.stringify(error.actual)}`) }
}

for (const build of builds) {
  const { parseMarkdown } = await import(build.core)
  const { renderMarkdown } = await import(`${build.core}/render`)
  const htmlPlugin = (await import(`${build.core}/plugins/html`)).default
  const binding = (await import(`${build.core}/plugins/binding`)).default
  const { renderHtml } = await import(build.html)
  // The options vitehub's markdown-template parses with.
  const vitehub = () => ({ autoClose: false, autoUnwrap: false, linkify: false, plugins: [htmlPlugin({ markdown: false }), binding()] })
  const parse = async (source, options = vitehub()) => (await parseMarkdown(source, options)).nodes
  const save = async (source, options = vitehub()) => (await renderMarkdown(await parseMarkdown(source, options))).trim()

  console.log(`\n# ${build.name}`)

  // 1. Comark's HTML contract (SPEC/HTML/inline.md) lifts a finished element that is a paragraph's only child into a block.
  const policy = await parse("<policy>Use it.</policy>")
  const sibling = await parse("Read <policy>Use it.</policy>")
  check("1 lone inline HTML becomes a block, by design", () => {
    assert.deepEqual(policy, [["policy", { $: { html: 1, block: 1 } }, "Use it."]])
    assert.equal(sibling[0][0], "p")
  })

  // 2. A block line ends a paragraph, so a code span can't cross it. CommonMark does the same with a heading.
  const component = await parse("a `x\n::if{:c=\"d\"}\nhi\n::\ny` c", { autoClose: false })
  const heading = await parse("a `x\n# h\ny` c", { autoClose: false })
  const single = await parse("``\n:insert{:markdown=\"data.section\"}\n``", { autoClose: false })
  check("2 a block line splits a multi-line code span, as # does", () => {
    assert.equal(component[0][0], "p")
    assert.equal(component[1][0], "if")
    assert.equal(heading[1][0], "h1")
    assert.deepEqual(single, [["p", {}, ["code", {}, ":insert{:markdown=\"data.section\"}"]]])
  })

  // 3. The bug: the text keeps the break after the opening tag and both renderers add another.
  const raw = "<script>\nlet a\n</script>\n\n<textarea>\nx\n</textarea>"
  const nodes = await parse(raw)
  const expected = raw
  const markdown = await save(raw)
  const html = await renderHtml(raw)
  check("3 the parser keeps the break in the text", () => assert.equal(nodes[0][2], "\nlet a\n"))
  if (build.control) {
    check("3 renderMarkdown writes the break once", () => assert.equal(markdown, expected))
    check("3 @comark/html writes the break once", () => assert.equal(html, "<script>\nlet a\n</script>\n<textarea>\nx\n</textarea>"))
  }
  else {
    check("3 renderMarkdown writes the break twice", () => assert.equal(markdown, "<script>\n\nlet a\n</script>\n\n<textarea>\n\nx\n</textarea>"))
    check("3 @comark/html writes the break twice", () => assert.equal(html, "<script>\n\nlet a\n</script>\n<textarea>\n\nx\n</textarea>"))
    const twice = await save(markdown)
    check("3 every save adds a line", () => assert.equal(twice, "<script>\n\n\nlet a\n</script>\n\n<textarea>\n\n\nx\n</textarea>"))
  }

  // 4. Backslash escapes are decoded in the AST, as CommonMark says, so the text no longer shows where `\]` was.
  const link = await parse("[a\\]b](u)")
  const bound = await parse("[a\\]b]({{ data.url }})")
  check("4 escaped ] is decoded in link text", () => assert.deepEqual(link, [["p", {}, ["a", { href: "u" }, "a]b"]]]))
  check("4 a bound destination leaves decoded text before the binding", () => assert.equal(bound[0][2], "[a]b]("))
  const saved = await save("[a\\]b](u)")
  check("4 the link round-trips", () => assert.equal(saved, "[a\\]b](u)"))

  // 5. No public helper says whether an attribute value is a JSON literal.
  const exported = [build.core, `${build.core}/render`, `${build.core}/utils`]
  const names = (await Promise.all(exported.map(async (path) => Object.keys(await import(path))))).flat()
  check("5 no JSON-literal predicate is exported", () => assert.deepEqual(names.filter((name) => /json|literal/i.test(name)), []))
}

console.log(failed ? `\n${failed} check(s) failed` : "\nall checks hold")
process.exit(failed ? 1 : 0)
