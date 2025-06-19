import { Client } from '@/app/types'
import { supabase } from '@/app/lib/supabase/client'

export default function ClientList({ clients }: { clients: Client[] }) {
  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo cliente?')) return
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      window.location.reload()
    } catch (error) {
      console.error('Error deleting client:', error)
      alert('Errore durante l\'eliminazione del cliente')
    }
  }

  if (clients.length === 0) {
    return <div className="text-gray-500">Nessun cliente trovato</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ragione Sociale</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Città</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap">{client.rag_soc}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.citta}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.telefono}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}