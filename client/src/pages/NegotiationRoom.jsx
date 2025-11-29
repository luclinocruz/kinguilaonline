import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle, 
  Send, 
  Copy,
  Shield,
  Clock,
  Info,
  X
} from 'lucide-react'
import Layout from '../components/Layout'
import Timer from '../components/Timer'
import { useMarketStore, useAuthStore } from '../store/useStore'

const paymentMethods = {
  EUR: ['SEPA Transfer', 'MBWay', 'Revolut', 'Wise'],
  USD: ['Wire Transfer', 'Zelle', 'PayPal', 'Wise'],
  GBP: ['Faster Payments', 'Revolut', 'Wise'],
  AOA: ['Multicaixa Express', 'Transferência Bancária', 'Afrimoney'],
  BRL: ['PIX', 'TED', 'Transferência Bancária']
}

export default function NegotiationRoom() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { selectedSeller, clearTransaction } = useMarketStore()
  
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [waitingApproval, setWaitingApproval] = useState(false)
  const [approved, setApproved] = useState(false)
  const [buyerPaid, setBuyerPaid] = useState(false)
  const [sellerPaid, setSellerPaid] = useState(false)
  const [timerEndTime, setTimerEndTime] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  useEffect(() => {
    if (!selectedSeller) {
      navigate('/marketplace')
    }
  }, [selectedSeller, navigate])

  if (!selectedSeller) {
    return null
  }

  const receivedAmount = parseFloat(amount || 0) * selectedSeller.rate
  const fee = parseFloat(amount || 0) * 0.015

  const handleRequestNegotiation = () => {
    if (!amount || parseFloat(amount) <= 0) return
    setWaitingApproval(true)
    
    setTimeout(() => {
      setWaitingApproval(false)
      setApproved(true)
      setStep(2)
    }, 3000)
  }

  const handleConfirmPayment = () => {
    setBuyerPaid(true)
    setTimerEndTime(new Date(Date.now() + 15 * 60 * 1000))
    setStep(3)
    
    setTimeout(() => {
      setSellerPaid(true)
      setStep(4)
    }, 8000)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessages([...messages, { sender: 'me', text: message, time: new Date() }])
    setMessage('')
  }

  const handleCancel = () => {
    clearTransaction()
    navigate('/marketplace')
  }

  const handleTimerExpire = () => {
    setStep(5)
  }

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen p-4 lg:p-8 bg-kinguila-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-display">Sala de Negociação</h1>
            {step < 4 && (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-kinguila-red hover:text-red-400 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s 
                      ? 'bg-kinguila-gold text-kinguila-black' 
                      : 'bg-kinguila-card text-kinguila-gray border border-kinguila-border'
                  }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-16 h-1 mx-2 rounded ${step > s ? 'bg-kinguila-gold' : 'bg-kinguila-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">Iniciar Negociação</h2>
                  
                  <div className="bg-kinguila-dark rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center text-kinguila-black font-bold">
                          {selectedSeller.username.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{selectedSeller.username}</p>
                          <p className="text-sm text-kinguila-gray">Vendedor verificado</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-kinguila-gray">Taxa</p>
                        <p className="font-bold text-kinguila-gold">
                          1 {selectedSeller.fromCurrency} = {selectedSeller.rate} {selectedSeller.toCurrency}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-kinguila-gray mb-2">
                        Quanto deseja comprar ({selectedSeller.fromCurrency})
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="input-field text-2xl font-bold"
                        max={selectedSeller.availableAmount}
                      />
                      <p className="text-xs text-kinguila-gray mt-1">
                        Máximo disponível: {selectedSeller.availableAmount.toLocaleString()} {selectedSeller.fromCurrency}
                      </p>
                    </div>

                    <div className="bg-kinguila-dark rounded-xl p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-kinguila-gray">Você receberá</span>
                        <span className="font-bold text-xl text-kinguila-gold">
                          {receivedAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} {selectedSeller.toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-kinguila-gray">Taxa de serviço</span>
                        <span className="text-kinguila-gray">
                          {fee.toFixed(2)} {selectedSeller.fromCurrency}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleRequestNegotiation}
                      disabled={!amount || parseFloat(amount) <= 0 || waitingApproval}
                      className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {waitingApproval ? (
                        <>
                          <div className="w-5 h-5 border-2 border-kinguila-black border-t-transparent rounded-full animate-spin" />
                          <span>Aguardando aprovação...</span>
                        </>
                      ) : (
                        <>
                          <span>Solicitar Negociação</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Negociação Aprovada!</h2>
                      <p className="text-kinguila-gray">Faça sua transferência para concluir</p>
                    </div>
                  </div>

                  <div className="bg-kinguila-dark rounded-xl p-4 mb-6">
                    <p className="text-sm text-kinguila-gray mb-2">Transferir exatamente:</p>
                    <p className="text-3xl font-bold text-kinguila-gold mb-4">
                      {(parseFloat(amount) + fee).toFixed(2)} {selectedSeller.fromCurrency}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Métodos de pagamento aceites:</p>
                      <div className="flex flex-wrap gap-2">
                        {paymentMethods[selectedSeller.fromCurrency]?.map((method) => (
                          <span key={method} className="px-3 py-1 bg-kinguila-card rounded-full text-sm">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-kinguila-gold/10 border border-kinguila-gold/30 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-kinguila-gold flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-kinguila-gold mb-1">Importante</p>
                        <p className="text-kinguila-gray">
                          Após confirmar a transferência, o vendedor terá 15 minutos para confirmar o recebimento. 
                          Se não confirmar, seu dinheiro será devolvido automaticamente.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    className="btn-primary w-full"
                  >
                    Confirmar que Transferi
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="card">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-2">Aguardando Confirmação do Vendedor</h2>
                    <p className="text-kinguila-gray">O vendedor precisa confirmar que recebeu sua transferência</p>
                  </div>

                  <Timer endTime={timerEndTime} onExpire={handleTimerExpire} />

                  <div className="mt-6 p-4 bg-kinguila-dark rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm">Você transferiu</span>
                      </div>
                      <span className="font-bold">{(parseFloat(amount) + fee).toFixed(2)} {selectedSeller.fromCurrency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {sellerPaid ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-kinguila-yellow animate-pulse" />
                        )}
                        <span className="text-sm">Vendedor confirma</span>
                      </div>
                      <span className={`font-bold ${sellerPaid ? 'text-green-400' : 'text-kinguila-yellow'}`}>
                        {sellerPaid ? 'Confirmado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="card text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Transação Concluída!</h2>
                  <p className="text-kinguila-gray mb-6">
                    Você recebeu {receivedAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} {selectedSeller.toCurrency}
                  </p>

                  <div className="bg-kinguila-dark rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{amount}</p>
                        <p className="text-sm text-kinguila-gray">{selectedSeller.fromCurrency}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-kinguila-gold" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-kinguila-gold">{receivedAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
                        <p className="text-sm text-kinguila-gray">{selectedSeller.toCurrency}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      clearTransaction()
                      navigate('/dashboard')
                    }}
                    className="btn-primary"
                  >
                    Voltar ao Dashboard
                  </button>
                </div>
              )}

              {step === 5 && (
                <div className="card text-center">
                  <div className="w-20 h-20 bg-kinguila-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-kinguila-red" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Tempo Esgotado</h2>
                  <p className="text-kinguila-gray mb-6">
                    O vendedor não confirmou a tempo. Seu dinheiro será devolvido em até 30 minutos.
                  </p>
                  <button
                    onClick={() => {
                      clearTransaction()
                      navigate('/dashboard')
                    }}
                    className="btn-primary"
                  >
                    Voltar ao Dashboard
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold mb-4">Resumo</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-kinguila-gray">Vendedor</span>
                    <span className="font-medium">{selectedSeller.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinguila-gray">Taxa</span>
                    <span className="font-medium">1:{selectedSeller.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinguila-gray">Você envia</span>
                    <span className="font-medium">{amount || '0'} {selectedSeller.fromCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinguila-gray">Você recebe</span>
                    <span className="font-medium text-kinguila-gold">
                      {receivedAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} {selectedSeller.toCurrency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-kinguila-gold" />
                  <h3 className="font-semibold">Chat</h3>
                </div>
                
                <div className="h-48 bg-kinguila-dark rounded-xl p-3 mb-3 overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-center text-kinguila-gray text-sm py-8">
                      Envie uma mensagem para o vendedor
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                            msg.sender === 'me' ? 'bg-kinguila-gold text-kinguila-black' : 'bg-kinguila-card'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Mensagem..."
                    className="input-field flex-1 py-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="btn-primary p-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="card bg-kinguila-gold/10 border-kinguila-gold/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-kinguila-gold" />
                  <h3 className="font-semibold text-kinguila-gold">Proteção Kinguila</h3>
                </div>
                <p className="text-sm text-kinguila-gray">
                  Sua transação é protegida. Se algo der errado, você receberá reembolso total em até 30 minutos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Cancelar Negociação?</h3>
                <button onClick={() => setShowConfirmModal(false)} className="text-kinguila-gray hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-kinguila-gray mb-6">
                Tem certeza que deseja cancelar esta negociação? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-3">
                <button onClick={() => setShowConfirmModal(false)} className="btn-secondary flex-1">
                  Voltar
                </button>
                <button onClick={handleCancel} className="btn-danger flex-1">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
