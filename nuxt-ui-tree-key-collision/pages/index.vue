<script setup lang="ts">
const items = [
  {
    label: 'references',
    value: 'root-references',
    defaultExpanded: true,
    children: [
      { label: 'nuxt.md', value: 'root-references/nuxt.md' },
    ],
  },
  {
    label: 'module',
    value: 'module',
    defaultExpanded: true,
    children: [
      {
        label: 'references',
        value: 'module/references',
        defaultExpanded: true,
        children: [
          { label: 'querying.md', value: 'module/references/querying.md' },
        ],
      },
    ],
  },
]
</script>

<template>
  <UApp>
    <main class="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div class="mx-auto max-w-3xl space-y-8">
        <header class="space-y-2">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Nuxt UI Tree Repro
          </p>
          <h1 class="text-3xl font-semibold">
            Duplicate labels share expansion state
          </h1>
          <p class="max-w-2xl text-sm text-neutral-300">
            Collapse the nested <code class="rounded bg-neutral-900 px-1 py-0.5">references</code> node under
            <code class="rounded bg-neutral-900 px-1 py-0.5">module</code>. The top-level
            <code class="rounded bg-neutral-900 px-1 py-0.5">references</code> node also collapses even though each item has a unique
            <code class="rounded bg-neutral-900 px-1 py-0.5">value</code>.
          </p>
        </header>

        <div class="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
          <UTree
            :items="items"
            color="neutral"
            size="xl"
            class="max-w-sm"
          />
        </div>
      </div>
    </main>
  </UApp>
</template>
