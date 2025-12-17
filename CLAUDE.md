# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Repository for bug reproductions across Nuxt ecosystem libraries. Each subdirectory is a minimal project demonstrating a specific issue.

## Related Libraries

Source code for maintained libraries lives in `~/nuxt/`:
- `~/nuxt/content` - Nuxt Content
- `~/nuxt/hub` - NuxtHub
- etc.

## Skills

Use the `vue`, `nuxt`, and `nuxthub` skills when working in this repo.

---

## Bug Reproduction Workflow

### 1. Folder Naming

- Bug folder: `{library}-{issue-number}` (e.g., `nuxthub-727`)
- Fix folder: `{library}-{issue-number}-fixed` (e.g., `nuxthub-727-fixed`)

### 2. Create Bug Reproduction

1. Create minimal project reproducing the issue
2. Include only what's necessary to demonstrate the bug
3. Add README.md explaining:
   - Link to original issue
   - What the bug is
   - How to verify it (command to run, file to check, expected vs actual)

### 3. Verify the Bug

Verification can be:
- **Generated files**: Check `.nuxt/`, `dist/`, or build output
- **Runtime behavior**: Run dev server and observe error
- **Test failure**: Write a test that fails (if repo has tests, this is preferred)
- **Type error**: Check IDE/tsc output

Document the verification method in README.

**Note**: If the target repo has existing tests, try to reproduce the bug with a test first. This helps maintainers and ensures the fix is properly validated.

### 4. Create Fix Folder

1. Copy bug folder to `-fixed` version
2. Create pnpm patch: `pnpm patch {package}`
3. Apply fix to extracted package
4. Commit patch: `pnpm patch-commit {path}`
5. Verify fix using same method as bug verification

### 5. README Structure

Each repro folder README should contain:

```md
# {library}-{issue-number}

Issue: {link-to-github-issue}

## Problem
{Brief description}

## Verify
{Commands to reproduce/verify the issue}

## Expected
{What should happen}

## Actual
{What actually happens}
```

For `-fixed` folders, add:

```md
## Fix
{What the patch changes}
```

### 6. Push to Repository

```bash
cd ~/repros
git add {folder-name} {folder-name}-fixed
git commit -m "add {library}-{issue} repro"
git push
```

---

## Pull Request Workflow

### 1. Before Creating PR

- Explore existing PRs/commits to match repo's style
- Check commit message conventions
- Look at PR description format

### 2. Apply Fix to Source

1. Create branch: `fix/{short-description}`
2. Apply changes from patch to actual source files
3. **Match existing code style and patterns** in the project
4. If tests exist, consider adding a test reproducing the bug (helpful but not mandatory)
5. Run tests: ensure all pass
6. Build: ensure it compiles

### 3. PR Body Structure

```md
Fixes #{issue-number}

## Problem
{1-2 sentences explaining the bug}

## Reproduction
{Sparse checkout commands to clone repro folder}

## Verify fix
{Commands to verify with -fixed folder}

The `-fixed` folder includes a pnpm patch with the fix.
```

### 4. Commit Message

- Follow repo conventions (check recent commits)
- Common format: `{type}({scope}): {description}`
- Examples: `fix(db): pass mode to drizzle for mysql`

### 5. After PR Submission

- Wait for CI to pass
- Address any failing checks before requesting review
- If CI fails, fix and push to same branch

---

## Quick Reference Commands

```bash
# Create pnpm patch
pnpm patch {package}
pnpm patch-commit '{extracted-path}'

# Sparse checkout for repro
git clone --depth 1 --filter=blob:none --sparse https://github.com/onmax/repros.git
cd repros && git sparse-checkout set {folder-name}

# Create PR
gh pr create --repo {org}/{repo} --title "{title}" --body "{body}"
```
