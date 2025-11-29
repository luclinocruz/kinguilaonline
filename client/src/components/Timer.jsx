import { useState, useEffect, useCallback } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

export default function Timer({ endTime, onExpire }) {
  const calculateTimeLeft = useCallback(() => {
    if (!endTime) {
      return { minutes: 15, seconds: 0, expired: false, waiting: true }
    }
    
    const difference = new Date(endTime) - new Date()
    if (difference <= 0) {
      return { minutes: 0, seconds: 0, expired: true, waiting: false }
    }
    
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
      waiting: false
    }
  }, [endTime])

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft())

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    
    if (!endTime) return

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      if (newTimeLeft.expired) {
        clearInterval(timer)
        onExpire && onExpire()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onExpire, calculateTimeLeft])

  const isUrgent = timeLeft.minutes < 5 && !timeLeft.expired && !timeLeft.waiting
  const isCritical = timeLeft.minutes < 2 && !timeLeft.expired && !timeLeft.waiting

  if (timeLeft.expired) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-kinguila-red/20 border border-kinguila-red rounded-2xl">
        <AlertTriangle className="w-12 h-12 text-kinguila-red mb-2" />
        <p className="text-kinguila-red font-bold text-xl">Tempo Esgotado</p>
        <p className="text-kinguila-gray text-sm mt-1">A transação foi cancelada</p>
      </div>
    )
  }

  if (timeLeft.waiting) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-kinguila-card border border-kinguila-gold/30 rounded-2xl">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-6 h-6 text-kinguila-gold animate-pulse" />
          <span className="text-sm text-kinguila-gray">Aguardando confirmação</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-5xl font-bold font-display text-kinguila-gold">15</div>
          <span className="text-3xl font-bold text-kinguila-gold">:</span>
          <div className="text-5xl font-bold font-display text-kinguila-gold">00</div>
        </div>

        <p className="text-xs text-kinguila-gray mt-3">
          O cronómetro iniciará após a primeira transferência
        </p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
      isCritical 
        ? 'bg-kinguila-red/20 border-kinguila-red animate-pulse' 
        : isUrgent 
          ? 'bg-kinguila-yellow/20 border-kinguila-yellow' 
          : 'bg-kinguila-card border-kinguila-gold/30'
    }`}>
      <div className="flex items-center space-x-2 mb-2">
        <Clock className={`w-6 h-6 ${isCritical ? 'text-kinguila-red' : 'text-kinguila-gold'}`} />
        <span className="text-sm text-kinguila-gray">Tempo restante</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className={`text-5xl font-bold font-display ${
          isCritical ? 'text-kinguila-red' : isUrgent ? 'text-kinguila-yellow' : 'text-kinguila-gold'
        }`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className={`text-3xl font-bold ${
          isCritical ? 'text-kinguila-red' : 'text-kinguila-gold'
        } animate-pulse`}>:</span>
        <div className={`text-5xl font-bold font-display ${
          isCritical ? 'text-kinguila-red' : isUrgent ? 'text-kinguila-yellow' : 'text-kinguila-gold'
        }`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>

      <p className="text-xs text-kinguila-gray mt-3">
        {isCritical 
          ? 'Complete a transferência agora!' 
          : isUrgent 
            ? 'Falta pouco tempo!' 
            : 'para completar a transferência'}
      </p>
    </div>
  )
}
