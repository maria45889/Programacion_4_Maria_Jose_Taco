# Hooks App

Aplicación Expo independiente para practicar hooks de React Native.

## Iniciar

```bash
npm install
npm start
```

Desde Expo CLI puedes abrir la aplicación en Android, iOS o web. La pantalla
principal contiene los seis pasos del tutorial (`useState`, `useEffect`,
`useRef`, hooks nativos, un custom hook y una pantalla combinada), además de
cuatro ejercicios interactivos:

1. Monitor de tres servicios con umbrales de alerta.
2. Formulario SSH con navegación por teclado y validación.
3. Panel de servidores adaptable a la orientación y al tema.
4. Logs en tiempo real que se pueden pausar y reanudar.

La sección **Resumen** repasa los diez conceptos principales de la página 3.
Los pasos 1, 2 y 3 tienen sus implementaciones completas en
`src/app/paso_1.tsx`, `src/app/paso_2.tsx` y `src/app/paso_3.tsx`, y también
se abren desde el selector principal de la aplicación.

## Validar

```bash
npm run lint
npx tsc --noEmit
```
