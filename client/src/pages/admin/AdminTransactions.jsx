import { useState } from 'react'
import { Search, Filter, Eye, AlertTriangle, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const mockTransactions = [
  { id: 'TX-001', buyer: 'JoaoSilva', seller: 'MariaLuisa', type: 'EUR → AOA', amount: '€500', received: 'Kz 62,500', rate: '125', status: 'completed', date: '2025-01-20 14:30' },
  { id: 'TX-002', buyer: 'PedroTrader', seller: 'AnaCambio', type: 'USD → EUR', amount: '$1,000', received: '€920', rate: '0.92', status: 'pending', date: '2025-01-20 14:25' },
  { id: 'TX-003', buyer: 'RuiFX', seller: 'SofiaExchange', type: 'EUR → AOA', amount: '€250', received: 'Kz 31,250', rate: '125', status: 'disputed', date: '2025-01-20 14:15' },
  { id: 'TX-004', buyer: 'AnaCambio', seller: 'JoaoSilva', type: 'GBP → EUR', amount: '£800', received: '€928', rate: '1.16', status: 'completed', date: '2025-01-20 14:00' },
  { id: 'TX-005', buyer: 'MariaLuisa', seller: 'PedroTrader', type: 'EUR → USD', amount: '€2,000', received: '$2,174', rate: '1.087', status: 'refunded', date: '2025-01-20 13:45' },
  { id: 'TX-006', buyer: 'SofiaExchange', seller: 'RuiFX', type: 'AOA → EUR', amount: 'Kz 100,000', received: '€800', rate: '0.008', status: 'completed', date: '2025-01-20 13:30' },
]

const statusConfig = {
  completed: { label: 'Concluída', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  pending: { label: 'Pendente', color: 'bg-kinguila-yellow/20 text-kinguila-yellow', icon: Clock },
  disputed: { label: 'Disputa', color: 'bg-kinguila-red/20 text-kinguila-red', icon: AlertTriangle },
  refunded: { label: 'Reembolsada', color: 'bg-blue-500/20 text-blue-400', icon: RefreshCw },
  cancelled: { label: 'Cancelada', color: 'bg-gray-500/20 text-gray-400', icon: XCircle },
}

export default function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const filteredTransactions = mockTransactions.filter(tx => {
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false
    if (searchQuery && !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) && !tx.buyer.toLowerCase().includes(searchQuery.toLowerCase()) && !tx.seller.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Transações</h1>
            <p className="text-kinguila-gray">Monitore e resolva problemas com transações</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-kinguila-gray">Volume Total Hoje</p>
              <p className="text-xl font-bold text-kinguila-gold">€125,450</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por ID, comprador ou vendedor..."
                className="input-field pl-12"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'disputed', 'completed', 'refunded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-kinguila-red text-white'
                      : 'bg-kinguila-dark text-kinguila-gray hover:text-white border border-kinguila-border'
                  }`}
                >
                  {status === 'all' ? 'Todas' : statusConfig[status]?.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-kinguila-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Partes</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Tipo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Data</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-kinguila-gray">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  const StatusIcon = statusConfig[tx.status].icon
                  return (
                    <tr key={tx.id} className="border-b border-kinguila-border/50 hover:bg-kinguila-dark/50">
                      <td className="py-4 px-4">
                        <span className="font-mono font-medium">{tx.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{tx.buyer} <span className="text-kinguila-gray">→</span> {tx.seller}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-kinguila-gold font-medium">{tx.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{tx.amount}</p>
                        <p className="text-sm text-kinguila-gray">{tx.received}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[tx.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusConfig[tx.status].label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-kinguila-gray text-sm">{tx.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 hover:bg-kinguila-dark rounded-lg transition-colors" title="Ver detalhes">
                            <Eye className="w-4 h-4 text-kinguila-gray" />
                          </button>
                          {tx.status === 'disputed' && (
                            <>
                              <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors" title="Resolver a favor do comprador">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              </button>
                              <button className="p-2 hover:bg-kinguila-red/20 rounded-lg transition-colors" title="Resolver a favor do vendedor">
                                <XCircle className="w-4 h-4 text-kinguila-red" />
                              </button>
                            </>
                          )}
                          {tx.status === 'pending' && (
                            <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors" title="Forçar reembolso">
                              <RefreshCw className="w-4 h-4 text-blue-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
