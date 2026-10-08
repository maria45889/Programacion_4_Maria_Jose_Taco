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