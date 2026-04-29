<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <section class="panel">
    <h2>Repro steps</h2>
    <ol>
      <li>Open <NuxtLink to="/login">/login</NuxtLink> and sign in as the seeded admin.</li>
      <li>Go to <NuxtLink to="/admin">/admin</NuxtLink> and click impersonate.</li>
      <li>You will land on <NuxtLink to="/app">/app</NuxtLink>, where two `useUserSession()` consumers remain stale.</li>
      <li>The debug panel fetches `/api/auth/get-session` directly and should show the impersonated user immediately.</li>
      <li>Click <strong>Force `fetchSession()`</strong> to prove the local state only updates after a manual refetch.</li>
    </ol>
  </section>

  <section class="panel">
    <h2>Seeded credentials</h2>
    <dl class="grid">
      <div>
        <dt>Admin email</dt>
        <dd>{{ config.public.seededAdminEmail }}</dd>
      </div>
      <div>
        <dt>Admin password</dt>
        <dd>{{ config.public.seededAdminPassword }}</dd>
      </div>
      <div>
        <dt>User email</dt>
        <dd>{{ config.public.seededUserEmail }}</dd>
      </div>
      <div>
        <dt>User password</dt>
        <dd>{{ config.public.seededUserPassword }}</dd>
      </div>
    </dl>
  </section>
</template>
