// Condicional simple
let edadMeses: number = 5;
if (edadMeses >= 2) {
    console.log("La mascota ya puede iniciar su esquema de vacunación.");
}

// Condicional con dos caminos
if (edadMeses >= 6) {
    console.log("Se recomienda agendar un chequeo semestral.");
} else {
    console.log("Se recomienda continuar con sus controles de cachorro.");
}

// Condicionales con operadores lógicos
if (edadMeses >= 2 && edadMeses < 6) {
    console.log("La mascota está en edad para sus primeras vacunas.");
}
if (edadMeses >= 6) {
    console.log("La mascota necesita un control de salud.");
} else {
    console.log("La mascota todavía no necesita el control semestral.");
}

if (edadMeses >= 2 && edadMeses < 6) {
    console.log("Agendar vacunación para la mascota.");
} else if (edadMeses >= 6) {
    console.log("Agendar chequeo preventivo.");
} else {
    console.log("Agendar una consulta de orientación para el cachorro.");
}

edadMeses = 5;
let pesoRevisionKg: number = 4.5;
if (edadMeses >= 2 && edadMeses < 6 && pesoRevisionKg >= 2) {
    console.log("La mascota cumple los requisitos para su primera vacuna.");
} else if (edadMeses >= 6 && pesoRevisionKg >= 2) {
    console.log("La mascota puede asistir a su chequeo preventivo.");
} else {
    console.log("Consultar con el veterinario antes de programar el servicio.");
}

edadMeses = 1;
pesoRevisionKg = 1.5;
if (edadMeses < 2 || pesoRevisionKg < 2) {
    console.log("Solicitar una valoración veterinaria antes de programar la vacuna.");
} else {
    console.log("Se puede programar la vacunación.");
}

// Práctica
let vacunasAplicadas: number = 2;
if (vacunasAplicadas >= 3) {
    console.log("El esquema de vacunación está completo.");
} else if (vacunasAplicadas >= 1) {
    console.log("El esquema está iniciado; agenda la siguiente dosis.");
} else {
    console.log("La mascota debe iniciar su esquema de vacunación.");
}
