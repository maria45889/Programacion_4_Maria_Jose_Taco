// Funcaiones simples
function sumarCreditos(credito1: number, credito2: number): number {
    return credito1 + credito2;
}

const totalCreditos: number = sumarCreditos(10, 20);
console.log(`Total de créditos: ${totalCreditos}`);
// Sin devolver un valor
function mostrarCentroDeEntenameito(nombre: string): void {
    console.log(`Centro de entrenamiento: ${nombre}`);
    const naves: string[] = ["X-Wing", "TIE Fighter", "Millennium Falcon"];
    for (const nave of naves) {
        console.log(`Nave disponible: ${nave}`);
    }
}

mostrarCentroDeEntenameito("Academia Jedi");

//Funciones con parámetros opcionales
function entrenarJedi(nombre: string, nivel?: number): void {
    if (nivel) {
        console.log(`El jedi ${nombre} esta entrenado ene el nivel ${nivel}.`);
    } else {
        console.log(`El jedi ${nombre} esta entrenado `);
        nivel = 1;
        console.log(`Nivel de entrenamiento por defecto: ${nivel}`);

    }
} 
entrenarJedi("luke Skywalker", 5);
entrenarJedi("yoda");
function entrenarJedi2(nombre: string, nivel: number = 1): void {
    console.log(`El jedi ${nombre} esta entrenado en el nivel ${nivel}.`);
}

entrenarJedi2("Leia", 5);
entrenarJedi2("Obi-Wan");

//FUNCIONES FLECHA
function potenciarFuerza(fuerza: string, numbe): number {
    return fuerza * 2 ;
}
const potenciarFuerzaFlecha = (fuerza: number): number => fuerza * 2;

const fuerzaOriginal: number = 10;
const fuerzaPotenciada: number = potenciarFuerzaFlecha(fuerzaOriginal);
console.log(`Fuerza original: ${fuerzaOriginal}, Fuerza potenciada: ${fuerzaPotenciada}`);

const fueraPotencidaFlecha = (fuerza: number, multiplicador: number = 2): number => fuerza * multiplicador;
const fuerzaOriginal2: number = 15;
const fuerzaPotenciada2: number = fueraPotencidaFlecha(fuerzaOriginal2, 3);
console.log(`Fuerza original: ${fuerzaOriginal2}, Fuerza potenciada: ${fuerzaPotenciada2}`);