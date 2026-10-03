import {useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createDrawPlugin} from "@sx-premium/draw";
import {createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import 'temporal-polyfill/global'

import '@schedule-x/theme-default/dist/index.css'
import { ExampleShell } from './ExampleShell.tsx'

function App() {
  const drawPlugin = useState(createDrawPlugin({
    onFinishDrawing: () => {
      // send event to server
    },

    snapDuration: 30
  }))[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    plugins: [
      drawPlugin
    ],
    callbacks: {
      onMouseDownDateTime: (dateTime, mouseDownEvent) => {
        drawPlugin.drawTimeGridEvent(dateTime, mouseDownEvent, {
          title: 'New Event',
        })
      },

      onMouseDownDateGridDate: (dateTime, mouseDownEvent) => {
        drawPlugin.drawDateGridEvent(dateTime, mouseDownEvent, {
          title: 'New Event',
        })
      },

      onMouseDownMonthGridDate: (dateTime) => {
        drawPlugin.drawMonthGridEvent(dateTime, {
          title: 'New Event',
        })
      }
    }
  })

  return (
    <ExampleShell demo="Draw events">
      <ScheduleXCalendar calendarApp={calendar} />
    </ExampleShell>
  )
}

export default App
