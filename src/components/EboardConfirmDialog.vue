<script setup lang="ts">
import EbButton from './EboardButton.vue'
import EbDialog from './EboardDialog.vue'

withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    confirmVariant?: 'primary' | 'danger'
    loading?: boolean
  }>(),
  {
    modelValue: false,
    title: 'Confirm action',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    confirmVariant: 'primary',
    loading: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; confirm: []; cancel: [] }>()

const cancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<template>
  <EbDialog :model-value="modelValue" :title="title" @update:model-value="$emit('update:modelValue', $event)">
    <p class="eboard-confirm-dialog__message">{{ message }}</p>
    <template #footer>
      <EbButton variant="secondary" :disabled="loading" @click="cancel">{{ cancelLabel }}</EbButton>
      <EbButton :variant="confirmVariant" :disabled="loading" @click="$emit('confirm')">
        {{ loading ? 'Working…' : confirmLabel }}
      </EbButton>
    </template>
  </EbDialog>
</template>
