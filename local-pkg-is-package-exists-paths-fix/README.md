# Control: `isPackageExists` answers a missing package without mlly

This is the fixed control for [`../local-pkg-is-package-exists-paths`](../local-pkg-is-package-exists-paths). `package.json`, `check.mjs` and the verifier are the same. The only change is `patches/local-pkg@1.2.1.patch`, listed in `pnpm-workspace.yaml` and recorded in `pnpm-lock.yaml`. It patches `dist/index.mjs` and `dist/index.cjs`.

Before calling mlly, `resolvePackage` now calls `mayBeInstalled(name, options.paths)` and returns `false` when it says no:

```js
function mayBeInstalled(name, paths) {
  const candidates = candidatePackages(name);
  if (!candidates || process.versions.pnp) return true;
  const dirs = new Set();
  for (const p of paths?.length ? paths : [process.cwd()]) {
    let dir = toDir(p);
    if (!dir) return true;
    while (!dirs.has(dir)) {
      dirs.add(dir);
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  for (const dir of dirs) {
    const modules = join(dir, 'node_modules');
    if (fs.existsSync(modules) && candidates.some(pkg => fs.existsSync(join(modules, pkg)))) return true;
    const pkgJson = join(dir, 'package.json');
    if (fs.existsSync(pkgJson)) {
      try {
        if (candidates.includes(JSON.parse(fs.readFileSync(pkgJson, 'utf8')).name)) return true;
      } catch {}
    }
  }
  return false;
}
```

It collects the distinct ancestors of all paths in a `Set`, so a directory shared by 23 layer roots is checked once. It answers `false` only when no ancestor has the package in `node_modules` and no ancestor `package.json` is the package itself. Every directory mlly would look in is one of those ancestors, so mlly could not have resolved the name either. When the package might exist, mlly resolves it exactly as before, so found packages keep their `exports`, conditions and entry path.

`candidatePackages` returns `undefined`, which skips the check, for relative, absolute, protocol and builtin specifiers. `toDir` does the same for a path that is not a file path, and Yarn PnP skips it too. For a bare name it returns the package name, plus that name with `.mjs`, `.cjs`, `.js` and `.json`, because mlly also tries those specifiers. For example, stock `isPackageExists('ext-variant')` is `true` when only a package named `ext-variant.js` is installed. The first prototype of this fix looked only for `node_modules/<name>` and answered `false` there. The verifier now checks that case.

From the branch root:

```sh
node verify.mjs local-pkg-is-package-exists-paths-fix
```

Expected and actual are the same here, and the verifier exits 0. It exits 3 if any answer differs from stock local-pkg 1.2.1. Output on Slimbook on 2026-10-31:

```text
local-pkg-is-package-exists-paths-fix: Node v24.21.0, local-pkg 1.2.1 with patches/, mlly 1.8.2
paths: the fixture dir, 6 levels below /, then layers/layer-0, layers/layer-1, ... inside it

isPackageExists answers (stock local-pkg 1.2.1 in brackets when different):
  installed (mlly), 1 path                                                 true
  installed (mlly), 23 paths                                               true
  builtin (fs), 1 path                                                     true
  builtin (fs), 23 paths                                                   true
  self (local-pkg-is-package-exists-paths), 1 path                         true
  self (local-pkg-is-package-exists-paths), 23 paths                       true
  non-exported subpath (mlly/package.json), 1 path                         false
  non-exported subpath (mlly/package.json), 23 paths                       false
  missing (@iconify/json), 1 path                                          false
  missing (@iconify/json), 23 paths                                        false
  extension variant (ext-variant, only ext-variant.js installed), 1 path   true

isPackageExists('@iconify/json', { paths }), not installed, one fresh process per row:
  paths   statSync  existsSync   distinct paths   calls per distinct path   time (information only)
      1          0          19               19                       1.0        0.8 ms
      2          0          23               23                       1.0        1.8 ms
      4          0          27               27                       1.0        2.1 ms
      8          0          35               35                       1.0        1.5 ms
     16          0          51               51                       1.0        0.9 ms
     23          0          65               65                       1.0        1.4 ms

23 paths make 3.4x the calls of 1 path (23x if every path cost the same); each extra path adds 2.1 calls; each distinct path is probed 1.0 times

expected: each path on disk is probed about once, so an extra layer root adds a few calls
actual:   23 paths make 65 calls on 65 distinct paths
```

`statSync` stays at 0 for every path count. The new check makes one `existsSync` call per distinct path it looks at, and each layer root adds about two. With a copy of this patch that dropped either the self-reference check or the extension names, the verifier exits 3 and marks the changed answers `DIFFERENT`.

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
