# EMFILE: too many open files

## Problem
Nuxt dev server crashes with EMFILE when `.worktrees/` dir contains node_modules (git worktrees w/ their own deps).

## Reproduction
```bash
cd ~/repros/emfile-worktrees
pnpm dev  # crashes with EMFILE
```

## Structure
```
.worktrees/
  feature/
    some-branch/node_modules/   # ~57k files
    another-branch/node_modules/ # ~57k files
```

## Attempted fix (doesn't work)
```ts
// nuxt.config.ts
vite: {
  server: {
    watch: {
      ignored: ['**/.worktrees/**'],
    },
  },
},
```

## Investigation targets
1. Where does Nuxt/unstorage setup watchers?
2. Why doesn't vite.server.watch.ignored apply?
3. Is watching happening before config loads?

## Related issues
- https://github.com/nuxt/nuxt/issues/31575
- https://github.com/nuxt/nuxt/issues/30023
- https://github.com/nuxt/nuxt/issues/31897
