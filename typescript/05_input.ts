let personaje = prompt("Ingrese el nombre del personaje (Luke, Darth Vader, Leia Organa, Han Solo):");
let edad = Number(prompt("Ingrese la edad del personaje:"));
let fuerza = Number(prompt("Ingrese el nivel de fuerza del personaje (1-100):"));

if (personaje === "Luke" && edad >= 20 && fuerza >= 80) {
    console.log("Luke Skywalker es un Jedi poderoso.");
} else if (personaje === "Darth Vader" && edad >= 30 && fuerza >= 90) {
    console.log("Darth Vader es un Sith temible.");
} else {
    console.log("Personaje no encontrado o no cumple con los criterios.");
}
