const COSTO_CONSULTA: number = 25;
const IVA: number = 15;
const DESCUENTO: number = 0.10;
const consultorioAbierto: boolean = true;

console.log("Costo de la consulta:", COSTO_CONSULTA);
console.log("IVA:", IVA);
console.log("Descuento:", DESCUENTO);
console.log("¿Consultorio abierto?:", consultorioAbierto);

let contador: number = 0;
console.log("Consultas iniciales:", contador);
contador = 5;
console.log("Consultas registradas:", contador);
contador++;
console.log("Consultas después de atender una mascota:", contador);
contador += 5;
console.log("Consultas después de agregar cinco pacientes:", contador);
contador = contador + 3;
console.log("Consultas agregadas:", contador);

let nombreVeterinaria: string = "Huellitas";
let vacunasAlDia: boolean = false;
console.log("Nombre del consultorio:", nombreVeterinaria);
console.log("¿Vacunas al día?:", vacunasAlDia);

let mascotas: string[] = ["Luna", "Max", "Nina"];
console.log("Mascotas registradas:", mascotas);

let mascotaEnEspera: string | null = null;
let veterinarioAsignado: string | undefined = undefined;
console.log("Mascota en espera:", mascotaEnEspera);
console.log("Veterinario asignado:", veterinarioAsignado);

let numeroHistorial: bigint = 98723952737392n;
console.log("Número de historial:", numeroHistorial);

let identificadorMascota: symbol = Symbol("Luna");
console.log("Identificador:", identificadorMascota.description);
let otroIdentificador: symbol = Symbol("Luna");
console.log("¿Son el mismo identificador?:", identificadorMascota === otroIdentificador);

let mascota: {
    nombre: string;
    edad: number;
    peso: number;
    vacunada: boolean;
} = {
    nombre: "Luna",
    edad: 3,
    peso: 4.5,
    vacunada: true
};

console.log("Nombre de la mascota:", mascota.nombre);