import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

type EstadoPing = 'pinging' | 'ok' | 'timeout' | 'inactivo'
const INTERVALOS_PING = [500, 2000] as const

export default function Paso2Screen() {
  const [latencia, setLatencia] = useState<number | null>(null)
  const [estado, setEstado] = useState<EstadoPing>('inactivo')
  const [activo, setActivo] = useState(false)
  const [ciclos, setCiclos] = useState(0)
  const [paquetesPerdidos, setPaquetesPerdidos] = useState(0)
  const [intervaloMs, setIntervaloMs] =
    useState<(typeof INTERVALOS_PING)[number]>(2000)

  useEffect(() => {
    if (!activo) return

    const respuestasPendientes = new Set<ReturnType<typeof setTimeout>>()
    const intervalo = setInterval(() => {
      setEstado('pinging')
      const respuesta = setTimeout(() => {
        respuestasPendientes.delete(respuesta)
        const perdido = Math.random() < 0.15

        if (perdido) {
          setLatencia(null)
          setEstado('timeout')
          setPaquetesPerdidos((anteriores) => anteriores + 1)
        } else {
          setLatencia(Math.floor(Math.random() * 191) + 10)
          setEstado('ok')
        }

        setCiclos((anteriores) => anteriores + 1)
      }, 400)
      respuestasPendientes.add(respuesta)
    }, intervaloMs)

    return () => {
      clearInterval(intervalo)
      respuestasPendientes.forEach(clearTimeout)
    }
  }, [activo, intervaloMs])

  const coloresEstado: Record<EstadoPing, string> = {
    pinging: '#1565c0',
    ok: '#2e7d32',
    timeout: '#c62828',
    inactivo: '#757575',
  }
  const porcentajePerdida =
    ciclos === 0 ? '0.0' : ((paquetesPerdidos / ciclos) * 100).toFixed(1)

  function cambiarMonitoreo() {
    if (activo) {
      setActivo(false)
      setEstado('inactivo')
      return
    }
    setActivo(true)
    setEstado('pinging')
  }

  function reiniciarEstadisticas() {
    setActivo(false)
    setEstado('inactivo')
    setLatencia(null)
    setCiclos(0)
    setPaquetesPerdidos(0)
  }

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.volver, pressed && styles.presionada]}
      >
        <Text style={styles.textoSecundario}>‹ Todos los pasos</Text>
      </Pressable>

      <Text style={styles.titulo}>Paso 2 — useEffect: ping periódico</Text>
      <Text style={styles.descripcion}>
        useEffect ejecuta efectos secundarios después del render. Su array de
        dependencias controla cuándo se repite el efecto.
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Dependencias y limpieza</Text>
        <Text style={styles.codigo}>
          {'useEffect(() => { /* efecto */ return () => limpiar() }, [activo])'}
        </Text>
        <Text style={styles.detalle}>
          [] se ejecuta al montar; [a, b], cuando cambian esas dependencias; sin
          array, después de cada render. La limpieza cancela timers y
          suscripciones al cambiar dependencias o desmontar.
        </Text>
        <Text style={styles.detalle}>
          Este monitor usa [activo, intervaloMs]. Al detenerlo, cambiar su
          frecuencia o salir de la pantalla, cancela el intervalo y las
          respuestas pendientes.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Frecuencia del ping</Text>
        <View style={styles.opciones}>
          {INTERVALOS_PING.map((opcion) => {
            const seleccionada = opcion === intervaloMs
            return (
              <Pressable
                key={opcion}
                accessibilityRole="button"
                accessibilityState={{ selected: seleccionada }}
                onPress={() => setIntervaloMs(opcion)}
                style={({ pressed }) => [
                  styles.opcion,
                  seleccionada && styles.opcionSeleccionada,
                  pressed && styles.presionada,
                ]}
              >
                <Text
                  style={[
                    styles.textoOpcion,
                    seleccionada && styles.textoOpcionSeleccionada,
                  ]}
                >
                  {opcion} ms
                </Text>
              </Pressable>
            )
          })}
        </View>
        <Text style={styles.detalle}>
          Elige 500 ms para ver ciclos más frecuentes o 2000 ms para el ritmo
          normal.
        </Text>
      </View>

      <View style={[styles.tarjetaEstado, { borderColor: coloresEstado[estado] }]}>
        <Text style={[styles.estado, { color: coloresEstado[estado] }]}>
          {estado.toUpperCase()}
        </Text>
        <Text style={styles.latencia}>
          {latencia !== null ? `${latencia} ms` : '— ms'}
        </Text>
        <Text style={styles.detalle}>Ciclos completados: {ciclos}</Text>
        <Text style={styles.detalle}>
          Paquetes perdidos: {paquetesPerdidos} ({porcentajePerdida}%)
        </Text>
        <Text style={styles.detalle}>nginx-01 · 10.0.2.30 · Puerto 80</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={cambiarMonitoreo}
        style={({ pressed }) => [
          styles.boton,
          activo ? styles.botonDetener : styles.botonActivo,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoBoton}>
          {activo ? 'Detener ping' : 'Iniciar ping'}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={reiniciarEstadisticas}
        style={({ pressed }) => [
          styles.botonSecundario,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoSecundario}>Reiniciar estadísticas</Text>
      </Pressable>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Qué observar y probar</Text>
        <Text style={styles.detalle}>
          • El setter funcional de ciclos usa el valor más reciente y evita
          cierres obsoletos dentro del intervalo.
        </Text>
        <Text style={styles.detalle}>
          • La pérdida porcentual es (paquetes perdidos / ciclos) × 100.
        </Text>
        <Text style={styles.detalle}>
          • Eliminar [activo] de las dependencias impide que el efecto responda
          correctamente al botón de iniciar o detener.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/paso_1')}
        style={({ pressed }) => [
          styles.boton,
          styles.botonActivo,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoBoton}>Volver al paso 1 — useState</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
    gap: 14,
  },
  volver: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  titulo: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: '700',
  },
  descripcion: {
    color: '#546e7a',
    fontSize: 14,
    lineHeight: 20,
  },
  tarjeta: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  tarjetaEstado: {
    width: '100%',
    padding: 16,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  tituloTarjeta: {
    color: '#1a1a1a',
    fontSize: 15,
    fontWeight: '700',
  },
  codigo: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f0f4f8',
    color: '#174a75',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  detalle: {
    color: '#546e7a',
    fontSize: 13,
    lineHeight: 19,
  },
  opciones: {
    flexDirection: 'row',
    gap: 8,
  },
  opcion: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 18,
  },
  opcionSeleccionada: {
    backgroundColor: '#1565c0',
  },
  textoOpcion: {
    color: '#1565c0',
    fontSize: 12,
    fontWeight: '600',
  },
  textoOpcionSeleccionada: {
    color: '#ffffff',
  },
  estado: {
    fontSize: 15,
    fontWeight: '700',
  },
  latencia: {
    color: '#1565c0',
    fontSize: 30,
    fontWeight: '700',
  },
  boton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonActivo: {
    backgroundColor: '#1565c0',
  },
  botonDetener: {
    backgroundColor: '#c62828',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  botonSecundario: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textoSecundario: {
    color: '#1565c0',
    fontSize: 14,
  },
  presionada: {
    opacity: 0.75,
  },
})
