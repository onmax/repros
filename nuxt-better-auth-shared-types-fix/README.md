# nuxt-better-auth-shared-types-fix

Issue: none

## Problem
Better Auth plugin and config augmentations are generated for the main Nuxt type context, but not for Nuxt's shared type context.

This means a file under `shared/` cannot see `AuthUser.role`, `AuthUser.internalCode`, `AuthSession.workspaceId`, or configured social provider ids.

## Verify
```bash
pnpm i && pnpm typecheck
```

## Expected
The shared file typechecks with auth user, session, and social provider augmentations.

## Actual
Without the patch, TypeScript reports that the generated auth fields do not exist in `shared/`, and the social provider id resolves to `never`.

## Fix
The patch adds the generated Better Auth user/session and social-provider augmentation templates to Nuxt's shared type references.
