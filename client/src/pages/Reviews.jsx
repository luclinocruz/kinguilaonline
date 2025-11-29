import { Star, ThumbsUp, MessageCircle } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuthStore } from '../store/useStore'

const mockReviews = [
  {
    id: 1,
    reviewer: 'JoaoTrader',
    rating: 5,
    comment: 'Transação rápida e sem problemas. Recomendo!',
    date: '2025-01-20',
    transactionId: 'tx-001'
  },
  {
    id: 2,
    reviewer: 'MariaExchange',
    rating: 4,
    comment: 'Boa comunicação. Transferência demorou um pouco mas foi concluída com sucesso.',
    date: '2025-01-18',
    transactionId: 'tx-002'
  },
  {
    id: 3,
    reviewer: 'PedroFX',
    rating: 5,
    comment: 'Excelente! Muito confiável.',
    date: '2025-01-15',
    transactionId: 'tx-003'
  }
]

export default function Reviews() {
  const { user } = useAuthStore()
  const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">Minhas Avaliações</h1>
          <p className="text-kinguila-gray">Veja o que outros utilizadores dizem sobre você</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <p className="text-4xl font-bold text-kinguila-gold mb-2">{averageRating.toFixed(1)}</p>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-kinguila-gold fill-kinguila-gold' : 'text-kinguila-gray'}`}
                />
              ))}
            </div>
            <p className="text-sm text-kinguila-gray">Média Geral</p>
          </div>

          <div className="card text-center">
            <p className="text-4xl font-bold mb-2">{mockReviews.length}</p>
            <p className="text-sm text-kinguila-gray">Total de Avaliações</p>
          </div>

          <div className="card text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">
              {Math.round((mockReviews.filter(r => r.rating >= 4).length / mockReviews.length) * 100)}%
            </p>
            <p className="text-sm text-kinguila-gray">Avaliações Positivas</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div key={review.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-kinguila-gold to-kinguila-yellow rounded-full flex items-center justify-center text-kinguila-black font-bold">
                    {review.reviewer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{review.reviewer}</p>
                    <p className="text-xs text-kinguila-gray">
                      {new Date(review.date).toLocaleDateString('pt-PT', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-kinguila-gold fill-kinguila-gold' : 'text-kinguila-gray'}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-kinguila-gray">{review.comment}</p>
              
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-kinguila-border">
                <button className="flex items-center space-x-1 text-sm text-kinguila-gray hover:text-kinguila-gold transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-kinguila-gray hover:text-kinguila-gold transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Responder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
