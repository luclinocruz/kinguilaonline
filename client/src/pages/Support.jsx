import { useState } from 'react'
import { MessageCircle, Mail, Phone, FileText, ChevronRight, Search, HelpCircle } from 'lucide-react'
import Layout from '../components/Layout'

const faqs = [
  {
    question: 'Como funciona a garantia de reembolso?',
    answer: 'Se a outra parte não completar a transferência dentro de 15 minutos, você recebe seu dinheiro de volta na conta de origem em até 30 minutos, automaticamente.'
  },
  {
    question: 'Qual é a taxa de transação?',
    answer: 'A taxa é 70% superior à taxa de transferência bancária imediata, ou um valor fixo de 2,95€/USD, 2000 Kz ou 2,6£, o que for mais vantajoso.'
  },
  {
    question: 'Como posso verificar minha conta?',
    answer: 'Vá às Configurações > Segurança > Verificação KYC. Você precisará enviar um documento de identidade válido e uma selfie.'
  },
  {
    question: 'Quais métodos de pagamento são aceitos?',
    answer: 'Aceitamos transferências SEPA, MBWay, Revolut, Wise para EUR; Wire Transfer, Zelle, PayPal para USD; Multicaixa Express para AOA, entre outros.'
  },
  {
    question: 'Como funciona o programa de referências?',
    answer: 'A cada 3 novos utilizadores que fizerem uma transação usando seu código, você recebe desconto nas taxas por 3-5 dias.'
  }
]

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' })

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">Central de Suporte</h1>
          <p className="text-kinguila-gray">Como podemos ajudar?</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar ajuda..."
            className="input-field pl-12 text-lg py-4"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <a href="mailto:suporte@kinguila.online" className="card hover:border-kinguila-gold group transition-all flex items-center space-x-4">
            <div className="w-12 h-12 bg-kinguila-gold/20 rounded-xl flex items-center justify-center group-hover:bg-kinguila-gold/30 transition-colors">
              <Mail className="w-6 h-6 text-kinguila-gold" />
            </div>
            <div>
              <p className="font-semibold group-hover:text-kinguila-gold transition-colors">Email</p>
              <p className="text-sm text-kinguila-gray">suporte@kinguila.online</p>
            </div>
          </a>

          <button className="card hover:border-kinguila-gold group transition-all flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-left">
              <p className="font-semibold group-hover:text-kinguila-gold transition-colors">Chat ao Vivo</p>
              <p className="text-sm text-kinguila-gray">Disponível 24/7</p>
            </div>
          </button>

          <a href="tel:+351900000000" className="card hover:border-kinguila-gold group transition-all flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold group-hover:text-kinguila-gold transition-colors">Telefone</p>
              <p className="text-sm text-kinguila-gray">+351 900 000 000</p>
            </div>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-kinguila-gold" />
              <span>Perguntas Frequentes</span>
            </h2>
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="card p-0 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-kinguila-dark/50 transition-colors"
                  >
                    <span className="font-medium text-left">{faq.question}</span>
                    <ChevronRight className={`w-5 h-5 text-kinguila-gray transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-kinguila-gray animate-slide-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-kinguila-gold" />
              <span>Abrir Ticket</span>
            </h2>
            <div className="card">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-kinguila-gray mb-2">Assunto</label>
                  <select 
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="transaction">Problema com Transação</option>
                    <option value="account">Problema com Conta</option>
                    <option value="refund">Reembolso</option>
                    <option value="verification">Verificação KYC</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-kinguila-gray mb-2">Mensagem</label>
                  <textarea
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    placeholder="Descreva seu problema em detalhe..."
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>
                <button className="btn-primary w-full">Enviar Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
