let nombreMascota = prompt("Ingrese el nombre de la mascota:");
let edadAnios = Number(prompt("Ingrese la edad de la mascota en años:"));
let pesoMascotaKg = Number(prompt("Ingrese el peso de la mascota en kilogramos:"));

if (
    nombreMascota === null
    || nombreMascota.trim() === ""
    || !Number.isFinite(edadAnios)
    || !Number.isFinite(pesoMascotaKg)
    || edadAnios < 0
    || pesoMascotaKg <= 0
) {
    console.log("Ingrese datos válidos para registrar la consulta.");
} else if (edadAnios < 1) {
    console.log(`${nombreMascota} es cachorro. Consulta con el veterinario sobre sus controles iniciales.`);
} else {
    console.log(`${nombreMascota} fue registrada. Edad: ${edadAnios} años; peso: ${pesoMascotaKg} kg.`);
    console.log("Puedes agendar una consulta de revisión veterinaria.");
}
