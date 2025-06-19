import { Client } from '@/app/types'
import { supabase } from '@/app/lib/supabase/client'
import ClientRow from './ClientRow'
import { useState } from 'react'
import ClientModal from './ClientModal'

interface ClientListProps {
  clients: Client[]
  onRefresh: () => void
}

export default function ClientList({ clients, onRefresh }: ClientListProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo cliente?')) return
    try {
      const { error } = await supabase.from('clients').delete().eq('id', id)
      if (error) throw error
      onRefresh()
    } catch (error) {
      console.error('Error deleting client:', error)
      alert("Errore durante l'eliminazione del cliente")
    }
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nessun cliente trovato</p>
        <button
          onClick={onRefresh}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ricarica
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ragione Sociale</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Città</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Azioni</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              onDelete={handleDelete}
              onClick={() => setSelectedClient(client)}
            />
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  )
}
