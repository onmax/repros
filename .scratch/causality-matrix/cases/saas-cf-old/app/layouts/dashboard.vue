<script setup lang="ts">
const items = [{
  label: 'Home', icon: 'i-lucide-house', to: '/app'
}, {
  label: 'Settings', icon: 'i-lucide-settings', to: '/app/settings'
}]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/app"
          class="flex items-center gap-2"
          :class="collapsed ? 'justify-center' : ''"
        >
          <UIcon
            v-if="collapsed"
            name="i-simple-icons-nuxtdotjs"
            class="size-6 text-[var(--ui-primary)]"
          />
          <AppLogo
            v-else
            class="h-6"
          />
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          orientation="vertical"
          :items="items"
          :tooltip="collapsed"
        />
        <div class="mt-auto" />
        <UDashboardSidebarCollapse />
      </template>

      <template #footer="{ collapsed }">
        <DashboardUserMenu :collapsed="collapsed ?? false" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
