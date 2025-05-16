"use client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
    id: number
    created_at: Date
    start_date: Date
    end_date: Date
    title: string
    description: string
    target: string
}

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "Event ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => row.getValue<Date>("created_at").toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => row.getValue<Date>("start_date").toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => row.getValue<Date>("end_date").toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "target",
    header: "Target Group",
  },
]

