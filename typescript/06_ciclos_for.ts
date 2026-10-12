//ciclo for

for (let i = 2; i < 50; i+=5) {
    console.log(`Entrenamiento  jedi: ${i}`);
}

for (let i = 40; i > 0; i-=5) {
    console.log(`Entrenamiento  jedi: ${i}`);
}

for (let i = 40; i > 0; i-=5) {

    if (i === 20) {
        console.log("Entrenamiento completado");
        break;
    }
    if (i === 30) {
        console.log("Entrenamiento interrumpido");
        continue;
    }
    console.log(`Entrenamiento  jedi: ${i}`);
}


for (const letra of cineMovie) {
    console.log(`Letra: ${letra}`)
}

interface Jedi {
    nombre: string;
    nivelFuerza: number;
    tieneSable: boolean;
};

const jedis: Jedi[] = [
    {nombre: "Luke", nivelFuerza: 100, tieneSable:true}]

for (const jedi of jedis) {
    console.log(`Jedi: ${jedi.nombre}, Nivel de Fuerza: ${jedi.nivelFuerza}, Tiene Sable: ${jedi.tieneSable}`);
};

interface Nave {
    nombre: string;
    tipo: string;
    velocidad: number;
};

const naves: Nave[] = [
    {nombre: "Apolo", tipo: "II", velocidad: 120}
];

for (const Nave of naves) {
    console.log(`Nombre: ${Nave.nombre}, Tipo: ${Nave.tipo}, Velocidad: ${Nave.velocidad}`)
};

const planetas: Record<string, number> = {
    "Tatooine": 1000,
    "Hoth": 500,
    "Endor": 800
}