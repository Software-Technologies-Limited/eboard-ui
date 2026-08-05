<script setup lang="ts">
export interface EbTabItem {
  label: string
  value: string | number
  disabled?: boolean
}

defineProps<{
  modelValue: string | number
  items: EbTabItem[]
}>()

defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>

<template>
  <div class="eboard-tabs" role="tablist">
    <button
      v-for="item in items"
      :key="String(item.value)"
      class="eboard-tabs__tab"
      :class="{ 'eboard-tabs__tab--active': modelValue === item.value }"
      type="button"
      role="tab"
      :aria-selected="modelValue === item.value"
      :disabled="item.disabled"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
