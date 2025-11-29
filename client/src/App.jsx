import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore, useAdminStore } from './store/useStore'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import NegotiationRoom from './pages/NegotiationRoom'
import History from './pages/History'
import Wallet from './pages/Wallet'
import Referrals from './pages/Referrals'
import MyOffers from './pages/MyOffers'
import Reviews from './pages/Reviews'
import Settings from './pages/Settings'
import Support from './pages/Support'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminTransactions from './pages/admin/AdminTransactions'
import AdminTickets from './pages/admin/AdminTickets'
import AdminSettings from './pages/admin/AdminSettings'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useAdminStore()
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/marketplace" element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        } />
        
        <Route path="/negotiate" element={
          <ProtectedRoute>
            <NegotiationRoom />
          </ProtectedRoute>
        } />

        <Route path="/my-offers" element={
          <ProtectedRoute>
            <MyOffers />
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />

        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />

        <Route path="/referrals" element={
          <ProtectedRoute>
            <Referrals />
          </ProtectedRoute>
        } />

        <Route path="/reviews" element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        <Route path="/support" element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } />

        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/users" element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/transactions" element={
          <AdminProtectedRoute>
            <AdminTransactions />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/tickets" element={
          <AdminProtectedRoute>
            <AdminTickets />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <AdminProtectedRoute>
            <AdminSettings />
          </AdminProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
