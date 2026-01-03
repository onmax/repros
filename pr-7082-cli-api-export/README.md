# PR #7082 - CLI /api Subpath Export Test

Reproduction test for Better Auth PR #7082 that adds `/api` subpath exports for schema generators.

## What's Being Tested

The PR adds a new `/api` subpath to `@better-auth/cli` that exports:

### Functions
- `generateDrizzleSchema` - Generate Drizzle ORM schema
- `generatePrismaSchema` - Generate Prisma schema
- `generateKyselySchema` - Generate Kysely schema
- `generateSchema` - Generic schema generator
- `adapters` - Object containing all adapter generators

### Types
- `SchemaGenerator` - Function signature for schema generators
- `SchemaGeneratorResult` - Return type of schema generators
- `DBAdapter` - Database adapter type from `@better-auth/core/db/adapter`

## Setup

```bash
pnpm install
```

This will install `@better-auth/cli` from the local checkout at `~/references/better-auth/packages/cli`.

## Run Tests

```bash
pnpm test
```

## Expected Behavior

All tests should pass, verifying:
1. The `/api` subpath can be imported
2. All schema generator functions are exported as functions
3. The adapters object contains all three generators
4. No undefined exports pollute the namespace
5. package.json has correct exports configuration
