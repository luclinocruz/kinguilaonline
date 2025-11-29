import { 
  Users, 
  ArrowLeftRight, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Activity
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const stats = [
  { label: 'Total Utilizadores', value: '15,234', change: '+12%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { label: 'Transações Hoje', value: '342', change: '+8%', icon: ArrowLeftRight, color: 'text-kinguila-gold', bg: 'bg-kinguila-gold/20' },
  { label: 'Volume (EUR)', value: '€125,450', change: '+23%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/20' },
  { label: 'Tickets Abertos', value: '12', change: '-5%', icon: AlertTriangle, color: 'text-kinguila-red', bg: 'bg-kinguila-red/20' },
]

const recentTransactions = [
  { id: 'TX-001', user: 'JoaoSilva', type: 'EUR → AOA', amount: '€500', status: 'completed', time: '2 min atrás' },
  { id: 'TX-002', user: 'MariaLuisa', type: 'USD → EUR', amount: '$1,000', status: 'pending', time: '5 min atrás' },
  { id: 'TX-003', user: 'PedroTrader', type: 'EUR → AOA', amount: '€250', status: 'disputed', time: '15 min atrás' },
  { id: 'TX-004', user: 'AnaCambio', type: 'GBP → EUR', amount: '£800', status: 'completed', time: '20 min atrás' },
]

const recentTickets = [
  { id: 'TK-001', user: 'PedroTrader', subject: 'Reembolso não recebido', priority: 'high', time: '10 min atrás' },
  { id: 'TK-002', user: 'MariaLuisa', subject: 'Problema de verificação', priority: 'medium', time: '1h atrás' },
  { id: 'TK-003', user: 'JoaoFX', subject: 'Dúvida sobre taxas', priority: 'low', time: '2h atrás' },
]

const statusColors = {
  completed: 'bg-green-500/20 text-green-400',
  pending: 'bg-kinguila-yellow/20 text-kinguila-yellow',
  disputed: 'bg-kinguila-red/20 text-kinguila-red',
}

const priorityColors = {
  high: 'bg-kinguila-red/20 text-kinguila-red',
  medium: 'bg-kinguila-yellow/20 text-kinguila-yellow',
  low: 'bg-green-500/20 text-green-400',
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-kinguila-red'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-kinguila-gray">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Transações Recentes</h3>
              <a href="/admin/transactions" className="text-sm text-kinguila-gold hover:underline">Ver todas</a>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-kinguila-dark rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-kinguila-card rounded-full flex items-center justify-center text-sm font-bold">
                      {tx.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{tx.user}</p>
                      <p className="text-sm text-kinguila-gray">{tx.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{tx.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>
                      {tx.status === 'completed' ? 'Concluída' : tx.status === 'pending' ? 'Pendente' : 'Disputa'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Tickets Recentes</h3>
              <a href="/admin/tickets" className="text-sm text-kinguila-gold hover:underline">Ver todos</a>
            </div>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-kinguila-dark rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${priorityColors[ticket.priority]} rounded-full flex items-center justify-center`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-sm text-kinguila-gray">{ticket.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[ticket.priority]}`}>
                      {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                    <p className="text-xs text-kinguila-gray mt-1">{ticket.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg mb-4">Atividade em Tempo Real</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-kinguila-dark rounded-xl text-center">
              <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">234</p>
              <p className="text-xs text-kinguila-gray">Utilizadores Online</p>
            </div>
            <div className="p-4 bg-kinguila-dark rounded-xl text-center">
              <Clock className="w-6 h-6 text-kinguila-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold text-kinguila-yellow">18</p>
              <p className="text-xs text-kinguila-gray">Negociações Ativas</p>
            </div>
            <div className="p-4 bg-kinguila-dark rounded-xl text-center">
              <CheckCircle className="w-6 h-6 text-kinguila-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-kinguila-gold">156</p>
              <p className="text-xs text-kinguila-gray">Transações Hoje</p>
            </div>
            <div className="p-4 bg-kinguila-dark rounded-xl text-center">
              <AlertTriangle className="w-6 h-6 text-kinguila-red mx-auto mb-2" />
              <p className="text-2xl font-bold text-kinguila-red">3</p>
              <p className="text-xs text-kinguila-gray">Disputas Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
