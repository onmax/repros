# Bug Report - PR #29 Auth Migration

## No Critical Bugs Found ✅

After reviewing the PR and creating a minimal reproduction, **no critical bugs were identified**. The migration is well-implemented.

## Minor Issues (Low Severity)

### 1. Session Refresh Workaround

**File**: `app/composables/useAuthForm.ts:73-75`

**Code**:
```typescript
// Force refresh session multiple times to ensure it's cached
await fetchSession({ force: true })
await nextTick() // Wait for reactivity
await fetchSession({ force: true })
```

**Issue**: Need to call fetchSession twice with nextTick between. Suggests potential race condition or caching issue.

**Impact**: Works but feels fragile. Could break if module timing changes.

**Suggested Investigation**: Why is one call insufficient? Is this a module bug?

### 2. Unchecked Type Cast

**File**: `app/composables/useAuth.ts:52`

**Code**:
```typescript
const role = (rawUser.value.role || 'user') as RoleName
```

**Issue**: Direct cast without validating role is valid RoleName

**Impact**: If DB contains invalid role value, could cause unexpected behavior

**Severity**: Low (unlikely scenario, 'user' fallback is safe)

**Suggested Fix**:
```typescript
const validRoles = ['user', 'founder', 'admin'] as const
const role = validRoles.includes(rawUser.value.role as RoleName)
  ? (rawUser.value.role as RoleName)
  : 'user'
```

### 3. Console.warn in Production

**File**: `app/composables/useAuthForm.ts:52, 77`

**Code**:
```typescript
console.warn('Login result:', JSON.stringify(loginResult, null, 2))
console.warn('Login successful, session refreshed, navigating to:', callbackURL.value)
```

**Issue**: Debug logs left in production code

**Impact**: Exposes auth details in browser console

**Severity**: Low (informational, but should be removed or gated with `import.meta.dev`)

**Suggested Fix**:
```typescript
if (import.meta.dev) {
  console.warn('Login result:', JSON.stringify(loginResult, null, 2))
}
```

## Observations (Not Bugs)

### Email Verification Disabled in Dev

**File**: `server/auth.config.ts:32`

```typescript
requireEmailVerification: !import.meta.dev,
```

**Rationale**: Speeds up dev workflow. Expected behavior. ✅

### Stripe Plugin Conditional

**File**: `server/auth.config.ts:105-121`

```typescript
...(stripeClient ? [stripePlugin({ ... })] : [])
```

**Rationale**: Only load if Stripe configured. Prevents build errors. ✅

### Admin Role Auto-Assignment

**File**: `server/auth.config.ts:126-130`

```typescript
const admins = config.admins as string[]
if (admins.includes(user.email))
  return { data: { ...user, role: 'admin' } }
```

**Rationale**: Hardcoded admin emails get admin role on signup. Consider documenting this security implication. ✅

## Testing Limitations

**Cannot verify without running app:**
- Actual login/logout flows
- Session persistence across requests
- Route protection enforcement
- Stripe webhook handling
- Email sending

**Recommendation**: Deploy to staging and test manually

## Summary

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 0 | None found |
| High | 0 | None found |
| Medium | 0 | None found |
| Low | 3 | Minor code quality issues |

## Verdict

✅ **Safe to merge** with awareness of:
1. Session refresh pattern needs monitoring
2. Remove console.warn before production deploy
3. Test manually before going live

All issues are code quality improvements, not blockers.
