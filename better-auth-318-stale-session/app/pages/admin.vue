<script setup lang="ts">
const config = useRuntimeConfig()
const { client, user } = useUserSession()

const pending = ref(false)
const errorMessage = ref<string | null>(null)

type AdminClient = NonNullable<typeof client> & {
  admin: {
    impersonateUser: (input: { userId: string }) => Promise<unknown>
  }
}

async function impersonateSeededUser() {
  if (!client)
    return

  pending.value = true
  errorMessage.value = null
  try {
    await (client as AdminClient).admin.impersonateUser({
      userId: config.public.seededUserId,
    })
    await navigateTo('/app')
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Impersonation failed'
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="panel">
    <h2>Admin impersonation trigger</h2>
    <p>
      This page uses the same direct Better Auth client call as the playground: `client.admin.impersonateUser(...)`.
    </p>

    <dl class="grid">
      <div>
        <dt>Current reactive admin</dt>
        <dd>{{ user?.email || 'none' }}</dd>
      </div>
      <div>
        <dt>Target user id</dt>
        <dd>{{ config.public.seededUserId }}</dd>
      </div>
      <div>
        <dt>Target user email</dt>
        <dd>{{ config.public.seededUserEmail }}</dd>
      </div>
    </dl>

    <div class="actions">
      <button class="button danger" :disabled="pending" @click="impersonateSeededUser()">
        Impersonate seeded regular user
      </button>
      <NuxtLink class="button ghost" to="/app">
        Open app without impersonating
      </NuxtLink>
    </div>

    <div v-if="errorMessage" class="alert error">
      {{ errorMessage }}
    </div>
  </section>
</template>
