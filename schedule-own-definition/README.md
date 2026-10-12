# ViteHub Schedule inherited definition fields

The published `@vite-hub/schedule@0.0.4` package accepts schedule definitions whose required fields only exist on the prototype. A caller can therefore pass an object that is not a complete definition and still register inherited `cron`, `handler`, or options.

Run the failing verifier with:

```sh
pnpm install --ignore-scripts
pnpm verify
```

The verifier must fail before the fix because `defineSchedule()` accepts inherited fields.
