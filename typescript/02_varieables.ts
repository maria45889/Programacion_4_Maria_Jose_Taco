const PI: number = 3.14159;
const IVA: number = 15;
const SERVICIO_API: number = 0.18;
const activo: boolean = false;

console.log("Valor de PI:", PI);
console.log("Valor de IVA:", IVA);
console.log("Valor de SERVICIO_API:", SERVICIO_API);
console.log("Valor de activo:", activo);

//let 

let contador: number = 0;
console.log("Valor inicial del contador:", contador);
contador = 5;
console.log("Valor del contador después de incrementar:", contador);
contador ++;
console.log("Valor del contador después de incrementar en 5:", contador);
contador += 5;
console.log("Valor del contador después de incrementar en 5:", contador);
contador=contador+3;
console.log("Valor del contador después de incrementar en 3:", contador);
let alumno: string = "Juan";
let caducado: boolean = false;
console.log("Nombre:", alumno);
console.log("Caducado:", caducado);

let equipo: string[] = ["Barcelona", "Real Madrid", "Atletico"];
console.log(equipo);

let pokemonCapturados: string | null = null;
let pokemonPrincipal: string | undefined = undefined;

let esperiencaAcomulada: bigint = 98723952737392n;
// tipo symbol
let pokemon1: symbol = Symbol("pikachu");
console.log(pokemon1.description);
let pokemon2: symbol = Symbol("pikachu");
console.log(pokemon2.description);
console.log(pokemon1 === pokemon2); 


let pikachu: {
    nombre: string, 
    nivel: number,
    vida: number,
    esLegendario: boolean;
} = {
    nombre: "Pikachu",
    nivel: 5,
    vida: 35,
    esLegendario: false
};

console.log("Nombre del pokemon:", pikachu.nombre);