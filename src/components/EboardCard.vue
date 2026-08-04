<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<template>
  <section class="eboard-card">
    <header v-if="title || $slots.header" class="eboard-card__header">
      <slot name="header"
        ><h2 class="eboard-card__title">{{ title }}</h2></slot
      >
    </header>
    <div class="eboard-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="eboard-card__footer"><slot name="footer" /></footer>
  </section>
</template>
