'use client'

import { Client } from '@/app/types'

interface ClientRowProps {
  client: Client
  onDelete: (id: string) => void
  onClick: () => void
}

export default function ClientRow({ client, onDelete, onClick }: ClientRowProps) {
  return (
    <tr
      onClick={onClick}
      className="hover:bg-gray-100 cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.rag_soc}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.citta}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.telefono}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
        onClick={(e) => {
          e.stopPropagation() // Evita l'apertura del modal
          onDelete(client.id)
        }}
      >
        <button className="text-red-600 hover:text-red-900">Elimina</button>
      </td>
    </tr>
  )
}
