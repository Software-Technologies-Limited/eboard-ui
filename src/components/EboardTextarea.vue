<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    id?: string
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    rows?: number
  }>(),
  { modelValue: '', id: '', label: '', placeholder: '', hint: '', error: '', disabled: false, required: false, rows: 4 },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const updateValue = (event: Event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
</script>

<template>
  <label class="eboard-field" :class="{ 'eboard-field--error': error }">
    <span v-if="label" class="eboard-field__label">{{ label }}<span v-if="required" aria-hidden="true"> *</span></span>
    <textarea
      :id="id || undefined"
      class="eboard-field__control eboard-field__control--textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :aria-invalid="Boolean(error)"
      @input="updateValue"
    />
    <span v-if="error" class="eboard-field__error">{{ error }}</span>
    <span v-else-if="hint" class="eboard-field__hint">{{ hint }}</span>
  </label>
</template>
