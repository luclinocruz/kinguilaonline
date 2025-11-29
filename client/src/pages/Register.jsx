import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../store/useStore'
import logoFull from '../assets/logo-full.jpg'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const passwordRequirements = [
    { label: 'Mínimo 8 caracteres', valid: formData.password.length >= 8 },
    { label: 'Uma letra maiúscula', valid: /[A-Z]/.test(formData.password) },
    { label: 'Um número', valid: /\d/.test(formData.password) },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (!acceptTerms) {
      setError('Você precisa aceitar os termos de uso')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          referralCode: formData.referralCode
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta')
      }

      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoRegister = () => {
    login({ 
      id: 'demo-user',
      username: formData.username || 'Novo Utilizador', 
      email: formData.email || 'novo@kinguila.com',
      balance: 0,
      rating: 5.0
    }, 'demo-token')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-kinguila-black flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 samakaka-pattern opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-kinguila-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-kinguila-red/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logoFull} alt="Kinguila Online" className="h-16 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold font-display mb-2">Criar Conta</h1>
          <p className="text-kinguila-gray">Junte-se à comunidade Kinguila</p>
        </div>

        <div className="card">
          {error && (
            <div className="flex items-center space-x-2 bg-kinguila-red/20 border border-kinguila-red/50 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-kinguila-red flex-shrink-0" />
              <p className="text-sm text-kinguila-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Nome de usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+351 900 000 000"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle className={`w-3 h-3 ${req.valid ? 'text-green-400' : 'text-kinguila-gray'}`} />
                    <span className={`text-xs ${req.valid ? 'text-green-400' : 'text-kinguila-gray'}`}>{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-kinguila-gray" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinguila-gray mb-2">Código de Referência (Opcional)</label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="ABC123"
                className="input-field"
              />
            </div>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-kinguila-border bg-kinguila-dark text-kinguila-gold focus:ring-kinguila-gold"
              />
              <span className="text-sm text-kinguila-gray">
                Li e aceito os{' '}
                <Link to="/terms" className="text-kinguila-gold hover:underline">Termos de Uso</Link>
                {' '}e{' '}
                <Link to="/privacy" className="text-kinguila-gold hover:underline">Política de Privacidade</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-kinguila-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Criar Conta</span>
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
            onClick={handleDemoRegister}
            className="btn-secondary w-full"
          >
            Criar Conta Demo
          </button>
        </div>

        <p className="text-center text-kinguila-gray mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-kinguila-gold hover:underline font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
