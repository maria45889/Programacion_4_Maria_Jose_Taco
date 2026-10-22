import { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { useConexionSimulada } from '@/hooks/use-conexion-simulada'
import type { EstadoConexion } from '@/hooks/use-conexion-simulada'
import { usePingMonitor } from '@/hooks/use-ping-monitor'

type Paso = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

const PASOS: { numero: Paso; titulo: string }[] = [
  { numero: 1, titulo: 'useState' },
  { numero: 2, titulo: 'useEffect' },
  { numero: 3, titulo: 'useRef' },
  { numero: 4, titulo: 'Hooks nativos' },
  { numero: 5, titulo: 'Custom hook' },
  { numero: 6, titulo: 'Ejemplo completo' },
  { numero: 7, titulo: 'Monitor' },
  { numero: 8, titulo: 'Formulario SSH' },
  { numero: 9, titulo: 'Panel adaptable' },
  { numero: 10, titulo: 'Logs en vivo' },
  { numero: 11, titulo: 'Resumen' },
]

const ESTILOS_ESTADO: Record<EstadoConexion, { color: string; etiqueta: string }> = {
  desconectado: { color: '#757575', etiqueta: 'Desconectado' },
  conectando: { color: '#1565c0', etiqueta: 'Conectando…' },
  conectado: { color: '#2e7d32', etiqueta: 'Conectado' },
  error: { color: '#c62828', etiqueta: 'Error' },
}

const SERVIDORES = [
  { nombre: 'web-01', ip: '10.0.2.10', estado: 'activo' },
  { nombre: 'db-01', ip: '10.0.2.20', estado: 'activo' },
  { nombre: 'cache-01', ip: '10.0.2.30', estado: 'timeout' },
  { nombre: 'backup-01', ip: '10.0.2.40', estado: 'activo' },
]

export default function HooksScreen() {
  const [paso, setPaso] = useState<Paso>(0)
  const [mostrarPanorama, setMostrarPanorama] = useState(false)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.encabezado}>
        <Text style={styles.tituloPagina}>Hooks de React Native</Text>
        <Text style={styles.subtituloPagina}>
          Aprende estado, efectos, referencias y hooks del entorno móvil.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: mostrarPanorama }}
          onPress={() => setMostrarPanorama((visible) => !visible)}
          style={({ pressed }) => [
            styles.botonPanorama,
            pressed && styles.presionado,
          ]}
        >
          <Text style={styles.textoPanorama}>
            {mostrarPanorama ? 'Ocultar panorama' : '¿Qué son los hooks?'}
          </Text>
        </Pressable>
        {mostrarPanorama && <PanoramaHooks />}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorPasos}
        >
          {PASOS.map(({ numero, titulo }) => {
            const seleccionado = paso === numero
            return (
              <Pressable
                key={numero}
                accessibilityRole="button"
                accessibilityState={{ selected: seleccionado }}
                onPress={() => {
                  if (numero === 1) {
                    router.push('/paso_1')
                  } else if (numero === 2) {
                    router.push('/paso_2')
                  } else if (numero === 3) {
                    router.push('/paso_3')
                  } else {
                    setPaso(numero)
                  }
                }}
                style={({ pressed }) => [
                  styles.botonPaso,
                  seleccionado && styles.botonPasoSeleccionado,
                  pressed && styles.presionado,
                ]}
              >
                <Text
                  style={[
                    styles.textoPaso,
                    seleccionado && styles.textoPasoSeleccionado,
                  ]}
                >
                  {numero}. {titulo}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.contenido}>
        {paso === 0 && <InicioModulo />}
        {paso === 4 && <Paso4 />}
        {paso === 5 && <Paso5 />}
        {paso === 6 && <Paso6 />}
        {paso === 7 && <EjercicioMonitor />}
        {paso === 8 && <EjercicioFormularioSSH />}
        {paso === 9 && <EjercicioPanelAdaptable />}
        {paso === 10 && <EjercicioLogs />}
        {paso === 11 && <ResumenPagina />}
      </View>
    </SafeAreaView>
  )
}

function InicioModulo() {
  return (
    <ScrollView style={styles.pasoScroll} contentContainerStyle={styles.pasoContenido}>
      <Text style={styles.titulo}>Módulo 3 — Hooks</Text>
      <Text style={styles.descripcion}>
        Elige uno de los seis pasos del módulo o practica con los ejercicios
        interactivos.
      </Text>
      <BloqueAprendizaje
        titulo="Pasos del tutorial"
        puntos={[
          '1. useState: estado y contador de reintentos.',
          '2. useEffect: ping periódico y limpieza de timers.',
          '3. useRef: foco en TextInput y valores mutables.',
          '4–6. Hooks nativos, custom hooks y ejemplo combinado.',
        ]}
      />
      <View style={styles.filaBotones}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/paso_1')}
          style={({ pressed }) => [
            styles.boton,
            styles.botonActivo,
            pressed && styles.presionado,
            styles.botonFlexible,
          ]}
        >
          <Text style={styles.textoBoton}>Abrir paso 1 — useState</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/paso_2')}
          style={({ pressed }) => [
            styles.boton,
            styles.botonActivo,
            pressed && styles.presionado,
            styles.botonFlexible,
          ]}
        >
          <Text style={styles.textoBoton}>Abrir paso 2 — useEffect</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/paso_3')}
          style={({ pressed }) => [
            styles.boton,
            styles.botonActivo,
            pressed && styles.presionado,
            styles.botonFlexible,
          ]}
        >
          <Text style={styles.textoBoton}>Abrir paso 3 — useRef</Text>
        </Pressable>
      </View>
      <BloqueAprendizaje
        titulo="Ejercicios prácticos"
        puntos={[
          'Monitor multi-servicio con umbral de alerta.',
          'Formulario SSH con navegación por teclado.',
          'Panel de servidores adaptable a orientación y tema.',
          'Logs en tiempo real que puedes pausar y reanudar.',
        ]}
      />
      <Text style={styles.detalle}>
        Usa los botones superiores para abrir los pasos 4–6, los ejercicios y el
        resumen del módulo.
      </Text>
    </ScrollView>
  )
}

function PanoramaHooks() {
  return (
    <View style={styles.panorama}>
      <Text style={styles.panoramaTexto}>
        Los hooks permiten a los componentes funcionales usar estado y efectos
        del ciclo de vida. React Native comparte los hooks de React y añade
        herramientas que reaccionan al dispositivo.
      </Text>
      <View style={styles.filaPanorama}>
        <View style={styles.columnaPanorama}>
          <Text style={styles.tituloPanorama}>Hooks de React</Text>
          <Text style={styles.detallePanorama}>useState · estado reactivo</Text>
          <Text style={styles.detallePanorama}>useEffect · efectos secundarios</Text>
          <Text style={styles.detallePanorama}>useRef · referencias mutables</Text>
          <Text style={styles.detallePanorama}>useContext · contexto compartido</Text>
        </View>
        <View style={styles.columnaPanorama}>
          <Text style={styles.tituloPanorama}>Hooks del entorno móvil</Text>
          <Text style={styles.detallePanorama}>useWindowDimensions · pantalla</Text>
          <Text style={styles.detallePanorama}>useColorScheme · tema del sistema</Text>
          <Text style={styles.detallePanorama}>useSafeAreaInsets · márgenes seguros</Text>
          <Text style={styles.detallePanorama}>Expo SDK · hooks de módulos</Text>
        </View>
      </View>
      <Text style={styles.panoramaTexto}>
        Los primeros pasos repasan conceptos de React con ejemplos móviles;
        después practicarás hooks propios del dispositivo y custom hooks.
      </Text>
    </View>
  )
}

function Paso4() {
  const { width, height, scale, fontScale } = useWindowDimensions()
  const esquema = useColorScheme()
  const insets = useSafeAreaInsets()
  const oscuro = esquema === 'dark'
  const colores = {
    fondo: oscuro ? '#0d1b2a' : '#f5f5f5',
    tarjeta: oscuro ? '#1a2a3a' : '#ffffff',
    texto: oscuro ? '#e8eaed' : '#1a1a1a',
    detalle: oscuro ? '#b0bec5' : '#666666',
    borde: oscuro ? '#2d3e50' : '#e0e0e0',
  }
  const anchoDisponible = Math.max(width - 40 - insets.left - insets.right, 0)
  const columnas = width > 600 ? 2 : 1
  const anchoTarjeta = (anchoDisponible - (columnas - 1) * 12) / columnas

  return (
    <ScrollView
      style={[styles.pasoScroll, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.pasoContenido}
    >
      <Text style={[styles.titulo, { color: colores.texto }]}>
        Hooks nativos: pantalla y tema
      </Text>
      <Text style={[styles.descripcion, { color: colores.detalle }]}>
        Las dimensiones y el tema se actualizan al cambiar la ventana o los ajustes del sistema.
      </Text>
      <BloqueAprendizaje
        titulo="Qué aprenderás"
        puntos={[
          'useWindowDimensions reacciona al giro y al cambio de tamaño de la ventana.',
          'useColorScheme devuelve light, dark o null y sigue el tema del sistema.',
          'useSafeAreaInsets expone los márgenes seguros como valores numéricos.',
          'Los valores de layout y color se derivan de los hooks; no necesitan otro estado.',
        ]}
        oscuro={oscuro}
      />
      <View
        style={[
          styles.tarjeta,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          Pantalla: {Math.round(width)} × {Math.round(height)} dp · escala {scale.toFixed(1)}
        </Text>
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          Fuente: {fontScale.toFixed(1)} · tema: {esquema ?? 'sin preferencia'}
        </Text>
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          Márgenes seguros: arriba {Math.round(insets.top)}, abajo {Math.round(insets.bottom)}
        </Text>
      </View>
      <View style={styles.gridServidores}>
        {SERVIDORES.map((servidor) => {
          const activo = servidor.estado === 'activo'
          return (
            <View
              key={servidor.nombre}
              style={[
                styles.tarjetaServidor,
                {
                  width: anchoTarjeta,
                  backgroundColor: colores.tarjeta,
                  borderColor: colores.borde,
                },
              ]}
            >
              <Text style={[styles.nombreServidor, { color: colores.texto }]}>
                {servidor.nombre}
              </Text>
              <Text style={[styles.detalle, { color: colores.detalle }]}>
                {servidor.ip}
              </Text>
              <Text
                style={[
                  styles.etiqueta,
                  { color: activo ? '#2e7d32' : '#c62828' },
                ]}
              >
                {servidor.estado.toUpperCase()}
              </Text>
            </View>
          )
        })}
      </View>
      <Text style={[styles.nota, { color: colores.detalle, borderColor: colores.borde }]}>
        useSafeAreaInsets() expone los márgenes seguros para ubicar contenido
        manualmente y respetar el notch y la barra de inicio.
      </Text>
    </ScrollView>
  )
}

function Paso5() {
  const webHook = useConexionSimulada('web-02')
  const cacheHook = useConexionSimulada('cache-02')

  return (
    <ScrollView style={styles.pasoScroll} contentContainerStyle={styles.pasoContenido}>
      <Text style={styles.titulo}>Custom hook: conexiones simuladas</Text>
      <Text style={styles.descripcion}>
        Cada uso del hook conserva estado independiente para su servidor.
      </Text>
      <BloqueAprendizaje
        titulo="Qué aprenderás"
        puntos={[
          'Un custom hook extrae estado y efectos reutilizables fuera de la interfaz.',
          'Cada llamada al hook mantiene su propia conexión e intentos.',
          'Los hooks se llaman siempre en el nivel superior, nunca dentro de condiciones o bucles.',
          'useCallback mantiene estables las funciones de conexión que se pasan a componentes hijos.',
        ]}
      />
      <TarjetaConexion nombre="web-02" conexion={webHook} />
      <TarjetaConexion nombre="cache-02" conexion={cacheHook} />
    </ScrollView>
  )
}

function TarjetaConexion({
  nombre,
  conexion,
}: {
  nombre: string
  conexion: ReturnType<typeof useConexionSimulada>
}) {
  const { estado, intentos, latencia, errorMensaje, reconectar, reiniciar } = conexion
  const apariencia = ESTILOS_ESTADO[estado]

  return (
    <View style={[styles.tarjeta, { borderColor: apariencia.color }]}>
      <View style={styles.fila}>
        <Text style={styles.nombreServidor}>{nombre}</Text>
        <Text style={[styles.etiqueta, { color: apariencia.color }]}>
          {apariencia.etiqueta}
        </Text>
      </View>
      <Text style={styles.detalle}>
        Intentos: {intentos}
        {latencia !== null ? ` · Latencia: ${latencia} ms` : ''}
      </Text>
      {errorMensaje !== null && (
        <Text style={[styles.detalle, { color: '#c62828' }]}>{errorMensaje}</Text>
      )}
      <View style={styles.filaBotones}>
        <Pressable
          accessibilityRole="button"
          disabled={estado === 'conectando'}
          onPress={reconectar}
          style={({ pressed }) => [
            styles.boton,
            styles.botonActivo,
            estado === 'conectando' && styles.botonDeshabilitado,
            pressed && styles.presionado,
            styles.botonFlexible,
          ]}
        >
          <Text style={styles.textoBoton}>
            {estado === 'conectando'
              ? 'Conectando…'
              : estado === 'conectado'
                ? 'Reconectar'
                : estado === 'error'
                  ? 'Reintentar'
                  : 'Conectar'}
          </Text>
        </Pressable>
        <BotonSecundario etiqueta="Reiniciar" onPress={reiniciar} />
      </View>
    </View>
  )
}

function Paso6() {
  const { width } = useWindowDimensions()
  const esquema = useColorScheme()
  const oscuro = esquema === 'dark'
  const colores = {
    fondo: oscuro ? '#0d1b2a' : '#f0f4f8',
    tarjeta: oscuro ? '#1a2a3a' : '#ffffff',
    texto: oscuro ? '#e8eaed' : '#1a1a1a',
    detalle: oscuro ? '#b0bec5' : '#666666',
    borde: oscuro ? '#2d3e50' : '#e0e0e0',
  }
  const {
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
  } = useConexionSimulada('postgres-01')
  const filtroRef = useRef<TextInput>(null)
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => filtroRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  }, [])

  const logsFiltrados = filtro.trim()
    ? logs.filter((log) => log.toLowerCase().includes(filtro.trim().toLowerCase()))
    : logs
  const apariencia = ESTILOS_ESTADO[estado]

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.pasoScroll, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.pasoContenido}
    >
      <Text style={[styles.titulo, { color: colores.texto }]}>
        Estado del servidor
      </Text>
      <Text style={[styles.descripcion, { color: colores.detalle }]}>
        Ejemplo combinado de estado, efectos, referencias y hooks nativos.
      </Text>
      <BloqueAprendizaje
        titulo="Cómo se conectan los conceptos"
        puntos={[
          'El tema y el ancho vienen de hooks nativos; la conexión vive en un custom hook.',
          'El filtro usa estado y el TextInput se enfoca mediante useRef.',
          'El hook genera logs con un intervalo que se limpia al desconectar o pausar.',
        ]}
        oscuro={oscuro}
      />
      <View
        style={[
          styles.tarjeta,
          {
            backgroundColor: colores.tarjeta,
            borderColor: apariencia.color,
          },
        ]}
      >
        <View style={styles.fila}>
          <Text style={[styles.nombreServidor, { color: colores.texto }]}>
            postgres-01
          </Text>
          <Text style={[styles.etiqueta, { color: apariencia.color }]}>
            {apariencia.etiqueta}
          </Text>
        </View>
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          10.0.2.50 · PostgreSQL 16 · Puerto 5432
        </Text>
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          Intentos: {intentos}
          {latencia !== null ? ` · ${latencia} ms` : ''}
          {' · '}Tema: {esquema ?? 'sin preferencia'}
        </Text>
        {errorMensaje !== null && (
          <Text style={[styles.detalle, { color: '#c62828' }]}>{errorMensaje}</Text>
        )}
        <View style={styles.filaBotones}>
          <Pressable
            accessibilityRole="button"
            disabled={estado === 'conectando'}
            onPress={reconectar}
            style={({ pressed }) => [
              styles.boton,
              estado === 'conectando'
                ? styles.botonDeshabilitado
                : styles.botonActivo,
              pressed && styles.presionado,
              styles.botonFlexible,
            ]}
          >
            <Text style={styles.textoBoton}>
              {estado === 'conectando' ? 'Conectando…' : 'Conectar / Reconectar'}
            </Text>
          </Pressable>
          <BotonSecundario etiqueta="Reset" onPress={reiniciar} />
        </View>
      </View>

      <TextInput
        ref={filtroRef}
        accessibilityLabel="Filtrar registros"
        style={[
          styles.input,
          {
            backgroundColor: colores.tarjeta,
            borderColor: colores.borde,
            color: colores.texto,
          },
        ]}
        value={filtro}
        onChangeText={setFiltro}
        placeholder="Filtrar logs…"
        placeholderTextColor={colores.detalle}
        autoCapitalize="none"
      />

      {estado === 'conectado' && (
        <View style={styles.filaBotones}>
          <Pressable
            accessibilityRole="button"
            onPress={logsPausados ? reanudarLogs : pausarLogs}
            style={({ pressed }) => [
              styles.boton,
              logsPausados ? styles.botonActivo : styles.botonDetener,
              pressed && styles.presionado,
              styles.botonFlexible,
            ]}
          >
            <Text style={styles.textoBoton}>
              {logsPausados ? 'Reanudar logs' : 'Pausar logs'}
            </Text>
          </Pressable>
          <Text style={[styles.detalle, { color: colores.detalle }]}>
            {logsPausados ? 'Pausados' : 'En vivo'}
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.logContenedor}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {estado !== 'conectado' ? (
          <Text style={styles.logVacio}>
            {estado === 'conectando'
              ? 'Estableciendo conexión…'
              : 'Sin conexión — los logs aparecen al conectar'}
          </Text>
        ) : logsFiltrados.length === 0 ? (
          <Text style={styles.logVacio}>
            {filtro.trim()
              ? `Sin entradas que coincidan con "${filtro.trim()}".`
              : 'Esperando nuevos registros…'}
          </Text>
        ) : (
          logsFiltrados.map((log, indice) => (
            <Text key={`${log}-${indice}`} style={styles.logLinea}>
              {log}
            </Text>
          ))
        )}
      </ScrollView>
      <Text style={[styles.detalle, { color: colores.detalle, fontSize: 11 }]}>
        {Math.round(width)} dp · {width > 600 ? 'layout ancho' : 'layout normal'}
      </Text>
    </ScrollView>
  )
}

const SERVIDORES_MONITOREADOS = [
  { nombre: 'web-01', ip: '10.0.2.10' },
  { nombre: 'db-01', ip: '10.0.2.20' },
  { nombre: 'cache-01', ip: '10.0.2.30' },
]

function EjercicioMonitor() {
  return (
    <ScrollView style={styles.pasoScroll} contentContainerStyle={styles.pasoContenido}>
      <Text style={styles.titulo}>Ejercicio: monitor multi-servicio</Text>
      <Text style={styles.descripcion}>
        Cada tarjeta ejecuta su propio custom hook y alerta si la latencia supera
        150 ms o la pérdida de paquetes supera el 20 %.
      </Text>
      <BloqueAprendizaje
        titulo="Qué observar"
        puntos={[
          'El porcentaje de paquetes perdidos se calcula sobre las mediciones acumuladas.',
          'La alerta aparece cuando se cumple cualquiera de los dos umbrales.',
          'Cada servidor tiene un intervalo independiente que se limpia al salir de esta pantalla.',
        ]}
      />
      {SERVIDORES_MONITOREADOS.map((servidor) => (
        <TarjetaMonitor
          key={servidor.ip}
          nombre={servidor.nombre}
          ip={servidor.ip}
        />
      ))}
    </ScrollView>
  )
}

function TarjetaMonitor({ nombre, ip }: { nombre: string; ip: string }) {
  const { latencia, paquetesPerdidos, alerta } = usePingMonitor(ip, 1800)

  return (
    <View
      style={[
        styles.tarjeta,
        alerta && styles.tarjetaAlerta,
        !alerta && styles.tarjetaSaludable,
      ]}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.fila}>
        <Text style={styles.nombreServidor}>{nombre}</Text>
        <Text
          style={[
            styles.etiqueta,
            { color: alerta ? '#c62828' : '#2e7d32' },
          ]}
        >
          {alerta ? 'ALERTA' : 'ESTABLE'}
        </Text>
      </View>
      <Text style={styles.detalle}>{ip}</Text>
      <Text style={styles.detalle}>
        Latencia: {latencia === null ? 'Esperando medición…' : `${latencia} ms`}
      </Text>
      <Text style={styles.detalle}>
        Paquetes perdidos: {paquetesPerdidos.toFixed(1)} %
      </Text>
    </View>
  )
}

