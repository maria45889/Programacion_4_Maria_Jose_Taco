// Tipos e interfaces - consultorio veterinario

type Identificador = number | string;
type CoordenadasConsultorio = [number, number];

type Mascota = {
    nombre: string;
    especie: string;
    edad: number;
    vacunada: boolean;
};

interface Propietario {
    readonly identificador: Identificador;
    nombre: string;
    telefono: string;
    correo?: string;
}

interface Veterinario extends Propietario {
    especialidad: string;
}

const paciente: Mascota = {
    nombre: "Luna",
    especie: "gato",
    edad: 3,
    vacunada: true,
};

const propietario: Propietario = {
    identificador: "P-101",
    nombre: "María",
    telefono: "0991234567",
};

const veterinaria: Veterinario = {
    identificador: 7,
    nombre: "Dra. Ana Torres",
    telefono: "0987654321",
    correo: "ana@huellitas.example",
    especialidad: "medicina preventiva",
};

const coordenadas: CoordenadasConsultorio = [-0.18, -78.48];

console.log("Paciente registrado:", paciente);
console.log("Propietario:", propietario);
console.log("Veterinaria:", veterinaria);
console.log("Coordenadas del consultorio:", coordenadas);