type ServicioVeterinario =
    | "Consulta general"
    | "Vacunación"
    | "Desparasitación"
    | "Control dental";

function mostrarServicio(servicio: ServicioVeterinario): void {
    switch (servicio) {
        case "Consulta general":
            console.log("Servicio seleccionado: revisión general de la mascota.");
            break;
        case "Vacunación":
            console.log("Servicio seleccionado: aplicación de vacunas.");
            break;
        case "Desparasitación":
            console.log("Servicio seleccionado: tratamiento antiparasitario.");
            break;
        case "Control dental":
            console.log("Servicio seleccionado: revisión dental.");
            break;
        default:
            console.log("Servicio veterinario no disponible.");
            break;
    }
}

mostrarServicio("Vacunación");

type EtapaMascota = "Cachorro" | "Adulto" | "Senior";

function mostrarRecomendacion(etapa: EtapaMascota): void {
    switch (etapa) {
        case "Cachorro":
            console.log("Recomendación: iniciar controles y esquema de vacunación.");
            break;
        case "Adulto":
            console.log("Recomendación: realizar un chequeo preventivo anual.");
            break;
        case "Senior":
            console.log("Recomendación: programar controles veterinarios frecuentes.");
            break;
        default:
            console.log("Etapa de vida no reconocida.");
            break;
    }
}

mostrarRecomendacion("Cachorro");
