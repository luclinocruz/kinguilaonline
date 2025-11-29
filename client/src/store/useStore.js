import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      
      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),
    }),
    {
      name: 'kinguila-auth',
    }
  )
)

export const useMarketStore = create((set, get) => ({
  sellers: [],
  selectedSeller: null,
  currentTransaction: null,
  exchangeRates: {},
  
  setSellers: (sellers) => set({ sellers }),
  
  setSelectedSeller: (seller) => set({ selectedSeller: seller }),
  
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction }),
  
  setExchangeRates: (rates) => set({ exchangeRates: rates }),
  
  clearTransaction: () => set({ selectedSeller: null, currentTransaction: null }),
}))

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => ({
    notifications: [{ id: Date.now(), ...notification, read: false }, ...state.notifications],
    unreadCount: state.unreadCount + 1,
  })),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))

export const useAdminStore = create(
  persist(
    (set, get) => ({
      admin: null,
      isAdminAuthenticated: false,
      
      adminLogin: (admin) => set({ admin, isAdminAuthenticated: true }),
      
      adminLogout: () => set({ admin: null, isAdminAuthenticated: false }),
    }),
    {
      name: 'kinguila-admin',
    }
  )
)
