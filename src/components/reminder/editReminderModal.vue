<template>
  <a href="#" :class="['flex text-left mb-0.5 px-3 hidden lg:block', event.color]" @click.prevent="dialog = true">
    <span :class="['group text-left font-medium text-white group-hover:text-indigo-600']">
      {{ event.name }} - {{event.city}}
    </span>
    <time :datetime="event.datetime" class="hidden flex-none text-gray-300 group-hover:text-indigo-600 lg:block -mt-2">{{ event.time }}</time>
  </a>
  <a href="#" @click.prevent="dialog = true" class="ml-6 lg:hidden flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
  >Edit<span class="sr-only">, {{ event.name }} - {{event.city}}</span></a
  >
  <modal title="Edit Reminder" v-model:value="dialog" @close-modal="dialog = false">
    <reminder-form :days-data="daysData"  >
      <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" @click="dialog = false">Close</button>
    </reminder-form>

  </modal>
</template>

<script setup>
import Modal from '../modal.vue';
import {ref} from 'vue';
import ReminderForm from './reminderForm.vue';
const dialog = ref(false)

const props = defineProps({
  daysData: {
    type: Object,
    required: true
  }
})

const event = props.daysData.event
</script>
