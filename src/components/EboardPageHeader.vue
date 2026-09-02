<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  color?: string
  startClass?: string
  navigationClass?: string
  titleClass?: string
  actionsClass?: string
}>(), {
  color: 'var(--eboard-color-brand)',
  startClass: '',
  navigationClass: '',
  titleClass: '',
  actionsClass: '',
})

defineEmits<{ back: [] }>()
</script>

<template>
  <header class="eboard-page-header" :style="{ '--eboard-page-header-color': color }">
    <div class="eboard-page-header__start" :class="startClass">
      <button v-if="$slots.navigation" class="eboard-page-header__navigation" :class="navigationClass" type="button" aria-label="Go back" @click="$emit('back')">
        <slot name="navigation" />
      </button>
      <slot v-else name="navigation" />
    </div>
    <h1 class="eboard-page-header__title" :class="titleClass">{{ title }}</h1>
    <div class="eboard-page-header__actions" :class="actionsClass"><slot name="actions" /></div>
  </header>
</template>
