<template>
  <section class="eboard-filter-bar" aria-label="Filters">
    <div class="eboard-filter-bar__filters"><slot /></div>
    <div v-if="$slots.actions" class="eboard-filter-bar__actions"><slot name="actions" /></div>
  </section>
</template>