function EjercicioFormularioSSH() {
  const usuarioRef = useRef<TextInput>(null)
  const hostRef = useRef<TextInput>(null)
  const puertoRef = useRef<TextInput>(null)
  const contrasenaRef = useRef<TextInput>(null)
  const [usuario, setUsuario] = useState('')
  const [host, setHost] = useState('')
  const [puerto, setPuerto] = useState('22')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resumenVisible, setResumenVisible] = useState(false)

  function mostrarResumen() {
    const puertoNumerico = Number(puerto)
    if (!host.trim()) {
      setError('Escribe el host antes de continuar.')
      setResumenVisible(false)
      hostRef.current?.focus()
      return
    }
    if (!Number.isInteger(puertoNumerico) || puertoNumerico < 1 || puertoNumerico > 65535) {
      setError('El puerto debe ser un número entero entre 1 y 65535.')
      setResumenVisible(false)
      puertoRef.current?.focus()
      return
    }
    setError(null)
    setResumenVisible(true)
  }

  return (
    <ScrollView
      style={styles.pasoScroll}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.pasoContenido}
    >
      <Text style={styles.titulo}>Ejercicio: formulario SSH</Text>
      <Text style={styles.descripcion}>
        Completa los campos usando el teclado para avanzar. Se valida el host y
        el rango del puerto antes de mostrar el resumen.
      </Text>
      <BloqueAprendizaje
        titulo="Navegación móvil"
        puntos={[
          'Cada campo usa useRef para enfocar el siguiente con onSubmitEditing.',
          'El campo de contraseña oculta el texto mientras escribes.',
          'El resumen no muestra la contraseña por seguridad.',
        ]}
      />
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Usuario</Text>
        <TextInput
          ref={usuarioRef}
          accessibilityLabel="Usuario SSH"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => hostRef.current?.focus()}
        />
        <Text style={styles.etiqueta}>Host</Text>
        <TextInput
          ref={hostRef}
          accessibilityLabel="Host SSH"
          style={styles.input}
          value={host}
          onChangeText={setHost}
          placeholder="servidor.ejemplo.com"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => puertoRef.current?.focus()}
        />
        <Text style={styles.etiqueta}>Puerto</Text>
        <TextInput
          ref={puertoRef}
          accessibilityLabel="Puerto SSH"
          style={styles.input}
          value={puerto}
          onChangeText={setPuerto}
          keyboardType="number-pad"
          returnKeyType="next"
          onSubmitEditing={() => contrasenaRef.current?.focus()}
        />
        <Text style={styles.etiqueta}>Contraseña</Text>
        <TextInput
          ref={contrasenaRef}
          accessibilityLabel="Contraseña SSH"
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={mostrarResumen}
        />
      </View>
      {error !== null && (
        <Text accessibilityRole="alert" style={styles.mensajeError}>
          {error}
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={mostrarResumen}
        style={({ pressed }) => [
          styles.boton,
          styles.botonActivo,
          pressed && styles.presionado,
        ]}
      >
        <Text style={styles.textoBoton}>Validar y mostrar resumen</Text>
      </Pressable>
      {resumenVisible && (
        <View style={styles.tarjeta}>
          <Text style={styles.nombreServidor}>Resumen de conexión</Text>
          <Text style={styles.detalle}>Usuario: {usuario.trim()}</Text>
          <Text style={styles.detalle}>Host: {host.trim()}</Text>
          <Text style={styles.detalle}>Puerto: {Number(puerto)}</Text>
          <Text style={styles.detalle}>
            Contraseña: {contrasena.length > 0 ? '••••••••' : 'No ingresada'}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const SERVIDORES_ADAPTABLES = [
  { nombre: 'web-01', ip: '10.0.2.10', estado: 'Operativo' },
  { nombre: 'db-01', ip: '10.0.2.20', estado: 'Operativo' },
  { nombre: 'cache-01', ip: '10.0.2.30', estado: 'Revisar' },
  { nombre: 'api-01', ip: '10.0.2.40', estado: 'Operativo' },
  { nombre: 'backup-01', ip: '10.0.2.50', estado: 'Operativo' },
  { nombre: 'queue-01', ip: '10.0.2.60', estado: 'Operativo' },
]

function EjercicioPanelAdaptable() {
  const { width, height } = useWindowDimensions()
  const esquema = useColorScheme()
  const insets = useSafeAreaInsets()
  const conteoRef = useRef(0)
  const [cambiosPantalla, setCambiosPantalla] = useState(0)
  const dimensionesPreviasRef = useRef({ width, height, esquema })
  const oscuro = esquema === 'dark'
  const colores = {
    fondo: oscuro ? '#0d1b2a' : '#f5f5f5',
    tarjeta: oscuro ? '#1a2a3a' : '#ffffff',
    texto: oscuro ? '#e8eaed' : '#1a1a1a',
    detalle: oscuro ? '#b0bec5' : '#666666',
    borde: oscuro ? '#2d3e50' : '#e0e0e0',
  }
  const horizontal = width > height
  const columnas = horizontal ? 3 : 1
  const anchoDisponible = Math.max(width - 40 - insets.left - insets.right, 0)
  const anchoTarjeta =
    (anchoDisponible - (columnas - 1) * 12) / columnas

  useEffect(() => {
    const anterior = dimensionesPreviasRef.current
    if (
      anterior.width !== width ||
      anterior.height !== height ||
      anterior.esquema !== esquema
    ) {
      dimensionesPreviasRef.current = { width, height, esquema }
      conteoRef.current += 1
      setCambiosPantalla(conteoRef.current)
    }
  }, [width, height, esquema])

  return (
    <ScrollView
      style={[styles.pasoScroll, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.pasoContenido}
    >
      <Text style={[styles.titulo, { color: colores.texto }]}>
        Ejercicio: panel adaptable
      </Text>
      <Text style={[styles.descripcion, { color: colores.detalle }]}>
        Gira el dispositivo: vertical muestra una columna y horizontal, tres.
        Los colores siguen el tema del sistema.
      </Text>
      <BloqueAprendizaje
        titulo="Dimensiones reactivas"
        puntos={[
          'useWindowDimensions actualiza el layout cuando cambia la orientación.',
          'useColorScheme aplica los colores del tema claro u oscuro.',
          'El ref cuenta cambios de dimensiones o tema; el ref no programa renders.',
        ]}
        oscuro={oscuro}
      />
      <View
        style={[
          styles.tarjeta,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          {Math.round(width)} × {Math.round(height)} dp ·{' '}
          {horizontal ? 'Horizontal' : 'Vertical'} · {columnas}{' '}
          {columnas === 1 ? 'columna' : 'columnas'} · tema {esquema ?? 'sin preferencia'}
        </Text>
        <Text style={[styles.detalle, { color: colores.detalle }]}>
          Cambios de orientación o tema: {cambiosPantalla}
        </Text>
      </View>
      <View style={styles.gridServidores}>
        {SERVIDORES_ADAPTABLES.map((servidor) => (
          <View
            key={servidor.nombre}
            style={[
              styles.tarjetaServidor,
              {
                width: anchoTarjeta,
                backgroundColor: colores.tarjeta,
                borderColor: colores.borde,
              },
            ]}
          >
            <Text style={[styles.nombreServidor, { color: colores.texto }]}>
              {servidor.nombre}
            </Text>
            <Text style={[styles.detalle, { color: colores.detalle }]}>
              {servidor.ip}
            </Text>
            <Text
              style={[
                styles.etiqueta,
                { color: servidor.estado === 'Revisar' ? '#c62828' : '#2e7d32' },
              ]}
            >
              {servidor.estado.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

function EjercicioLogs() {
  const {
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
  } = useConexionSimulada('monitor-01')
  const apariencia = ESTILOS_ESTADO[estado]

  return (
    <ScrollView style={styles.pasoScroll} contentContainerStyle={styles.pasoContenido}>
      <Text style={styles.titulo}>Ejercicio: logs en tiempo real</Text>
      <Text style={styles.descripcion}>
        Los registros se generan mientras el servidor está conectado. Pausar los
        logs no desconecta el servidor.
      </Text>
      <BloqueAprendizaje
        titulo="Limpieza del efecto"
        puntos={[
          'El hook mantiene un intervalo solo mientras la conexión está activa y los logs no están pausados.',
          'Pausar cancela el intervalo; reanudar lo inicia de nuevo.',
          'Al desmontar o reiniciar se limpian los recursos y el historial.',
        ]}
      />
      <View style={[styles.tarjeta, { borderColor: apariencia.color }]}>
        <View style={styles.fila}>
          <Text style={styles.nombreServidor}>monitor-01</Text>
          <Text style={[styles.etiqueta, { color: apariencia.color }]}>
            {apariencia.etiqueta}
          </Text>
        </View>
        <Text style={styles.detalle}>
          Intentos: {intentos}
          {latencia !== null ? ` · Latencia: ${latencia} ms` : ''}
        </Text>
        {errorMensaje !== null && (
          <Text style={styles.mensajeError}>{errorMensaje}</Text>
        )}
        <View style={styles.filaBotones}>
          <Pressable
            accessibilityRole="button"
            disabled={estado === 'conectando'}
            onPress={reconectar}
            style={({ pressed }) => [
              styles.boton,
              styles.botonActivo,
              estado === 'conectando' && styles.botonDeshabilitado,
              pressed && styles.presionado,
              styles.botonFlexible,
            ]}
          >
            <Text style={styles.textoBoton}>
              {estado === 'conectando' ? 'Conectando…' : 'Conectar'}
            </Text>
          </Pressable>
          <BotonSecundario etiqueta="Reiniciar" onPress={reiniciar} />
        </View>
        {estado === 'conectado' && (
          <View style={styles.filaBotones}>
            <Pressable
              accessibilityRole="button"
              onPress={pausarLogs}
              disabled={logsPausados}
              style={({ pressed }) => [
                styles.boton,
                styles.botonDetener,
                logsPausados && styles.botonDeshabilitado,
                pressed && !logsPausados && styles.presionado,
                styles.botonFlexible,
              ]}
            >
              <Text style={styles.textoBoton}>Pausar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={reanudarLogs}
              disabled={!logsPausados}
              style={({ pressed }) => [
                styles.boton,
                styles.botonActivo,
                !logsPausados && styles.botonDeshabilitado,
                pressed && logsPausados && styles.presionado,
                styles.botonFlexible,
              ]}
            >
              <Text style={styles.textoBoton}>Reanudar</Text>
            </Pressable>
          </View>
        )}
        <Text style={styles.detalle}>
          Estado de logs: {estado !== 'conectado' ? 'inactivos' : logsPausados ? 'pausados' : 'en vivo'}
        </Text>
      </View>
      <ScrollView
        style={styles.logContenedor}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {logs.length === 0 ? (
          <Text style={styles.logVacio}>
            {estado === 'conectado'
              ? 'Esperando nuevos registros…'
              : 'Conecta el servidor para comenzar a recibir logs.'}
          </Text>
        ) : (
          logs.map((log, indice) => (
            <Text key={`${log}-${indice}`} style={styles.logLinea}>
              {log}
            </Text>
          ))
        )}
      </ScrollView>
    </ScrollView>
  )
}

function BloqueAprendizaje({
  titulo,
  puntos,
  oscuro = false,
}: {
  titulo: string
  puntos: string[]
  oscuro?: boolean
}) {
  return (
    <View
      style={[
        styles.bloqueAprendizaje,
        {
          backgroundColor: oscuro ? '#152333' : '#eaf3fb',
          borderColor: oscuro ? '#2d3e50' : '#c8def1',
        },
      ]}
    >
      <Text
        style={[
          styles.tituloBloque,
          { color: oscuro ? '#e8eaed' : '#174a75' },
        ]}
      >
        {titulo}
      </Text>
      {puntos.map((punto) => (
        <Text
          key={punto}
          style={[
            styles.textoPunto,
            { color: oscuro ? '#c8d2dc' : '#35566f' },
          ]}
        >
          • {punto}
        </Text>
      ))}
    </View>
  )
}

const RESUMEN_PAGINA = [
  {
    titulo: 'useState',
    detalle:
      'Declara estado reactivo. Al llamar al setter React vuelve a renderizar; calcula los valores derivados en variables locales.',
  },
  {
    titulo: 'useEffect y dependencias',
    detalle:
      'Ejecuta efectos después del render. [] se ejecuta al montar, [a, b] al cambiar esas dependencias y sin array en cada render.',
  },
  {
    titulo: 'Limpieza de efectos',
    detalle:
      'La función de limpieza cancela timers, suscripciones e intervalos al cambiar las dependencias o desmontar el componente.',
  },
  {
    titulo: 'useRef',
    detalle:
      'Referencia componentes nativos como TextInput para llamar focus(), o guarda valores mutables sin provocar re-renders.',
  },
  {
    titulo: 'Navegación por teclado',
    detalle:
      'Combina refs, onSubmitEditing y returnKeyType en TextInput para avanzar entre campos desde el teclado móvil.',
  },
  {
    titulo: 'useWindowDimensions',
    detalle:
      'Devuelve dimensiones reactivas y actualiza el diseño cuando cambia el tamaño de la ventana o la orientación.',
  },
  {
    titulo: 'useColorScheme',
    detalle:
      'Expone el tema del sistema como light, dark o null y se actualiza cuando cambia la preferencia del dispositivo.',
  },
  {
    titulo: 'useSafeAreaInsets',
    detalle:
      'Entrega los márgenes seguros como números para ubicar manualmente el contenido alrededor del notch y las barras del sistema.',
  },
  {
    titulo: 'Custom hooks',
    detalle:
      'Las funciones use* encapsulan estado y efectos reutilizables. Cada llamada mantiene una instancia de estado independiente.',
  },
  {
    titulo: 'useCallback',
    detalle:
      'Estabiliza funciones que se pasan como props y puede evitar renders innecesarios en hijos memoizados.',
  },
]

function ResumenPagina() {
  const esquema = useColorScheme()
  const oscuro = esquema === 'dark'
  const colores = {
    fondo: oscuro ? '#0d1b2a' : '#f5f5f5',
    tarjeta: oscuro ? '#1a2a3a' : '#ffffff',
    texto: oscuro ? '#e8eaed' : '#1a1a1a',
    detalle: oscuro ? '#b0bec5' : '#546e7a',
    borde: oscuro ? '#2d3e50' : '#e0e0e0',
  }

  return (
    <ScrollView
      style={[styles.pasoScroll, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.pasoContenido}
    >
      <Text style={[styles.titulo, { color: colores.texto }]}>
        Resumen de la página 3
      </Text>
      <Text style={[styles.descripcion, { color: colores.detalle }]}>
        Repaso rápido de los hooks de React y React Native que practicaste.
      </Text>
      {RESUMEN_PAGINA.map((concepto, indice) => (
        <View
          key={concepto.titulo}
          style={[
            styles.tarjetaResumen,
            { backgroundColor: colores.tarjeta, borderColor: colores.borde },
          ]}
        >
          <Text style={[styles.tituloBloque, { color: colores.texto }]}>
            {indice + 1}. {concepto.titulo}
          </Text>
          <Text style={[styles.textoPunto, { color: colores.detalle }]}>
            {concepto.detalle}
          </Text>
        </View>
      ))}
      <View
        style={[
          styles.bloqueAprendizaje,
          {
            backgroundColor: oscuro ? '#152333' : '#eaf3fb',
            borderColor: oscuro ? '#2d3e50' : '#c8def1',
          },
        ]}
      >
        <Text style={[styles.tituloBloque, { color: colores.texto }]}>
          Siguiente tema
        </Text>
        <Text style={[styles.textoPunto, { color: colores.detalle }]}>
          Página 4: listas y formularios con FlatList, SectionList, TextInput,
          validación y manejo del teclado.
        </Text>
      </View>
    </ScrollView>
  )
}

function BotonSecundario({
  etiqueta,
  onPress,
}: {
  etiqueta: string
  onPress: () => void
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.botonSecundario,
        pressed && styles.presionado,
      ]}
    >
      <Text style={styles.textoSecundario}>{etiqueta}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  encabezado: {
    paddingTop: 12,
    paddingHorizontal: 20,
    gap: 6,
  },
  botonPanorama: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  textoPanorama: {
    color: '#1565c0',
    fontSize: 12,
    fontWeight: '600',
  },
  panorama: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#eaf3fb',
    gap: 10,
  },
  panoramaTexto: {
    color: '#35566f',
    fontSize: 12,
    lineHeight: 17,
  },
  filaPanorama: {
    flexDirection: 'row',
    gap: 12,
  },
  columnaPanorama: {
    flex: 1,
    gap: 4,
  },
  tituloPanorama: {
    color: '#174a75',
    fontSize: 12,
    fontWeight: '700',
  },
  detallePanorama: {
    color: '#35566f',
    fontSize: 10,
    lineHeight: 15,
  },
  tituloPagina: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a237e',
  },
  subtituloPagina: {
    fontSize: 13,
    lineHeight: 19,
    color: '#546e7a',
  },
  selectorPasos: {
    gap: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  botonPaso: {
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botonPasoSeleccionado: {
    backgroundColor: '#1565c0',
  },
  textoPaso: {
    color: '#1565c0',
    fontSize: 13,
    fontWeight: '600',
  },
  textoPasoSeleccionado: {
    color: '#ffffff',
  },
  contenido: {
    flex: 1,
  },
  pasoScroll: {
    flex: 1,
  },
  pasoContenido: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 14,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  descripcion: {
    fontSize: 14,
    color: '#546e7a',
    lineHeight: 20,
  },
  tarjeta: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    gap: 8,
  },
  tarjetaAlerta: {
    borderColor: '#c62828',
    backgroundColor: '#fff1f0',
  },
  tarjetaSaludable: {
    borderColor: '#2e7d32',
  },
  tarjetaResumen: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  estado: {
    fontSize: 15,
    fontWeight: '700',
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
  },
  detalle: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 19,
  },
  mensajeError: {
    color: '#c62828',
    fontSize: 13,
    lineHeight: 19,
  },
  latencia: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  boton: {
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  botonActivo: {
    backgroundColor: '#1565c0',
  },
  botonDetener: {
    backgroundColor: '#c62828',
  },
  botonDeshabilitado: {
    backgroundColor: '#90a4ae',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  botonSecundario: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  textoSecundario: {
    color: '#1565c0',
    fontSize: 13,
    fontWeight: '600',
  },
  presionado: {
    opacity: 0.75,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  nombreServidor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    flexShrink: 1,
  },
  filaBotones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  botonFlexible: {
    flex: 1,
  },
  gridServidores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tarjetaServidor: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  nota: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
    lineHeight: 18,
  },
  bloqueAprendizaje: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  tituloBloque: {
    fontSize: 14,
    fontWeight: '700',
  },
  textoPunto: {
    fontSize: 12,
    lineHeight: 18,
  },
  logContenedor: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    maxHeight: 240,
    backgroundColor: '#1e1e1e',
    gap: 4,
  },
  logLinea: {
    fontSize: 11,
    color: '#a8d8a8',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  logVacio: {
    fontSize: 12,
    color: '#b0bec5',
    fontStyle: 'italic',
  },
})
