import {useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import { v4 as uuidv4 } from 'uuid';
import 'temporal-polyfill/global'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/drag-to-create/index.css'

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  let dragToCreatePlugin = useState(createDragToCreatePlugin({
    onAddEvent: (event) => {
      console.log(event)
      // save to your server
    }
  }))[0];
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2024-11-18'),
        end: Temporal.PlainDate.from('2024-11-18'),
      },
    ],
    selectedDate: Temporal.PlainDate.from('2024-11-18'),
    plugins: [
      eventsServicePlugin,
      dragToCreatePlugin
    ]
  })

  return (
    <div>
      <div
        className={'placeholderEvent'}
        draggable={true}
        onDragStart={() => {
          dragToCreatePlugin.dragToCreate(uuidv4(), {
            title: '(No title)',
            description: 'Some description'
          })
        }}
        style={{
          width: '100px',
          height: '50px',
          backgroundColor: '#eaddff',
          color: '--sx-color-on-primary-container',
          textAlign: 'center',
          lineHeight: '50px',
          cursor: 'move',
        }}
      >
        Drag me
      </div>

      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default App
