class Boxeador {
    atacar(): void{
        console.log("Golpe Basico")
    }
}

class Rocky extends Boxeador {
    golpeEspecial(): void{
        console.log("Rocky lanza un poderoso gancho")
    }
}

class Apollo extends Boxeador {
    golpeRapido(): void{
        console.log("Apollo ataca con velocidad")
    }
}

const Boxeadores: Boxeador[]= [
    new Rocky(),
    new Apollo(),
    new Apollo()
]
console.log(Boxeadores)
Boxeadores.forEach(boxeador=>boxeador.atacar());