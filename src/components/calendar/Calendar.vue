<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div :key="keyId" class="lg:flex lg:h-full lg:flex-col">
    <calendar-header :selected-date="selectedDate" :today="today" @month-switched="selectDate" />
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
        <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
        <div class="bg-white py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
        <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
        <div class="bg-white py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
        <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
        <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
      </div>
        <calendar-grids :days="days" @day-selected="showDayEvents" />
    </div>
    <div v-if="'events' in selectedDay && selectedDay.events.length > 0" class="py-10 px-4 sm:px-6 lg:hidden">
      <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
        <li v-for="event in selectedDay.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
          <div class="flex-auto">
            <p :class="['font-semibold text-gray-900', event.color]">{{ event.name }}</p>
            <time :datetime="event.datetime" :class="['mt-2 flex items-center text-gray-700']">
              <svg class="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ event.time }}
            </time>
          </div>
          <edit-reminder-modal :days-data="{event, date: selectedDay.date}" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import CalendarGrids from './calendarGrids.vue';
import CalendarHeader from './calendarHeader.vue';
import {useCalendar} from '../../composables/useCalendar';
import {useCalendarStore} from '../../store/calendar.js';
import {storeToRefs} from 'pinia';
import {computed} from 'vue';
import EditReminderModal from '../reminder/editReminderModal.vue';

const {selectedDate, selectDate, today, showDayEvents, selectedDay}  = useCalendar()

const calendarStore = useCalendarStore()
const { keyId } = storeToRefs(calendarStore);

const days = computed(() => calendarStore.days)

</script>
