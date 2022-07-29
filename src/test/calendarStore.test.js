import { createPinia, setActivePinia } from "pinia";
import { useCalendarStore } from "../store/calendar.js";

describe("Calendar Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("add days", () => {
    const store = useCalendarStore();
    expect(store.days.length).toBe(0);

    store.updateDays([{ date: "2022-03-21", events: [] }]);
    expect(store.days.length).toBe(1);
  });
});
