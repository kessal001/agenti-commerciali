'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthGuard from '@/app/components/AuthGuard'
import ClientModal from '@/app/components/ClientModal'

interface Agent {
  id: string
  name: string
  email: string
  is_admin: boolean
}

interface Client {
  id: string
  rag_soc: string
  p_iva: string
  agent_id: string
  created_at: string
  // Altri campi necessari
}

export default function GeneralDashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const { data: agentsData } = await supabase
          .from('agents')
          .select('id, name, email, is_admin')
          .order('name', { ascending: true })

        const { data: clientsData } = await supabase
          .from('clients')
          .select('id, rag_soc, p_iva, agent_id, email, telefono, created_at')
          .order('rag_soc', { ascending: true })

        if (agentsData) setAgents(agentsData)
        if (clientsData) setClients(clientsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const filteredClients = clients.filter(client =>
    client.rag_soc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.p_iva?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    return agent ? agent.name : 'N/D'
  }
  // Restituisce l'oggetto agente completo dato l'ID
  const getAgentObj = (agentId: string) => {
    return agents.find(a => a.id === agentId) || null;
  }

    
  return (
    <>
      <AuthGuard role="admin" />
      
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Amministrativa</h1>
            <button
              onClick={() => router.push('/admin/agents')}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Gestione Agenti
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Tutti i Clienti</h2>
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Cerca clienti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ragione Sociale</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partita IVA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.rag_soc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.p_iva || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getAgentObj(client.agent_id)?.name || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getAgentObj(client.agent_id)?.email || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => setSelectedClient(client)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Dettagli
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Statistiche Agenti</h2>
              <div className="space-y-4">
                {agents.map(agent => {
                  const agentClients = clients.filter(c => c.agent_id === agent.id)
                  return (
                    <div key={agent.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-sm text-gray-500">{agentClients.length} clienti</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(agentClients.length / Math.max(clients.length, 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Ultimi Clienti Aggiunti</h2>
              <ul className="space-y-3">
                {[...clients]
                  .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
                  .slice(0, 5)
                  .map(client => (
                    <li key={client.id} className="flex justify-between items-center">
                      <span>{client.rag_soc}</span>
                      <span className="text-sm text-gray-500">{getAgentName(client.agent_id)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {selectedClient && (
        <ClientModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </>
  )
}