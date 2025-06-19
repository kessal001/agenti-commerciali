import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false, // Disabilita l'auto-refresh
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit', // Cambia da 'pkce' a 'implicit'
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    debug: false // Disabilita i log dettagliati
  }
})