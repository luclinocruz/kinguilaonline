import { useState } from 'react'
import { Search, MessageCircle, Clock, CheckCircle, AlertTriangle, User, Send } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const mockTickets = [
  { 
    id: 'TK-001', 
    user: 'PedroTrader', 
    subject: 'Reembolso não recebido', 
    message: 'Fiz uma transação há 2 dias e o vendedor não confirmou. O tempo expirou mas não recebi o reembolso automático.',
    priority: 'high', 
    status: 'open',
    category: 'refund',
    createdAt: '2025-01-20 10:30',
    responses: 0
  },
  { 
    id: 'TK-002', 
    user: 'MariaLuisa', 
    subject: 'Problema de verificação KYC', 
    message: 'Enviei meus documentos há 3 dias mas ainda não foi aprovado. Preciso fazer transações urgentes.',
    priority: 'medium', 
    status: 'in_progress',
    category: 'verification',
    createdAt: '2025-01-19 15:45',
    responses: 2
  },
  { 
    id: 'TK-003', 
    user: 'JoaoFX', 
    subject: 'Dúvida sobre taxas de câmbio', 
    message: 'Gostaria de saber como são calculadas as taxas de transação e se há desconto para volumes maiores.',
    priority: 'low', 
    status: 'open',
    category: 'general',
    createdAt: '2025-01-19 09:15',
    responses: 0
  },
  { 
    id: 'TK-004', 
    user: 'AnaCambio', 
    subject: 'Conta bloqueada indevidamente', 
    message: 'Minha conta foi suspensa sem aviso. Tenho mais de 100 transações bem-sucedidas, nunca tive problemas.',
    priority: 'high', 
    status: 'open',
    category: 'account',
    createdAt: '2025-01-20 08:00',
    responses: 0
  },
  { 
    id: 'TK-005', 
    user: 'SofiaExchange', 
    subject: 'Erro ao adicionar conta bancária', 
    message: 'Tento adicionar minha conta bancária do BFA mas aparece erro. Já tentei várias vezes.',
    priority: 'medium', 
    status: 'resolved',
    category: 'technical',
    createdAt: '2025-01-18 14:20',
    responses: 3
  },
]

const priorityConfig = {
  high: { label: 'Alta', color: 'bg-kinguila-red/20 text-kinguila-red' },
  medium: { label: 'Média', color: 'bg-kinguila-yellow/20 text-kinguila-yellow' },
  low: { label: 'Baixa', color: 'bg-green-500/20 text-green-400' },
}

const statusConfig = {
  open: { label: 'Aberto', color: 'bg-blue-500/20 text-blue-400' },
  in_progress: { label: 'Em Andamento', color: 'bg-kinguila-yellow/20 text-kinguila-yellow' },
  resolved: { label: 'Resolvido', color: 'bg-green-500/20 text-green-400' },
}

const categoryConfig = {
  refund: 'Reembolso',
  verification: 'Verificação',
  general: 'Geral',
  account: 'Conta',
  technical: 'Técnico',
}

export default function AdminTickets() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [response, setResponse] = useState('')

  const filteredTickets = mockTickets.filter(ticket => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false
    if (searchQuery && !ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !ticket.user.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Tickets</h1>
            <p className="text-kinguila-gray">Responda e resolva problemas dos utilizadores</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-kinguila-red/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-kinguila-red" />
              <span className="font-medium text-kinguila-red">{mockTickets.filter(t => t.status === 'open' && t.priority === 'high').length} Urgentes</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-kinguila-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar tickets..."
                  className="input-field pl-10 py-2 text-sm"
                />
              </div>

              <div className="flex gap-2">
                {['all', 'open', 'in_progress', 'resolved'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === status
                        ? 'bg-kinguila-red text-white'
                        : 'bg-kinguila-dark text-kinguila-gray hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : statusConfig[status]?.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedTicket?.id === ticket.id
                        ? 'bg-kinguila-red/20 border border-kinguila-red'
                        : 'bg-kinguila-dark hover:bg-kinguila-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-kinguila-gray">{ticket.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${priorityConfig[ticket.priority].color}`}>
                        {priorityConfig[ticket.priority].label}
                      </span>
                    </div>
                    <p className="font-medium text-sm truncate">{ticket.subject}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-kinguila-gray">{ticket.user}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${statusConfig[ticket.status].color}`}>
                        {statusConfig[ticket.status].label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedTicket ? (
              <div className="card">
                <div className="border-b border-kinguila-border pb-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-kinguila-gray">{selectedTicket.id}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${priorityConfig[selectedTicket.priority].color}`}>
                        {priorityConfig[selectedTicket.priority].label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${statusConfig[selectedTicket.status].color}`}>
                        {statusConfig[selectedTicket.status].label}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{selectedTicket.subject}</h2>
                  <div className="flex items-center space-x-4 text-sm text-kinguila-gray">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedTicket.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedTicket.createdAt}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-kinguila-dark rounded text-xs">
                      {categoryConfig[selectedTicket.category]}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-kinguila-dark rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-kinguila-gold rounded-full flex items-center justify-center text-kinguila-black font-bold text-sm">
                        {selectedTicket.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedTicket.user}</p>
                        <p className="text-xs text-kinguila-gray">{selectedTicket.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-kinguila-gray">{selectedTicket.message}</p>
                  </div>

                  {selectedTicket.responses > 0 && (
                    <div className="p-4 bg-kinguila-card border border-kinguila-border rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-kinguila-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                          A
                        </div>
                        <div>
                          <p className="font-medium text-sm">Admin</p>
                          <p className="text-xs text-kinguila-gray">Resposta da equipa</p>
                        </div>
                      </div>
                      <p className="text-kinguila-gray">Olá! Estamos analisando seu caso e entraremos em contato em breve.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-kinguila-border pt-4">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-kinguila-gray mb-2">Responder</label>
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Escreva sua resposta..."
                        rows={3}
                        className="input-field resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button className="btn-secondary py-2 px-4 text-sm">Marcar Resolvido</button>
                      <button className="py-2 px-4 text-sm bg-kinguila-dark text-kinguila-gray rounded-xl hover:text-white transition-colors">
                        Escalar
                      </button>
                    </div>
                    <button className="btn-primary py-2 px-4 flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Enviar</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-16">
                <MessageCircle className="w-16 h-16 text-kinguila-gray mb-4" />
                <p className="text-kinguila-gray">Selecione um ticket para ver os detalhes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
