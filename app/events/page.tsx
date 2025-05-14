import { createClient } from '@/utils/supabase/server'
import QRCodeGenerator from '@/app/events/EventsPage'
import '@/utils/normalizeDate';
import '@/utils/exportHours';

export default async function Page() {

    


    const supabase = await createClient()
    let { data: events } = await supabase.from('events').select()
    console.log('events', events)

    return <main>
        <div className="flex flex-wrap gap-4 align-center justify-center">
            {events?.map((event) => (
                <div key={event.id} className="border p-4 w-64 flex flex-col gap-1">
                    <h2 className="text-xl font-bold break-words">{event.title}</h2>
                    <div className='flex flex-col'>
                        <span className='text-xs'>{event.start_date.normalizeDate()} - {event.end_date.exportHours()}</span>
                        <span className='text-xs'></span>
                    </div>
                        <span className='text-xs'>{event.description}</span>
                    <QRCodeGenerator event={event} />
                </div>
            ))}

        </div>
    </main>
}