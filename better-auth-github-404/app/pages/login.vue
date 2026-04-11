<script setup lang="ts">
definePageMeta({ auth: 'guest' })

const route = useRoute()
const { signIn } = useUserSession()
const error = ref('')
const loading = ref(false)

onMounted(() => {
  const q = route.query.error
  if (typeof q === 'string' && q)
    error.value = q
})

async function onGitHub() {
  error.value = ''
  loading.value = true
  try {
    await signIn.social({ provider: 'github', callbackURL: '/' })
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Failed to start GitHub sign-in'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container">
    <h1>Sign in</h1>

    <p class="muted">
      If you hit a GitHub 404 on authorize, check the generated <code>client_id</code>.
    </p>

    <div class="card">
      <button class="btn" type="button" :disabled="loading" @click="onGitHub">
        {{ loading ? 'Redirecting...' : 'Continue with GitHub' }}
      </button>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <p class="muted small">
        Callback configured as:
        <span class="mono">{{ (useRuntimeConfig().public.siteUrl || '(unset)') + '/api/auth/callback/github' }}</span>
      </p>
    </div>

    <p class="muted small">
      <NuxtLink to="/">Back</NuxtLink>
    </p>
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
.card {
  margin-top: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 14px;
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
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
  cursor: pointer;
  font-size: 14px;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  margin-top: 10px;
  color: #b00020;
}
</style>
