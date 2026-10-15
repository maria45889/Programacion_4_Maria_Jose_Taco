class Boxeador {
    golpear(): void {
        console.log("Golpe basico ");
    }
}
class Rocky extends Boxeador {
    golpeEspecial(): void {
        console.log("Rocky lanza un poderoso gnacho");
    }
}

class Apollo extends Boxeador {
    golpeRapido(): void{
        console.log("Apollo ñamza un jab veloz")
    }
}

const rocky=new Rocky()
rocky.golpear();
rocky.golpeEspecial();
const apolloCreek = new Apollo();
apolloCreek.golpear();
apolloCreek.golpeRapido();                                                                                                      