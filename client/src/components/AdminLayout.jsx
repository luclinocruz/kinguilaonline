import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  ArrowLeftRight, 
  Ticket, 
  Settings, 
  LogOut,
  Bell,
  Shield,
  ChevronDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useAdminStore } from '../store/useStore'

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Utilizadores' },
  { path: '/admin/transactions', icon: ArrowLeftRight, label: 'Transações' },
  { path: '/admin/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/admin/settings', icon: Settings, label: 'Configurações' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, adminLogout } = useAdminStore()

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-kinguila-black flex">
      <aside className="w-64 bg-kinguila-card border-r border-kinguila-border fixed h-full">
        <div className="p-6 border-b border-kinguila-border">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-kinguila-red" />
            <div>
              <h1 className="font-bold text-lg">Kinguila Admin</h1>
              <p className="text-xs text-kinguila-gray">Painel Administrativo</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-kinguila-red/20 text-kinguila-red'
                    : 'text-kinguila-gray hover:text-white hover:bg-kinguila-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-kinguila-border">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-kinguila-red to-kinguila-gold rounded-full flex items-center justify-center text-white font-bold">
              {admin?.username?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{admin?.username || 'Admin'}</p>
              <p className="text-xs text-kinguila-gray">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-kinguila-gray hover:text-kinguila-red hover:bg-kinguila-red/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <header className="h-16 bg-kinguila-card border-b border-kinguila-border flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h2 className="font-semibold">
              {menuItems.find(m => m.path === location.pathname)?.label || 'Admin'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-kinguila-dark rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-kinguila-gray" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-kinguila-red rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
