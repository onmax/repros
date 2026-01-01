# Formula 100 PR #29 Bug Reproduction

Bug reproduction for feat/nuxt-better-auth-migration PR.

## Confirmed Bugs (95%+ confidence)

### BUG #1: Missing `db` import in guest-session endpoint ⚠️ CRITICAL
**Files:** `server/api/founder/guest-session.post.ts:9`
**Issue:** Uses `db.$count(tables.founders)` without importing `db`
**Expected:** `import { db } from 'hub:db'` at top of file
**Impact:** Runtime error: `ReferenceError: db is not defined`
**Severity:** HIGH - breaks founder checkout flow

### BUG #2: Missing `db` import in query files ⚠️ CRITICAL
**Files:**
- `server/db/queries/founders.ts:4`
- `server/db/queries/waitlist-users.ts:5,9`
- `server/db/queries/courses.ts:4,8,15,22,28`
- `server/db/queries/srs.ts:4,29,31,34`

**Issue:** All query files use `db` without importing it
**Expected:** `import { db } from 'hub:db'` in each file
**Impact:** Runtime error on any DB query
**Severity:** HIGH - breaks all database operations

### BUG #3: Missing `db` import in export endpoint ⚠️ CRITICAL
**Files:** `server/api/admin/export-data.get.ts:16`
**Issue:** Uses `db.select()` without importing `db`
**Expected:** `import { db } from 'hub:db'`
**Impact:** Runtime error in admin export
**Severity:** MEDIUM - admin-only feature

### BUG #4: Missing `stripeCustomerId` in user schema 🔍 NEEDS VERIFICATION
**Files:**
- `server/auth.config.ts:192` (sets field)
- `server/api/admin/export-data.get.ts:33` (reads field)
- `.nuxt/better-auth/schema.sqlite.ts` (missing field)

**Issue:** Generated better-auth schema missing `stripeCustomerId` field that stripe plugin should add
**Expected:** Stripe plugin should extend user table with `stripeCustomerId`
**Impact:** Database error when setting/reading stripeCustomerId
**Severity:** HIGH - breaks founder payment flow
**Note:** May be build timing issue. Need to verify if field appears after clean build.

### BUG #5: Email template not using runtime config props
**Files:** `server/auth.config.ts:210`
**Issue:** Only passes `recipientEmail` and `recipientName` to founder email template, but template now expects `logoUrl`, `baseUrl`, `appName`, `appDescription`
**Expected:** Pass all config props from runtime config
**Impact:** Email uses hardcoded defaults instead of runtime config
**Severity:** LOW - has fallback defaults, just not using new pattern

### BUG #6: Incorrect import path in seed plugin ⚠️ CRITICAL
**Files:** `server/plugins/seed.ts:1`
**Issue:** Imports from old `../database/seed/auth.dev` but file moved to `../db/seed/auth.dev`
**Expected:** `import { seedDevUsers } from '../db/seed/auth.dev'`
**Impact:** Runtime error: Module not found on dev server startup
**Severity:** HIGH - dev seeding completely broken

## Verified Working (not bugs)

### ✓ `requireUserSession` role checking
**Status:** WORKS CORRECTLY
`requireUserSession(event, { user: { role: 'admin' } })` is valid API per @onmax/nuxt-better-auth module

### ✓ `schema.user` availability
**Status:** WORKS CORRECTLY
Schema is properly exported from `hub:db` with better-auth tables merged in

## Test Plan

1. Install deps: `pnpm install`
2. Try accessing founder checkout: Visit site → Click "Become a Founder" → Should crash
3. Try waitlist signup: Should crash when inserting to DB
4. Try admin export: Should crash when querying users

## Expected Failures

- `ReferenceError: db is not defined` in multiple endpoints
- Database errors for stripeCustomerId (if BUG #4 confirmed)
- Founder payment flow broken end-to-end

## Fixes Required

### Critical (blocks deployment):

1. **Fix seed plugin import path:**
   ```ts
   // server/plugins/seed.ts
   - import { seedDevUsers } from '../database/seed/auth.dev'
   + import { seedDevUsers } from '../db/seed/auth.dev'
   ```

2. **Add `import { db } from 'hub:db'` to 6 files:**
   - `server/api/founder/guest-session.post.ts`
   - `server/api/admin/export-data.get.ts`
   - `server/db/queries/founders.ts`
   - `server/db/queries/waitlist-users.ts`
   - `server/db/queries/courses.ts`
   - `server/db/queries/srs.ts`

3. **Verify stripeCustomerId field:** Clean build + check if field appears in `.nuxt/better-auth/schema.sqlite.ts`. If missing, investigate stripe plugin schema extension.

### Optional (improves code quality):

3. **Update email render calls:** Pass runtime config props:
   ```ts
   const html = await render(FounderWelcome, {
     recipientEmail: email,
     recipientName: name,
     logoUrl: config.public.logoUrl,
     baseUrl: config.public.baseUrl,
     appName: config.public.appName,
     appDescription: config.public.appDescription,
   })
   ```
