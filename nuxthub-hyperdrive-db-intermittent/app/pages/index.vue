<script setup lang="ts">
const attempts = ref(5)
const pending = ref(false)
const lastResult = shallowRef<unknown>(null)
const runResults = shallowRef<Array<{ index: number, ok: boolean, value: unknown }>>([])

async function runOnce(index: number) {
  try {
    const value = await $fetch('/api/db-check')
    return { index, ok: true, value }
  }
  catch (error) {
    return { index, ok: false, value: error }
  }
}

async function runMany() {
  pending.value = true
  runResults.value = []

  try {
    const count = Math.max(1, attempts.value)
    const results = []
    for (let index = 1; index <= count; index++)
      results.push(await runOnce(index))
    runResults.value = results
    lastResult.value = results.at(-1)?.value ?? null
  }
  finally {
    pending.value = false
  }
}

await runMany()
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">
        Minimal NuxtHub + Hyperdrive repro
      </p>
      <h1>Raw <code>@nuxthub/db</code> over Hyperdrive</h1>
      <p class="lede">
        This repro intentionally avoids Better Auth. It only calls a single endpoint backed by <code>@nuxthub/db</code> so intermittent Hyperdrive failures can be tested in isolation.
      </p>
    </section>

    <section class="card controls">
      <label>
        <span>Attempts</span>
        <input v-model.number="attempts" min="1" max="20" type="number">
      </label>
      <button :disabled="pending" @click="runMany()">
        Run DB Check Loop
      </button>
    </section>

    <section class="grid">
      <article class="card">
        <h2>Latest Result</h2>
        <pre>{{ JSON.stringify(lastResult, null, 2) }}</pre>
      </article>

      <article class="card">
        <h2>Loop Results</h2>
        <pre>{{ JSON.stringify(runResults, null, 2) }}</pre>
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
.controls,
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
  max-width: 16ch;
  font-size: clamp(2.1rem, 7vw, 4.3rem);
  line-height: 0.95;
}

.lede {
  max-width: 56rem;
  margin: 1rem 0 0;
  color: #b8c3d9;
  font-size: 1.05rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

.controls {
  display: flex;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
  min-width: 10rem;
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

button:disabled {
  opacity: 0.55;
  cursor: wait;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: #d6e2ff;
}

code {
  color: #7dd3fc;
}

@media (max-width: 720px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
