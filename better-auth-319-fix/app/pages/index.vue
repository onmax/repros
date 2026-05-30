<script setup lang="ts">
const userStore = useUserStore()
const signInLooksLikeRef = isRef(userStore.signIn)
const signUpLooksLikeRef = isRef(userStore.signUp)
const emailSignInType = typeof userStore.signIn.email
const emailSignUpType = typeof userStore.signUp.email
</script>

<template>
  <section class="panel">
    <h2>Repro steps</h2>
    <ol>
      <li>Run <code>pnpm dev</code> and open <code>http://localhost:3020/</code>.</li>
      <li>This fix folder applies a <code>pnpm patch</code> to <code>@onmax/nuxt-better-auth</code> and runs on <code>http://localhost:3020/</code>.</li>
      <li>The page should render on first load even though Pinia inspects the forwarded <code>signIn</code> object during SSR.</li>
      <li>The output below proves the forwarded auth actions remain present without being treated as refs.</li>
    </ol>
  </section>

  <section class="panel">
    <h2>Forwarded store state</h2>
    <dl class="grid">
      <div>
        <dt>`signIn` is ref</dt>
        <dd>{{ signInLooksLikeRef ? 'yes' : 'no' }}</dd>
      </div>
      <div>
        <dt>`signUp` is ref</dt>
        <dd>{{ signUpLooksLikeRef ? 'yes' : 'no' }}</dd>
      </div>
      <div>
        <dt>`signIn.email` type</dt>
        <dd>{{ emailSignInType }}</dd>
      </div>
      <div>
        <dt>`signUp.email` type</dt>
        <dd>{{ emailSignUpType }}</dd>
      </div>
      <div>
        <dt>Reactive user</dt>
        <dd>{{ userStore.user?.email || 'none' }}</dd>
      </div>
    </dl>
  </section>
</template>
