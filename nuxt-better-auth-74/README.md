# Issue #74 Reproduction

Verifies that `AuthUser` auto-includes plugin fields like `role` from `admin()`.

## Result: NOT A BUG

Plugin types ARE correctly inferred. The `role` field from admin() appears on `AuthUser`.

### Important: Config must use function syntax

```ts
// ✅ Correct - types are inferred
export default defineServerAuth(() => ({
  plugins: [admin()],
}))

// ❌ Wrong - causes type inference failure
export default defineServerAuth({
  plugins: [admin()],
})
```

## Test

```bash
pnpm install
pnpm typecheck
```

`app/test-types.ts` accesses `user.role` which compiles without error, proving the field is inferred.
