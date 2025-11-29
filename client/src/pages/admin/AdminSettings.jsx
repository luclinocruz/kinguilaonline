import { useState } from 'react'
import { Save, DollarSign, Percent, Clock, Shield, Bell, Globe } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    transactionFeePercent: 0.7,
    minTransactionFee: 2.95,
    timerDuration: 15,
    maxTransactionAmount: 10000,
    minTransactionAmount: 10,
    referralBonus: 3,
    kycRequired: true,
    emailNotifications: true,
    maintenanceMode: false,
  })

  const [rates, setRates] = useState({
    EUR_AOA: 125.50,
    USD_EUR: 0.92,
    GBP_EUR: 1.16,
    USD_AOA: 115.46,
  })

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold">Configurações da Plataforma</h1>
          <p className="text-kinguila-gray">Gerencie as configurações gerais do Kinguila Online</p>
        </div>

        <div className="grid gap-6">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-kinguila-gold/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-kinguila-gold" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Taxas de Transação</h2>
                <p className="text-sm text-kinguila-gray">Configure as taxas cobradas nas transações</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">Taxa Percentual (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.transactionFeePercent}
                  onChange={(e) => setSettings({ ...settings, transactionFeePercent: parseFloat(e.target.value) })}
                  className="input-field"
                />
                <p className="text-xs text-kinguila-gray mt-1">70% superior à taxa bancária padrão</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">Taxa Mínima (EUR)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.minTransactionFee}
                  onChange={(e) => setSettings({ ...settings, minTransactionFee: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Percent className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Taxas de Câmbio</h2>
                <p className="text-sm text-kinguila-gray">Configure as taxas base de câmbio</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">EUR → AOA</label>
                <input
                  type="number"
                  step="0.01"
                  value={rates.EUR_AOA}
                  onChange={(e) => setRates({ ...rates, EUR_AOA: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">USD → EUR</label>
                <input
                  type="number"
                  step="0.01"
                  value={rates.USD_EUR}
                  onChange={(e) => setRates({ ...rates, USD_EUR: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">GBP → EUR</label>
                <input
                  type="number"
                  step="0.01"
                  value={rates.GBP_EUR}
                  onChange={(e) => setRates({ ...rates, GBP_EUR: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">USD → AOA</label>
                <input
                  type="number"
                  step="0.01"
                  value={rates.USD_AOA}
                  onChange={(e) => setRates({ ...rates, USD_AOA: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-kinguila-yellow/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-kinguila-yellow" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Limites de Transação</h2>
                <p className="text-sm text-kinguila-gray">Configure limites e duração das transações</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">Duração do Timer (min)</label>
                <input
                  type="number"
                  value={settings.timerDuration}
                  onChange={(e) => setSettings({ ...settings, timerDuration: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">Valor Mínimo (EUR)</label>
                <input
                  type="number"
                  value={settings.minTransactionAmount}
                  onChange={(e) => setSettings({ ...settings, minTransactionAmount: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kinguila-gray mb-2">Valor Máximo (EUR)</label>
                <input
                  type="number"
                  value={settings.maxTransactionAmount}
                  onChange={(e) => setSettings({ ...settings, maxTransactionAmount: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Segurança e Sistema</h2>
                <p className="text-sm text-kinguila-gray">Configurações de segurança e manutenção</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-kinguila-dark rounded-xl">
                <div>
                  <p className="font-medium">Verificação KYC Obrigatória</p>
                  <p className="text-sm text-kinguila-gray">Exigir verificação para transações</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, kycRequired: !settings.kycRequired })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.kycRequired ? 'bg-kinguila-gold' : 'bg-kinguila-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.kycRequired ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-kinguila-dark rounded-xl">
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-kinguila-gray">Enviar emails de sistema</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-kinguila-gold' : 'bg-kinguila-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-kinguila-red/10 border border-kinguila-red/30 rounded-xl">
                <div>
                  <p className="font-medium">Modo de Manutenção</p>
                  <p className="text-sm text-kinguila-gray">Desativar acesso público</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.maintenanceMode ? 'bg-kinguila-red' : 'bg-kinguila-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Guardar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
