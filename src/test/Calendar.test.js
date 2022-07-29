import { flushPromises, mount } from "@vue/test-utils";
import Calendar from "../components/calendar/Calendar.vue";
import { useCalendarStore } from "../store/calendar.js";
import { createPinia } from "pinia";

test("mount Calendar component", async () => {
  expect(Calendar).toBeTruthy();

  const wrapper = await mount(Calendar, {
    global: {
      plugins: [createPinia()],
    },
  });

  await flushPromises();

  const store = useCalendarStore();
  expect(Boolean(store.days.length)).toBe(true);
  expect(wrapper.exists()).toBe(true);
});
