import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Bell, User, LogOut, Settings, Wallet, Search } from 'lucide-react'
import { useAuthStore } from '../store/useStore'
import logoFull from '../assets/logo-full.jpg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoFull} alt="Kinguila Online" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-kinguila-gray" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-kinguila-dark/50 border border-kinguila-border rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-kinguila-gray focus:outline-none focus:border-kinguila-gold w-64 transition-all"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/marketplace" className="text-kinguila-gray hover:text-kinguila-gold transition-colors px-3 py-2">
                  Mercado
                </Link>
                <Link to="/dashboard" className="text-kinguila-gray hover:text-kinguila-gold transition-colors px-3 py-2">
                  Dashboard
                </Link>
                
                <button className="relative p-2 text-kinguila-gray hover:text-kinguila-gold transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-kinguila-red rounded-full" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-kinguila-card border border-kinguila-border rounded-full pl-3 pr-4 py-1.5 hover:border-kinguila-gold transition-colors"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-kinguila-black" />
                    </div>
                    <span className="text-sm font-medium">{user?.username || 'User'}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-kinguila-card border border-kinguila-border rounded-xl shadow-lg py-2 animate-slide-up">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-kinguila-gray hover:text-white hover:bg-kinguila-dark transition-colors"
                      >
                        <Wallet className="w-4 h-4" />
                        <span>Minha Carteira</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-kinguila-gray hover:text-white hover:bg-kinguila-dark transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                      <hr className="my-2 border-kinguila-border" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-kinguila-red hover:bg-kinguila-dark transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-kinguila-gray hover:text-kinguila-gold transition-colors px-4 py-2">
                  Entrar
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Criar Conta
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-kinguila-gray hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-kinguila-card border-t border-kinguila-border animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link to="/marketplace" className="block py-2 text-kinguila-gray hover:text-white">
                  Mercado
                </Link>
                <Link to="/dashboard" className="block py-2 text-kinguila-gray hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 text-kinguila-red"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-kinguila-gray hover:text-white">
                  Entrar
                </Link>
                <Link to="/register" className="block btn-primary text-center">
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
