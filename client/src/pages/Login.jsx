import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/useStore'
import logoFull from '../assets/logo-full.jpg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login')
      }

      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    login({ 
      id: 'demo-user',
      username: 'Demo User', 
      email: 'demo@kinguila.com',
      balance: 5000,
      rating: 4.8
    }, 'demo-token')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-kinguila-black flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 samakaka-pattern opacity-20" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-kinguila-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-kinguila-red/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logoFull} alt="Kinguila Online" className="h-16 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold font-display mb-2">Bem-vindo de volta</h1>
          <p className="text-kinguila-gray">Entre na sua conta para continuar</p>
        </div>

        <div className="card">
          {error && (
            <div className="flex items-center space-x-2 bg-kinguila-red/20 border border-kinguila-red/50 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-kinguila-red flex-shrink-0" />
              <p className="text-sm text-kinguila-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-kinguila-gray hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-kinguila-border bg-kinguila-dark text-kinguila-gold focus:ring-kinguila-gold" />
                <span className="text-sm text-kinguila-gray">Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-kinguila-gold hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-kinguila-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-kinguila-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-kinguila-card text-kinguila-gray">ou</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="btn-secondary w-full"
          >
            Entrar como Demo
          </button>
        </div>

        <p className="text-center text-kinguila-gray mt-6">
          Não tem conta?{' '}
          <Link to="/register" className="text-kinguila-gold hover:underline font-medium">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
