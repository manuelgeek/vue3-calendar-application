import {defineStore} from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => {
    return { days: [], test: 'hello', keyId: 1 }
  },
  // getters: {
  //   getDays: (state) => state.days
  // },
  actions: {
    updateDays(days) {
      this.days = days
    },
    // updateDays1(days) {
    //   this.test = days
    // },
  },
})
