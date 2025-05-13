import { createClient } from '@/utils/supabase/server'
import QRCodeGenerator from '@/app/events/EventsPage'

export default async function Page() {
    const supabase = await createClient()
    let { data: events } = await supabase.from('events').select()
    console.log('events', events)

    return <main>
        <div className="flex flex-wrap gap-4 align-center justify-center">
            {events?.map((event) => (
                <div key={event.id} className="border p-4 w-64">
                    <h2 className="text-xl font-bold break-words">{event.title}</h2>
                    <div className='flex flex-col gap-2'>
                    </div>
                    {event.description.map((block, index) => (
                        <p key={index}>{block.content}</p>
                    ))}
                    <QRCodeGenerator event={event} />
                </div>
            ))}

        </div>
    </main>
}