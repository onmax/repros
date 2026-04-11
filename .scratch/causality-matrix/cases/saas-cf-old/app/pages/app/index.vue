<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
useSeoMeta({ title: 'Dashboard' })

const { user } = useUserSession()
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Home" />
    </template>

    <template #body>
      <div class="p-6 space-y-6">
        <div>
          <h2 class="text-2xl font-bold">
            Welcome back, {{ user?.name || user?.email }}
          </h2>
          <p class="text-[var(--ui-text-muted)] mt-1">
            Here's an overview of your account.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UPageCard
            title="Account"
            icon="i-lucide-user"
          >
            <dl class="space-y-2 text-sm">
              <div class="flex justify-between">
                <dt class="text-[var(--ui-text-muted)]">
                  Email
                </dt>
                <dd class="truncate ml-2">
                  {{ user?.email }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-[var(--ui-text-muted)]">
                  Auth method
                </dt>
                <dd>Email & Password</dd>
              </div>
            </dl>
          </UPageCard>

          <UPageCard
            title="Connected accounts"
            icon="i-lucide-link"
          >
            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-mail"
                    class="size-4"
                  />
                  <span>Email</span>
                </div>
                <UBadge
                  color="success"
                  variant="subtle"
                  label="Connected"
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-simple-icons-github"
                    class="size-4"
                  />
                  <span>GitHub</span>
                </div>
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  label="Connect"
                  disabled
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-simple-icons-google"
                    class="size-4"
                  />
                  <span>Google</span>
                </div>
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  label="Connect"
                  disabled
                />
              </div>
            </div>
          </UPageCard>

          <UPageCard
            title="Member since"
            icon="i-lucide-calendar"
          >
            <p class="text-2xl font-semibold">
              <NuxtTime
                v-if="user?.createdAt"
                :datetime="user.createdAt"
                year="numeric"
                month="long"
                day="numeric"
              />
            </p>
          </UPageCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
