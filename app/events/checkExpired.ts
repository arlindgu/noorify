// checkExpired.ts
import { createClient } from '@/utils/supabase/server'

export async function checkExpired() {
    try {
        const supabase = await createClient()
        
        // Edge Function aufrufen
        const { data, error } = await supabase.functions.invoke('check-expired-events')
        
        if (error) {
////            console.error('Error calling edge function:', error)
            return { success: false, error: error.message }
        }
        
//        console.log('Edge function executed:', data)
        return { success: true, data }
        
    } catch (err) {
//        console.error('Failed to call edge function:', err)
        return { success: false, error: 'Failed to execute' }
    }
}