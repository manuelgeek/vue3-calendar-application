import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", {
  state: () => {
    return { days: [], keyId: 1 };
  },
  // getters: {
  //   getDays: (state) => state.days
  // },
  actions: {
    updateDays(days) {
      this.days = days;
    },
  },
});
