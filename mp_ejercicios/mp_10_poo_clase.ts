// Clases y objetos - consultorio veterinario

class ConsultaVeterinaria {
    nombreMascota: string;
    nombreVeterinaria: string;
    motivo: string;

    constructor(nombreMascota: string, nombreVeterinaria: string, motivo: string) {
        this.nombreMascota = nombreMascota;
        this.nombreVeterinaria = nombreVeterinaria;
        this.motivo = motivo;
    }

    mostrarDetalle(): void {
        console.log(
            `${this.nombreMascota} tiene una consulta con ${this.nombreVeterinaria} por: ${this.motivo}.`,
        );
    }

    completarConsulta(): void {
        console.log(`Consulta de ${this.nombreMascota} finalizada.`);
    }
}

const consultaLuna = new ConsultaVeterinaria("Luna", "Dra. Ana Torres", "control general");
const consultaMax = new ConsultaVeterinaria("Max", "Dr. Luis Mora", "vacunación");

consultaLuna.mostrarDetalle();
consultaLuna.completarConsulta();
consultaMax.mostrarDetalle();