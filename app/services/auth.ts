import { supabase } from '@/app/lib/supabase/client'

export const AuthService = {
  async register(name: string, email: string, password: string) {
    // 1. Registra l'utente
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    // 2. Salva i dati aggiuntivi nella tabella agents
    const { error: dbError } = await supabase
      .from('agents')
      .insert([{ 
        id: authData.user?.id,
        name, 
        email,
        password: '' // In produzione, usa un hash o meglio, non salvare la password
      }])

    if (dbError) throw dbError

    return authData
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}