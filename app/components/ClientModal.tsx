'use client'

import { Client } from '@/app/types'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'

interface ClientModalProps {
  client: Client
  onClose: () => void
}

export default function ClientModal({ client, onClose }: ClientModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-8xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <h3 className="text-2xl font-bold border-b pb-4">Dettagli Completi Cliente</h3>
          
          <div className="space-y-8">
            {/* Sezione Anagrafica */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-blue-600">Informazioni Anagrafiche</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Ragione Sociale</p>
                  <p className="text-base">{client.rag_soc || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Insegna</p>
                  <p className="text-base">{client.insegna || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Partita IVA</p>
                  <p className="text-base">{client.p_iva || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Codice Fiscale</p>
                  <p className="text-base">{client.cod_fiscale || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Tipo Cliente</p>
                  <p className="text-base">{client.tip_cliente || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">CFE</p>
                  <p className="text-base">{client.cfe || '-'}</p>
                </div>
              </div>
            </div>

            {/* Sezione Contatti */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-blue-600">Informazioni di Contatto</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Indirizzo</p>
                  <p className="text-base">{client.via || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">CAP</p>
                  <p className="text-base">{client.cap || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Città</p>
                  <p className="text-base">{client.citta || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Telefono</p>
                  <p className="text-base">{client.telefono || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{client.email || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">PEC</p>
                  <p className="text-base">{client.pec || '-'}</p>
                </div>
              </div>
            </div>

            {/* Sezione Pagamento */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-blue-600">Informazioni di Pagamento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">IBAN</p>
                  <p className="text-base">{client.iban || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">RIBA 60gg</p>
                  <p className="text-base">{client.riba || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Sconto in Fattura</p>
                  <p className="text-base">{client.sconto_in_fattura ? `${client.sconto_in_fattura}%` : '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Contratto</p>
                  <p className="text-base">{client.contratto || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Numero PV</p>
                  <p className="text-base">{client.num_pv || '-'}</p>
                </div>
              </div>
            </div>

            {/* Sezione Destinazione Merce */}
            {client.dest_m && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-blue-600">Destinazione Merce</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Descrizione</p>
                    <p className="text-base">{client.desc_dest || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Indirizzo</p>
                    <p className="text-base">{client.ind_dest || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Città</p>
                    <p className="text-base">{client.citta_dest || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Provincia</p>
                    <p className="text-base">{client.prov_dest || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">CAP</p>
                    <p className="text-base">{client.cap_dest || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sezione Email Specifiche */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-blue-600">Email Specifiche</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email Amministrazione</p>
                  <p className="text-base">{client.mail_amm || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email Magazzino</p>
                  <p className="text-base">{client.mail_mag || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email Titolare</p>
                  <p className="text-base">{client.mail_tit || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              onClick={() => {
                // Implementa la logica di esportazione qui
                alert('Funzione esporta non ancora implementata')
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Esporta
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}