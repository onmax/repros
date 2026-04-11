<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
useSeoMeta({ title: 'Settings' })
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Settings" />
    </template>

    <template #body>
      <div class="flex flex-col items-center justify-center h-full text-center">
        <UIcon
          name="i-lucide-settings"
          class="size-12 text-[var(--ui-text-dimmed)] mb-4"
        />
        <p class="text-lg font-medium text-[var(--ui-text-muted)]">
          Account settings will appear here
        </p>
      </div>
    </template>
  </UDashboardPanel>
</template>
