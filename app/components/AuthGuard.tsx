// components/AuthGuard.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthGuard({ role = 'agent' }: { role?: 'admin' | 'agent' }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      // Verifica il ruolo
      const { data: agent } = await supabase
        .from('agents')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      if (!agent) {
        router.push('/login')
        return
      }

      if (role === 'admin' && !agent.is_admin) {
        router.push('/dashboard') // Reindirizza alla dashboard normale se non è admin
      }
    }

    checkAuth()
  }, [router, supabase, role])

  return null
}