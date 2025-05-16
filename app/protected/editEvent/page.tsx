import { Event, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/utils/supabase/server"

async function getData(): Promise<Event[]> {
    const supabase = await createClient()
    const { data } = await supabase.from("events").select()

    if (!data) return []

    const events: Event[] = data.map(e => ({
      ...e,
      created_at: new Date(e.created_at),
      start_date: new Date(e.start_date),
      end_date: new Date(e.end_date),
    }))

    return events
}

export default async function editEventPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
