import { useState } from 'react'
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Copy, CheckCircle } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuthStore } from '../store/useStore'

const currencies = [
  { code: 'EUR', name: 'Euro', balance: 1250.00, icon: '€' },
  { code: 'USD', name: 'Dólar Americano', balance: 850.00, icon: '$' },
  { code: 'AOA', name: 'Kwanza Angolano', balance: 156000.00, icon: 'Kz' },
  { code: 'GBP', name: 'Libra Esterlina', balance: 420.00, icon: '£' },
]

const bankAccounts = [
  { id: 1, bank: 'Millennium BCP', iban: 'PT50 0033 0000 1234 5678 9012 3', currency: 'EUR', primary: true },
  { id: 2, bank: 'BFA Angola', iban: 'AO06 0000 0000 1234 5678 9012 3', currency: 'AOA', primary: false },
]

export default function Wallet() {
  const { user } = useAuthStore()
  const [copied, setCopied] = useState(null)
  const [showAddAccount, setShowAddAccount] = useState(false)

  const copyIban = (iban, id) => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ''))
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const totalBalanceEUR = currencies.reduce((acc, curr) => {
    const toEur = curr.code === 'EUR' ? 1 : curr.code === 'USD' ? 0.92 : curr.code === 'GBP' ? 1.16 : 0.008
    return acc + curr.balance * toEur
  }, 0)

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display mb-1">Minha Carteira</h1>
            <p className="text-kinguila-gray">Gerencie seus saldos e contas bancárias</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-kinguila-card to-kinguila-dark mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-kinguila-gold/20 rounded-2xl flex items-center justify-center">
              <WalletIcon className="w-7 h-7 text-kinguila-gold" />
            </div>
            <div>
              <p className="text-sm text-kinguila-gray">Saldo Total Estimado</p>
              <p className="text-3xl font-bold text-kinguila-gold">
                €{totalBalanceEUR.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currencies.map((currency) => (
              <div key={currency.code} className="bg-kinguila-dark/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{currency.icon}</span>
                  <span className="text-sm font-medium text-kinguila-gray">{currency.code}</span>
                </div>
                <p className="text-xl font-bold">
                  {currency.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-kinguila-gray">{currency.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Contas Bancárias</h2>
            <button 
              onClick={() => setShowAddAccount(true)}
              className="btn-secondary flex items-center space-x-2 py-2"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Conta</span>
            </button>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div key={account.id} className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold">{account.bank}</p>
                    {account.primary && (
                      <span className="px-2 py-0.5 bg-kinguila-gold/20 text-kinguila-gold text-xs rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-kinguila-gray font-mono">{account.iban}</p>
                  <p className="text-xs text-kinguila-gray mt-1">Moeda: {account.currency}</p>
                </div>
                <button
                  onClick={() => copyIban(account.iban, account.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-kinguila-dark rounded-xl hover:bg-kinguila-border transition-colors"
                >
                  {copied === account.id ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-kinguila-gray" />
                      <span className="text-sm text-kinguila-gray">Copiar IBAN</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="card hover:border-kinguila-gold group transition-all flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <ArrowDownLeft className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-left">
              <p className="font-semibold group-hover:text-kinguila-gold transition-colors">Depositar</p>
              <p className="text-sm text-kinguila-gray">Adicionar fundos à sua carteira</p>
            </div>
          </button>

          <button className="card hover:border-kinguila-gold group transition-all flex items-center space-x-4">
            <div className="w-12 h-12 bg-kinguila-gold/20 rounded-xl flex items-center justify-center group-hover:bg-kinguila-gold/30 transition-colors">
              <ArrowUpRight className="w-6 h-6 text-kinguila-gold" />
            </div>
            <div className="text-left">
              <p className="font-semibold group-hover:text-kinguila-gold transition-colors">Levantar</p>
              <p className="text-sm text-kinguila-gray">Transferir para sua conta bancária</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  )
}
