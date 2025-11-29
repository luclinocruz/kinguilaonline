import { Star, Shield, Clock, TrendingUp } from 'lucide-react'

export default function SellerCard({ seller, onSelect }) {
  const ratingStars = Math.round(seller.rating || 4.5)
  
  return (
    <div className="card hover:border-kinguila-gold/50 cursor-pointer group" onClick={() => onSelect(seller)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center text-kinguila-black font-bold text-lg">
              {seller.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            {seller.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-kinguila-gold transition-colors">
              {seller.username}
            </h3>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < ratingStars ? 'text-kinguila-gold fill-kinguila-gold' : 'text-kinguila-gray'}`}
                />
              ))}
              <span className="text-xs text-kinguila-gray ml-1">({seller.totalTrades || 0})</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-kinguila-gray">Disponível</p>
          <p className="font-bold text-kinguila-gold">{seller.availableAmount?.toLocaleString()} {seller.fromCurrency}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-b border-kinguila-border">
        <div>
          <p className="text-xs text-kinguila-gray">Taxa de Câmbio</p>
          <p className="text-lg font-bold text-white">
            1 {seller.fromCurrency} = <span className="text-kinguila-gold">{seller.rate}</span> {seller.toCurrency}
          </p>
        </div>
        <div className="flex items-center space-x-1 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-medium">Ativa</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2 text-kinguila-gray">
          <Clock className="w-4 h-4" />
          <span className="text-xs">Resposta média: ~2 min</span>
        </div>
        <button className="btn-primary py-2 px-4 text-sm">
          Negociar
        </button>
      </div>
    </div>
  )
}
