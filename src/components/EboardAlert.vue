<script setup lang="ts">
withDefaults(
  defineProps<{
    status?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    dismissible?: boolean
  }>(),
  { status: 'info', title: '', dismissible: false },
)

defineEmits<{ dismiss: [] }>()
</script>

<template>
  <section
    class="eboard-alert"
    :class="`eboard-alert--${status}`"
    :role="status === 'danger' ? 'alert' : 'status'"
  >
    <div class="eboard-alert__content">
      <strong v-if="title" class="eboard-alert__title">{{ title }}</strong>
      <div class="eboard-alert__message"><slot /></div>
    </div>
    <button
      v-if="dismissible"
      class="eboard-alert__dismiss"
      type="button"
      aria-label="Dismiss alert"
      @click="$emit('dismiss')"
    >
      <span aria-hidden="true">×</span>
    </button>
  </section>
</template>
