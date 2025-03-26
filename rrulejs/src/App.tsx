import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {
  CalendarEventExternal,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  toDateTimeString
} from "@schedule-x/calendar";

import '@schedule-x/theme-default/dist/index.css'
import {RRule} from "rrule";

function App() {
  const events = [
    {
      id: 1,
      start: '2025-03-31 00:00',
      end: '2025-03-31 01:00',
      // every last workday of the month
      rrule: 'FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1;COUNT=5'
    },
  ]

  const eventsWithRecurrence = events.reduce((acc, event) => {
    if (event.rrule) {
      const rule = RRule.fromString(event.rrule)
      const dates = rule.all()
      // remove first, because this will be the first occurrence
      const recurrences = dates.slice(1)
      recurrences.forEach(date => {
        const startAndEndDiff = new Date(event.end).getTime() - new Date(event.start).getTime();
        const endTime = toDateTimeString(new Date(date.getTime() + startAndEndDiff));
        acc.push({
          ...event,
          start: toDateTimeString(date),
          end: endTime
        })
      })
    }

    return acc
  }, events as CalendarEventExternal[])

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    selectedDate: '2025-03-26',
    events: eventsWithRecurrence
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default App
