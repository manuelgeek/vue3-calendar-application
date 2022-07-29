<template>
  <button
    type="button"
    class="focus:outline-none rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    data-modal-toggle="defaultModal"
    @click="dialog = true"
  >
    Add reminder
  </button>
  <modal
    v-model:value="dialog"
    title="Create Reminder"
    @close-modal="dialog = false"
  >
    <reminder-form>
      <button
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        @click="dialog = false"
      >
        Close
      </button>
    </reminder-form>
  </modal>
</template>

<script setup>
import Modal from "../modal.vue";
import { ref } from "vue";
import ReminderForm from "./reminderForm.vue";
const dialog = ref(false);
</script>
