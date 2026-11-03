<template>
  <div style="display: flex; height: 100vh">
    <nav style="width: 160px">
      <RouterLink to="/">List</RouterLink>
    </nav>
    <main style="flex: 1; overflow-y: auto">
      <RouterView />
    </main>
  </div>
</template>
