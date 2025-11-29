import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft,
  Star,
  Users,
  Clock,
  ChevronRight,
  Copy,
  CheckCircle
} from 'lucide-react'
import Layout from '../components/Layout'
import TransactionCard from '../components/TransactionCard'
import { useAuthStore } from '../store/useStore'

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
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    amountSent: 1000,
    amountReceived: 920,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    rate: 0.92,
    counterparty: 'MariaLuisa'
  }
]

const currencies = [
  { code: 'EUR', name: 'Euro', balance: 1250.00, change: 2.5 },
  { code: 'USD', name: 'Dólar Americano', balance: 850.00, change: -1.2 },
  { code: 'AOA', name: 'Kwanza', balance: 156000.00, change: 0.8 },
]

export default function Dashboard() {
  const { user } = useAuthStore()
  const [copied, setCopied] = useState(false)
  const referralCode = 'KING' + (user?.id?.slice(-6)?.toUpperCase() || 'ABC123')

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalBalance = currencies.reduce((acc, curr) => {
    const toEur = curr.code === 'EUR' ? 1 : curr.code === 'USD' ? 0.92 : 0.008
    return acc + curr.balance * toEur
  }, 0)

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">
            Olá, <span className="text-gradient">{user?.username || 'Utilizador'}</span>
          </h1>
          <p className="text-kinguila-gray">Bem-vindo ao seu painel de controlo</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card bg-gradient-to-br from-kinguila-card to-kinguila-dark">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-kinguila-gray mb-1">Saldo Total (EUR)</p>
                <h2 className="text-4xl font-bold text-kinguila-gold">
                  €{totalBalance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+2.4%</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {currencies.map((currency) => (
                <div key={currency.code} className="bg-kinguila-dark/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{currency.code}</span>
                    {currency.change > 0 ? (
                      <span className="text-green-400 text-xs flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +{currency.change}%
                      </span>
                    ) : (
                      <span className="text-kinguila-red text-xs flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {currency.change}%
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold">
                    {currency.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-kinguila-gray">{currency.name}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Link to="/marketplace" className="btn-primary flex-1 flex items-center justify-center space-x-2">
                <ArrowUpRight className="w-5 h-5" />
                <span>Comprar</span>
              </Link>
              <Link to="/my-offers" className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                <ArrowDownLeft className="w-5 h-5" />
                <span>Vender</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-kinguila-black" />
                </div>
                <div>
                  <p className="text-sm text-kinguila-gray">Sua Avaliação</p>
                  <p className="text-xl font-bold">{user?.rating || 4.8}/5.0</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(user?.rating || 4.8) ? 'text-kinguila-gold fill-kinguila-gold' : 'text-kinguila-gray'}`}
                  />
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-kinguila-gold/10 to-kinguila-red/10 border-kinguila-gold/30">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8 text-kinguila-gold" />
                <div>
                  <p className="text-sm text-kinguila-gray">Programa de Referências</p>
                  <p className="font-semibold">Convide e Ganhe</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-kinguila-dark rounded-xl p-3">
                <code className="flex-1 text-kinguila-gold font-mono text-sm">{referralCode}</code>
                <button
                  onClick={copyReferralCode}
                  className="p-2 hover:bg-kinguila-card rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-kinguila-gray" />
                  )}
                </button>
              </div>
              <p className="text-xs text-kinguila-gray mt-2">
                Ganhe desconto nas taxas por cada amigo que trocar
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Transações Recentes</h2>
              <Link to="/history" className="text-kinguila-gold text-sm flex items-center hover:underline">
                Ver todas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Atividade</h2>
            <div className="card">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transação completada</p>
                    <p className="text-xs text-kinguila-gray">500 EUR → 62,500 AOA</p>
                    <p className="text-xs text-kinguila-gray mt-1">Há 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-kinguila-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-kinguila-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Negociação iniciada</p>
                    <p className="text-xs text-kinguila-gray">com MariaLuisa</p>
                    <p className="text-xs text-kinguila-gray mt-1">Há 5 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Novo referido</p>
                    <p className="text-xs text-kinguila-gray">Pedro criou conta</p>
                    <p className="text-xs text-kinguila-gray mt-1">Ontem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
