import { createClient } from '@/utils/supabase/server'
import QRCodeGenerator from '@/app/events/EventsPage'
import '@/utils/normalizeDate';
import '@/utils/exportHours';

export default async function Page() {

    


    const supabase = await createClient()
    let { data: events } = await supabase.from('events').select()
    console.log('events', events)

    const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

    return <main>
        <div className="flex flex-wrap gap-4 align-center justify-center">
            {events?.map((event) => (
                <div key={event.id} className="border p-4 w-64 flex flex-col gap-1">
                    <h2 className="text-xl font-bold break-words">{event.title}</h2>
                    <div className='flex flex-col'>
                        <span>
                            {dayNames[new Date(event.start_date).getDay()]}
                            {", "} 
                            {new Date(event.start_date).getDate().toString().padStart(2, '0')}
                            {". "}
                            {monthNames[new Date(event.start_date).getMonth()]}
                            {" "}
                            {new Date(event.start_date).getFullYear()}
                        </span>
                        <span className='text-xs'>
                            {new Date(event.start_date).getHours().toString().padStart(2, '0')}
                            {":"}
                            {new Date(event.start_date).getMinutes().toString().padStart(2, '0')}
                            {" - "} 
                            {new Date(event.end_date).getHours().toString().padStart(2, '0')}
                            {":"}
                            {new Date(event.end_date).getMinutes().toString().padStart(2, '0')} </span>
                        <span className='text-xs'></span>
                    </div>
                        <span className='text-xs'>{event.description}</span>
                    <QRCodeGenerator event={event} />
                </div>
            ))}

        </div>
    </main>
}