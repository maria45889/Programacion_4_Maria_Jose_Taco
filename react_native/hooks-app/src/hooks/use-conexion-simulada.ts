import { useCallback, useEffect, useState } from 'react'

export type EstadoConexion = 'desconectado' | 'conectando' | 'conectado' | 'error'

export interface ResultadoConexion {
  estado: EstadoConexion
  intentos: number
  latencia: number | null
  errorMensaje: string | null
  logs: string[]
  logsPausados: boolean
  reconectar: () => void
  reiniciar: () => void
  pausarLogs: () => void
  reanudarLogs: () => void
}

const EVENTOS_LOG = [
  'Consulta completada',
  'Conexión aceptada',
  'Checkpoint de base de datos completado',
  'Mantenimiento automático completado',
]

export function useConexionSimulada(nombreServidor: string): ResultadoConexion {
  const [estado, setEstado] = useState<EstadoConexion>('desconectado')
  const [intentos, setIntentos] = useState(0)
  const [latencia, setLatencia] = useState<number | null>(null)
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null)
  const [disparador, setDisparador] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [logsPausados, setLogsPausados] = useState(false)

  useEffect(() => {
    if (estado !== 'conectando') return

    const timeout = setTimeout(() => {
      setIntentos((numero) => numero + 1)

      if (Math.random() < 0.4) {
        setEstado('error')
        setLatencia(null)
        setErrorMensaje(`No se pudo conectar con ${nombreServidor}. Intenta nuevamente.`)
      } else {
        setEstado('conectado')
        setLatencia(Math.floor(Math.random() * 150) + 20)
        setErrorMensaje(null)
      }
    }, 1200)

    return () => clearTimeout(timeout)
  }, [disparador, estado, nombreServidor])

  useEffect(() => {
    if (estado !== 'conectado' || logsPausados) return

    const intervalo = setInterval(() => {
      const evento = EVENTOS_LOG[Math.floor(Math.random() * EVENTOS_LOG.length)]
      const detalle =
        evento === 'Consulta completada'
          ? `${evento} en ${Math.floor(Math.random() * 50) + 5} ms`
          : evento
      const hora = new Date().toLocaleTimeString()

      setLogs((anteriores) =>
        [`[${hora}] ${nombreServidor}: ${detalle}`, ...anteriores].slice(0, 50),
      )
    }, 1500)

    return () => clearInterval(intervalo)
  }, [estado, logsPausados, nombreServidor])

  const reconectar = useCallback(() => {
    setErrorMensaje(null)
    setLogsPausados(false)
    setEstado('conectando')
    setDisparador((actual) => actual + 1)
  }, [])

  const reiniciar = useCallback(() => {
    setEstado('desconectado')
    setIntentos(0)
    setLatencia(null)
    setErrorMensaje(null)
    setLogs([])
    setLogsPausados(false)
  }, [])

  const pausarLogs = useCallback(() => setLogsPausados(true), [])
  const reanudarLogs = useCallback(() => setLogsPausados(false), [])

  return {
    estado,
    intentos,
    latencia,
    errorMensaje,
    logs,
    logsPausados,
    reconectar,
    reiniciar,
    pausarLogs,
    reanudarLogs,
  }
}
