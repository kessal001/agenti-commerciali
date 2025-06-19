'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/app/lib/supabase/client'
import * as z from 'zod'

const clientSchema = z.object({
  rag_soc: z.string().min(1, 'Campo obbligatorio'),
  insegna: z.string().optional(),
  cap: z.string().max(5, 'CAP deve avere 5 caratteri').optional(),
  citta: z.string().optional(),
  via: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email('Email non valida').optional().or(z.literal('')),
  pec: z.string().email('PEC non valida').optional().or(z.literal('')),
  cfe: z.string().optional(),
  p_iva: z.string().min(11, 'Partita IVA deve avere 11 caratteri').max(11, 'Partita IVA deve avere 11 caratteri').optional(),
  cod_fiscale: z.string().min(16, 'Codice Fiscale deve avere 16 caratteri').max(16, 'Codice Fiscale deve avere 16 caratteri').optional(),
  tip_cliente: z.string().optional(),
  num_pv: z.number().min(0, 'Non può essere negativo').optional(),
  dest_m: z.boolean().optional(),
  sconto_in_fattura: z.number().min(0, 'Non può essere negativo').max(100, 'Non può superare 100').optional(),
  contratto: z.string().optional(),
  iban: z.string().min(27, 'IBAN deve avere 27 caratteri').max(27, 'IBAN deve avere 27 caratteri'),
  riba: z.string().min(1, 'Selezionare un\'opzione per RIBA 60gg'),
  riba_altro: z.string().optional(),
  mail_amm: z.string().email('Email non valida').optional().or(z.literal('')),
  mail_mag: z.string().email('Email non valida').optional().or(z.literal('')),
  mail_tit: z.string().email('Email non valida').optional().or(z.literal('')),
  desc_dest: z.string().optional(),
  citta_dest: z.string().optional(),
  ind_dest: z.string().optional(),
  prov_dest: z.string().max(2, 'Provincia deve avere 2 caratteri').optional(),
  cap_dest: z.string().max(5, 'CAP deve avere 5 caratteri').optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

interface ClientFormProps {
  agentId: string
  onSuccess: () => void
  onCancel: () => void
}

export default function ClientForm({ agentId, onSuccess, onCancel }: ClientFormProps) {
  const [showAltroInput, setShowAltroInput] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      dest_m: false,
      num_pv: 0,
      sconto_in_fattura: 0,
      riba: '',
      riba_altro: ''
    }
  })

  const ribaValue = watch('riba')

  const onSubmit = async (data: ClientFormData) => {
    try {
      const ribaFinalValue = data.riba === 'ALTRO' ? data.riba_altro : data.riba
      
      const { error } = await supabase
        .from('clients')
        .insert([{ 
          ...data, 
          riba: ribaFinalValue,
          agent_id: agentId, 
          created_at: new Date().toISOString() 
        }])
      
      if (error) throw error
      
      onSuccess()
      reset()
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-gray-50">
      <h3 className="text-lg font-medium mb-4">Inserisci Nuovo Cliente</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Sezione Anagrafica */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">Informazioni Anagrafiche</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ragione Sociale*</label>
              <input
                {...register('rag_soc')}
                className={`w-full p-2 border rounded ${errors.rag_soc ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.rag_soc && <p className="mt-1 text-sm text-red-600">{errors.rag_soc.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insegna</label>
              <input
                {...register('insegna')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partita IVA</label>
              <input
                {...register('p_iva')}
                className={`w-full p-2 border rounded ${errors.p_iva ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.p_iva && <p className="mt-1 text-sm text-red-600">{errors.p_iva.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale</label>
              <input
                {...register('cod_fiscale')}
                className={`w-full p-2 border rounded ${errors.cod_fiscale ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cod_fiscale && <p className="mt-1 text-sm text-red-600">{errors.cod_fiscale.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Cliente</label>
              <select
                {...register('tip_cliente')}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Seleziona...</option>
                <option value="Privato">Privato</option>
                <option value="Azienda">Azienda</option>
                <option value="Pubblica Amministrazione">Pubblica Amministrazione</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CFE</label>
              <input
                {...register('cfe')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Sezione Contatti */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">Informazioni di Contatto</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
              <input
                {...register('via')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
              <input
                {...register('cap')}
                className={`w-full p-2 border rounded ${errors.cap ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cap && <p className="mt-1 text-sm text-red-600">{errors.cap.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
              <input
                {...register('citta')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                {...register('telefono')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PEC</label>
              <input
                type="email"
                {...register('pec')}
                className={`w-full p-2 border rounded ${errors.pec ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.pec && <p className="mt-1 text-sm text-red-600">{errors.pec.message}</p>}
            </div>
          </div>
        </div>

        {/* Sezione Pagamento */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">Informazioni di Pagamento</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IBAN*</label>
              <input
                {...register('iban')}
                className={`w-full p-2 border rounded ${errors.iban ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.iban && <p className="mt-1 text-sm text-red-600">{errors.iban.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sconto in Fattura (%)</label>
              <input
                type="number"
                {...register('sconto_in_fattura', { valueAsNumber: true })}
                className={`w-full p-2 border rounded ${errors.sconto_in_fattura ? 'border-red-500' : 'border-gray-300'}`}
                min="0"
                max="100"
              />
              {errors.sconto_in_fattura && <p className="mt-1 text-sm text-red-600">{errors.sconto_in_fattura.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contratto</label>
              <input
                {...register('contratto')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero PV</label>
              <input
                type="number"
                {...register('num_pv', { valueAsNumber: true })}
                className={`w-full p-2 border rounded ${errors.num_pv ? 'border-red-500' : 'border-gray-300'}`}
                min="0"
              />
              {errors.num_pv && <p className="mt-1 text-sm text-red-600">{errors.num_pv.message}</p>}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dest_m"
                {...register('dest_m')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="dest_m" className="ml-2 block text-sm text-gray-700">
                Destinazione Merce Diversa
              </label>
            </div>

            {/* Sezione RIBA 60gg */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">RIBA 60gg*</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="riba_df"
                    value="DF"
                    {...register('riba', {
                      onChange: (e) => setShowAltroInput(e.target.value === 'ALTRO')
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="riba_df" className="ml-2 block text-sm text-gray-700">
                    DF
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="riba_df_fm"
                    value="DF FM"
                    {...register('riba', {
                      onChange: (e) => setShowAltroInput(e.target.value === 'ALTRO')
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="riba_df_fm" className="ml-2 block text-sm text-gray-700">
                    DF FM
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="riba_altro"
                    value="ALTRO"
                    {...register('riba', {
                      onChange: (e) => setShowAltroInput(e.target.value === 'ALTRO')
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="riba_altro" className="ml-2 block text-sm text-gray-700">
                    Altro
                  </label>
                </div>
              </div>
              {errors.riba && <p className="mt-1 text-sm text-red-600">{errors.riba.message}</p>}

              {showAltroInput && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specificare*</label>
                  <input
                    {...register('riba_altro', { required: ribaValue === 'ALTRO' })}
                    className={`w-full p-2 border rounded ${errors.riba_altro ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.riba_altro && <p className="mt-1 text-sm text-red-600">Questo campo è obbligatorio</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sezione Destinazione Merce (condizionale) */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">Destinazione Merce (se diversa)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
              <input
                {...register('desc_dest')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
              <input
                {...register('ind_dest')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
              <input
                {...register('citta_dest')}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
              <input
                {...register('prov_dest')}
                className={`w-full p-2 border rounded ${errors.prov_dest ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={2}
              />
              {errors.prov_dest && <p className="mt-1 text-sm text-red-600">{errors.prov_dest.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
              <input
                {...register('cap_dest')}
                className={`w-full p-2 border rounded ${errors.cap_dest ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cap_dest && <p className="mt-1 text-sm text-red-600">{errors.cap_dest.message}</p>}
            </div>
          </div>
        </div>

        {/* Sezione Email Specifiche */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">Email Specifiche</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Amministrazione</label>
              <input
                type="email"
                {...register('mail_amm')}
                className={`w-full p-2 border rounded ${errors.mail_amm ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.mail_amm && <p className="mt-1 text-sm text-red-600">{errors.mail_amm.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Magazzino</label>
              <input
                type="email"
                {...register('mail_mag')}
                className={`w-full p-2 border rounded ${errors.mail_mag ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.mail_mag && <p className="mt-1 text-sm text-red-600">{errors.mail_mag.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Titolare</label>
              <input
                type="email"
                {...register('mail_tit')}
                className={`w-full p-2 border rounded ${errors.mail_tit ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.mail_tit && <p className="mt-1 text-sm text-red-600">{errors.mail_tit.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Annulla
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvataggio...' : 'Salva Cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}