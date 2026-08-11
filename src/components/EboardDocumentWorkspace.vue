<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  listOpen?: boolean
  listWidth?: string
}>(), { title: '', listOpen: true, listWidth: '25%' })

defineEmits<{ close: []; 'update:listOpen': [value: boolean] }>()
</script>

<template>
  <section class="eboard-document-workspace">
    <header v-if="title || $slots.actions" class="eboard-document-workspace__header">
      <button v-if="$slots.list" class="eboard-document-workspace__menu" type="button" :aria-label="listOpen ? 'Hide document list' : 'Show document list'" @click="$emit('update:listOpen', !listOpen)">☰</button>
      <h2 v-if="title" class="eboard-document-workspace__title">{{ title }}</h2>
      <div class="eboard-document-workspace__actions"><slot name="actions" /><button class="eboard-document-workspace__close" type="button" aria-label="Close document" @click="$emit('close')">×</button></div>
    </header>
    <div class="eboard-document-workspace__body">
      <aside v-if="$slots.list && listOpen" class="eboard-document-workspace__list" :style="{ width: listWidth }"><slot name="list" /></aside>
      <main class="eboard-document-workspace__viewer"><slot /></main>
    </div>
  </section>
</template>
