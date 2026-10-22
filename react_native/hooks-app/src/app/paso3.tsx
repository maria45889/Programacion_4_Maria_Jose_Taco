import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function Paso3Screen() {
  const inputHostRef = useRef<TextInput>(null)
  const inputPuertoRef = useRef<TextInput>(null)
  const intentosSilenciososRef = useRef(0)
  const [host, setHost] = useState('')
  const [puerto, setPuerto] = useState('22')
  const [ultimaConexion, setUltimaConexion] = useState('—')

  useEffect(() => {
    const timer = setTimeout(() => inputHostRef.current?.focus(), 250)
    return () => clearTimeout(timer)
  }, [])

  function intentarConexion() {
    intentosSilenciososRef.current += 1
    setUltimaConexion(
      `${host.trim() || 'servidor'}:${puerto || '22'} — intento #${intentosSilenciososRef.current}`,
    )
  }

  return (
    <ScrollView
      style={styles.pantalla}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contenido}
    >
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.volver, pressed && styles.presionada]}
      >
        <Text style={styles.textoSecundario}>‹ Todos los pasos</Text>
      </Pressable>

      <Text style={styles.titulo}>
        Paso 3 — useRef: foco y contador silencioso
      </Text>
      <Text style={styles.descripcion}>
        useRef crea un objeto current que persiste mientras el componente está
        montado. Cambiar su valor no provoca un re-render.
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Dos usos de useRef</Text>
        <Text style={styles.detalle}>
          • Referenciar un componente nativo: inputHostRef.current apunta al
          TextInput y permite llamar focus().
        </Text>
        <Text style={styles.detalle}>
          • Guardar un dato mutable: intentosSilenciososRef.current conserva el
          contador sin redibujar la pantalla.
        </Text>
        <Text style={styles.codigo}>
          {'Web: useRef<HTMLInputElement>(null)'}
        </Text>
        <Text style={styles.codigo}>
          {'React Native: useRef<TextInput>(null)'}
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Configurar conexión SSH</Text>
        <Text style={styles.etiqueta}>Host o IP</Text>
        <TextInput
          ref={inputHostRef}
          accessibilityLabel="Host o IP"
          style={styles.input}
          value={host}
          onChangeText={setHost}
          placeholder="10.0.2.10"
          placeholderTextColor="#8a969f"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => inputPuertoRef.current?.focus()}
        />

        <Text style={styles.etiqueta}>Puerto SSH</Text>
        <TextInput
          ref={inputPuertoRef}
          accessibilityLabel="Puerto SSH"
          style={styles.input}
          value={puerto}
          onChangeText={setPuerto}
          placeholder="22"
          placeholderTextColor="#8a969f"
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={intentarConexion}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={intentarConexion}
        style={({ pressed }) => [
          styles.boton,
          styles.botonActivo,
          pressed && styles.presionada,
        ]}
      >
        <Text style={styles.textoBoton}>Conectar</Text>
      </Pressable>

      <View style={styles.tarjetaEstado}>
        <Text style={styles.tituloTarjeta}>Último intento</Text>
        <Text style={styles.detalle}>{ultimaConexion}</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Qué ocurre al conectar</Text>
        <Text style={styles.detalle}>
          Cada toque incrementa intentosSilenciososRef.current. Esa mutación por
          sí sola no actualiza la interfaz; setUltimaConexion sí cambia estado y
          provoca un render para mostrar el resultado.
        </Text>
        <Text style={styles.detalle}>
          El host recibe el foco al entrar. Pulsa Siguiente en el teclado para
          enfocar el puerto; pulsa Listo para realizar el intento.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Prueba esto</Text>
        <Text style={styles.detalle}>
          • Quita el efecto inicial de focus() y compara el comportamiento al
          abrir esta pantalla.
        </Text>
        <Text style={styles.detalle}>
          • Escribe un host y usa Siguiente para pasar al campo del puerto sin
          tocarlo.
        </Text>
        <Text style={styles.detalle}>
          • Cambia el contador de useRef por useState y observa que cada
          incremento también desencadena un render.
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
        <Text style={styles.textoBoton}>Ir al paso 2 — useEffect</Text>
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
    borderWidth: 1,
    borderColor: '#c8def1',
    borderRadius: 10,
    backgroundColor: '#eaf3fb',
    gap: 6,
  },
  tituloTarjeta: {
    color: '#1a1a1a',
    fontSize: 15,
    fontWeight: '700',
  },
  etiqueta: {
    color: '#35566f',
    fontSize: 13,
    fontWeight: '600',
  },
  detalle: {
    color: '#546e7a',
    fontSize: 13,
    lineHeight: 19,
  },
  codigo: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f0f4f8',
    color: '#174a75',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#c7d0d8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: 15,
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
  textoBoton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  textoSecundario: {
    color: '#1565c0',
    fontSize: 14,
  },
  presionada: {
    opacity: 0.75,
  },
})
