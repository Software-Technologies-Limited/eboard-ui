<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean
    status?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    dismissible?: boolean
  }>(),
  { modelValue: false, status: 'info', title: '', dismissible: true },
)

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <div v-if="modelValue" class="eboard-toast" :class="`eboard-toast--${status}`" role="status">
    <div class="eboard-toast__content">
      <strong v-if="title" class="eboard-toast__title">{{ title }}</strong>
      <div class="eboard-toast__message"><slot /></div>
    </div>
    <button
      v-if="dismissible"
      class="eboard-toast__dismiss"
      type="button"
      aria-label="Dismiss notification"
      @click="$emit('update:modelValue', false)"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
