<script setup lang="ts">
withDefaults(
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
  }>(),
  { modelValue: '', id: '', label: '', type: 'text', placeholder: '', hint: '', error: '', disabled: false, required: false, autocomplete: '' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const updateValue = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
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
      :aria-invalid="Boolean(error)"
      @input="updateValue"
    />
    <span v-if="error" class="eboard-field__error">{{ error }}</span>
    <span v-else-if="hint" class="eboard-field__hint">{{ hint }}</span>
  </label>
</template>
