# Nuxt UI component detection skips module component dirs

With `ui.experimental.componentDetection: true`, Nuxt UI (Nuxt mode) scans only the `app/` dir of each layer for `<U*>` usage. A module that registers its own components with `addComponentsDir()` uses `<UBadge size="sm">`, but the Badge theme never reaches `.nuxt/ui.css`, so its classes are missing from the built CSS.

- `@nuxt/ui` 4.12.2 (also checked: the `v4` branch scans the same dirs)
- `nuxt-nightly` 5.0.0-2611161628-96caf0e, Node 24.21.0, pnpm 12.21.0
- `modules/card-kit` stands in for a published module. It only calls `addComponentsDir()`.

```sh
git clone --branch repro/nuxt-ui-component-detection-module-dirs https://github.com/onmax/repros
cd repros/nuxt-ui-component-detection-module-dirs
pnpm install && pnpm verify
```

Expected: `.nuxt/ui.css` has `@source "./ui/badge.ts"` and the built CSS has the Badge `sm` class `text-[10px]/3`.

Actual:

```
theme sources in .nuxt/ui.css: toaster, toast, avatar, chip, button, link, progress
FAIL: <UBadge size="sm"> in a component that the card-kit module registers with addComponentsDir() is not detected.
  badge theme in .nuxt/ui.css: false, .text-[10px]/3 in the built CSS: false
```

Set `componentDetection: false` and the class is in the build. The Vite plugin has `scanPackages` and `components.dirs` for this case; the Nuxt module has no equivalent.
