import {useEffect, useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import { v4 as uuidv4 } from 'uuid';
import { createDailyView, createHourlyView, createConfig } from '@sx-premium/resource-scheduler'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import {createEventsServicePlugin} from "@schedule-x/events-service";

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
        start: '2024-05-11 04:00',
        end: '2024-05-11 06:00',
        resourceId: '1'
      },
      {
        id: uuidv4(),
        title: 'Event 2',
        start: '2024-05-11 01:00',
        end: '2024-05-11 12:00',
        resourceId: '2'
      }
    ],
    selectedDate: '2024-05-11',
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
