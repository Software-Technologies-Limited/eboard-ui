<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean
    id?: string
    label: string
    disabled?: boolean
  }>(),
  { modelValue: false, id: '', disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const updateValue = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).checked)
</script>

<template>
  <label class="eboard-checkbox">
    <input
      :id="id || undefined"
      class="eboard-checkbox__control"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="updateValue"
    />
    <span>{{ label }}</span>
  </label>
</template>
