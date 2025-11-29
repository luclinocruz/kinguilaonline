import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ChevronDown, TrendingUp, RefreshCw, ArrowUpDown } from 'lucide-react'
import Layout from '../components/Layout'
import SellerCard from '../components/SellerCard'
import { useMarketStore } from '../store/useStore'

const mockSellers = [
  {
    id: '1',
    username: 'JoaoTrader',
    rating: 4.9,
    totalTrades: 156,
    verified: true,
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 125.50,
    availableAmount: 5000,
    responseTime: '~2 min'
  },
  {
    id: '2',
    username: 'MariaExchange',
    rating: 4.7,
    totalTrades: 89,
    verified: true,
    fromCurrency: 'EUR',
    toCurrency: 'AOA',
    rate: 124.80,
    availableAmount: 3500,
    responseTime: '~5 min'
  },
  {
    id: '3',
    username: 'PedroForex',
    rating: 4.5,
    totalTrades: 45,
    verified: false,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    rate: 0.92,
    availableAmount: 2000,
    responseTime: '~3 min'
  },
  {
    id: '4',
    username: 'AnaCambio',
    rating: 5.0,
    totalTrades: 234,
    verified: true,
    fromCurrency: 'GBP',
    toCurrency: 'EUR',
    rate: 1.16,
    availableAmount: 8000,
    responseTime: '~1 min'
  },
  {
    id: '5',
    username: 'CarlosKz',
    rating: 4.8,
    totalTrades: 78,
    verified: true,
    fromCurrency: 'AOA',
    toCurrency: 'EUR',
    rate: 0.0079,
    availableAmount: 500000,
    responseTime: '~4 min'
  },
  {
    id: '6',
    username: 'SofiaGlobal',
    rating: 4.6,
    totalTrades: 112,
    verified: true,
    fromCurrency: 'USD',
    toCurrency: 'AOA',
    rate: 115.20,
    availableAmount: 4500,
    responseTime: '~2 min'
  }
]

const currencies = ['Todas', 'EUR', 'USD', 'GBP', 'AOA', 'BRL']

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('Todas')
  const [sortBy, setSortBy] = useState('rate')
  const [showFilters, setShowFilters] = useState(false)
  const { setSelectedSeller } = useMarketStore()
  const navigate = useNavigate()

  const filteredSellers = useMemo(() => {
    let sellers = [...mockSellers]

    if (searchQuery) {
      sellers = sellers.filter(s => 
        s.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCurrency !== 'Todas') {
      sellers = sellers.filter(s => 
        s.fromCurrency === selectedCurrency || s.toCurrency === selectedCurrency
      )
    }

    if (sortBy === 'rate') {
      sellers.sort((a, b) => b.rate - a.rate)
    } else if (sortBy === 'rating') {
      sellers.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'available') {
      sellers.sort((a, b) => b.availableAmount - a.availableAmount)
    }

    return sellers
  }, [searchQuery, selectedCurrency, sortBy])

  const handleSelectSeller = (seller) => {
    setSelectedSeller(seller)
    navigate('/negotiate')
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display mb-1">Mercado P2P</h1>
            <p className="text-kinguila-gray">Encontre os melhores vendedores e taxas de câmbio</p>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Atualizar</span>
          </button>
        </div>

        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar vendedor..."
                className="input-field pl-12"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCurrency === currency
                      ? 'bg-kinguila-gold text-kinguila-black'
                      : 'bg-kinguila-dark text-kinguila-gray hover:text-white border border-kinguila-border'
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-kinguila-dark border border-kinguila-border rounded-xl text-kinguila-gray hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-kinguila-border">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm text-kinguila-gray mb-2">Ordenar por</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy('rate')}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                        sortBy === 'rate' ? 'bg-kinguila-gold text-kinguila-black' : 'bg-kinguila-dark text-kinguila-gray'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>Melhor Taxa</span>
                    </button>
                    <button
                      onClick={() => setSortBy('rating')}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        sortBy === 'rating' ? 'bg-kinguila-gold text-kinguila-black' : 'bg-kinguila-dark text-kinguila-gray'
                      }`}
                    >
                      Avaliação
                    </button>
                    <button
                      onClick={() => setSortBy('available')}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        sortBy === 'available' ? 'bg-kinguila-gold text-kinguila-black' : 'bg-kinguila-dark text-kinguila-gray'
                      }`}
                    >
                      Disponibilidade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-kinguila-gray">
            <span className="text-white font-medium">{filteredSellers.length}</span> vendedores encontrados
          </p>
          <div className="flex items-center space-x-2 text-sm text-kinguila-gray">
            <ArrowUpDown className="w-4 h-4" />
            <span>Ordenado por {sortBy === 'rate' ? 'taxa' : sortBy === 'rating' ? 'avaliação' : 'disponibilidade'}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} onSelect={handleSelectSeller} />
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-kinguila-gray mb-4">Nenhum vendedor encontrado com esses filtros</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCurrency('Todas')
              }}
              className="btn-secondary"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
