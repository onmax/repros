<script setup lang="ts">
defineProps<{ collapsed: boolean }>()

const colorMode = useColorMode()
const { user, signOut } = useUserSession()

const items = computed(() => [[{
  label: user.value?.name || user.value?.email || '',
  slot: 'account' as const,
  disabled: true
}], [{
  label: 'Settings',
  icon: 'i-lucide-settings',
  to: '/app/settings'
}], [{
  label: colorMode.value === 'dark' ? 'Light mode' : 'Dark mode',
  icon: colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon',
  onSelect: () => { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
}], [{
  label: 'Sign out',
  icon: 'i-lucide-log-out',
  onSelect: handleSignOut
}]])

async function handleSignOut() {
  await signOut({
    onSuccess: async () => {
      await navigateTo('/')
    }
  })
}
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      :class="collapsed ? 'justify-center' : 'justify-start'"
    >
      <UAvatar
        :src="user?.image || undefined"
        :alt="user?.name || user?.email || ''"
        size="2xs"
      />
      <span
        v-if="!collapsed"
        class="truncate text-sm"
      >{{ user?.name || user?.email }}</span>
    </UButton>
  </UDropdownMenu>
</template>
