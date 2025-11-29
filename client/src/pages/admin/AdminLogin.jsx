import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAdminStore } from '../../store/useStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { adminLogin } = useAdminStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (formData.email === 'admin@kinguila.com' && formData.password === 'admin123') {
        adminLogin({
          id: 'admin-001',
          username: 'Admin',
          email: formData.email,
          role: 'super_admin'
        })
        navigate('/admin')
      } else {
        setError('Credenciais inválidas')
      }
      setLoading(false)
    }, 500)
  }

  const handleDemoLogin = () => {
    adminLogin({
      id: 'admin-demo',
      username: 'Admin Demo',
      email: 'admin@kinguila.com',
      role: 'super_admin'
    })
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-kinguila-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-kinguila-red/10 via-transparent to-kinguila-gold/10" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-12 h-12 text-kinguila-red" />
            <div>
              <h1 className="text-2xl font-bold font-display">Kinguila Admin</h1>
              <p className="text-xs text-kinguila-gray">Painel Administrativo</p>
            </div>
          </div>
          <p className="text-kinguila-gray">Acesso restrito a administradores</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-kinguila-red/20 border border-kinguila-red rounded-xl text-kinguila-red text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@kinguila.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-kinguila-gray hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-kinguila-red hover:bg-kinguila-red/90 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-kinguila-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-kinguila-card text-kinguila-gray">ou</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-kinguila-dark hover:bg-kinguila-border text-kinguila-gold border border-kinguila-gold/30 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Entrar como Demo
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-kinguila-gray mt-6">
          Credenciais demo: admin@kinguila.com / admin123
        </p>
      </div>
    </div>
  )
}
