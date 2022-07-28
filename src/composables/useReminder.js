import {reactive} from 'vue';
import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import dayjs from 'dayjs';
import {useCalendarStore} from '../store/calendar.js';

export function useReminder(daysData ) {
  const { handleSubmit, isSubmitting, resetForm, setValues } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    // console.log({values})
    const {dateTime, reminder, ...rest} = values
    const datetime = dayjs(dateTime).format('YYYY-MM-DD')
    const time = dayjs(dateTime).format('HH:mm')
    const data = {...rest, ...{datetime, time, id: (Math.random() * 1000), name: reminder}}

    // edit
    if(daysData) {
      editReminder(data)
      return
    }
    // console.log({data})
    await addReminder(data)
    resetForm()
  });

  const { errorMessage: reminderError, value: reminderValue } = useField('reminder', yup.string().required().max(30));
  const { errorMessage: dateTimeError, value: dateTimeValue } = useField('dateTime', yup.string().required());
  const { errorMessage: colorError, value: colorValue } = useField('color', yup.string().required());
  const { errorMessage: cityError, value: cityValue } = useField('city', yup.string().required());

  if(daysData) {
    const event = daysData.event
    setValues({
      reminder: event.name,
      dateTime: dayjs(event.detetime),
      color: event.color,
      city: event.city
    });
  }

  const form = reactive({
    reminder: {reminderError, reminderValue},
    date: {dateTimeError, dateTimeValue: dateTimeValue == null ? '' : dateTimeValue},
    city: {cityError, cityValue},
    color: {colorError, colorValue}
  })

  const selectColor = (color) => {
    colorValue.value = color
  }

  const calendarStore = useCalendarStore()

  const addReminder = async (data) => {
    await getWeatherData()
    const days = calendarStore.days

    const newDays = days.map((day) => {
      if(day.date === data.datetime) {
        const events = day.events
        day.events = [...[data], ...events]
        return day
      }
      return day
    })
    // console.log({newDays})
    calendarStore.$patch({days: newDays})
    calendarStore.keyId ++
  }

  const getWeatherData = async () => {
    // TODO:// add this to env
    const API_KEY = '8d4b1fa7df69a890dbc046b55e654304'
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=37.5&lon=34.5&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const editReminder = (data) => {
    const days = calendarStore.days

    const newDays = days.map((day) => {
      if(day.date === data.datetime) {
        const events = day.events.filter((e) => e.id !== daysData.event.id)

        day.events = [...[data], ...events]
        return day
      }
      return day
    })
    // console.log({newDays})
    calendarStore.$patch({days: newDays})
    calendarStore.keyId ++
  }

  const deleteReminder = () => {
    const event = daysData.event
    const date = daysData.date

    const days = calendarStore.days

    const newDays = days.map((day) => {
      if(day.date === date) {
        const events = day.events.filter((e) => e.id !== event.id)
        day.events = [...events]
        return day
      }
      return day
    })
    calendarStore.$patch({days: newDays})
    calendarStore.keyId ++
  }

  const deleteAllReminders = () => {
    const date = daysData.date

    const days = calendarStore.days

    const newDays = days.map((day) => {
      if(day.date === date) {
        day.events = []
        return day
      }
      return day
    })
    calendarStore.$patch({days: newDays})
    calendarStore.keyId ++
  }

  return {
    form,
    selectColor,
    onSubmit,
    isSubmitting,
    deleteReminder,
    deleteAllReminders
  }
}
