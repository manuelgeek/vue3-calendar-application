# Vue 3 + Vite Calendar App

> A Vue 3 calendar app with ability to create reminders
>
> Link: [https://vue-calendar-task.herokuapp.com/](https://vue-calendar-task.herokuapp.com/)
>
> ![badge](https://github.com/manuelgeek/vue3-calendar-application/workflows/Lint%20and%20Test%20CI/badge.svg)

## Set up

```bash
# install dependencies
yarn install

# dev command
yarn dev
#or
vite

# testing
yarn test
#or
vitest
```

## Tools used

- Vite
- Vitest for test
- Pinia for store
- Tailwindcss
- Eslint
- Prettier
- Husky for pre-commit hooks

## Features done

- Display calendar, ability to got to next or previous calendar, tailwind css styled
- Add reminder to calendar with date, time, name, color, city
- -Store calendar days in store (pinia)
- Display reminders in calendar in time order, with color background
- Edit reminder, click on reminder to edit
- Mobile calendar view

### Bonus

- Expand the calendar to support more than the current month.
- Functionality to delete one or ALL the reminders for a specific day
- Properly handle overflow when multiple reminders appear on the same date.

### Dev

Hosted on heroku through Github Actions, trigger is done on `main` branch for demo purposes, an Ideal development environment will have different dedicated branches

Github actions used for Running Tests and Lints

I've also use pre commit hooks to prevent un formatted code from being pushed upstream

## What I could have done better

Given time;

- Improve the UI
- persist pinia store in case of reloads and navigation, next/previous
- Implemented Open Weather API or looked for alternative, the given option requires payment and do not accent dates and city as params for request
- Improved on test coverage
