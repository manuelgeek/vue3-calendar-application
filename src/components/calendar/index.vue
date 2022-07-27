<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <header class="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
      <h1 class="text-lg font-semibold text-gray-900">
        <time datetime="2022-01">January 2022</time>
      </h1>
      <div class="flex items-center">
        <div class="flex items-center rounded-md shadow-sm md:items-stretch">
          <button type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
            <span class="sr-only">Previous month</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          <button type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
            <span class="sr-only">Next month</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>
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
      <calendar-grids :days="days" />
    </div>
    <div v-if="'events' in selectedDate && selectedDate.events.length > 0" class="py-10 px-4 sm:px-6 lg:hidden">
      <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
        <li v-for="event in selectedDate.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">{{ event.name }}</p>
            <time :datetime="event.datetime" class="mt-2 flex items-center text-gray-700">
              <svg class="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ event.time }}
            </time>
          </div>
          <a :href="event.href" class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
          >Edit<span class="sr-only">, {{ event.name }}</span></a
          >
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {computed, ref} from 'vue';
import CalendarGrids from './calendarGrids.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

// {
//   date: '2022-01-12',
//   isCurrentMonth: true,
//   isToday: true,
// isSelected: true,
//   events: [{ id: 6, name: "Sam's birthday party", time: '2PM', datetime: '2022-01-25T14:00', href: '#' }],
// },

const selectedDate = ref(dayjs())

const today = computed(() => dayjs().format("YYYY-MM-DD"));
const month = computed(() => Number(selectedDate.value.format("M")))
const year = computed(() => Number(selectedDate.value.format("YYYY")))
const numberOfDaysInMonth = computed(() => dayjs(selectedDate.value).daysInMonth())

const currentMonthDays = computed(() => {
  return [...Array(numberOfDaysInMonth.value)].map((day, index) => {
    const date = dayjs(`${year.value}-${month.value}-${index + 1}`).format(
        "YYYY-MM-DD")
    return {
      date,
      isCurrentMonth: true,
      isToday: date === today.value,
      events: []
    };
  });
})

const previousMonthDays = computed(() => {
  const firstDayOfTheMonthWeekday = getWeekday(
      currentMonthDays.value[0].date
  );
  const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(
      1,
      "month"
  );

  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

  const previousMonthLastMondayDayOfMonth = dayjs(
      currentMonthDays.value[0].date
  )
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() +
              1}-${previousMonthLastMondayDayOfMonth + index}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
          isToday: false,
          events: []
        };
      }
  );
})

const nextMonthDays = computed(() => {
  const lastDayOfTheMonthWeekday = getWeekday(
      `${year.value}-${month.value}-${currentMonthDays.value.length}`
  );

  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false,
      isToday: false,
      events: []
    };
  });
})

const days = computed(() => [
  ...previousMonthDays.value,
  ...currentMonthDays.value,
  ...nextMonthDays.value
])

const getWeekday = (date) => {
  return dayjs(date).weekday();
}

const selectDate = (newSelectedDate) => {
  selectedDate.value = newSelectedDate;
}

</script>
