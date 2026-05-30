<script setup lang="ts">
const { user, session, fetchSession } = useUserSession()

const freshPayload = ref<any>(null)
const refreshError = ref<string | null>(null)
const loading = ref(false)
const checkedAt = ref<string | null>(null)

const reactiveUserId = computed(() => user.value?.id || null)
const freshUserId = computed(() => freshPayload.value?.user?.id || null)
const reactiveSnapshot = computed(() => ({
  user: user.value,
  session: session.value,
}))
const mismatch = computed(() => {
  if (!freshPayload.value)
    return false
  return reactiveUserId.value !== freshUserId.value
})

async function refreshFreshSession() {
  loading.value = true
  refreshError.value = null
  try {
    freshPayload.value = await $fetch('/api/auth/get-session', {
      credentials: 'include',
    })
    checkedAt.value = new Date().toISOString()
  }
  catch (error) {
    refreshError.value = error instanceof Error ? error.message : 'Failed to fetch /api/auth/get-session'
  }
  finally {
    loading.value = false
  }
}

async function syncReactiveState() {
  await fetchSession({ force: true })
  await refreshFreshSession()
}

onMounted(refreshFreshSession)
</script>

<template>
  <section class="panel">
    <div class="card-head">
      <h2>Debug panel: reactive state vs fresh server session</h2>
      <div class="actions">
        <button class="button ghost" :disabled="loading" @click="refreshFreshSession()">
          Refresh fresh session
        </button>
        <button class="button secondary" :disabled="loading" @click="syncReactiveState()">
          Force `fetchSession()`
        </button>
      </div>
    </div>

    <div v-if="mismatch" class="alert error">
      The repro is active: `useUserSession()` still points at
      <strong>{{ reactiveUserId }}</strong>
      while a fresh `/api/auth/get-session` fetch returns
      <strong>{{ freshUserId }}</strong>.
    </div>

    <div v-else-if="freshPayload" class="alert success">
      Reactive state and a fresh session fetch currently match.
    </div>

    <div v-if="refreshError" class="alert error">
      {{ refreshError }}
    </div>

    <p v-if="checkedAt" class="eyebrow">
      Last fresh fetch: {{ checkedAt }}
    </p>

    <div class="grid">
      <div>
        <dt>Reactive email</dt>
        <dd>{{ user?.email || 'none' }}</dd>
      </div>
      <div>
        <dt>Fresh email</dt>
        <dd>{{ freshPayload?.user?.email || 'none' }}</dd>
      </div>
      <div>
        <dt>Reactive impersonatedBy</dt>
        <dd>{{ session?.impersonatedBy || 'none' }}</dd>
      </div>
      <div>
        <dt>Fresh impersonatedBy</dt>
        <dd>{{ freshPayload?.session?.impersonatedBy || 'none' }}</dd>
      </div>
    </div>

    <div class="stack">
      <div>
        <dt>Reactive snapshot</dt>
        <dd>
          <pre class="pre mono">{{ JSON.stringify(reactiveSnapshot, null, 2) }}</pre>
        </dd>
      </div>
      <div>
        <dt>Fresh `/api/auth/get-session`</dt>
        <dd>
          <pre class="pre mono">{{ JSON.stringify(freshPayload, null, 2) }}</pre>
        </dd>
      </div>
    </div>
  </section>
</template>
