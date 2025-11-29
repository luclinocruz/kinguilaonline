import { useState } from 'react'
import { Users, Copy, CheckCircle, Gift, Share2, TrendingUp } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuthStore } from '../store/useStore'

const mockReferrals = [
  { id: 1, username: 'Pedro123', joinedAt: '2025-01-15', transactions: 5, status: 'active' },
  { id: 2, username: 'Ana_Cambio', joinedAt: '2025-01-10', transactions: 12, status: 'active' },
  { id: 3, username: 'JoaoFX', joinedAt: '2025-01-05', transactions: 0, status: 'pending' },
]

export default function Referrals() {
  const { user } = useAuthStore()
  const [copied, setCopied] = useState(false)
  
  const referralCode = 'KING' + (user?.id?.slice(-6)?.toUpperCase() || 'ABC123')
  const referralLink = `https://kinguila.online/register?ref=${referralCode}`

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeReferrals = mockReferrals.filter(r => r.status === 'active').length
  const totalTransactions = mockReferrals.reduce((acc, r) => acc + r.transactions, 0)

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">Programa de Referências</h1>
          <p className="text-kinguila-gray">Convide amigos e ganhe descontos nas taxas</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-kinguila-gold/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-kinguila-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockReferrals.length}</p>
                <p className="text-sm text-kinguila-gray">Total Convidados</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeReferrals}</p>
                <p className="text-sm text-kinguila-gray">Referidos Ativos</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalTransactions}</p>
                <p className="text-sm text-kinguila-gray">Transações dos Referidos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-kinguila-gold/10 to-kinguila-red/10 border-kinguila-gold/30 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-14 h-14 bg-kinguila-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Share2 className="w-7 h-7 text-kinguila-gold" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Compartilhe seu Código</h2>
              <p className="text-kinguila-gray">
                A cada 3 novos utilizadores que fizerem uma transação usando seu código, 
                você recebe desconto nas taxas por 3-5 dias!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Seu Código de Referência</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-kinguila-dark rounded-xl p-4 font-mono text-xl text-kinguila-gold">
                  {referralCode}
                </div>
                <button
                  onClick={copyCode}
                  className="btn-primary p-4"
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Link de Convite</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={copyLink}
                  className="btn-secondary p-3"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Seus Referidos</h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-kinguila-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Utilizador</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Data de Registro</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Transações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-kinguila-gray">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReferrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-kinguila-border/50 last:border-0">
                      <td className="py-4 px-4 font-medium">{referral.username}</td>
                      <td className="py-4 px-4 text-kinguila-gray">{new Date(referral.joinedAt).toLocaleDateString('pt-PT')}</td>
                      <td className="py-4 px-4">{referral.transactions}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-kinguila-yellow/20 text-kinguila-yellow'
                        }`}>
                          {referral.status === 'active' ? 'Ativo' : 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
