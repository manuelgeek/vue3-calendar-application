<template>
  <form @submit="onSubmit">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="reminder">
        Reminder
      </label>
      <textarea
        id="reminder"
        v-model="form.reminder.reminderValue"
        rows="3"
        :class="[
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          form.reminder.reminderError ? 'border-red-500' : '',
        ]"
        type="text"
        placeholder="Reminder"
      ></textarea>
      <p class="text-red-500 text-sm">{{ form.reminder.reminderError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="reminder">
        Date and Time
      </label>
      <Datepicker
        v-model="form.date.dateTimeValue"
        model-auto
        :min-date="new Date()"
        :clearable="false"
      />
      <p class="text-red-500 text-sm">{{ form.date.dateTimeError }}</p>
    </div>
    <div class="mb-4">
      <color-picker
        :color="form.color.colorValue"
        @color-selected="selectColor"
      />
      <p class="text-red-500 text-sm">{{ form.color.colorError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
        City
      </label>
      <input
        id="city"
        v-model="form.city.cityValue"
        :class="[
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          form.city.cityError ? 'border-red-500' : '',
        ]"
        type="text"
        placeholder="City"
      />
      <p class="text-red-500 text-sm">{{ form.city.cityError }}</p>
    </div>
    <div
      class="flex justify-end items-center py-6 space-x-2 rounded-b dark:border-gray-600"
    >
      <slot></slot>
      <button
        v-if="daysData"
        type="button"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        @click="deleteAllReminders"
      >
        Delete All
      </button>
      <button
        v-if="daysData"
        type="button"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        @click="deleteReminder"
      >
        Delete
      </button>
      <button
        id="submit"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{
          isSubmitting
            ? daysData
              ? "Updating Reminder..."
              : "Adding Reminder..."
            : daysData
            ? "Update Reminder"
            : "Add Reminder"
        }}
      </button>
    </div>
  </form>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useReminder } from "../../composables/useReminder.js";
import ColorPicker from "./colorPicker.vue";

const props = defineProps({
  daysData: {
    type: Object,
    required: false,
  },
});

const {
  form,
  selectColor,
  onSubmit,
  isSubmitting,
  deleteReminder,
  deleteAllReminders,
} = useReminder(props.daysData);
</script>
