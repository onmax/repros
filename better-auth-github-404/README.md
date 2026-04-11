# better-auth GitHub 404 repro (Nuxt + Vercel)

Production URL (stable alias):

- https://maxi-better-auth-github-404.vercel.app

## What this repro is for

Diagnose cases where production GitHub OAuth shows a `404` on:

- `https://github.com/login/oauth/authorize?...`

That almost always means `client_id` is missing/invalid in the authorize URL (often caused by missing/wrong env vars in production).

## GitHub App setup

Create a new GitHub App:

- Settings page: https://github.com/settings/apps/new
- Homepage URL: `https://maxi-better-auth-github-404.vercel.app`
- Callback URL: `https://maxi-better-auth-github-404.vercel.app/api/auth/callback/github`
- Permissions:
  - Account permissions → Email addresses: Read-only

Then copy:

- Client ID → `GITHUB_CLIENT_ID`
- Client secret → `GITHUB_CLIENT_SECRET`

## Vercel env vars

These are required in Vercel (Production):

- `BETTER_AUTH_SECRET` (already set)
- `NUXT_PUBLIC_SITE_URL` = `https://maxi-better-auth-github-404.vercel.app` (already set)
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Set them:

```bash
cd /Users/maxi/repros/better-auth-github-404
vercel env add GITHUB_CLIENT_ID production
vercel env add GITHUB_CLIENT_SECRET production
vercel deploy --prod --yes
```

## Non-browser verification

Once GitHub env vars are set, this should return `200` and include a `Location:` header pointing to GitHub authorize with a non-empty `client_id`:

```bash
curl -s -D- -o /dev/null \
  -X POST "https://maxi-better-auth-github-404.vercel.app/api/auth/sign-in/social" \
  -H "content-type: application/json" \
  --data '{"provider":"github","callbackURL":"/"}'
```

