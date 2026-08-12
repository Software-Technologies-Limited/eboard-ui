<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    id?: string
    label?: string
    type?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    autocomplete?: string
    list?: string
    suggestions?: Array<string | number>
  }>(),
  {
    modelValue: '',
    id: '',
    label: '',
    type: 'text',
    placeholder: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    autocomplete: '',
    list: '',
    suggestions: () => [],
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const updateValue = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
const componentId = getCurrentInstance()?.uid ?? 0
const resolvedListId = computed(() => {
  if (props.list) return props.list
  if (!props.suggestions.length) return undefined
  return `${props.id || `eboard-input-${componentId}`}-suggestions`
})
</script>

<template>
  <label class="eboard-field" :class="{ 'eboard-field--error': error }">
    <span v-if="label" class="eboard-field__label">{{ label }}<span v-if="required" aria-hidden="true"> *</span></span>
    <input
      :id="id || undefined"
      class="eboard-field__control"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete || undefined"
      :list="resolvedListId"
      :aria-invalid="Boolean(error)"
      @input="updateValue"
    />
    <datalist v-if="suggestions.length && resolvedListId" :id="resolvedListId">
      <option v-for="suggestion in suggestions" :key="String(suggestion)" :value="String(suggestion)" />
    </datalist>
    <span v-if="error" class="eboard-field__error">{{ error }}</span>
    <span v-else-if="hint" class="eboard-field__hint">{{ hint }}</span>
  </label>
</template>
