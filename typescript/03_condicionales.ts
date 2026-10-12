//condicioneles
let nivel: number = 5;
if (nivel >= 5) {
    console.log("El charmander puede evolucionar a Charmeleon");
}

//condicionale dobles o dos caminos
if (nivel >= 16) {
    console.log("El charmander puede evolucionar a Charizard");
} else {
    console.log("El charmander no puede evolucionar a Charizard");
}

//condicionales multiples o varios caminos
if (nivel >= 5 && nivel < 16) {
    console.log("El charmander puede evolucionar a Charmeleon");
}
if (nivel >= 8) {
    console.log("El charmander puede evolucionar a Charizard");
} else {
    console.log("El charmander no puede evolucionar a Charizard");
}

// condiacional if con operadores logicos 
if (nivel >= 5 && nivel < 16) {
    console.log("El charmander puede evolucionar a Charmeleon");
} else if (nivel >= 16) {
    console.log("El charmander puede evolucionar a Charizard");
} else {
    console.log("El charmander no puede evolucionar a Charmeleon ni a Charizard");
}

nivel = 15;
let poder: number = 25
//condicional if con operadores logicos
if (nivel >= 5 && nivel < 16 && poder >= 20) {
    console.log("El charmander puede evolucionar a Charmeleon");
} else if (nivel >= 16 && poder >= 20) {
    console.log("El charmander puede evolucionar a Charizard");
} else {
    console.log("El charmander no puede evolucionar a Charmeleon ni a Charizard");
}

nivel = 5;
poder = 18;
//condicional if con operadores logicos or
if (nivel >= 5 || poder >= 20) {
    console.log("El charmander puede evolucionar");
} else if (nivel >= 16 || poder >= 20) {
    console.log("El charmander puede evolucionar a Charizard");
} else {
    console.log("El charmander no puede evolucionar a Charmeleon ni a Charizard");
}



//pratica 

let medallas: number = 8;
if (medallas >= 8) {
    console.log("El entrenador puede participar en la liga Pokémon y que se amyor de 12 o suspedido");
} else if (medallas >= 12) {
    console.log("El entrenador puede participar en la liga Pokémon y ha ganado una medalla de oro");
} else {
    console.log("El entrenador no puede participar en la liga Pokémon");
}

