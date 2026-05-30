<script setup lang="ts">
const { loggedIn, signIn } = useUserSession()
const config = useRuntimeConfig()

const pending = ref(false)
const errorMessage = ref<string | null>(null)
const form = reactive({
  email: config.public.seededAdminEmail,
  password: config.public.seededAdminPassword,
})

async function loginAs(email: string, password: string, destination: string) {
  pending.value = true
  errorMessage.value = null
  try {
    await signIn.email(
      { email, password },
      { onSuccess: () => navigateTo(destination) },
    )
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Sign-in failed'
  }
  finally {
    pending.value = false
  }
}

async function submit() {
  await loginAs(form.email, form.password, form.email === config.public.seededAdminEmail ? '/admin' : '/app')
}
</script>

<template>
  <section class="panel">
    <div class="card-head">
      <h2>Sign in</h2>
      <span :class="['badge', loggedIn ? 'ok' : 'neutral']">
        {{ loggedIn ? 'already logged in' : 'signed out' }}
      </span>
    </div>

    <p>
      The default form is prefilled with the seeded admin so the repro path takes one click.
    </p>

    <form class="stack" @submit.prevent="submit">
      <label class="field">
        <span>Email</span>
        <input v-model="form.email" autocomplete="username" />
      </label>
      <label class="field">
        <span>Password</span>
        <input v-model="form.password" type="password" autocomplete="current-password" />
      </label>
      <div class="actions">
        <button class="button" :disabled="pending" type="submit">
          Sign in with form
        </button>
        <button
          class="button secondary"
          :disabled="pending"
          type="button"
          @click="loginAs(config.public.seededAdminEmail, config.public.seededAdminPassword, '/admin')"
        >
          Quick sign in as admin
        </button>
        <button
          class="button ghost"
          :disabled="pending"
          type="button"
          @click="loginAs(config.public.seededUserEmail, config.public.seededUserPassword, '/app')"
        >
          Quick sign in as user
        </button>
      </div>
    </form>

    <div v-if="errorMessage" class="alert error">
      {{ errorMessage }}
    </div>
  </section>
</template>
