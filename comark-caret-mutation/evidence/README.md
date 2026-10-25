# Verification on 2026-10-25

After removing this fixture's `node_modules`, the documented command `sh verify.sh --offline` completed with exit 0 under the shared `heavy` lock. pnpm installed all 39 locked packages from its existing store. No dependency directory or package files were copied from the study workspace.

`pnpm check` then exited 1 with the expected assertion that repeated caret rendering must leave the shared AST unchanged. Its JSON records the same failure in React and Vue before the first assertion throws.

- [Clean install and reproduction output](verify.txt)
- [Desired-behavior failure](check.txt)

Node v24.21.0, pnpm 11.18.0, Linux x64. Absolute local directory prefixes in the logs are replaced with `<fixture>` and `<home>`. All commands and observed counts are otherwise unchanged.
