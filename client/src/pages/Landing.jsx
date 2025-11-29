import { Link } from 'react-router-dom'
import { 
  Shield, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Globe,
  TrendingUp,
  Lock,
  RefreshCw
} from 'lucide-react'
import logoFull from '../assets/logo-full.jpg'

const features = [
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Sistema de garantia que protege sua transação. Reembolso total em 15 minutos se algo der errado.'
  },
  {
    icon: Clock,
    title: 'Rápido e Eficiente',
    description: 'Troque moedas em minutos, não dias. Processo automatizado e simples.'
  },
  {
    icon: Users,
    title: 'Comunidade Verificada',
    description: 'Traders verificados com avaliações reais. Escolha os melhores parceiros de câmbio.'
  },
  {
    icon: Globe,
    title: 'Múltiplas Moedas',
    description: 'EUR, USD, GBP, AOA, BRL e muito mais. Conectando comunidades lusófonas.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Escolha um Vendedor',
    description: 'Navegue pela lista de vendedores, compare taxas e escolha o melhor para você.'
  },
  {
    number: '02',
    title: 'Inicie a Negociação',
    description: 'Indique o montante desejado e aguarde a confirmação do vendedor.'
  },
  {
    number: '03',
    title: 'Transfira com Segurança',
    description: 'Faça sua transferência. O cronómetro de 15 minutos garante que ambos completem.'
  },
  {
    number: '04',
    title: 'Receba seu Dinheiro',
    description: 'Após ambas as partes confirmarem, o dinheiro é enviado para sua conta.'
  }
]

const stats = [
  { value: '50K+', label: 'Transações' },
  { value: '15K+', label: 'Utilizadores' },
  { value: '99.9%', label: 'Taxa de Sucesso' },
  { value: '< 5min', label: 'Tempo Médio' }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-kinguila-black">
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kinguila-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-kinguila-red/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <img src={logoFull} alt="Kinguila Online" className="h-24 mx-auto mb-6" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 animate-slide-up">
            <span className="text-white">Troque Moedas</span>
            <br />
            <span className="text-gradient">Com Segurança</span>
          </h1>
          
          <p className="text-lg md:text-xl text-kinguila-gray max-w-2xl mx-auto mb-10 animate-fade-in">
            Plataforma peer-to-peer para câmbio de moedas. Conectamos pessoas que querem trocar EUR, USD, GBP, AOA e muito mais. 
            <span className="text-kinguila-gold"> Rápido, seguro e confiável.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
              <span>Começar Agora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/marketplace" className="btn-secondary text-lg px-8 py-4">
              Ver Mercado
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="text-3xl md:text-4xl font-bold text-kinguila-gold">{stat.value}</p>
                <p className="text-sm text-kinguila-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-kinguila-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Por Que <span className="text-gradient">Kinguila Online</span>?
            </h2>
            <p className="text-kinguila-gray max-w-2xl mx-auto">
              Acabamos com as burlas e perigos do câmbio informal. Transacione a partir da segurança da sua casa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index} 
                  className="card group hover:border-kinguila-gold transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-kinguila-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-kinguila-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-kinguila-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-kinguila-gray text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Como <span className="text-gradient">Funciona</span>
            </h2>
            <p className="text-kinguila-gray max-w-2xl mx-auto">
              Em 4 passos simples, troque suas moedas com total segurança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-kinguila-gold/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-kinguila-gray text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full">
                    <ArrowRight className="w-6 h-6 text-kinguila-gold/30 absolute right-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-kinguila-dark">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-kinguila-gold/10 to-kinguila-red/10 border-kinguila-gold/30 p-8 md:p-12 text-center">
            <Lock className="w-16 h-16 text-kinguila-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Garantia de <span className="text-gradient">Reembolso</span>
            </h2>
            <p className="text-kinguila-gray text-lg max-w-2xl mx-auto mb-8">
              Se a outra parte não completar a transferência dentro de <span className="text-kinguila-gold font-semibold">15 minutos</span>, 
              você recebe seu dinheiro de volta na conta de origem em até <span className="text-kinguila-gold font-semibold">30 minutos</span>. 
              Sem complicações.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Reembolso Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Automático</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Sem Burocracia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Pronto para <span className="text-gradient">Começar</span>?
          </h2>
          <p className="text-kinguila-gray text-lg mb-8">
            Junte-se a milhares de utilizadores que já trocam moedas de forma segura.
          </p>
          <Link to="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-2">
            <span>Criar Conta Gratuita</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-kinguila-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <img src={logoFull} alt="Kinguila Online" className="h-10" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-kinguila-gray">
              <Link to="/about" className="hover:text-kinguila-gold transition-colors">Sobre</Link>
              <Link to="/terms" className="hover:text-kinguila-gold transition-colors">Termos</Link>
              <Link to="/privacy" className="hover:text-kinguila-gold transition-colors">Privacidade</Link>
              <Link to="/support" className="hover:text-kinguila-gold transition-colors">Suporte</Link>
            </div>
            <p className="text-sm text-kinguila-gray">
              © 2025 Kinguila Online. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
