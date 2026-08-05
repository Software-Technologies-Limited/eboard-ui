<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number
    pageCount: number
    ariaLabel?: string
  }>(),
  { modelValue: 1, ariaLabel: 'Pagination' },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const selectPage = (page: number) => emit('update:modelValue', Math.min(Math.max(page, 1), props.pageCount))
</script>

<template>
  <nav v-if="pageCount > 1" class="eboard-pagination" :aria-label="ariaLabel">
    <button type="button" :disabled="modelValue <= 1" @click="selectPage(modelValue - 1)">Previous</button>
    <button
      v-for="page in pageCount"
      :key="page"
      class="eboard-pagination__page"
      :class="{ 'eboard-pagination__page--active': page === modelValue }"
      type="button"
      :aria-current="page === modelValue ? 'page' : undefined"
      @click="selectPage(page)"
    >
      {{ page }}
    </button>
    <button type="button" :disabled="modelValue >= pageCount" @click="selectPage(modelValue + 1)">Next</button>
  </nav>
</template>
