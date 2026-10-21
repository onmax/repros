# comark#505: inline HTML inside a block component loses its content

Issue: https://github.com/comarkdown/comark/issues/505

Since comark 0.8.0, the text inside an inline HTML tag moves out of it when the tag sits in a `::` block component. The same line in a paragraph keeps it.

```diff
 ::foo
 Note <b>x</b> end
 ::

-<div class="foo">Note <b>x</b> end</div>   expected (and 0.7.0)
+<div class="foo">Note x<b></b> end</div>   0.8.1
```

## Run

```sh
git clone --branch repro/comark-505 https://github.com/onmax/repros.git
cd repros/comark-505
pnpm install
pnpm verify
```

`pnpm verify` parses both lines and renders them with `@comark/html`. It prints the expected and actual HTML and the tree, and exits 1 when the block component case is wrong:

```text
ok   paragraph: <p>Note <b>x</b> end</p>
FAIL block component
  expected: <div class="foo">Note <b>x</b> end</div>
  actual:   <div class="foo">Note x<b></b> end</div>
  tree:     [["foo",{},"Note x",["b",{"$":{"html":1,"block":0}}]," end"]]
```

## Pinned

- `comark` and `@comark/html` 0.8.1, Node 24, pnpm 11.18.0.
- `pnpm-workspace.yaml` exempts the two packages from pnpm's minimum release age, since 0.8.1 was published the day this was written.
- The paragraph case is the control: it rules out a general inline HTML problem.
- The `foo` component renders as a `div` so the HTML shows where the text lands.

## Fixed control

`../comark-505-fix` is the same fixture with a `pnpm patch` of comark 0.8.1. The patch parses a block component's body in a fresh HTML scope, as lists and blockquotes already are. `pnpm verify` there exits 0.
