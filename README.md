# Vue 3 + Vite Calendar App
> A Vue 3 calendar app with ability to create reminders

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


## Features done
- Display calendar, ability to got to next or previous calendar, tailwind css styled
- Add reminder to calendar with date, time, name, color, city
- -Store calendar days in store (pinia)
- Display reminders in calendar in time order, with color background
- Edit reminder, click on reminder to edit
- Mobile calendar view


## What I could have done better
Given time;
- Improve the UI
- persist pinia store in case of reloads and navigation, next/previous
- Implemented Open Weather API or looked for alternative, the given option requires payment and do not accent dates and city as params for request
- Improved on test coverage
