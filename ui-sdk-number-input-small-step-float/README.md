# ui-sdk NumberInput small step leaks float error

A NumberInput with `step: 0.7` and value 1 reports `1.0499999999999998` to `onValueChange` after Alt+ArrowUp.
The input shows `1.05`, so only code that reads the value sees the error.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
The default small step is [`step / 10`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/components/number-input/number-input-api.ts#L94).
`0.7 / 10` is `0.06999999999999999` in floating point, and the step grid rounds to that many decimals.

Tested on Linux with Node 24.21.0 and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-number-input-small-step-float https://github.com/onmax/repros.git
cd repros/ui-sdk-number-input-small-step-float
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It creates the core `numberInput` with `locale: "en-US"` and passes an Alt+ArrowUp event to `api.internal.keydown`, the handler the adapters bind to the input's `keydown`.
The public `increment()` has no small-step option, so the key event is the only way to take a small step.
The control uses `step: 1`, whose small step `0.1` is exact, and lands on `1.1`.

Expected: `[1.05]`.
Actual:

```text
node v24.21.0
control step 1:   expected onValueChange [1.1], actual [1.1]
repro   step 0.7: expected onValueChange [1.05], actual [1.0499999999999998]
Reproduced: the default small step 0.7 / 10 = 0.06999999999999999 leaks float error into the value.
```
