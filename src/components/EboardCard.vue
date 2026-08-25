<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    scrollable?: boolean
    scrollLabel?: string
  }>(),
  {
    scrollable: false,
    scrollLabel: 'Scrollable card content',
  },
)
</script>
<template>
  <section class="eboard-card" :class="{ 'eboard-card--scrollable': scrollable }">
    <header v-if="title || $slots.header" class="eboard-card__header">
      <slot name="header"
        ><h2 class="eboard-card__title">{{ title }}</h2></slot
      >
    </header>
    <div
      class="eboard-card__body"
      :tabindex="scrollable ? 0 : undefined"
      :aria-label="scrollable ? scrollLabel : undefined"
    >
      <slot />
    </div>
    <footer v-if="$slots.footer" class="eboard-card__footer"><slot name="footer" /></footer>
  </section>
</template>
