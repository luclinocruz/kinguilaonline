import { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, TrendingUp } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuthStore } from '../store/useStore'

const mockOffers = [
  {
    id: '1',
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 125.50,
    availableAmount: 5000,
    minAmount: 50,
    maxAmount: 2000,
    status: 'active',
    trades: 45
  },
  {
    id: '2',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    rate: 0.92,
    availableAmount: 3000,
    minAmount: 100,
    maxAmount: 1500,
    status: 'paused',
    trades: 23
  }
]

export default function MyOffers() {
  const { user } = useAuthStore()
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display mb-1">Minhas Ofertas</h1>
            <p className="text-kinguila-gray">Gerencie suas ofertas de câmbio</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Oferta</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-kinguila-gold/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-kinguila-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOffers.length}</p>
                <p className="text-sm text-kinguila-gray">Ofertas Ativas</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOffers.reduce((acc, o) => acc + o.trades, 0)}</p>
                <p className="text-sm text-kinguila-gray">Total de Negociações</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockOffers.map((offer) => (
            <div key={offer.id} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${offer.status === 'active' ? 'bg-green-400' : 'bg-kinguila-yellow'}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-lg">
                        {offer.fromCurrency} → {offer.toCurrency}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        offer.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-kinguila-yellow/20 text-kinguila-yellow'
                      }`}>
                        {offer.status === 'active' ? 'Ativa' : 'Pausada'}
                      </span>
                    </div>
                    <p className="text-sm text-kinguila-gray">
                      Taxa: <span className="text-kinguila-gold font-medium">1:{offer.rate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-kinguila-gold">{offer.availableAmount.toLocaleString()}</p>
                    <p className="text-xs text-kinguila-gray">Disponível ({offer.fromCurrency})</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{offer.minAmount} - {offer.maxAmount}</p>
                    <p className="text-xs text-kinguila-gray">Min/Max</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{offer.trades}</p>
                    <p className="text-xs text-kinguila-gray">Negociações</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-kinguila-dark rounded-lg hover:bg-kinguila-border transition-colors">
                    {offer.status === 'active' ? (
                      <EyeOff className="w-5 h-5 text-kinguila-gray" />
                    ) : (
                      <Eye className="w-5 h-5 text-kinguila-gray" />
                    )}
                  </button>
                  <button className="p-2 bg-kinguila-dark rounded-lg hover:bg-kinguila-border transition-colors">
                    <Edit2 className="w-5 h-5 text-kinguila-gray" />
                  </button>
                  <button className="p-2 bg-kinguila-dark rounded-lg hover:bg-kinguila-red/20 transition-colors">
                    <Trash2 className="w-5 h-5 text-kinguila-red" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockOffers.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-kinguila-gray mb-4">Você ainda não tem ofertas de câmbio</p>
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
              Criar Primeira Oferta
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
