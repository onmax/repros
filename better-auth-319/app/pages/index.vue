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
      <li>Run <code>pnpm dev</code> and open <code>http://localhost:3019/</code>.</li>
      <li>Before the fix, the initial SSR render crashes because Pinia inspects the forwarded <code>signIn</code> object.</li>
      <li>After the fix, this page renders and shows that Pinia can read the forwarded auth actions safely.</li>
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
