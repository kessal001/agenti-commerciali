'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/app/lib/supabase/client'
import { Client } from '@/app/types'
import * as z from 'zod'

const clientSchema = z.object({
  rag_soc: z.string().min(1, 'Campo obbligatorio'),
  insegna: z.string().optional(),
  cap: z.string().optional(),
  citta: z.string().optional(),
  via: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email('Email non valida').optional().or(z.literal('')),
  pec: z.string().email('PEC non valida').optional().or(z.literal('')),
  cfe: z.string().optional(),
  p_iva: z.string().optional(),
  cod_fiscale: z.string().optional(),
  tip_cliente: z.string().optional(),
  num_pv: z.number().optional(),
  dest_m: z.boolean().optional(),
  sconto_in_fattura: z.number().optional(),
  contratto: z.string().optional(),
  iban: z.string().optional(),
  df_data: z.string().optional(),
  df_datafm: z.string().optional(),
  mail_amm: z.string().email('Email non valida').optional().or(z.literal('')),
  mail_mag: z.string().email('Email non valida').optional().or(z.literal('')),
  mail_tit: z.string().email('Email non valida').optional().or(z.literal('')),
  desc_dest: z.string().optional(),
  citta_dest: z.string().optional(),
  ind_dest: z.string().optional(),
  prov_dest: z.string().optional(),
  cap_dest: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

export default function ClientForm({ agentId }: { agentId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema)
  })

  const onSubmit = async (data: ClientFormData) => {
    try {
      const { error } = await supabase
        .from('clients')
        .insert([{ ...data, agent_id: agentId }])
      
      if (error) throw error
      
      alert('Cliente inserito con successo!')
      reset()
    } catch (error) {
      console.error('Error saving client:', error)
      alert('Errore durante il salvataggio del cliente')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campi del form come nell'esempio precedente */}
        {/* Adattare con i campi specifici usando register e mostrando errors */}
        
        {/* Esempio per Ragione Sociale */}
        <div>
          <label className="block">Ragione Sociale*</label>
          <input
            {...register('rag_soc')}
            className="w-full p-2 border rounded"
          />
          {errors.rag_soc && (
            <span className="text-red-500 text-sm">{errors.rag_soc.message}</span>
          )}
        </div>

        {/* Altri campi... */}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
      >
        {isSubmitting ? 'Salvataggio...' : 'Salva Cliente'}
      </button>
    </form>
  )
}