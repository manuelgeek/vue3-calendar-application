import {defineStore} from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => {
    return { days: {} }
  },
  actions: {
    updateDays(state) {
      this.days = state
    },
  },
})
