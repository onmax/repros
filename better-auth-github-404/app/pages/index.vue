<script setup lang="ts">
const route = useRoute()
const { ready, loggedIn, user, signOut } = useUserSession()

const error = computed(() => {
  const v = route.query.error
  return typeof v === 'string' ? v : ''
})
</script>

<template>
  <main class="container">
    <h1>better-auth GitHub 404 repro</h1>

    <div v-if="error" class="alert">
      <div class="label">
        Auth error
      </div>
      <div class="mono">
        {{ error }}
      </div>
      <p class="muted small">
        This comes from <span class="mono">/api/auth/error</span> redirecting to <span class="mono">/?error=...</span>.
        Common GitHub App causes: missing "Email addresses: Read-only" permission or callback URL mismatch.
      </p>
      <NuxtLink class="link" to="/">
        Clear error
      </NuxtLink>
    </div>

    <p v-if="!ready" class="muted">
      Loading session...
    </p>

    <template v-else>
      <p class="muted">
        logged in: <strong>{{ loggedIn }}</strong>
      </p>

      <div v-if="loggedIn" class="card">
        <div class="row">
          <div>
            <div class="label">
              User
            </div>
            <div class="mono">
              {{ user?.email || user?.name || user?.id }}
            </div>
          </div>
          <button class="btn" type="button" @click="signOut({ onSuccess: () => navigateTo('/') })">
            Sign out
          </button>
        </div>
      </div>

      <div v-else class="card">
        <div class="row">
          <div>
            <div class="label">
              Status
            </div>
            <div class="mono">
              Guest
            </div>
          </div>
          <NuxtLink class="btn" to="/login">
            Continue with GitHub
          </NuxtLink>
        </div>
      </div>
    </template>

    <details class="details">
      <summary>Expected callback URL</summary>
      <p class="mono">
        {{ (useRuntimeConfig().public.siteUrl || '(unset)') + '/api/auth/callback/github' }}
      </p>
      <p class="muted">
        Ensure your GitHub App callback URL matches exactly.
      </p>
    </details>
  </main>
</template>

<style scoped>
.container {
  max-width: 720px;
  padding: 32px 20px;
  margin: 0 auto;
}
.muted {
  color: #555;
}
.small {
  font-size: 12px;
}
.alert {
  margin: 14px 0 10px;
  border: 1px solid #f1c6c6;
  background: #fff7f7;
  border-radius: 10px;
  padding: 12px;
}
.card {
  margin-top: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 14px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.label {
  font-size: 12px;
  color: #666;
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.link {
  display: inline-block;
  margin-top: 6px;
  color: #111;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border: 1px solid #111;
  border-radius: 10px;
  background: #111;
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}
.btn:hover {
  background: #000;
}
.details {
  margin-top: 16px;
}
</style>
