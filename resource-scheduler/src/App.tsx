import {useEffect, useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import { v4 as uuidv4 } from 'uuid';
import { createDailyView, createHourlyView, createConfig } from '@sx-premium/resource-scheduler'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import {createEventsServicePlugin} from "@schedule-x/events-service";
import 'temporal-polyfill/global'

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  const resourceViewConfig = useState(() => createConfig())[0]
  const hourlyView = useState(() => createHourlyView(resourceViewConfig))[0]
  const dailyView = useState(() => createDailyView(resourceViewConfig))[0]

  useEffect(() => {
    resourceViewConfig.resources.value = [
      {
        label: 'Room 100',
        id: '1'
      },
      {
        labelHTML: '<span>Room <strong>101</strong></span>',
        id: '2',
        colorName: 'room-101',
        lightColors: {
          main: '#1c7df9',
          container: '#d2e7ff',
          onContainer: '#002859'
        },
        darkColors: {
          main: '#c0dfff',
          onContainer: '#dee6ff',
          container: '#426aa2'
        }
      }
    ]
  }, []);

  const calendar = useCalendarApp({
    views: [
      hourlyView,
      dailyView
    ],
    events: [
      {
        id: uuidv4(),
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from('2024-05-11T04:00:00+09:00[Asia/Tokyo]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T06:00:00+09:00[Asia/Tokyo]'),
        resourceId: '1'
      },
      {
        id: uuidv4(),
        title: 'Event 2',
        start: Temporal.ZonedDateTime.from('2024-05-11T01:00:00+09:00[Asia/Tokyo]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T12:00:00+09:00[Asia/Tokyo]'),
        resourceId: '2'
      }
    ],
    selectedDate: Temporal.PlainDate.from('2024-05-11'),
    timezone: 'Asia/Tokyo',
    plugins: [
      eventsServicePlugin,
    ]
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default App
