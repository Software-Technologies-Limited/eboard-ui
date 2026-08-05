<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    meta?: string
    selected?: boolean
  }>(),
  { subtitle: '', meta: '', selected: false },
)

defineEmits<{ select: [] }>()
</script>

<template>
  <article class="eboard-file-card" :class="{ 'eboard-file-card--selected': selected }">
    <button class="eboard-file-card__main" type="button" @click="$emit('select')">
      <span v-if="$slots.icon" class="eboard-file-card__icon"><slot name="icon" /></span>
      <span class="eboard-file-card__content">
        <strong class="eboard-file-card__title">{{ title }}</strong>
        <span v-if="subtitle" class="eboard-file-card__subtitle">{{ subtitle }}</span>
        <span v-if="meta" class="eboard-file-card__meta">{{ meta }}</span>
      </span>
    </button>
    <div v-if="$slots.actions" class="eboard-file-card__actions"><slot name="actions" /></div>
  </article>
</template>
