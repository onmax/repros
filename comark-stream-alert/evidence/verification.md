# Verification on 2026-10-25

Working directory: `comark-stream-alert/` on branch `repro/comark-stream-alert`, based on `b4f238c`.

Node 24.21.0, pnpm 11.18.0, Linux x64. Comark 0.8.1, with the study's `js-yaml@5.4.3` / `argparse@2.0.1` dependency graph pinned in the workspace and lockfile.

## Clean install and confirmation

`node_modules` was absent before this command. The partial files from the first unsuccessful install had been moved into the worktree's ignored `.cache/` directory. The later configuration-mismatch attempt installed nothing.

```sh
bash verify.sh --offline > evidence/confirmation.txt 2>&1
```

Exit status: **0**. The runner used `HEAVY_WAIT=0 heavy` for installation and `heavy --light` for the individual runtime repro. pnpm reported 12 reused packages, 0 downloads, and 12 added packages. It accepted the frozen lockfile without resolving a new graph. The full output is in `confirmation.txt`.

Exact stable-element tag reads across 40 appends were 80, 79,920, 319,920, and 639,920 for 2, 1,000, 4,000, and 8,000 seed paragraphs. Every protected node was reused by identity and read exactly once during each default alert span. The pre hook observed 892 characters for tokenization at every prefix size. The disabled-alert control had zero alert reads and an identical final AST. The real-alert smoke test passed in both modes of parsing.

Five-sample medians without AST getters, after two warm-up pairs:

| Measurement | Median |
| --- | ---: |
| Default total for 40 appends | 158.418 ms |
| Inside default alert | 135.286 ms |
| Alert-disabled total for 40 appends | 21.935 ms |
| Default / alert-disabled total | 7.22x |

These timings describe this run on shared hardware. Only deterministic assertions decide confirmation.

## Desired-behavior check

After the clean installation:

```sh
COREPACK_ENABLE_NETWORK=0 heavy --light pnpm check > evidence/check.txt 2>&1
```

Exit status: **1**, checked explicitly. The minimal case used two seed paragraphs and one append. It failed at `actual_alert_revisits=2 expected=0`, after its real-alert and output-equivalence checks passed. `check.txt` includes the complete output and exit status.

The current broken-count and suffix-length assertions belong only to confirmation mode. The desired-behavior mode can pass once alert skips the protected unchanged nodes, assuming the public trace and object-identity observation boundaries remain intact.

## Source fingerprints

`source-sha256.txt` fingerprints the installed package files used to explain and scope the observation. They are provenance evidence, not pass/fail assertions, so a changed future implementation can be evaluated with `--check`.

The npm package was executed. Upstream Git main was not built. No upstream files, fixes, PRs, comments, or pushes were made.

Absolute local directory prefixes in the logs are replaced with `<fixture>` and `<home>` for publication. Counts, errors, and exit statuses are unchanged.
