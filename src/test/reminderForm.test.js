import { flushPromises, mount } from "@vue/test-utils";
import reminderForm from "../components/reminder/reminderForm.vue";
import Calendar from "../components/calendar/Calendar.vue";
import { useCalendarStore } from "../store/calendar.js";
import { createPinia } from "pinia";
import { nextTick } from "vue";

test("reminderForm component", async () => {
  expect(reminderForm).toBeTruthy();

  await mount(Calendar, {
    global: {
      plugins: [createPinia()],
    },
  });

  const wrapper = await mount(reminderForm, {
    global: {},
  });

  await flushPromises();

  const store = useCalendarStore();
  expect(Boolean(store.days.length)).toBe(true);
  expect(wrapper.exists()).toBe(true);
});
