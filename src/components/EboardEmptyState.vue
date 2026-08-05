<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
  }>(),
  { description: '' },
)
</script>

<template>
  <section class="eboard-empty-state">
    <div v-if="$slots.icon" class="eboard-empty-state__icon"><slot name="icon" /></div>
    <h2 class="eboard-empty-state__title">{{ title }}</h2>
    <p v-if="description" class="eboard-empty-state__description">{{ description }}</p>
    <div v-if="$slots.actions" class="eboard-empty-state__actions"><slot name="actions" /></div>
  </section>
</template>
