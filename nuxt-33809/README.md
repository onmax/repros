# Bug Reproduction: #33809

**Issue:** Client component with nuxt-client duplicated when navigating back to server page

## Problem

When using a server page (`*.server.vue`) with `experimental.componentIslands.selectiveClient: "deep"` and a client component via `nuxt-client` directive:

1. Visit the home page (/) - LikeButton works
2. Navigate to About (/about)
3. Navigate back to Home
4. **Bug:** TWO LikeButton components appear - one interactive, one not

## Steps to Reproduce

```bash
pnpm install
pnpm dev
```

1. Open http://localhost:3000
2. Click "Like" button - works
3. Click "About" link
4. Click "Home" link
5. **See two Like buttons**

## Expected

Only ONE Like button should appear after navigation.
