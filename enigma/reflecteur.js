class Reflecteur {
    constructor(reflecteur_position) {
        reflecteur_position = reflecteur_position.toUpperCase();

        this.N = reflecteur_position.length;

        for (let i = 0; i < this.N; i++) {
            if (!reflecteur_position.includes(String.fromCharCode(i+65))) {
                alert("Erreur : la position du reflecteur devrait contenir " + String.fromCharCode(i+65));
                throw new Error("Erreur : la position du reflecteur devrait contenir " + String.fromCharCode(i+65));            }
        }

        this.reflecteur_position = new Array();

        for (let i = 0; i < this.N; i++) {
            this.reflecteur_position.push(reflecteur_position.charCodeAt(i)-65)
        }

        for (let i = 0; i < this.N; i++) {
            if (this.reflecteur_position[i] != this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]) {
                alert("Erreur dans le reflecteur : la lettre " + String.fromCharCode((this.reflecteur_position[i]+65)) + " est codée en  " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[i]]+65)) + " et cette lettre est codée elle-même en " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]+65)) + " alors qu'elle devrait être codée en " + String.fromCharCode((this.reflecteur_position[i]+65)))
                throw new Error("Erreur dans le reflecteur : la lettre " + String.fromCharCode((this.reflecteur_position[i]+65)) + " est codée en  " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[i]]+65)) + " et cette lettre est codée elle-même en " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]+65)) + " alors qu'elle devrait être codée en " + String.fromCharCode((this.reflecteur_position[i]+65)));            }
        }
    }


    coder(nombre) {
        return this.reflecteur_position[nombre];
    }
}

export { Reflecteur };