import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  History, 
  Wallet, 
  Users, 
  Settings, 
  HelpCircle,
  TrendingUp,
  Star
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ArrowLeftRight, label: 'Trocar', path: '/marketplace' },
  { icon: TrendingUp, label: 'Minhas Ofertas', path: '/my-offers' },
  { icon: History, label: 'Histórico', path: '/history' },
  { icon: Wallet, label: 'Carteira', path: '/wallet' },
  { icon: Users, label: 'Referidos', path: '/referrals' },
  { icon: Star, label: 'Avaliações', path: '/reviews' },
]

const bottomItems = [
  { icon: Settings, label: 'Configurações', path: '/settings' },
  { icon: HelpCircle, label: 'Suporte', path: '/support' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-kinguila-card border-r border-kinguila-border pt-20 px-4 pb-6">
      <div className="flex-1">
        <div className="mb-6">
          <p className="text-xs font-medium text-kinguila-gray uppercase tracking-wider px-3 mb-3">
            Menu Principal
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-kinguila-gold/20 to-kinguila-yellow/10 text-kinguila-gold border-l-2 border-kinguila-gold'
                      : 'text-kinguila-gray hover:text-white hover:bg-kinguila-dark'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-kinguila-border pt-4">
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-kinguila-gold/20 text-kinguila-gold'
                    : 'text-kinguila-gray hover:text-white hover:bg-kinguila-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-br from-kinguila-gold/10 to-kinguila-red/10 rounded-2xl border border-kinguila-gold/20">
        <p className="text-sm font-semibold text-kinguila-gold mb-1">Convide Amigos</p>
        <p className="text-xs text-kinguila-gray mb-3">
          Ganhe descontos nas taxas ao convidar novos utilizadores.
        </p>
        <Link to="/referrals" className="btn-primary text-xs py-2 block text-center">
          Começar
        </Link>
      </div>
    </aside>
  )
}
