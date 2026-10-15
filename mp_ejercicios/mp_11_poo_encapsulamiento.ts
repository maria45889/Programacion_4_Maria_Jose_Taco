// Encapsulamiento - historial veterinario

class HistorialVeterinario {
    private vacunasAplicadas: number = 0;

    registrarVacuna(): void {
        this.vacunasAplicadas++;
        console.log("Vacuna registrada correctamente.");
    }

    consultarVacunasAplicadas(): number {
        return this.vacunasAplicadas;
    }

    mostrarEstadoVacunacion(): void {
        if (this.vacunasAplicadas >= 3) {
            console.log("El esquema de vacunación está completo.");
        } else {
            console.log(`Vacunas aplicadas: ${this.vacunasAplicadas}. Faltan controles.`);
        }
    }
}

const historialLuna = new HistorialVeterinario();
historialLuna.registrarVacuna();
historialLuna.registrarVacuna();
console.log(`Total de vacunas registradas: ${historialLuna.consultarVacunasAplicadas()}`);
historialLuna.mostrarEstadoVacunacion();