'use client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClient } from '@supabase/supabase-js'
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"



export function EventForm() {

    const [dateNow, setDateNow] = useState(new Date())

      useEffect(() => {
        const now = new Date()
        setDateNow(now)
      }, [])

    const formSchema = z.object({
    created_at: z.string(),
    title: z.string(),
    description: z.string(),
    target: z.string(),
    start_date: z.string(),
    end_date: z.string(),
  });

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        created_at: new Date().toISOString(),
        title: "",
        description: "",
        target: "",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
  })

    // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const appendOffset = (dateStr: string) => dateStr + '+02:00'

    const payload = {
      ...values,
      created_at: appendOffset(values.created_at),
      start_date: appendOffset(values.start_date),
      end_date: appendOffset(values.end_date),
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)
    await supabase.from('events').insert([payload])
    console.log(payload)
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-7xl">

        <FormField
          control={form.control}
          name="created_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Created At</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event Titel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Group</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )

}