<script setup lang="ts">
defineProps<{
  title: string
}>()

const { user, session, loggedIn, ready } = useUserSession()
</script>

<template>
  <section class="panel">
    <div class="card-head">
      <h2>{{ title }}</h2>
      <span :class="['badge', loggedIn ? 'ok' : 'neutral']">
        {{ ready ? 'reactive ready' : 'resolving' }}
      </span>
    </div>

    <dl class="grid">
      <div>
        <dt>User id</dt>
        <dd>{{ user?.id || 'none' }}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>{{ user?.email || 'none' }}</dd>
      </div>
      <div>
        <dt>Role</dt>
        <dd>{{ user?.role || 'none' }}</dd>
      </div>
      <div>
        <dt>Session id</dt>
        <dd>{{ session?.id || 'none' }}</dd>
      </div>
      <div>
        <dt>Impersonated by</dt>
        <dd>{{ session?.impersonatedBy || 'none' }}</dd>
      </div>
      <div>
        <dt>Expires</dt>
        <dd>{{ session?.expiresAt || 'none' }}</dd>
      </div>
    </dl>
  </section>
</template>
