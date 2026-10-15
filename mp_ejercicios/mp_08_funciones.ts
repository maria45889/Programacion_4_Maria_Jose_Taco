// Funciones - consultorio veterinario

function calcularTotalConsulta(costoConsulta: number, costoVacuna: number): number {
    return costoConsulta + costoVacuna;
}

const totalConsulta = calcularTotalConsulta(25, 15);
console.log(`Total de la consulta y vacuna: $${totalConsulta}`);

function mostrarPaciente(nombre: string, especie: string): void {
    console.log(`Paciente: ${nombre}; especie: ${especie}.`);
}

mostrarPaciente("Luna", "gato");

function agendarControl(nombre: string, semanas: number = 4): void {
    console.log(`Agendar el control de ${nombre} dentro de ${semanas} semanas.`);
}

agendarControl("Max", 2);
agendarControl("Nina");

const calcularDescuento = (costo: number, porcentaje: number = 0.1): number =>
    costo - costo * porcentaje;

console.log(`Total con descuento: $${calcularDescuento(100)}`);

function formatearIdentificador(identificador: number): string;
function formatearIdentificador(identificador: string): string;
function formatearIdentificador(identificador: number | string): string {
    return `Historial veterinario: ${identificador}`;
}

console.log(formatearIdentificador(1024));
console.log(formatearIdentificador("H-2048"));