<script setup lang="ts">
export interface EbSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

withDefaults(
  defineProps<{
    modelValue?: string | number
    id?: string
    label?: string
    options: EbSelectOption[]
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
  }>(),
  { modelValue: '', id: '', label: '', placeholder: '', hint: '', error: '', disabled: false, required: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const updateValue = (event: Event) => emit('update:modelValue', (event.target as HTMLSelectElement).value)
</script>

<template>
  <label class="eboard-field" :class="{ 'eboard-field--error': error }">
    <span v-if="label" class="eboard-field__label">{{ label }}<span v-if="required" aria-hidden="true"> *</span></span>
    <select
      :id="id || undefined"
      class="eboard-field__control"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="Boolean(error)"
      @change="updateValue"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="String(option.value)" :value="option.value" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="eboard-field__error">{{ error }}</span>
    <span v-else-if="hint" class="eboard-field__hint">{{ hint }}</span>
  </label>
</template>
