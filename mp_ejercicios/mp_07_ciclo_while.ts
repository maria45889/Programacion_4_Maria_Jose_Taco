// Ciclos while y do-while - consultorio veterinario

let consultasPendientes = 3;
let numeroConsulta = 1;

while (consultasPendientes > 0) {
    console.log(`Consulta ${numeroConsulta}: atender a la mascota en espera`);
    consultasPendientes--;
    numeroConsulta++;
}

const pacientes = ["Luna", "Max", "Nina"];
let indicePaciente = 0;

while (indicePaciente < pacientes.length) {
    const paciente = pacientes[indicePaciente];
    if (paciente === undefined) {
        break;
    }

    if (paciente === "Max") {
        console.log(`${paciente} debe esperar a que llegue su familia.`);
        indicePaciente++;
        continue;
    }

    console.log(`Llamando a ${paciente} para su revisión veterinaria.`);
    indicePaciente++;
}

let dosisAplicadas = 0;
do {
    dosisAplicadas++;
    console.log(`Dosis de vacunación aplicada: ${dosisAplicadas}`);
} while (dosisAplicadas < 3);