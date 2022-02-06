class Rotor {
    constructor(rotor_position) {
        rotor_position = rotor_position.toUpperCase();

        this.N = rotor_position.length;

        for (let i = 0; i < this.N; i++) {
            if (!rotor_position.includes(String.fromCharCode(i+65))) {
                alert("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));
                throw new Error("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));
            }
        }

        this.rotor_position = new Array();

        for (let i = 0; i < this.N; i++) {
            this.rotor_position.push(rotor_position.charCodeAt(i)-65)
        }
    }

    tourner() {
        let nouveau_rotor = new Array();

        for(let i = 0; i < this.N; i++) {
            nouveau_rotor.push((this.rotor_position[i]-1+this.N) % this.N);
        }
        for (let i = 0; i < this.N - 1; i++) {
            this.rotor_position[i] = nouveau_rotor[i+1];
        }
        this.rotor_position[this.N - 1] = nouveau_rotor[0];
    }

    coder(nombre) {
        return this.rotor_position[nombre];
    }

    decoder(nombre) {
        return this.rotor_position.indexOf(nombre);
    }
}

export { Rotor };