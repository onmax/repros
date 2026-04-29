import { createAuthClient } from 'better-auth/client'
import { adminClient } from 'better-auth/client/plugins'

import './style.css'

const client = createAuthClient({
  plugins: [adminClient()],
})

type SessionAtomValue = ReturnType<typeof client.useSession.get>

const app = document.querySelector<HTMLDivElement>('#app')

if (!app)
  throw new Error('Missing #app root')

const state: {
  status: string
  reactive: SessionAtomValue
  fresh: Awaited<ReturnType<typeof client.getSession>> | null
} = {
  status: 'Waiting for session state...',
  reactive: client.useSession.get(),
  fresh: null,
}

function readReactiveEmail() {
  return state.reactive.data?.user?.email ?? 'none'
}

function readFreshEmail() {
  return state.fresh?.data?.user?.email ?? 'none'
}

function readReactiveImpersonatedBy() {
  return state.reactive.data?.session?.impersonatedBy ?? 'none'
}

function readFreshImpersonatedBy() {
  return state.fresh?.data?.session?.impersonatedBy ?? 'none'
}

function render() {
  const reactiveEmail = readReactiveEmail()
  const freshEmail = readFreshEmail()
  const mismatch = reactiveEmail !== 'none' && freshEmail !== 'none' && reactiveEmail !== freshEmail

  app!.innerHTML = `
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">better-auth #9401 upstream repro</p>
        <h1>Impersonation does not invalidate <code>useSession</code></h1>
        <p class="lede">
          This app uses only Better Auth <code>1.6.9</code>, the vanilla client, and the admin plugin.
        </p>
      </section>

      <section class="panel actions">
        <button data-testid="sign-in-admin">Sign in as seeded admin</button>
        <button data-testid="impersonate-user">Impersonate seeded user</button>
        <button data-testid="refresh-fresh">Refresh fresh getSession()</button>
        <button data-testid="force-refetch">Force useSession refetch()</button>
        <button data-testid="sign-out">Sign out</button>
        <p class="status">${escapeHtml(state.status)}</p>
      </section>

      <section class="panel banner ${mismatch ? 'error' : 'ok'}" data-testid="mismatch-banner">
        ${mismatch
          ? `Mismatch reproduced: reactive <code>useSession</code> is still ${escapeHtml(reactiveEmail)} while fresh <code>getSession()</code> is ${escapeHtml(freshEmail)}.`
          : 'Reactive and fresh session state currently match.'}
      </section>

      <section class="grid">
        <article class="panel" data-testid="consumer-a">
          <h2>Reactive consumer A</h2>
          <dl>
            <dt>Email</dt>
            <dd data-testid="reactive-email-a">${escapeHtml(reactiveEmail)}</dd>
            <dt>Impersonated By</dt>
            <dd>${escapeHtml(readReactiveImpersonatedBy())}</dd>
            <dt>Pending</dt>
            <dd>${String(state.reactive.isPending)}</dd>
          </dl>
        </article>

        <article class="panel" data-testid="consumer-b">
          <h2>Reactive consumer B</h2>
          <pre>${escapeHtml(JSON.stringify(state.reactive.data, null, 2) || 'null')}</pre>
        </article>
      </section>

      <section class="grid">
        <article class="panel" data-testid="fresh-session">
          <h2>Fresh getSession()</h2>
          <dl>
            <dt>Email</dt>
            <dd data-testid="fresh-email">${escapeHtml(freshEmail)}</dd>
            <dt>Impersonated By</dt>
            <dd>${escapeHtml(readFreshImpersonatedBy())}</dd>
          </dl>
        </article>

        <article class="panel">
          <h2>Fresh payload</h2>
          <pre>${escapeHtml(JSON.stringify(state.fresh, null, 2) || 'null')}</pre>
        </article>
      </section>

      <section class="panel steps">
        <h2>Expected repro flow</h2>
        <ol>
          <li>Sign in as <code>admin318@example.com</code>.</li>
          <li>Click impersonate.</li>
          <li>Fresh <code>getSession()</code> should switch to <code>user318@example.com</code>.</li>
          <li>Reactive <code>useSession</code> should stay stale until <code>refetch()</code>.</li>
        </ol>
      </section>
    </main>
  `

  bindActions()
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

async function refreshFreshSession() {
  state.fresh = await client.getSession()
}

async function signInAsAdmin() {
  state.status = 'Signing in as the seeded admin...'
  render()

  await client.signIn.email({
    email: 'admin318@example.com',
    password: 'password123',
  })

  await state.reactive.refetch()
  state.status = 'Signed in as admin.'
  await refreshFreshSession()
  render()
}

async function impersonateSeededUser() {
  state.status = 'Finding the seeded user and calling admin.impersonateUser(...)...'
  render()

  const usersResult = await client.admin.listUsers({
    query: {
      limit: 10,
    },
  })

  const users = usersResult.data?.users ?? []
  const target = users.find(user => user.email === 'user318@example.com')

  if (!target)
    throw new Error('Seeded user not found')

  await client.admin.impersonateUser({
    userId: target.id,
  })

  state.status = 'Impersonation request completed. Refreshing only the fresh getSession() panel...'
  await refreshFreshSession()
  render()
}

async function forceRefetch() {
  state.status = 'Forcing useSession.refetch()...'
  render()

  await state.reactive.refetch()
  await refreshFreshSession()
  state.status = 'Reactive session refetched.'
  render()
}

async function signOut() {
  state.status = 'Signing out...'
  render()

  await client.signOut()
  await refreshFreshSession()
  state.status = 'Signed out.'
  render()
}

function bindActions() {
  document.querySelector<HTMLButtonElement>('[data-testid="sign-in-admin"]')?.addEventListener('click', () => {
    void runAction(signInAsAdmin)
  }, { once: true })

  document.querySelector<HTMLButtonElement>('[data-testid="impersonate-user"]')?.addEventListener('click', () => {
    void runAction(impersonateSeededUser)
  }, { once: true })

  document.querySelector<HTMLButtonElement>('[data-testid="refresh-fresh"]')?.addEventListener('click', () => {
    void runAction(async () => {
      state.status = 'Refreshing fresh getSession()...'
      render()
      await refreshFreshSession()
      state.status = 'Fresh getSession() refreshed.'
      render()
    })
  }, { once: true })

  document.querySelector<HTMLButtonElement>('[data-testid="force-refetch"]')?.addEventListener('click', () => {
    void runAction(forceRefetch)
  }, { once: true })

  document.querySelector<HTMLButtonElement>('[data-testid="sign-out"]')?.addEventListener('click', () => {
    void runAction(signOut)
  }, { once: true })
}

async function runAction(action: () => Promise<void>) {
  try {
    await action()
  }
  catch (error) {
    state.status = error instanceof Error ? error.message : String(error)
    render()
  }
}

client.useSession.subscribe((value) => {
  state.reactive = value
  render()
})

void refreshFreshSession().then(() => {
  state.status = 'Ready.'
  render()
})
