<script setup lang="ts">
const newNote = ref('')
const { data: notes, refresh } = await useFetch('/api/notes')

async function addNote() {
  if (!newNote.value.trim()) return
  await $fetch('/api/notes', { method: 'POST', body: { content: newNote.value } })
  newNote.value = ''
  refresh()
}
</script>

<template>
  <div style="max-width: 600px; margin: 2rem auto; font-family: system-ui;">
    <h1>NuxtHub D1 Test</h1>
    <form @submit.prevent="addNote" style="margin-bottom: 1rem;">
      <input v-model="newNote" placeholder="Add a note..." style="padding: 0.5rem; width: 70%;" />
      <button type="submit" style="padding: 0.5rem 1rem;">Add</button>
    </form>
    <ul>
      <li v-for="note in notes" :key="note.id" style="margin: 0.5rem 0;">
        {{ note.content }} <small style="color: gray;">({{ new Date(note.createdAt).toLocaleString() }})</small>
      </li>
    </ul>
    <p v-if="!notes?.length" style="color: gray;">No notes yet. Add one above!</p>
  </div>
</template>
