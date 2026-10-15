// Encapsulamiento
class Jedi {
    private energia: number = 100;

    rayoDeFuerza(danio: number): void {
        if (danio > 0) {
            this.energia = Math.max(0, this.energia - danio);
        }
    }
    consultarEnergia(): number {
        return this.energia;
    }
}

const luck = new Jedi();
luck.rayoDeFuerza(50);
console.log(luck.consultarEnergia());
luck.rayoDeFuerza(25);
console.log(luck.consultarEnergia());

