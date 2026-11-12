# ui-sdk act() omits the value of a field it revealed

`agent.act()` from `@ui-sdk/react/agent` can set an Input inside a closed Accordion: it opens the section, then sets the value.
That step's `changes` list only the Accordion opening. The Input's new value is missing, although `subscribe` reports it.

[`since`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/page/agent/agent.ts#L866-L877) builds a step's changes by comparing each live component with its state before the step.
A component that wasn't on the page before the step has no earlier state, so it is skipped at `if (!was) continue`.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0's Chromium headless shell (revision 1243).
The lockfile pins `@ui-sdk/core` and `@ui-sdk/react` 0.1.0-beta.1 from npm, React 19.3.1 and Vite 8.3.8.

```sh
git clone --single-branch --branch repro/ui-sdk-agent-act-revealed-changes https://github.com/onmax/repros.git
cd repros/ui-sdk-agent-act-revealed-changes
bash verify.sh
```

`verify.sh` installs from the lockfile and runs `verify.mjs`, which starts Vite on port 5387, loads `index.html` in Chromium, calls `act` twice in the page, and stops Vite.
It exits 0 when the change is missing and the controls pass. It doesn't download browsers; run `pnpm exec playwright install chromium-headless-shell` if yours is missing.
`main.js` uses `createElement` so the fixture needs no JSX plugin.

Expected: the step's `changes` include the Input's value. The agent reference says a step can "reach a component revealed by an earlier step", that the bridge "can also look for a target inside closed accordion sections", and to "Inspect each step's `changes` and the returned `values` to see what took effect" ([reference.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/agents/connect-an-agent/reference.mdx?plain=1#L90), [L136](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/agents/connect-an-agent/reference.mdx?plain=1#L136)).

Actual:

```text
act setValue "Jane" while the accordion is closed, step changes: [{"component":"accordion","label":"Billing","key":"value","value":["billing"]}]
  same call, appeared: [{"ref":"c2","component":"input","actions":["setValue","clear"],"label":"Card holder","value":"Jane"}]
subscribe input changes: [["Card holder","value","Jane"]]
act setValue "Joe" while the accordion is open, step changes: [{"component":"input","label":"Card holder","key":"value","value":"Joe"}]
```

Controls in the same page:

- The second `act` on the now-visible Input lists its value change, so only the revealing step drops it.
- `subscribe` reports the `Jane` change, so the value was set.

The result's `appeared` and `values` do show `Jane`; only the step's `changes` omit it.
