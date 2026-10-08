type Persoaje = 
"Luke " 
| "Darth Vader" 
| "Leia Organa"
| "Han Solo";


let personaje: Persoaje = "Han Solo";

switch (personaje) {
    case "Luke":
        console.log("Luke Skywalker es un Jedi");
        break;
    case "Darth Vader":
        console.log("Darth Vader es un Sith");
        break;
    case "Leia Organa":
        console.log("Leia Organa es una princesa");
        break;
    case "Han Solo":
        console.log("Han Solo es un contrabandista");
        break;
    case "Yoda":
        console.log("Yoda es un maestro Jedi");
        break;
    default:
        console.log("Personaje desconocido");
        break;
}

type Jedis = "Luke " | "Yoda" | "Obi-Wan Kenobi";

let jedi: Jedis = "Luke ";

switch (jedi) {
    case "Luke ":
        console.log("Luke Skywalker es un Jedi");
        break;
    case "Yoda":
        console.log("Yoda es un maestro Jedi");
        break;
    case "Obi-Wan Kenobi":
        console.log("Obi-Wan Kenobi es un Jedi");
        break;
    default:
        console.log("Personaje desconocido");
        break;

}
