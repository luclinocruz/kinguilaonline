import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useAuthStore } from '../store/useStore'

export default function Layout({ children, showSidebar = true }) {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-kinguila-black">
      <Navbar />
      <div className="flex">
        {isAuthenticated && showSidebar && <Sidebar />}
        <main className={`flex-1 pt-16 ${isAuthenticated && showSidebar ? 'lg:ml-0' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
