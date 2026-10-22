import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const LIMITES_REINTENTOS = [1, 3, 5] as const

export default function Paso1Screen() {
  const [intentos, setIntentos] = useState(0)
  const [conectado, setConectado] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [limite, setLimite] = useState<(typeof LIMITES_REINTENTOS)[number]>(3)

  const estadoTexto = conectado
    ? '✓ Conectado a redis-01'
    : intentos === 0
      ? 'Listo para conectar'
      : `Intento ${intentos} de ${limite} fallido`
  const colorEstado = conectado ? '#2e7d32' : '#c62828'

  function manejarReintento() {
    if (conectado) return

    const nuevoIntento = intentos + 1
    setIntentos(nuevoIntento)

    if (nuevoIntento >= limite) {
      setConectado(true)
      setMensajeError('')
      return
    }

    setMensajeError(`No se pudo conectar. Quedan ${limite - nuevoIntento} reintentos.`)
  }

  function reiniciar() {
    setIntentos(0)
    setConectado(false)
    setMensajeError('')
  }

  function cambiarLimite(nuevoLimite: (typeof LIMITES_REINTENTOS)[number]) {
    setLimite(nuevoLimite)
    setIntentos(0)
    setConectado(false)
    setMensajeError('')
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

      <Text style={styles.titulo}>Paso 1 — useState: contador de reintentos</Text>
      <Text style={styles.descripcion}>
        useState declara estado reactivo. Cuando llamas al setter, React vuelve a
        renderizar el componente. En React Native, usamos Pressable en vez de
        button para recibir las interacciones.
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Sintaxis</Text>
        <Text style={styles.codigo}>
          {'const [valor, setValor] = useState<T>(valorInicial)'}
        </Text>
        <Text style={styles.detalle}>
          valor es el estado; setValor es su setter. El tipo y el valor inicial
          describen qué dato se guarda. Nunca cambies el estado directamente:
          siempre usa el setter.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Prueba el límite de reintentos</Text>
        <Text style={styles.detalle}>
          El éxito simulado ocurre cuando alcanzas el límite seleccionado.
        </Text>
        <View style={styles.opciones}>
          {LIMITES_REINTENTOS.map((opcion) => {
            const seleccionada = opcion === limite
            return (
              <Pressable
                key={opcion}
                accessibilityRole="button"
                accessibilityState={{ selected: seleccionada }}
                onPress={() => cambiarLimite(opcion)}
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
                  {opcion} {opcion === 1 ? 'intento' : 'intentos'}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <View style={[styles.tarjetaEstado, { borderColor: colorEstado }]}>
        <Text style={[styles.estado, { color: colorEstado }]}>{estadoTexto}</Text>
        <Text style={styles.detalle}>redis-01 · 10.0.2.20:6379</Text>
        <Text style={styles.detalle}>
          Progreso: {intentos}/{limite}
        </Text>
        {intentos > 0 && !conectado && (
          <Text accessibilityRole="alert" style={styles.error}>
            {mensajeError}
          </Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={conectado}
        onPress={manejarReintento}
        style={({ pressed }) => [
          styles.boton,
          conectado ? styles.botonDeshabilitado : styles.botonActivo,
          pressed && !conectado && styles.presionada,
        ]}
      >
        <Text style={styles.textoBoton}>
          {conectado ? 'Conectado' : 'Reintentar conexión'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={reiniciar}
        style={({ pressed }) => [
          styles.botonSecundario,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoSecundario}>Reiniciar simulación</Text>
      </Pressable>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Ideas clave</Text>
        <Text style={styles.detalle}>
          • Dos llamadas a useState crean valores independientes, cada uno con
          su propio setter.
        </Text>
        <Text style={styles.detalle}>
          • estadoTexto y colorEstado se calculan del estado actual; no necesitan
          otro useState.
        </Text>
        <Text style={styles.detalle}>
          • disabled desactiva Pressable cuando la conexión se completa.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Prueba esto</Text>
        <Text style={styles.detalle}>
          • Elige 1 intento para conectar al primer toque o 5 para ver el
          progreso completo.
        </Text>
        <Text style={styles.detalle}>
          • Reinicia y compara el mensaje de error con el estado conectado.
        </Text>
        <Text style={styles.detalle}>
          • Observa cómo el texto y el color cambian sin guardarse en estado
          adicional.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/paso_2')}
        style={({ pressed }) => [
          styles.boton,
          styles.botonActivo,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoBoton}>Continuar al paso 2 — useEffect</Text>
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
    flexWrap: 'wrap',
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
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: '#c62828',
    fontSize: 13,
    lineHeight: 19,
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
  botonDeshabilitado: {
    backgroundColor: '#a5d6a7',
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
