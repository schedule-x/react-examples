import {useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import { v4 as uuidv4 } from 'uuid';

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/drag-to-create/index.css'
import '@sx-premium/sidebar/index.css'
import {createSidebarPlugin} from "@sx-premium/sidebar";
import {calendars} from "./calendars.ts";

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  let dragToCreatePlugin = useState(createDragToCreatePlugin({
    onAddEvent: (event) => {
      console.log(event)
      // save to your server
    }
  }))[0];

  const sidebarPlugin = useState(createSidebarPlugin({
    eventsService: eventsServicePlugin,

    openOnRender: false,

    // Optional: Which calendars should be active on render
    activeCalendarIds: ['clients', 'internal'],

    // Optional: Should there be calendar toggles
    hasCalendarToggles: true,

    // Optional: placeholder events for drag-to-create
    placeholderEvents: [
      {
        title: 'Morning brief',
        calendarId: 'internal',
        people: ['John Doe', 'Jane Doe', 'Steve Smith'],
      },
      {
        title: 'Client demo',
        calendarId: 'internal',
        people: ['John Doe', 'Jane Doe'],
      },
      {
        title: 'Team meeting',
        calendarId: 'clients',
        people: ['John Doe', 'Jane Doe', 'Steve Smith'],
      }
    ],

    // Optional: factory function for generating event ids when events are created
    idFactory: () => uuidv4() // or any other id generator
  }))[0]

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-11-18',
        end: '2024-11-18',
      },
    ],
    calendars,
    selectedDate: '2024-11-18',
    plugins: [
      eventsServicePlugin,
      dragToCreatePlugin,
      sidebarPlugin
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
