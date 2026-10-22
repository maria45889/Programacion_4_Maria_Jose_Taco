import { useEffect, useState } from 'react'

interface ResumenPaquetes {
  enviados: number
  perdidos: number
}

export interface ResultadoPingMonitor {
  latencia: number | null
  paquetesPerdidos: number
  alerta: boolean
}

export function usePingMonitor(ip: string, intervaloMs: number): ResultadoPingMonitor {
  const [latencia, setLatencia] = useState<number | null>(null)
  const [resumen, setResumen] = useState<ResumenPaquetes>({ enviados: 0, perdidos: 0 })

  useEffect(() => {
    if (!ip.trim()) {
      throw new Error('La dirección del servidor no puede estar vacía.')
    }
    if (!Number.isFinite(intervaloMs) || intervaloMs <= 0) {
      throw new RangeError('El intervalo de monitoreo debe ser mayor que cero.')
    }

    const intervalo = setInterval(() => {
      const perdido = Math.random() < 0.15
      setLatencia(perdido ? null : Math.floor(Math.random() * 210) + 10)
      setResumen((actual) => ({
        enviados: actual.enviados + 1,
        perdidos: actual.perdidos + (perdido ? 1 : 0),
      }))
    }, intervaloMs)

    return () => clearInterval(intervalo)
  }, [intervaloMs, ip])

  const paquetesPerdidos =
    resumen.enviados === 0 ? 0 : (resumen.perdidos / resumen.enviados) * 100

  return {
    latencia,
    paquetesPerdidos,
    alerta: (latencia !== null && latencia > 150) || paquetesPerdidos > 20,
  }
}
