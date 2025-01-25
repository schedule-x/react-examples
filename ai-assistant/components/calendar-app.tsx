'use client';

import {ScheduleXCalendar, useNextCalendarApp} from "@schedule-x/react";
import {createViewWeek} from "@schedule-x/calendar";
import {createAIAssistant} from "@schedule-x/platform-ai-assistant";
import {createEventRecurrencePlugin, createEventsServicePlugin} from "@schedule-x/event-recurrence";
import {useEffect, useState} from "react";

type props = {
  bearerToken: string
}

export default function CalendarApp({ bearerToken }: props) {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const aiAssistantPlugin = useState(() => createAIAssistant({
    eventsService,
    bearerToken: `Bearer ${bearerToken}`
  }))[0]

  const calendarApp = useNextCalendarApp({
    views: [
      createViewWeek()
    ],

    plugins: [
      createEventRecurrencePlugin(),
      eventsService,
      aiAssistantPlugin
    ]
  })

  useEffect(() => {
    const aiAssistantWrapper = document.getElementById('ai-assistant-wrapper')
    if (aiAssistantWrapper) {
      aiAssistantPlugin.render(aiAssistantWrapper)
    }
  }, [])

  return (
    <div className={'flex gap-12 mt-6 justify-center'}>
      <ScheduleXCalendar calendarApp={calendarApp} />
      <div id="ai-assistant-wrapper" />
    </div>
  )
}
