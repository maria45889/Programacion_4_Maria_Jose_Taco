let memoriaDroide = 1024;
let memoriaDroideMaxima = 2048;
while (memoriaDroide < memoriaDroideMaxima) {
    console.log(`Memoria del droide: ${memoriaDroide} MB`);
    memoriaDroide += 256;
}

let disparosNave = 0;
let aciertosNave = 0;
while (disparosNave < 10) {
    disparosNave++;
    let acierto = Math.random() < 0.5;
    if (acierto) {
        aciertosNave++;
        console.log(`Disparo ${disparosNave}: !Acierto! total de aciertos: ${aciertosNave}`);
    } else {
        console.log(`Disparo ${disparosNave}: !Fallo! total de aciertos: ${aciertosNave}`);
    }
}

let guerras = 0;
do {
    guerras++;
    console.log(`Guerras galácticas: ${guerras}`);
} while (guerras < 5);
 
interface Nave {
    nombre: string;
    tipo: string;
    velocidad: number;
}

const naves: Nave[] = [
    {nombre: "Star Destroyer", tipo: "Destructor estelar", velocidad: 180},
    {nombre: "X-Wing", tipo: "Caza estelar", velocidad: 1000},
    {nombre: "TIE Fighter", tipo: "Caza estelar", velocidad: 800},
    {nombre: " Millennium Falcon", tipo: "Carguero ligero", velocidad: 1000}

];

let indice = 0;
while (indice < naves.length) {
    const nave = naves[indice];
    if (nave === undefined) {
        break;
    }
    if (nave.velocidad <= 100) {
        indice++;
        continue;
    }
    console.log(`Nombre: ${nave.nombre}, Tipo: ${nave.tipo}, Velocidad: ${nave.velocidad}`);
    break;
}

