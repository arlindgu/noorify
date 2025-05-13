// components/QRCodeGenerator.tsx
'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeGenerator({ event }) {
    if (!event?.start_date || !event?.end_date || !event?.title || !event?.description) return null

    const dtStart = new Date(event.start_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const dtEnd = new Date(event.end_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const ical = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'LOCATION:Online',
      `DESCRIPTION:${event.description.map(b => b.content).join(' ')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')
    console.log('ical', ical)
    return <QRCodeSVG value={ical} />
}