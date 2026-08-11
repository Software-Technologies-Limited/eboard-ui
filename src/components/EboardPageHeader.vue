<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  color?: string
}>(), { color: 'var(--eboard-color-brand)' })

defineEmits<{ back: [] }>()
</script>

<template>
  <header class="eboard-page-header" :style="{ '--eboard-page-header-color': color }">
    <div class="eboard-page-header__start">
      <button v-if="$slots.navigation" class="eboard-page-header__navigation" type="button" aria-label="Go back" @click="$emit('back')">
        <slot name="navigation" />
      </button>
      <slot v-else name="navigation" />
    </div>
    <h1 class="eboard-page-header__title">{{ title }}</h1>
    <div class="eboard-page-header__actions"><slot name="actions" /></div>
  </header>
</template>
