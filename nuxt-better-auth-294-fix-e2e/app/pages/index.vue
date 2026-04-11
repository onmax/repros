<script setup lang="ts">
const form = reactive({
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'demo-password-123',
})

const dbResult = shallowRef<unknown>(null)
const authResult = shallowRef<unknown>(null)
const actionError = ref('')
const actionPending = ref(false)

const { loggedIn, ready, session, signIn, signOut, signUp, fetchSession, user } = useUserSession()

function toMessage(error: unknown): string {
  if (error instanceof Error)
    return error.message
  return typeof error === 'string' ? error : JSON.stringify(error, null, 2)
}

async function refreshDbCheck() {
  dbResult.value = await $fetch('/api/db-check')
}

async function refreshAuthCheck() {
  authResult.value = await $fetch('/api/auth-check')
}

async function runAction(action: () => Promise<void>) {
  actionPending.value = true
  actionError.value = ''

  try {
    await action()
    await Promise.all([
      fetchSession({ force: true }),
      refreshAuthCheck(),
    ])
  }
  catch (error) {
    actionError.value = toMessage(error)
  }
  finally {
    actionPending.value = false
  }
}

await Promise.all([
  refreshDbCheck().catch((error) => {
    dbResult.value = { ok: false, error: toMessage(error) }
  }),
  refreshAuthCheck().catch((error) => {
    authResult.value = { ok: false, error: toMessage(error) }
  }),
])
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">
        NuxtHub 0.10 + Hyperdrive + Better Auth
      </p>
      <h1>Worker-focused repro for PostgreSQL over Hyperdrive</h1>
      <p class="lede">
        Local dev uses <code>DATABASE_URL</code>. Production should resolve the Cloudflare <code>POSTGRES</code> Hyperdrive binding generated from <code>HYPERDRIVE_ID</code>.
      </p>
    </section>

    <section class="grid">
      <article class="card">
        <h2>Auth Flow</h2>
        <label>
          <span>Name</span>
          <input v-model="form.name" autocomplete="name">
        </label>
        <label>
          <span>Email</span>
          <input v-model="form.email" autocomplete="email" type="email">
        </label>
        <label>
          <span>Password</span>
          <input v-model="form.password" autocomplete="current-password" type="password">
        </label>

        <div class="actions">
          <button :disabled="actionPending" @click="runAction(async () => { await signUp.email({ ...form }) })">
            Sign up
          </button>
          <button :disabled="actionPending" @click="runAction(async () => { await signIn.email({ email: form.email, password: form.password }) })">
            Sign in
          </button>
          <button :disabled="actionPending" class="secondary" @click="runAction(async () => { await signOut() })">
            Sign out
          </button>
        </div>

        <div class="actions">
          <button class="secondary" @click="refreshAuthCheck()">
            Refresh Auth Check
          </button>
          <button class="secondary" @click="fetchSession({ force: true })">
            Refresh Client Session
          </button>
        </div>

        <p v-if="actionError" class="error">
          {{ actionError }}
        </p>
      </article>

      <article class="card">
        <h2>Client Session</h2>
        <p><strong>Ready:</strong> {{ ready }}</p>
        <p><strong>Logged in:</strong> {{ loggedIn }}</p>
        <pre>{{ JSON.stringify({ user, session }, null, 2) }}</pre>
      </article>

      <article class="card">
        <div class="card-header">
          <h2>Direct DB Check</h2>
          <button class="secondary" @click="refreshDbCheck()">
            Refresh
          </button>
        </div>
        <pre>{{ JSON.stringify(dbResult, null, 2) }}</pre>
      </article>

      <article class="card">
        <div class="card-header">
          <h2>Server Auth Check</h2>
          <button class="secondary" @click="refreshAuthCheck()">
            Refresh
          </button>
        </div>
        <pre>{{ JSON.stringify(authResult, null, 2) }}</pre>
      </article>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 3rem 1.25rem 4rem;
  background:
    radial-gradient(circle at top left, rgba(18, 102, 255, 0.18), transparent 28rem),
    radial-gradient(circle at top right, rgba(10, 179, 156, 0.18), transparent 26rem),
    linear-gradient(180deg, #09111f 0%, #111a2b 100%);
  color: #e8edf7;
}

.hero,
.grid {
  width: min(1100px, 100%);
  margin: 0 auto;
}

.hero {
  margin-bottom: 2rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #7dd3fc;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  max-width: 12ch;
  font-size: clamp(2.2rem, 7vw, 4.75rem);
  line-height: 0.95;
}

.lede {
  max-width: 58rem;
  margin: 1rem 0 0;
  color: #b8c3d9;
  font-size: 1.05rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 1.25rem;
  padding: 1.1rem;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.24);
}

.card-header,
.actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.actions {
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1rem;
}

h2 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
}

label {
  display: grid;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

span {
  color: #9fb0d1;
  font-size: 0.92rem;
}

input,
button {
  border-radius: 0.9rem;
  font: inherit;
}

input {
  border: 1px solid rgba(148, 163, 184, 0.22);
  padding: 0.8rem 0.9rem;
  background: rgba(15, 23, 42, 0.95);
  color: inherit;
}

button {
  border: 0;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #22c55e, #14b8a6);
  color: #04111f;
  font-weight: 700;
  cursor: pointer;
}

button.secondary {
  background: rgba(148, 163, 184, 0.14);
  color: #e8edf7;
}

button:disabled {
  opacity: 0.55;
  cursor: wait;
}

pre {
  overflow: auto;
  margin: 0.75rem 0 0;
  border-radius: 1rem;
  padding: 0.9rem;
  background: rgba(2, 6, 23, 0.72);
  color: #c8f9ef;
  font-size: 0.85rem;
}

.error {
  margin: 1rem 0 0;
  color: #fca5a5;
  white-space: pre-wrap;
}

code {
  color: #c8f9ef;
}

@media (max-width: 640px) {
  .page {
    padding-inline: 0.85rem;
  }

  .card-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
