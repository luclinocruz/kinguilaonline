import { useState } from 'react'
import { Filter, ChevronDown, Download, Search } from 'lucide-react'
import Layout from '../components/Layout'
import TransactionCard from '../components/TransactionCard'

const mockTransactions = [
  {
    id: 'tx-001',
    status: 'completed',
    createdAt: new Date().toISOString(),
    amountSent: 500,
    amountReceived: 62500,
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 125,
    counterparty: 'JoaoSilva'
  },
  {
    id: 'tx-002',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    amountSent: 1000,
    amountReceived: 920,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    rate: 0.92,
    counterparty: 'MariaLuisa'
  },
  {
    id: 'tx-003',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    amountSent: 200,
    amountReceived: 25000,
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 125,
    counterparty: 'PedroTrader'
  },
  {
    id: 'tx-004',
    status: 'refunded',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    amountSent: 350,
    amountReceived: 43750,
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 125,
    counterparty: 'AnaCambio'
  }
]

export default function History() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = mockTransactions.filter(tx => {
    if (filter !== 'all' && tx.status !== filter) return false
    if (searchQuery && !tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display mb-1">Histórico de Transações</h1>
            <p className="text-kinguila-gray">Todas as suas transações anteriores</p>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por contraparte..."
                className="input-field pl-12"
              />
            </div>

            <div className="flex gap-2">
              {['all', 'completed', 'cancelled', 'refunded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === status
                      ? 'bg-kinguila-gold text-kinguila-black'
                      : 'bg-kinguila-dark text-kinguila-gray hover:text-white border border-kinguila-border'
                  }`}
                >
                  {status === 'all' ? 'Todas' : status === 'completed' ? 'Concluídas' : status === 'cancelled' ? 'Canceladas' : 'Reembolsadas'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-kinguila-gray">Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
