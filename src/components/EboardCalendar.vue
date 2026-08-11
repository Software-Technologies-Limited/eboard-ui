<script setup lang="ts">
import { computed, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

const props = defineProps<{
  events?: Array<Record<string, unknown>>
}>()

const emit = defineEmits<{ 'event-click': [event: unknown] }>()
const calendar = ref<InstanceType<typeof FullCalendar> | null>(null)

const options = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin],
  initialView: 'dayGridMonth',
  events: props.events ?? [],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'multiMonthYear,dayGridMonth,timeGridDay',
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventClick: (event: unknown) => emit('event-click', event),
  buttonText: { today: 'Today', month: 'Month', year: 'Year', day: 'Day' },
}))

const getApi = () => calendar.value?.getApi()

defineExpose({ getApi })
</script>

<template>
  <section class="eboard-calendar">
    <FullCalendar ref="calendar" :options="options">
      <template #eventContent="arg">
        <slot name="event-content" :arg="arg">
          <span :title="arg.event.title">{{ arg.event.title }}</span>
        </slot>
      </template>
    </FullCalendar>
  </section>
</template>
