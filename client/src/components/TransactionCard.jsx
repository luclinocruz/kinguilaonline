import { ArrowRight, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'

const statusConfig = {
  pending: { icon: Clock, color: 'text-kinguila-yellow', bg: 'bg-kinguila-yellow/20', label: 'Pendente' },
  completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20', label: 'Concluída' },
  cancelled: { icon: XCircle, color: 'text-kinguila-red', bg: 'bg-kinguila-red/20', label: 'Cancelada' },
  refunded: { icon: RefreshCw, color: 'text-blue-400', bg: 'bg-blue-400/20', label: 'Reembolsada' },
}

export default function TransactionCard({ transaction }) {
  const status = statusConfig[transaction.status] || statusConfig.pending
  const StatusIcon = status.icon

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${status.bg}`}>
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
          </div>
          <div>
            <p className="text-sm text-kinguila-gray">
              {new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className={`text-sm font-medium ${status.color}`}>{status.label}</p>
          </div>
        </div>
        <span className="text-xs text-kinguila-gray">#{transaction.id?.slice(-8)}</span>
      </div>

      <div className="flex items-center justify-between p-4 bg-kinguila-dark rounded-xl">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{transaction.amountSent?.toLocaleString()}</p>
          <p className="text-sm text-kinguila-gray">{transaction.fromCurrency}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <ArrowRight className="w-5 h-5 text-kinguila-gold" />
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-kinguila-gold">{transaction.amountReceived?.toLocaleString()}</p>
          <p className="text-sm text-kinguila-gray">{transaction.toCurrency}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-kinguila-border">
        <div>
          <p className="text-xs text-kinguila-gray">Taxa aplicada</p>
          <p className="text-sm font-medium">{transaction.rate} {transaction.toCurrency}/{transaction.fromCurrency}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-kinguila-gray">Contraparte</p>
          <p className="text-sm font-medium text-kinguila-gold">{transaction.counterparty}</p>
        </div>
      </div>
    </div>
  )
}
