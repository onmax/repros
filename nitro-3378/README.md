# Nitro #3378 - Custom DO Binding Name

Reproduction for custom Durable Object binding names with `cloudflare_durable` preset.

## Problem

Nitro hardcodes `$DurableObject` as the DO binding name in `cloudflare-durable.ts`.
Users can't use custom binding names like `MyDO` even though:
- `wrangler.jsonc` supports any binding name
- `crossws` adapter already accepts `bindingName` option

## Current Behavior

With `wrangler.jsonc`:
```jsonc
"durable_objects": {
  "bindings": [{ "name": "MyDO", "class_name": "$DurableObject" }]
}
```

WebSocket fails with: `Durable Object binding "$DurableObject" not available.`

## Desired Behavior

```ts
// nuxt.config.ts
nitro: {
  cloudflare: {
    durable: {
      bindingName: 'MyDO'
    }
  }
}
```

## Workaround

Use `$DurableObject` as binding name in `wrangler.jsonc`:
```jsonc
"durable_objects": {
  "bindings": [{ "name": "$DurableObject", "class_name": "$DurableObject" }]
}
```

## Related

- [nuxt-hub/core#722](https://github.com/nuxt-hub/core/issues/722)
- [nitrojs/nitro#3378](https://github.com/nitrojs/nitro/issues/3378)
