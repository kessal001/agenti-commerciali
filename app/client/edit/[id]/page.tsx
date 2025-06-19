'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ClientForm from '@/app/components/ClientForm'
import { toast } from 'react-toastify'
import type { Client } from '@/app/types'

export default function EditClientPage() {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setClient(data)
      } catch (error) {
        console.error('Error fetching client:', error)
        toast.error('Errore nel caricamento del cliente')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, supabase, router])

  const handleSubmit = async (formData: Partial<Client>) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(formData)
        .eq('id', id)

      if (error) throw error

      toast.success('Cliente aggiornato con successo')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating client:', error)
      toast.error('Errore durante l\'aggiornamento del cliente')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!client) {
    return <div className="flex justify-center items-center min-h-screen">Cliente non trovato</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Modifica Cliente</h1>
      <ClientForm 
        agentId={client.agent_id}
        onSuccess={() => router.push('/dashboard')}
        onCancel={() => router.push('/dashboard')}
      />
    </div>
  )
}