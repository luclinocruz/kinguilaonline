import { useState } from 'react'
import { User, Lock, Bell, Globe, Shield, LogOut } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuthStore } from '../store/useStore'

export default function Settings() {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    marketing: false
  })

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'preferences', label: 'Preferências', icon: Globe },
  ]

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">Configurações</h1>
          <p className="text-kinguila-gray">Gerencie sua conta e preferências</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="card p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-kinguila-gold/20 text-kinguila-gold'
                        : 'text-kinguila-gray hover:text-white hover:bg-kinguila-dark'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Informações do Perfil</h2>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center text-kinguila-black text-2xl font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{user?.username || 'Utilizador'}</p>
                    <p className="text-kinguila-gray">{user?.email || 'email@exemplo.com'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Nome de Utilizador</label>
                    <input
                      type="text"
                      defaultValue={user?.username}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Telefone</label>
                    <input
                      type="tel"
                      placeholder="+351 900 000 000"
                      className="input-field"
                    />
                  </div>
                </div>

                <button className="btn-primary mt-6">Guardar Alterações</button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Segurança</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-kinguila-dark rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-kinguila-gold" />
                        <span className="font-medium">Alterar Senha</span>
                      </div>
                      <button className="btn-secondary py-2 px-4 text-sm">Alterar</button>
                    </div>
                    <p className="text-sm text-kinguila-gray">Última alteração há 30 dias</p>
                  </div>

                  <div className="p-4 bg-kinguila-dark rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-kinguila-gold" />
                        <span className="font-medium">Autenticação de Dois Fatores</span>
                      </div>
                      <button className="btn-primary py-2 px-4 text-sm">Ativar</button>
                    </div>
                    <p className="text-sm text-kinguila-gray">Adicione uma camada extra de segurança</p>
                  </div>

                  <div className="p-4 bg-kinguila-dark rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-kinguila-gold" />
                        <span className="font-medium">Verificação KYC</span>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Verificado</span>
                    </div>
                    <p className="text-sm text-kinguila-gray">Sua identidade foi verificada</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Notificações</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Notificações por Email', desc: 'Receba atualizações no seu email' },
                    { key: 'push', label: 'Notificações Push', desc: 'Receba alertas no navegador' },
                    { key: 'transactions', label: 'Alertas de Transação', desc: 'Seja notificado sobre suas transações' },
                    { key: 'marketing', label: 'Comunicações de Marketing', desc: 'Novidades e promoções' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-kinguila-dark rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-kinguila-gray">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-kinguila-gold' : 'bg-kinguila-border'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Preferências</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Idioma</label>
                    <select className="input-field">
                      <option value="pt">Português</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Moeda Preferida</label>
                    <select className="input-field">
                      <option value="EUR">EUR - Euro</option>
                      <option value="USD">USD - Dólar Americano</option>
                      <option value="AOA">AOA - Kwanza</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kinguila-gray mb-2">Fuso Horário</label>
                    <select className="input-field">
                      <option value="Europe/Lisbon">Lisboa (GMT+0)</option>
                      <option value="Africa/Luanda">Luanda (GMT+1)</option>
                    </select>
                  </div>
                </div>

                <button className="btn-primary mt-6">Guardar Preferências</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
