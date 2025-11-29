import { useState } from 'react'
import { Search, Filter, MoreVertical, CheckCircle, XCircle, AlertTriangle, Eye, Ban, Mail } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const mockUsers = [
  { id: 1, username: 'JoaoSilva', email: 'joao@email.com', status: 'verified', transactions: 45, joinDate: '2024-06-15', balance: '€2,450' },
  { id: 2, username: 'MariaLuisa', email: 'maria@email.com', status: 'verified', transactions: 78, joinDate: '2024-05-20', balance: '€5,200' },
  { id: 3, username: 'PedroTrader', email: 'pedro@email.com', status: 'pending', transactions: 12, joinDate: '2025-01-10', balance: '€350' },
  { id: 4, username: 'AnaCambio', email: 'ana@email.com', status: 'verified', transactions: 156, joinDate: '2024-03-01', balance: '€12,800' },
  { id: 5, username: 'RuiFX', email: 'rui@email.com', status: 'suspended', transactions: 5, joinDate: '2024-12-01', balance: '€0' },
  { id: 6, username: 'SofiaExchange', email: 'sofia@email.com', status: 'verified', transactions: 34, joinDate: '2024-08-15', balance: '€1,890' },
]

const statusConfig = {
  verified: { label: 'Verificado', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  pending: { label: 'Pendente', color: 'bg-kinguila-yellow/20 text-kinguila-yellow', icon: AlertTriangle },
  suspended: { label: 'Suspenso', color: 'bg-kinguila-red/20 text-kinguila-red', icon: XCircle },
}

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = mockUsers.filter(user => {
    if (statusFilter !== 'all' && user.status !== statusFilter) return false
    if (searchQuery && !user.username.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Utilizadores</h1>
            <p className="text-kinguila-gray">Gerencie e monitore todos os utilizadores da plataforma</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-kinguila-gray">{mockUsers.length} utilizadores</span>
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
                placeholder="Buscar por nome ou email..."
                className="input-field pl-12"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'verified', 'pending', 'suspended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-kinguila-red text-white'
                      : 'bg-kinguila-dark text-kinguila-gray hover:text-white border border-kinguila-border'
                  }`}
                >
                  {status === 'all' ? 'Todos' : statusConfig[status]?.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-kinguila-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Utilizador</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Transações</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Saldo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Desde</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-kinguila-gray">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const StatusIcon = statusConfig[user.status].icon
                  return (
                    <tr key={user.id} className="border-b border-kinguila-border/50 hover:bg-kinguila-dark/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center text-kinguila-black font-bold">
                            {user.username.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-kinguila-gray">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[user.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusConfig[user.status].label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium">{user.transactions}</td>
                      <td className="py-4 px-4 font-medium text-kinguila-gold">{user.balance}</td>
                      <td className="py-4 px-4 text-kinguila-gray">{new Date(user.joinDate).toLocaleDateString('pt-PT')}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 hover:bg-kinguila-dark rounded-lg transition-colors" title="Ver detalhes">
                            <Eye className="w-4 h-4 text-kinguila-gray" />
                          </button>
                          <button className="p-2 hover:bg-kinguila-dark rounded-lg transition-colors" title="Enviar email">
                            <Mail className="w-4 h-4 text-kinguila-gray" />
                          </button>
                          {user.status !== 'suspended' ? (
                            <button className="p-2 hover:bg-kinguila-red/20 rounded-lg transition-colors" title="Suspender">
                              <Ban className="w-4 h-4 text-kinguila-red" />
                            </button>
                          ) : (
                            <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors" title="Reativar">
                              <CheckCircle className="w-4 h-4 text-green-400" />
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
