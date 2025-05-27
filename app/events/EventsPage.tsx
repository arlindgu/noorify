// components/QRCodeGenerator.tsx

import { QRCodeSVG } from 'qrcode.react'

function toICalDate(dateString: string) {
  const date = new Date(dateString)
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

  type EventType = {
  id?: number
  title: string
  description: string
  start_date: string
  end_date: string
  target: string
}

export default function QRCodeGenerator({ event } : { event: EventType }) {
    if (!event?.start_date || !event?.end_date || !event?.title || !event?.description) return null

const dtStart = toICalDate(event.start_date)
const dtEnd = toICalDate(event.end_date)
const dtStamp = toICalDate(String(new Date()))
const uid = `${event.id || 'generated-id'}@noorify`

const ical = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//noorify//EventManager//EN',
  'BEGIN:VEVENT',
  `UID:${uid}`,
  `DTSTAMP:${dtStamp}`,
  `SUMMARY:${event.title}`,
  `DTSTART:${dtStart}`,
  `DTEND:${dtEnd}`,
  `DESCRIPTION:${event.description}`,
  'END:VEVENT',
  'END:VCALENDAR'
].join('\n')
return <QRCodeSVG className="border-2 border-white"value={ical} />
}