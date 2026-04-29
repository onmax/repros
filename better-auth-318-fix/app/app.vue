<script setup lang="ts">
const route = useRoute()
const { user, session, loggedIn, ready, signOut } = useUserSession()
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">
          Better Auth `#318` repro
        </p>
        <h1>Session state stays stale after admin impersonation</h1>
      </div>

      <nav class="nav">
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/login">
          Login
        </NuxtLink>
        <NuxtLink to="/admin">
          Admin
        </NuxtLink>
        <NuxtLink to="/app">
          App
        </NuxtLink>
      </nav>
    </header>

    <section class="card">
      <div class="card-head">
        <h2>Consumer A: header-level `useUserSession()`</h2>
        <span :class="['badge', loggedIn ? 'ok' : 'neutral']">
          {{ ready ? 'ready' : 'loading' }}
        </span>
      </div>

      <dl class="grid">
        <div>
          <dt>Route</dt>
          <dd>{{ route.path }}</dd>
        </div>
        <div>
          <dt>Logged in</dt>
          <dd>{{ loggedIn ? 'yes' : 'no' }}</dd>
        </div>
        <div>
          <dt>Reactive user</dt>
          <dd>{{ user?.email || 'none' }}</dd>
        </div>
        <div>
          <dt>Reactive role</dt>
          <dd>{{ user?.role || 'none' }}</dd>
        </div>
        <div>
          <dt>Reactive session</dt>
          <dd>{{ session?.id || 'none' }}</dd>
        </div>
        <div>
          <dt>Impersonated by</dt>
          <dd>{{ session?.impersonatedBy || 'none' }}</dd>
        </div>
      </dl>

      <button v-if="loggedIn" class="button ghost" @click="signOut()">
        Sign out
      </button>
    </section>

    <main class="page">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
:root {
  color-scheme: light;
  --bg: #f6f3ec;
  --card: #fffdf8;
  --text: #1d1a15;
  --muted: #6f665c;
  --line: #d7cdc0;
  --accent: #0f766e;
  --accent-soft: #d7f0ec;
  --danger: #b42318;
  --danger-soft: #fde7e4;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif;
  background:
    radial-gradient(circle at top left, #efe0bd 0, transparent 32rem),
    linear-gradient(180deg, #f8f4ec 0%, #f1ebe0 100%);
  color: var(--text);
}

a {
  color: inherit;
}

button,
input,
textarea {
  font: inherit;
}

.shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.topbar,
.card,
.panel {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--card) 92%, white 8%);
  box-shadow: 0 18px 40px rgb(49 39 27 / 8%);
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  margin-bottom: 20px;
}

.topbar h1,
.card h2,
.panel h2,
.panel h3 {
  margin: 0;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

.nav {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.nav a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.nav a:hover {
  border-color: currentColor;
}

.page {
  display: grid;
  gap: 20px;
}

.card,
.panel {
  padding: 20px;
}

.card-head,
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 14px;
  margin: 16px 0 18px;
}

.grid dt,
.stack dt {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 4px;
}

.grid dd,
.stack dd {
  margin: 0;
  word-break: break-word;
}

.stack {
  display: grid;
  gap: 14px;
}

.button {
  border: 1px solid var(--text);
  background: var(--text);
  color: #fff;
  padding: 10px 14px;
  cursor: pointer;
}

.button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.button.secondary {
  background: var(--accent);
  border-color: var(--accent);
}

.button.ghost {
  color: var(--text);
  background: transparent;
}

.button.danger {
  color: #fff;
  background: var(--danger);
  border-color: var(--danger);
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.84rem;
}

.badge.ok {
  background: var(--accent-soft);
  color: var(--accent);
}

.badge.neutral {
  background: #ece6dd;
  color: var(--muted);
}

.alert {
  border: 1px solid var(--line);
  padding: 14px 16px;
  margin-top: 16px;
}

.alert.error {
  background: var(--danger-soft);
  border-color: color-mix(in srgb, var(--danger) 30%, white 70%);
}

.alert.success {
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 30%, white 70%);
}

.field {
  display: grid;
  gap: 6px;
}

.field input {
  border: 1px solid var(--line);
  background: #fff;
  padding: 10px 12px;
}

.mono {
  font-family: "SFMono-Regular", "Menlo", monospace;
  font-size: 0.92rem;
}

.pre {
  margin: 0;
  padding: 12px;
  border: 1px solid var(--line);
  background: #fcfaf5;
  overflow-x: auto;
  white-space: pre-wrap;
}

@media (max-width: 760px) {
  .topbar,
  .card-head,
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
