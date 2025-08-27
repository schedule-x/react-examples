import {useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import { createEventRecurrencePlugin, createEventsServicePlugin } from '@schedule-x/event-recurrence';
import {createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import 'temporal-polyfill/global'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import {calendars} from "./calendars.ts";
import {createInputField, createInteractiveEventModal, rruleFields} from "@sx-premium/interactive-event-modal";

function App() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventRecurrence = useState(() => createEventRecurrencePlugin())[0];

  const regionInputField = createInputField({
    label: 'Region',
    type: 'select',
    items: [],
  })

  const countryInputField = createInputField({
    label: 'Country',
    type: 'select',
    items: [
      { label: 'USA', value: 'USA' },
      { label: 'Germany', value: 'Germany' },
    ],
    onChange: (value) => {
      console.log(modalPlugin.formValues.value)
      modalPlugin.formValues.value = {
        ...modalPlugin.formValues.value,
        region: ''
      }
      regionInputField.value.rerender()

      if (value === 'USA') {
        regionInputField.value = {
          ...regionInputField.value,
          items: [
            { label: 'California', value: 'ca' },
            { label: 'New York', value: 'ny' },
          ]
        }
      } else if (value === 'Germany') {
        regionInputField.value = {
          ...regionInputField.value,
          items: [
            { label: 'Berlin', value: 'berlin' },
            { label: 'Munich', value: 'munich' },
          ]
        }
      }
    }
  });
  const modalPlugin = useState(() => createInteractiveEventModal({
    eventsService,

    onAddEvent: (event) => {
      console.log(event)
      // save the event on your server
    },

    // (Optional): callback for when an event is updated
    onDeleteEvent: (eventId) => {
      console.log(eventId)
      // delete the event from your server
    },

    fields: {
      ...rruleFields(),
      title: {},
      startDate: {},
      startTime: {},
      endDate: {},
      endTime: {},
    },

    customFields: {
      country: countryInputField,
      region: regionInputField,
    }
  }))[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2024-11-18'),
        end: Temporal.PlainDate.from('2024-11-18'),
      },
    ],
    calendars,
    selectedDate: Temporal.PlainDate.from('2024-11-18'),
    plugins: [
      eventRecurrence,
      eventsService,
      modalPlugin,
    ],
    callbacks: {
      onDoubleClickDateTime: (date) => {
        modalPlugin.clickToCreate(date, {
          title: 'New event'
        })
      },

      onDoubleClickDate: (date) => {
        modalPlugin.clickToCreate(date, {
          title: 'New event'
        })
      }
    }
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default App
