// ciclo for - consultoria veterinaria

for (let i = 2; i < 50; i += 5) {
    console.log(`Consulta veterinaria ${i}: revisión general de pacientes`);
}

for (let i = 40; i > 0; i -= 5) {
    console.log(`Seguimiento de tratamiento ${i}: control de medicamentos`);
}

for (let i = 40; i > 0; i -= 5) {
    if (i === 20) {
        console.log("Consulta finalizada: todos los pacientes fueron atendidos");
        break;
    }

    if (i === 30) {
        console.log("Paciente en observación: se reprograma la consulta");
        continue;
    }

    console.log(`Consulta veterinaria ${i}: atención a la mascota`);
}