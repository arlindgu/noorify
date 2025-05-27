// supabase/functions/check-expired-events/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Supabase Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Checking for expired events...')
    
    // Jetzt
    const now = new Date().toISOString()

    // Alle Events holen, die noch nicht als "passed" markiert sind
    const { data: events, error: fetchError } = await supabase
      .from('events')
      .select('id, start_date, end_date, eventPassed')
      .or('eventPassed.is.null,eventPassed.eq.false') // eventPassed ist null oder false

    if (fetchError) {
      throw fetchError
    }

    console.log(`Found ${events?.length || 0} events to check`)

    let updatedCount = 0

    if (events && events.length > 0) {
      // Events filtern, die vorbei sind (end_date < jetzt)
      const expiredEventIds = events
        .filter(event => {
          // Verwende end_date falls vorhanden, sonst start_date
          const eventEndDate = event.end_date || event.start_date
          return eventEndDate && new Date(eventEndDate) < new Date(now)
        })
        .map(event => event.id)

      if (expiredEventIds.length > 0) {
        // eventPassed auf true setzen für abgelaufene Events
        const { error: updateError } = await supabase
          .from('events')
          .update({ eventPassed: true })
          .in('id', expiredEventIds)

        if (updateError) {
          throw updateError
        }

        updatedCount = expiredEventIds.length
        console.log(`Updated ${updatedCount} events to eventPassed = true`)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        checked: events?.length || 0,
        updated: updatedCount,
        message: `Successfully updated ${updatedCount} expired events`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error checking expired events:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})