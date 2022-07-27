<template>
  <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
    <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
      <div v-for="day in days" :key="day.date" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 px-3 w-40 h-32']">
        <time :datetime="day.date" :class="day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
        <ol v-if="day.events.length > 0" class="mt-2">
          <li v-for="event in day.events.slice(0, 2)" :key="event.id">
            <a :href="event.href" class="group flex">
              <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                {{ event.name }}
              </p>
              <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
            </a>
          </li>
          <li v-if="day.events.length > 2" class="text-gray-500">+ {{ day.events.length - 2 }} more</li>
        </ol>
      </div>
    </div>
    <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
      <button v-for="day in days" :key="day.date" type="button" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10']">
        <time :datetime="day.date" :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
        <span class="sr-only">{{ day.events.length }} events</span>
        <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
              <span v-for="event in day.events" :key="event.id" class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
            </span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  days: {
    type: Object,
    required: true,
  }
})

const days = props.days
</script>
