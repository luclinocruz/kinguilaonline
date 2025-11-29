# Kinguila Online - Currency Exchange Platform

## Overview
Kinguila Online is a peer-to-peer currency exchange platform that connects buyers and sellers for secure currency transactions. The platform supports multiple currencies including EUR, USD, GBP, AOA, and BRL.

**Tagline:** Open Currency Market Exchange Platform

## Project Structure
```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SellerCard.jsx
│   │   │   ├── Timer.jsx
│   │   │   └── TransactionCard.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── NegotiationRoom.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Wallet.jsx
│   │   │   ├── MyOffers.jsx
│   │   │   ├── Referrals.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Support.jsx
│   │   ├── store/          # Zustand state management
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── kinguilaonline-Cross/   # Legacy backend (Node.js/Express)
```

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Zustand, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express, Sequelize ORM (legacy)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS with custom Kinguila design system

## Design System
### Brand Colors (Inspired by Angolan Flag)
- **Gold/Yellow**: #FFD700, #F5A623 - Primary accent, CTAs, highlights
- **Red**: #DC143C - Alerts, urgency, danger states
- **Black**: #0A0A0A, #121212, #1E1E1E - Backgrounds, cards
- **White**: #FFFFFF - Primary text
- **Gray**: #A0A0A0 - Secondary text

### Key Features Implemented
1. **Landing Page**: Hero section with platform benefits, statistics, how it works
2. **Authentication**: Login/Register with demo mode for testing
3. **Dashboard**: User wallet overview, transaction history, referral code
4. **Marketplace**: P2P seller listings with filters and sorting
5. **Negotiation Room**: Full transaction flow with 15-minute timer
6. **History**: Transaction history with filtering
7. **Wallet**: Balance management and bank accounts
8. **My Offers**: Seller offer management
9. **Referrals**: Referral program dashboard
10. **Reviews**: User rating and review system
11. **Settings**: Profile, security, notifications, preferences
12. **Support**: FAQ, contact options, ticket system

### Transaction Flow
1. Buyer selects seller from marketplace
2. Buyer enters amount and requests negotiation
3. Seller approves the negotiation
4. Buyer makes transfer and confirms
5. 15-minute timer starts for seller to confirm
6. If confirmed, transaction completes
7. If timeout, buyer receives automatic refund

## Running the Project
The frontend runs on port 5000:
```bash
cd client && npm run dev
```

## Recent Changes (Nov 2025)
- Complete React frontend rebuild with Vite
- Implemented Kinguila design system with African-inspired dark theme
- Created all core pages with full functionality
- Added 15-minute transaction timer component with proper initialization
- Implemented Zustand for state management
- Added demo login for testing without backend
- Created comprehensive sidebar navigation

## User Preferences
- Dark theme with gold/red accents (inspired by Angolan flag colors)
- Portuguese language for UI text
- Focus on security and trust messaging
- Mobile-responsive design
