import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import { computed, ref } from "vue";
import { useCalendarStore } from "../store/calendar.js";

export function useCalendar() {
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  const selectedDate = ref(dayjs());

  const today = computed(() => dayjs().format("YYYY-MM-DD"));
  const month = computed(() => Number(selectedDate.value.format("M")));
  const year = computed(() => Number(selectedDate.value.format("YYYY")));
  const numberOfDaysInMonth = computed(() =>
    dayjs(selectedDate.value).daysInMonth()
  );

  const currentMonthDays = computed(() => {
    return [...Array(numberOfDaysInMonth.value)].map((day, index) => {
      const date = dayjs(`${year.value}-${month.value}-${index + 1}`).format(
        "YYYY-MM-DD"
      );
      return {
        date,
        isCurrentMonth: true,
        isToday: date === today.value,
        events: [],
      };
    });
  });

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
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
          isToday: false,
          events: [],
        };
      }
    );
  });

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
        events: [],
      };
    });
  });

  const days = computed(() => [
    ...previousMonthDays.value,
    ...currentMonthDays.value,
    ...nextMonthDays.value,
  ]);

  const getWeekday = (date) => {
    return dayjs(date).weekday();
  };

  const selectDate = (newSelectedDate) => {
    selectedDate.value = newSelectedDate;
  };

  const calendarStore = useCalendarStore();
  // set days to state
  // calendarStore.$patch({days})
  calendarStore.updateDays(days);

  const selectedDay = ref({});

  const showDayEvents = (date) => {
    selectedDay.value = calendarStore.days.find((d) => d.date === date);
  };

  return {
    getWeekday,
    selectDate,
    selectedDate,
    days,
    today,
    showDayEvents,
    selectedDay,
  };
}
